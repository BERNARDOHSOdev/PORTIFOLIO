# Retrato

Original preservado: `src-assets/bernardo-original.png` (ex-`dist/assets/bernardo.png`).
Versão editada (fundo removido): `src-assets/bernardo-hero-novo.png`.

Editado com a ferramenta integrada ImageGen para extrair o fundo preto e produzir transparência real. Prompt: preservar identidade facial, expressão, textura da pele, cabelo, brincos, roupa preta, pose, celular e mão; remover apenas o fundo; manter dedos e roupa opacos; evitar halos, borrões, degradês e alterações faciais.

## Uso no site

O site não usa os PNG diretamente. Em `dist/assets` ficam os WebP gerados a partir deles:

- `bernardo-hero-novo-540.webp`, `bernardo-hero-novo-760.webp` e `bernardo-hero-novo-1086.webp` — hero responsivo (`srcset` em `index.html`).
- `og-image.jpg` — card de Open Graph (1200×630) composto a partir do retrato.

## Regenerar

Os originais usados ficam em `src-assets/`. Para recriar os WebP, o script de conversão usa o pacote `sharp` (Node.js) com qualidade 80.
