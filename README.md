<div align="center">

# Meu Site — Portfólio de Irving Ruas

Portfólio premium da **Ruas.dev** para posicionamento comercial, captação de parcerias e apresentação dos principais softwares da operação.

**Produção:** https://ruas.dev.br  
**Projeto Vercel:** https://meu-site-neon-seven.vercel.app

![status](https://img.shields.io/badge/status-active-success)
![stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue)
![deploy](https://img.shields.io/badge/deploy-vercel-black)

</div>

---

## Objetivo
Este repositório é o canal institucional para:

- apresentar software com contexto real de operação
- converter visitantes em contatos de trabalho e parceria
- manter credibilidade pública da marca Ruas.dev
- centralizar apoio via GitHub Sponsors e Pix

A comunicação do site foi desenhada com posicionamento de **exclusividade**, **escassez controlada** e **curadoria de projetos**.

## Produtos em destaque
- **Nexo**: CRM multi-tenant (nova aposta estratégica)
- **BotAssist WhatsApp**: software principal em produção
- **BotAssist Site**: canal oficial de aquisição e downloads

## Stack
- HTML5
- CSS3 (layout responsivo + motion leve)
- JavaScript (interações de navegação, reveal e modal Pix)
- Deploy: Vercel

## Estrutura
```text
.
├── index.html
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

## Execução local
```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

## Deploy e CI/CD (Vercel)
### Fluxo principal
1. Commit + push na branch de produção configurada no Vercel.
2. Vercel dispara build/deploy automaticamente pela integração com Git.

### Fluxo manual de validação (CLI)
```bash
vercel link --yes
vercel pull --yes --environment=production
vercel build
vercel deploy --prebuilt --prod
```

## Hardening aplicado
`vercel.json` foi adicionado para:

- definir comportamento limpo de URL (`cleanUrls`, `trailingSlash`)
- aplicar headers de segurança (ex.: `X-Content-Type-Options`, `X-Frame-Options`)
- habilitar cache forte para assets estáticos em `/assets/*`

## Script auxiliar (Python)
Arquivo: `scripts/analise_campanhas.py`

Instalação:
```bash
pip install -r requirements.txt
```

Execução:
```bash
python3 scripts/analise_campanhas.py
```

## Documentação
- `docs/README.md`
- `docs/DEPLOY_VERCEL.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/SCRIPTS.md`
- `docs/ROADMAP.md`

## Licença
MIT. Consulte `LICENSE`.
