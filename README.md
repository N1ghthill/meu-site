<div align="center">
  <img src="assets/img/Ruas.dev/ruas_logo.png" alt="Ruas.dev" width="320" />
  <h1>Ruas.dev Portfolio</h1>
  <p><strong>Bilingual portfolio and professional link hub</strong> for Terminuz, DevSynapse AI, BotAssist WhatsApp and Nexo CRM.</p>

  <p>
    <a href="https://ruas.dev.br/"><img alt="PT-BR Live" src="https://img.shields.io/badge/PT--BR-Live-1F66FF?style=for-the-badge"></a>
    <a href="https://ruas.dev.br/en"><img alt="EN Live" src="https://img.shields.io/badge/EN-Live-5A35FF?style=for-the-badge"></a>
    <a href="https://vercel.com/"><img alt="Deploy Vercel" src="https://img.shields.io/badge/Deploy-Vercel-111111?style=for-the-badge&logo=vercel&logoColor=white"></a>
    <a href="LICENSE"><img alt="License MIT" src="https://img.shields.io/badge/License-MIT-22A75A?style=for-the-badge"></a>
  </p>

  <p>
    <a href="https://ruas.dev.br/">PT Site</a> •
    <a href="https://ruas.dev.br/en">EN Site</a> •
    <a href="https://ruas.dev.br/links">Links</a> •
    <a href="https://github.com/sponsors/N1ghthill">GitHub Sponsors</a> •
    <a href="mailto:irving@ruas.dev.br">Contact</a>
  </p>
</div>

---

![Ruas.dev Social Preview](assets/img/social-preview.png)

## Quick Navigation
- [PT-BR](#pt-br)
- [EN](#en)
- [Repository Layout](#repository-layout)
- [Run Locally](#run-locally)
- [Quality Checks](#quality-checks)
- [Deploy](#deploy)
- [Documentation](#documentation)
- [License](#license)

## PT-BR
### Objetivo
Este repositório é o canal institucional da **Ruas.dev** para:
- apresentar software com contexto real de operação
- converter visitantes em contatos comerciais e parcerias
- manter credibilidade pública da marca
- centralizar apoio via GitHub Sponsors e Pix

### Produtos em destaque
| Produto | Papel | Link |
| --- | --- | --- |
| Terminuz | Coding agent open source para terminal, multi-provider e permission-aware | `https://github.com/N1ghthill/terminuz` |
| DevSynapse AI | Coding agent open source para DeepSeek | `https://github.com/N1ghthill/devsynapse-ai` |
| BotAssist WhatsApp | Automação WhatsApp em produção | `https://github.com/N1ghthill/botassist-whatsapp` |
| Nexo | CRM multi-tenant para operação comercial | `https://github.com/N1ghthill/nexo` |

### Diferenciais do portfólio
- versão bilíngue (`/` e `/en`)
- central de links mobile-first (`/links`)
- copy premium orientada a conversão
- fluxo de contato e parceria com escassez controlada
- doação via GitHub Sponsors e Pix
- checagem automatizada de layout responsivo e acessibilidade

## EN
### Purpose
This repository is the official **Ruas.dev** channel to:
- showcase software with real operational context
- convert visitors into business and partnership leads
- maintain public brand credibility
- centralize support through GitHub Sponsors and Pix

### Featured products
| Product | Role | Link |
| --- | --- | --- |
| Terminuz | Open source terminal coding agent, multi-provider and permission-aware | `https://github.com/N1ghthill/terminuz` |
| DevSynapse AI | Open source coding agent for DeepSeek | `https://github.com/N1ghthill/devsynapse-ai` |
| BotAssist WhatsApp | WhatsApp automation running in production | `https://github.com/N1ghthill/botassist-whatsapp` |
| Nexo | Multi-tenant CRM for commercial operations | `https://github.com/N1ghthill/nexo` |

### Portfolio highlights
- bilingual version (`/` and `/en`)
- mobile-first links hub (`/links`)
- premium conversion-oriented copy
- selective partnership flow
- support via GitHub Sponsors and Pix
- automated responsive layout and accessibility checks

## Repository Layout
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
├── package.json
├── robots.txt
├── sitemap.xml
├── vercel.json
├── README.md
└── requirements.txt
```

## Run Locally
```bash
python3 -m http.server 8000
```
Open:
- `http://localhost:8000/` (PT)
- `http://localhost:8000/en/` (EN)
- `http://localhost:8000/links/` (links hub)

## Quality Checks
Install dependencies once:
```bash
npm install
npx playwright install chromium
```

Run local checks:
```bash
npm run check:layout
npm run check:a11y
```

The same checks run in GitHub Actions on pull requests and pushes to `main`.

## Deploy
Push to the production branch configured in Vercel triggers automatic deployment.

Manual flow (optional):
```bash
vercel link --yes
vercel pull --yes --environment=production
vercel build
vercel deploy --prebuilt --prod
```

## Documentation
- `docs/README.md`
- `docs/DEPLOY_VERCEL.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/SCRIPTS.md`
- `docs/ROADMAP.md`

## License
MIT. See `LICENSE`.
