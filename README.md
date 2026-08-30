# PULSO

Experiência comercial e demonstrativa da Central de Operação e Inteligência PULSO.

O site mostra, com dados sintéticos, como uma mensagem de campo pode virar cadastro estruturado, gestão de evento, leitura territorial e ação gerencial. A narrativa principal é:

**Campo → Dados → Inteligência → Decisão → Execução**

## Executar localmente

O projeto é estático e não exige etapa de build.

```powershell
python -m http.server 4173
```

Depois, acesse `http://localhost:4173`.

## Estrutura principal

- `index.html`: experiência comercial, três demonstrações e Sala de Situação;
- `pulso.css`: sistema visual e layouts responsivos;
- `pulso.js`: reprodução dos fluxos, diálogos e mapa interativo;
- `geo_alagoas_municipios.json`: geometria agregada usada na demonstração;
- `sw.js` e `manifest.json`: instalação e funcionamento básico offline;
- `.21st/`: decisões de design que orientam evoluções futuras.

## Escopo da demonstração

Os fluxos exibidos são uma prova de conceito de interface. WhatsApp, OCR, geocodificação, autenticação, banco de dados, protocolos e notificações reais dependem das integrações do projeto de implantação.

Pessoas, telefones, documentos, localizações e indicadores são fictícios ou mascarados. Documentos eleitorais são apresentados como rascunhos para validação jurídica; nenhuma ação externa é executada pela demonstração.

## Deploy

O diretório raiz pode ser publicado diretamente como site estático na Vercel. O service worker usa cache versionado e deve continuar com `Cache-Control: no-cache` no deploy.
