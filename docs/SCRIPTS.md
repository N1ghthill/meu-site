# Scripts

## `analise_campanhas.py`

## PT-BR
Script CLI em Python para análise de campanhas de marketing.

- Lê dados CSV
- Calcula métricas (ROI, taxa de conversão, custo por conversão)
- Gera relatório JSON

### Pré-requisitos
```bash
pip install -r requirements.txt
```

### Executar
```bash
python3 scripts/analise_campanhas.py
```

### Arquivos gerados
- `dados_campanhas.csv` (quando usa dados de exemplo)
- `relatorios/relatorio_YYYYMMDD_HHMMSS.json`

## EN
Python CLI script for marketing campaign analysis.

- Reads CSV data
- Calculates metrics (ROI, conversion rate, cost per conversion)
- Generates JSON reports

### Requirements
```bash
pip install -r requirements.txt
```

### Run
```bash
python3 scripts/analise_campanhas.py
```

### Generated files
- `dados_campanhas.csv` (when sample data mode is used)
- `relatorios/relatorio_YYYYMMDD_HHMMSS.json`

## `check:layout`

## PT-BR
Checagem automatizada de layout mobile/desktop para as páginas principais.

- Sobe um servidor estático temporário
- Abre `/`, `/en/` e `/links/` em múltiplas larguras
- Falha se detectar overflow horizontal, erro de console ou recurso local quebrado

### Pré-requisitos
```bash
npm install
npx playwright install chromium
```

### Executar
```bash
npm run check:layout
```

## EN
Automated mobile/desktop layout check for the main pages.

- Starts a temporary static server
- Opens `/`, `/en/` and `/links/` across multiple widths
- Fails on horizontal overflow, console errors or broken local assets

### Requirements
```bash
npm install
npx playwright install chromium
```

### Run
```bash
npm run check:layout
```
