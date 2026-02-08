# Estrutura do Projeto / Project Structure

```text
.
├── index.html                 # PT-BR homepage
├── en/index.html              # EN homepage
├── assets/                    # Static assets used by the frontend
│   ├── css/                   # Global and responsive styles
│   ├── js/                    # Frontend interaction scripts
│   └── img/                   # Branding, screenshots and favicons
├── scripts/                   # Helper scripts (Python)
├── docs/                      # Technical/operational docs
├── robots.txt                 # Crawler directives
├── sitemap.xml                # Domain sitemap (PT + EN)
├── vercel.json                # Vercel deploy and headers config
├── requirements.txt           # Python script dependencies
├── README.md                  # Repository overview
└── LICENSE                    # MIT license
```

## PT-BR
Convenções:
- `assets/` guarda somente recursos usados no front-end.
- `docs/` concentra guias de manutenção, deploy e handoff.
- `scripts/` abriga utilitários que complementam o portfólio técnico.
- `.vercel/` é local e não deve ser versionado.

## EN
Conventions:
- `assets/` stores only resources used by the frontend.
- `docs/` centralizes maintenance, deployment and handoff guides.
- `scripts/` contains utilities that complement the technical portfolio.
- `.vercel/` is local and must not be versioned.
