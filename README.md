# PULSO

Experiência comercial e painel executivo da Central de Operação e Inteligência PULSO.

O site mostra como uma mensagem de campo pode virar cadastro estruturado, gestão de evento, leitura territorial e ação gerencial. A narrativa principal é:

**Campo → Dados → Inteligência → Decisão → Execução**

## Executar localmente

O front-end é estático e não exige etapa de build.

```powershell
python -m http.server 4173
```

Depois, acesse `http://localhost:4173`. O envio comercial usa uma função da Vercel;
para testar essa etapa localmente, execute o projeto com `vercel dev`.

## Estrutura principal

- `index.html`: experiência comercial, três fluxos guiados e convite ao diagnóstico;
- `pulso.css`: sistema visual e layouts responsivos;
- `pulso.js`: reprodução dos fluxos, diálogos e mapa interativo;
- `painel.html`: aplicação executiva com visões de Governador e Deputado Estadual;
- `painel-app.css` e `painel-app.js`: layout, dados operacionais e interações do painel;
- `api/interest.js`: valida e entrega diagnósticos autorizados ao canal da Transforme Tech;
- `geo_alagoas_municipios.json`: geometria agregada usada nas visões territoriais;
- `sw.js` e `manifest.json`: instalação e funcionamento básico offline;
- `.21st/`: decisões de design que orientam evoluções futuras.

## Escopo da experiência

Os fluxos exibidos são uma prova de conceito de interface. WhatsApp, OCR, geocodificação, autenticação, banco de dados, protocolos e notificações reais dependem das integrações do projeto de implantação.

Pessoas, telefones, documentos e localizações permanecem mascarados na apresentação. Documentos eleitorais são apresentados como rascunhos para validação jurídica; nenhuma ação externa é executada pela experiência.

O diagnóstico de interesse possui cinco perguntas, consentimento separado e recomendação de painel. Os dados pessoais não ficam persistidos no navegador: após a validação, a função `/api/interest` encaminha a resposta ao endpoint oficial de diagnóstico da Transforme Tech e só então confirma o recebimento.

## Deploy

O diretório raiz pode ser publicado diretamente como site estático na Vercel. O service worker usa cache versionado e deve continuar com `Cache-Control: no-cache` no deploy.
