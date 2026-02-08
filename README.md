# Meu Site / My Website

Portfólio oficial da **Ruas.dev** para posicionamento comercial, captação de parcerias e apresentação dos principais softwares em produção.

Official **Ruas.dev** portfolio for commercial positioning, partnership acquisition, and showcasing production-grade software.

- Produção (PT): `https://ruas.dev.br/`
- Production (EN): `https://ruas.dev.br/en`

## PT-BR
### Objetivo
Este repositório funciona como canal institucional para:
- apresentar software com contexto real de operação
- converter visitantes em contatos de trabalho e parceria
- manter credibilidade pública da marca Ruas.dev
- centralizar apoio via GitHub Sponsors e Pix

### Produtos em destaque
- **Nexo**: CRM multi-tenant (nova aposta estratégica)
- **BotAssist WhatsApp**: software principal em produção
- **BotAssist Site**: canal oficial de aquisição e downloads

### Stack
- HTML5
- CSS3 (layout responsivo + motion leve)
- JavaScript (navegação, reveal e modal Pix)
- Vercel (deploy)

### Estrutura
```text
.
├── index.html
├── en/
│   └── index.html
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
├── docs/
├── scripts/
├── robots.txt
├── sitemap.xml
├── vercel.json
├── README.md
└── requirements.txt
```

### Rodando localmente
```bash
python3 -m http.server 8000
```
Acesse:
- `http://localhost:8000/` (PT)
- `http://localhost:8000/en/` (EN)

### Deploy
Push na branch de produção do projeto conectado no Vercel dispara deploy automático.

Fluxo manual (opcional):
```bash
vercel link --yes
vercel pull --yes --environment=production
vercel build
vercel deploy --prebuilt --prod
```

## EN
### Purpose
This repository is the official channel to:
- present software with real operational context
- convert visitors into business and partnership leads
- maintain public credibility for the Ruas.dev brand
- centralize support through GitHub Sponsors and Pix

### Featured products
- **Nexo**: multi-tenant CRM (new strategic bet)
- **BotAssist WhatsApp**: flagship software in production
- **BotAssist Site**: official acquisition and download channel

### Stack
- HTML5
- CSS3 (responsive layout + subtle motion)
- JavaScript (navigation, reveal effects, Pix modal)
- Vercel (deployment)

### Local run
```bash
python3 -m http.server 8000
```
Open:
- `http://localhost:8000/` (PT)
- `http://localhost:8000/en/` (EN)

### Deployment
A push to the production branch configured in Vercel triggers automatic deployment.

Optional manual flow:
```bash
vercel link --yes
vercel pull --yes --environment=production
vercel build
vercel deploy --prebuilt --prod
```

## Documentação / Documentation
- `docs/README.md`
- `docs/DEPLOY_VERCEL.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/SCRIPTS.md`
- `docs/ROADMAP.md`

## Licença / License
MIT. Consulte/See `LICENSE`.
