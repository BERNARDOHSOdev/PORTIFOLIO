import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';

const root = resolve('dist');
const types = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.png':'image/png',
  '.svg':'image/svg+xml',
  '.mp4':'video/mp4'
};

http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const file=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!file.startsWith(root+sep))throw Error();
    const data=await readFile(file);
    const headers={
      'Content-Type':types[extname(file)]||'application/octet-stream',
      'Accept-Ranges':'bytes',
      'Cache-Control':'no-store'
    };
    if(req.headers.range){
      const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if(!range){res.writeHead(416);return res.end();}
      const start=Number(range[1]);
      const end=Math.min(range[2]?Number(range[2]):data.length-1,data.length-1);
      if(start>end){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});return res.end();}
      res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});
      res.end(data.subarray(start,end+1));
    }else{
      res.writeHead(200,{...headers,'Content-Length':data.length});
      res.end(data);
    }
  }catch{
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(4173,'0.0.0.0',()=>console.log('Local: http://localhost:4173'));
