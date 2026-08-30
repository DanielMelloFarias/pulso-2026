import fs from 'node:fs';

// 1. Update scripts/build.mjs
let build = fs.readFileSync('scripts/build.mjs', 'utf8');
if (!build.includes('painel.html')) {
  build = build.replace(
    "  ['src/lib/operation.js', 'lib/operation.js'],",
    "  ['src/lib/operation.js', 'lib/operation.js'],\n  ['src/painel.html', 'painel.html'],\n  ['src/painel.css', 'painel.css'],\n  ['src/painel.js', 'painel.js'],"
  );
  fs.writeFileSync('scripts/build.mjs', build);
}

// 2. Update src/index.html
let html = fs.readFileSync('src/index.html', 'utf8');
if (!html.includes('painel.html')) {
  html = html.replace(
    '<span class="stage-badge">Pré-lançamento · sem coleta</span>',
    '<div class="header-nav-actions"><span class="stage-badge">Pré-lançamento · sem coleta</span><a class="btn-gov-access" href="./painel.html">🏛️ Gabinete Central (GOV)</a></div>'
  );
  html = html.replace(
    '<a class="button" data-primary-cta href="#produto">Ver um relato virar ação</a>',
    '<div class="hero-cta-group"><a class="button" data-primary-cta href="#produto">Ver um relato virar ação</a><a class="btn-gov-hero" href="./painel.html">🏛️ Entrar no Painel Central (GOV)</a></div>'
  );
  fs.writeFileSync('src/index.html', html);
}

// 3. Update src/styles.css
let css = fs.readFileSync('src/styles.css', 'utf8');
if (!css.includes('btn-gov-access')) {
  css += `\n
.header-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn-gov-access {
  background: var(--acid);
  color: #0d1f1a;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-gov-access:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(232, 255, 104, 0.3);
}
.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.btn-gov-hero {
  background: #172d25;
  color: var(--acid);
  border: 1px solid rgba(232, 255, 104, 0.3);
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.btn-gov-hero:hover {
  background: #204134;
  border-color: var(--acid);
  transform: translateY(-1px);
}
`;
  fs.writeFileSync('src/styles.css', css);
}

console.log('Update finished successfully!');
