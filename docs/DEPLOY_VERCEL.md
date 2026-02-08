# Deploy Vercel

## PT-BR
Guia operacional para manter o deploy previsível no Vercel.

### Pré-requisitos
- Vercel CLI instalado e autenticado
- Repositório conectado ao projeto correto
- Branch de produção definida no projeto

### Fluxo recomendado
1. Vincular o repositório local ao projeto
```bash
vercel link --yes
```

2. Sincronizar configurações de produção
```bash
vercel pull --yes --environment=production
```

3. Validar build local
```bash
vercel build
```

4. (Opcional) Publicar manualmente em produção
```bash
vercel deploy --prebuilt --prod
```

### Diagnóstico rápido
```bash
vercel project inspect --yes
vercel ls --yes
vercel inspect <deployment-url> --logs
```

### Padrão esperado deste projeto
- Framework: `Other`
- Root Directory: `.`
- Deploy estático (`index.html`, `en/index.html`, `assets/*`)

## EN
Operational guide to keep deployment predictable on Vercel.

### Requirements
- Vercel CLI installed and authenticated
- Repository linked to the correct project
- Production branch configured in project settings

### Recommended flow
1. Link local repository to the project
```bash
vercel link --yes
```

2. Sync production project settings
```bash
vercel pull --yes --environment=production
```

3. Validate local build output
```bash
vercel build
```

4. (Optional) Manually publish to production
```bash
vercel deploy --prebuilt --prod
```

### Quick troubleshooting
```bash
vercel project inspect --yes
vercel ls --yes
vercel inspect <deployment-url> --logs
```

### Expected setup for this project
- Framework: `Other`
- Root Directory: `.`
- Static deployment (`index.html`, `en/index.html`, `assets/*`)
