import fs from 'fs';
import path from 'path';

const basePath = 'C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch';

const brasilGeo = fs.readFileSync(path.join(basePath, 'geo_brasil_ufs.json'), 'utf-8');
const alagoasGeo = fs.readFileSync(path.join(basePath, 'geo_alagoas_municipios.json'), 'utf-8');
const maceioGeo = fs.readFileSync(path.join(basePath, 'maceio_bairros_final_geojson.json'), 'utf-8');

const jsCode = `// ============================================================================
// PULSO 2026 — Master Application Engine (Esri Executive GIS & Data Explorer)
// ============================================================================

window.GEO_BRASIL = ${brasilGeo};
window.GEO_ALAGOAS = ${alagoasGeo};
window.GEO_MACEIO = ${maceioGeo};

// SVG Icon Library
const ICONS = {
  userCheck: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>\`,
  shieldCheck: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>\`,
  cpu: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>\`,
  mapPin: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>\`,
  alertTriangle: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>\`,
  fileText: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>\`,
  database: \`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>\`,
  check: \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>\`
};

// Database Case Sample Data
const DEMO_ELEITORES = [
  { id: 1, nome: "Maria José da Silva", bairro: "Tabuleiro do Martins", cidade: "Maceió", zona: "02", secao: "142", lideranca: "João Ferreira (Carlos Santos)", tel: "(82) 98844-1234", optin: "Sim", score: 96 },
  { id: 2, nome: "José Carlos de Almeida", bairro: "Ponta Verde", cidade: "Maceió", zona: "01", secao: "088", lideranca: "Roberta Costa", tel: "(82) 99123-5566", optin: "Sim", score: 98 },
  { id: 3, nome: "Ana Paula Vasconcelos", bairro: "Benedito Bentes", cidade: "Maceió", zona: "03", secao: "210", lideranca: "Marcos Lima", tel: "(82) 99654-7788", optin: "Sim", score: 92 },
  { id: 4, nome: "Fernando Henrique Dias", bairro: "Poço", cidade: "Maceió", zona: "01", secao: "045", lideranca: "Paulo Vieira", tel: "(82) 98711-3322", optin: "Sim", score: 95 },
  { id: 5, nome: "Luciana Guimarães", bairro: "Jatiúca", cidade: "Maceió", zona: "01", secao: "112", lideranca: "Carlos Santos", tel: "(82) 99344-9900", optin: "Sim", score: 97 },
  { id: 6, nome: "Cláudio Roberto Santos", bairro: "Centro", cidade: "União dos Palmares", zona: "21", secao: "034", lideranca: "José Silva", tel: "(82) 98122-4411", optin: "Pendente", score: 84 },
  { id: 7, nome: "Valéria Mendes", bairro: "Brasília", cidade: "Arapiraca", zona: "22", secao: "105", lideranca: "Amanda Dantas", tel: "(82) 99877-6655", optin: "Sim", score: 99 },
  { id: 8, nome: "Rodrigo Mendonça", bairro: "Centro", cidade: "Palmeira dos Índios", zona: "10", secao: "078", lideranca: "Renato Barros", tel: "(82) 99111-2233", optin: "Sim", score: 94 }
];

// State Variables
let currentLOD = 'maceio';
let leafletMap = null;
let currentGeoLayer = null;
let activeMarker = null;
let activeFeatureName = 'Ponta Verde';

// Commercial Calculator State
let selectedCargo = 'federal';
const cargoData = {
  estadual: { nome: 'Deputado Estadual', cheio: 45000, piso: 30000 },
  federal: { nome: 'Deputado Federal', cheio: 65000, piso: 45000 },
  senador: { nome: 'Senador', cheio: 105000, piso: 75000 },
  governador: { nome: 'Governador', cheio: 160000, piso: 120000 }
};

const moduleDiscounts = {
  estadual: { ai_gerencial: 3000, alertas_briefing: 2000, geointeligencia: 3000, war_room: 4000, radar_demandas: 3000 },
  federal: { ai_gerencial: 4000, alertas_briefing: 3000, geointeligencia: 4000, war_room: 5000, radar_demandas: 4000 },
  senador: { ai_gerencial: 5000, alertas_briefing: 5000, geointeligencia: 6000, war_room: 7000, radar_demandas: 7000 },
  governador: { ai_gerencial: 8000, alertas_briefing: 6000, geointeligencia: 8000, war_room: 10000, radar_demandas: 8000 }
};

const activeModules = {
  ai_gerencial: true,
  alertas_briefing: true,
  geointeligencia: true,
  war_room: true,
  radar_demandas: true
};

// Simulation State
let activeFlow = 1;
let simInterval = null;
let deferredPrompt = null;

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initFlowSimulator(1);
  initCalculator();
  initPWA();
});

// ============================================================================
// 0. PWA & WEBAPP INSTALLATION ENGINE
// ============================================================================
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW error:', err);
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtns = document.querySelectorAll('.btn-install-trigger');
    installBtns.forEach(btn => btn.style.display = 'inline-flex');
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    alert('PULSO 2026 instalado com sucesso no seu dispositivo!');
  });
}

window.installPWA = function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.choice === 'accepted') {
        console.log('User accepted install prompt');
      }
      deferredPrompt = null;
    });
  } else {
    alert('Para instalar o PULSO no seu iPhone/iPad: toque em Compartilhar no Safari e selecione "Adicionar à Tela de Início". No Google Chrome/Edge: clique no ícone de instalação na barra de navegação.');
  }
};

// ============================================================================
// 1. MAP ENGINE (ESRI WORLD GRAY CANVAS — 100% FREE NO WATERMARK)
// ============================================================================
function initMap() {
  const mapContainer = document.getElementById('leaflet-map');
  if (!mapContainer) return;

  leafletMap = L.map('leaflet-map', {
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: true
  }).setView([-9.6498, -35.7089], 12);

  // Esri World Light Gray Base (Ultra clean executive canvas, NO watermark)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16,
    subdomains: ['server', 'services']
  }).addTo(leafletMap);

  renderLODLayer('maceio');
}

function setMapLOD(lod) {
  currentLOD = lod;
  
  document.querySelectorAll('.lod-pill').forEach(el => el.classList.remove('active'));
  const activeBtn = document.getElementById('lod-btn-' + lod);
  if (activeBtn) activeBtn.classList.add('active');

  renderLODLayer(lod);
}

function renderLODLayer(lod) {
  if (!leafletMap) return;

  if (currentGeoLayer) {
    leafletMap.removeLayer(currentGeoLayer);
  }
  if (activeMarker) {
    leafletMap.removeLayer(activeMarker);
  }

  let geoData = null;
  let targetView = null;
  let targetZoom = 12;

  if (lod === 'brasil') {
    geoData = window.GEO_BRASIL;
    targetView = [-14.235, -51.925];
    targetZoom = 4;
  } else if (lod === 'alagoas' || lod === 'atencao') {
    geoData = window.GEO_ALAGOAS;
    targetView = [-9.5713, -36.7820];
    targetZoom = 8;
  } else {
    geoData = window.GEO_MACEIO;
    targetView = [-9.6498, -35.7089];
    targetZoom = 12;
  }

  leafletMap.flyTo(targetView, targetZoom, { duration: 1.2 });

  currentGeoLayer = L.geoJSON(geoData, {
    style: (feature) => getFeatureStyle(feature, lod),
    onEachFeature: (feature, layer) => {
      const name = getFeatureName(feature);
      
      layer.bindTooltip(\`<strong>\${name}</strong>\`, {
        permanent: false,
        sticky: true,
        className: 'custom-leaflet-tooltip-dark'
      });

      layer.on('click', () => {
        selectFeature(feature, layer, lod);
      });
    }
  }).addTo(leafletMap);

  updateSidebarList(lod);
}

function getFeatureName(feature) {
  const p = feature.properties || {};
  return p.NM_BAIRRO || p.name || p.NM_MUN || p.NM_UF || p.sigla || 'Território';
}

function getFeatureStyle(feature, lod) {
  const name = getFeatureName(feature);
  
  if (lod === 'atencao') {
    if (name.includes('União dos Palmares') || name.includes('Palmares')) {
      return { fillColor: '#e11d48', fillOpacity: 0.7, color: '#be123c', weight: 2.5 };
    }
    if (name.includes('Arapiraca') || name.includes('Palmeira') || name.includes('Penedo')) {
      return { fillColor: '#10b981', fillOpacity: 0.6, color: '#059669', weight: 2 };
    }
    return { fillColor: '#cbd5e1', fillOpacity: 0.3, color: '#94a3b8', weight: 1 };
  }

  const isSelected = (name === activeFeatureName);
  let color = '#0284c7';
  let fillColor = '#38bdf8';

  if (name.includes('Ponta Verde') || name.includes('Arapiraca') || name.includes('Alagoas')) {
    color = '#059669';
    fillColor = '#10b981';
  } else if (name.includes('Tabuleiro') || name.includes('Benedito Bentes')) {
    color = '#0284c7';
    fillColor = '#7dd3fc';
  }

  return {
    color: isSelected ? '#0f172a' : color,
    weight: isSelected ? 3.5 : 1.2,
    fillColor: fillColor,
    fillOpacity: isSelected ? 0.65 : 0.28
  };
}

function selectFeature(feature, layer, lod) {
  const name = getFeatureName(feature);
  activeFeatureName = name;

  if (activeMarker) {
    leafletMap.removeLayer(activeMarker);
  }

  const bounds = layer.getBounds();
  const center = bounds.getCenter();

  leafletMap.flyTo(center, Math.max(leafletMap.getZoom(), 12), { duration: 0.8 });

  activeMarker = L.marker(center, {
    icon: L.divIcon({
      className: 'custom-active-marker',
      html: \`<div style="background:#ffffff; border:2px solid #0f172a; color:#0f172a; font-size:11px; font-weight:800; padding:4px 10px; border-radius:20px; box-shadow:0 4px 15px rgba(0,0,0,0.15); white-space:nowrap;">\${name}</div>\`,
      iconSize: [120, 30],
      iconAnchor: [60, 15]
    })
  }).addTo(leafletMap);

  updateFeatureBriefing(name, lod);
}

function updateSidebarList(lod) {
  const listEl = document.getElementById('map-territory-list');
  if (!listEl) return;

  let features = [];
  if (lod === 'brasil') features = window.GEO_BRASIL.features;
  else if (lod === 'alagoas' || lod === 'atencao') features = window.GEO_ALAGOAS.features;
  else features = window.GEO_MACEIO.features;

  listEl.innerHTML = features.slice(0, 30).map(f => {
    const name = getFeatureName(f);
    return \`
      <div class="map-card-item \${name === activeFeatureName ? 'active' : ''}" onclick="window.locateByName('\${name}')">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:0.85rem; color:#0f172a;">\${name}</strong>
          <span style="font-size:0.72rem; color:var(--emerald-dark); font-weight:700;">82% Meta</span>
        </div>
        <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px;">
          \${lod === 'atencao' && name.includes('Palmares') ? 'Atividade ↓38% · 9 Tarefas' : '14 Lideranças Ativas'}
        </div>
      </div>
    \`;
  }).join('');
}

window.locateByName = function(name) {
  activeFeatureName = name;
  if (!currentGeoLayer) return;

  currentGeoLayer.eachLayer(layer => {
    if (getFeatureName(layer.feature) === name) {
      selectFeature(layer.feature, layer, currentLOD);
    }
  });
};

function updateFeatureBriefing(name, lod) {
  const titleEl = document.getElementById('briefing-title');
  const contentEl = document.getElementById('briefing-dynamic-content');
  if (!titleEl || !contentEl) return;

  titleEl.innerText = name;

  if (name.includes('União dos Palmares')) {
    contentEl.innerHTML = \`
      <div style="background:rgba(225,29,72,0.08); border:1px solid #e11d48; padding:1rem; border-radius:10px; margin-bottom:1rem;">
        <strong style="color:#be123c; display:flex; align-items:center; gap:0.4rem;">\${ICONS.alertTriangle} ALERTA CRÍTICO: Atividade ↓38%</strong>
        <p style="font-size:0.8rem; color:#475569; margin-top:4px;">Último evento há 4 dias. 9 tarefas vencidas. Coordenador: José Silva.</p>
        <button class="btn-primary" style="margin-top:10px; font-size:0.78rem; background:#e11d48;" onclick="triggerAction('jose_task')">Criar Tarefa para José Silva</button>
      </div>

      <div class="briefing-metrics-grid">
        <div class="briefing-metric-box"><div class="briefing-metric-label">Meta Votos</div><div class="briefing-metric-val">12.500</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Mapeados</div><div class="briefing-metric-val" style="color:#e11d48;">4.210</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Lideranças</div><div class="briefing-metric-val">8</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Consolidação</div><div class="briefing-metric-val" style="color:#e11d48;">34%</div></div>
      </div>

      <button class="btn-primary btn-apple-blue" style="width:100%; justify-content:center; margin-top:0.5rem;" onclick="openDataExplorer('União dos Palmares')">
        \${ICONS.database} <span>Visualizar Banco de Dados do Território</span>
      </button>
    \`;
  } else if (name.includes('Tabuleiro')) {
    contentEl.innerHTML = \`
      <div style="background:rgba(16,185,129,0.08); border:1px solid #10b981; padding:0.95rem; border-radius:10px; margin-bottom:1rem;">
        <strong style="color:#059669; display:flex; align-items:center; gap:0.4rem;">\${ICONS.mapPin} Território de Alta Expansão</strong>
        <p style="font-size:0.8rem; color:#475569; margin-top:4px;">Último registro: Maria José da Silva cadastrada via WhatsApp com OCR validado.</p>
      </div>

      <div class="briefing-metrics-grid">
        <div class="briefing-metric-box"><div class="briefing-metric-label">Meta Votos</div><div class="briefing-metric-val">18.000</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Mapeados</div><div class="briefing-metric-val" style="color:#059669;">15.420</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Lideranças</div><div class="briefing-metric-val">34</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Consolidação</div><div class="briefing-metric-val" style="color:#059669;">86%</div></div>
      </div>

      <div style="margin:1rem 0;">
        <strong style="font-size:0.78rem; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.05em;">Lideranças em Destaque:</strong>
        <div class="leader-item-chip">
          <span><strong>João Ferreira</strong> (Coordenação)</span>
          <span style="color:var(--emerald-dark); font-weight:700;">420 Eleitores</span>
        </div>
        <div class="leader-item-chip">
          <span><strong>Carlos Santos</strong> (Campo)</span>
          <span style="color:var(--emerald-dark); font-weight:700;">184 Eleitores</span>
        </div>
      </div>

      <button class="btn-primary btn-apple-blue" style="width:100%; justify-content:center; margin-top:0.5rem;" onclick="openDataExplorer('Tabuleiro do Martins')">
        \${ICONS.database} <span>Visualizar Banco de Dados do Tabuleiro</span>
      </button>
    \`;
  } else {
    contentEl.innerHTML = \`
      <div class="briefing-metrics-grid">
        <div class="briefing-metric-box"><div class="briefing-metric-label">Meta Votos</div><div class="briefing-metric-val">8.400</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Mapeados</div><div class="briefing-metric-val">6.890</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Lideranças</div><div class="briefing-metric-val">14</div></div>
        <div class="briefing-metric-box"><div class="briefing-metric-label">Consolidação</div><div class="briefing-metric-val" style="color:var(--apple-blue);">82%</div></div>
      </div>

      <div style="margin:1rem 0;">
        <strong style="font-size:0.78rem; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.05em;">Principais Demandas da População:</strong>
        <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:0.4rem; background:#f8fafc; padding:0.75rem; border-radius:8px; border:1px solid var(--border-glass);">
          Segurança integrada, iluminação pública e apoio ao comércio de bairro.
        </div>
      </div>

      <button class="btn-primary btn-apple-blue" style="width:100%; justify-content:center;" onclick="openDataExplorer('\${name}')">
        \${ICONS.database} <span>Visualizar Banco de Dados do Território</span>
      </button>
    \`;
  }
}

// ============================================================================
// 2. LIVE INTERACTIVE WHATSAPP SIMULATOR (EXECUTIVE WORKBENCH)
// ============================================================================
function initFlowSimulator(flowNum) {
  activeFlow = flowNum;
  if (simInterval) clearInterval(simInterval);

  document.querySelectorAll('.flow-sidebar-card').forEach(card => card.classList.remove('active'));
  const activeCard = document.getElementById('flow-card-' + flowNum);
  if (activeCard) activeCard.classList.add('active');

  const chatBody = document.getElementById('wa-chat-body');
  const intelContent = document.getElementById('intel-display-content');
  if (!chatBody || !intelContent) return;

  chatBody.innerHTML = '';
  
  if (flowNum === 1) {
    runFlow1(chatBody, intelContent);
  } else if (flowNum === 2) {
    runFlow2(chatBody, intelContent);
  } else if (flowNum === 3) {
    runFlow3(chatBody, intelContent);
  }
}

// FLUXO 1: CADASTRO DE ELEITOR
function runFlow1(chatBody, intelContent) {
  intelContent.innerHTML = \`
    <div class="intel-badge-row">
      <span class="flow-step-pill">\${ICONS.userCheck} Fluxo 01 · Campo para a Base</span>
      <div class="score-badge">Data Quality: 96/100</div>
    </div>
    <div class="intel-grid">
      <div class="intel-item"><span class="intel-label">Eleitora</span><div class="intel-value">Maria José da Silva</div></div>
      <div class="intel-item"><span class="intel-label">Território</span><div class="intel-value">Tabuleiro do Martins · Maceió</div></div>
      <div class="intel-item"><span class="intel-label">Origem</span><div class="intel-value">Reunião Tabuleiro (27/08)</div></div>
      <div class="intel-item"><span class="intel-label">Liderança</span><div class="intel-value">João Ferreira (Carlos Santos)</div></div>
    </div>
    <div class="relationship-tree">
      <div class="tree-node">\${ICONS.shieldCheck} Coord. Maceió</div>
      <span class="tree-arrow">➔</span>
      <div class="tree-node">\${ICONS.userCheck} João Ferreira</div>
      <span class="tree-arrow">➔</span>
      <div class="tree-node">\${ICONS.userCheck} Carlos Santos</div>
      <span class="tree-arrow">➔</span>
      <div class="tree-node highlight">\${ICONS.mapPin} Maria José (Eleitora)</div>
    </div>
    <div style="margin-top:1.5rem; display:flex; gap:0.6rem;">
      <button class="btn-primary btn-apple-blue" onclick="setMapLOD('maceio'); window.locateByName('Tabuleiro do Martins');">Ver Maria no Mapa do Tabuleiro</button>
      <button class="btn-primary btn-install" onclick="openDataExplorer('Tabuleiro do Martins')">\${ICONS.database} <span>Ver no Banco de Dados</span></button>
    </div>
  \`;

  appendWaMsg(chatBody, 'out', \`<strong>Novo cadastro:</strong><br>Maria José da Silva<br>WhatsApp: (82) 98844-1234<br>Endereço: Rua X, 125, Tabuleiro do Martins, Maceió<br>Nasc: 15/04/1984 · Título: 0498... Zona 02 Seção 142<br>Conhecida por João Ferreira.<br>Participou da reunião de hoje no Tabuleiro.<br>Autorizou cadastro e comunicação.<br><em>[Anexo: Documento de Identidade & Título]</em><br><em>[Anexo: Ponto Georreferenciado GPS]</em>\`, '14:22');

  setTimeout(() => {
    appendWaMsg(chatBody, 'in', \`<strong>Cadastro identificado pelo PULSO.</strong><br><br><strong>Maria José da Silva</strong><br>Tabuleiro do Martins — Maceió<br>Origem: Reunião Tabuleiro 27/08<br>Responsável: Carlos Santos<br>Liderança: João Ferreira<br><br>OCR e Geocodificação validados. Confirmar inclusão?<br><div class="wa-action-chips"><span class="wa-chip" onclick="confirmWaStep('f1')">CONFIRMAR CADASTRO</span></div>\`, '14:23');
  }, 1200);
}

// FLUXO 2: CARREATA & COMPLIANCE
function runFlow2(chatBody, intelContent) {
  intelContent.innerHTML = \`
    <div class="intel-badge-row">
      <span class="flow-step-pill" style="background:rgba(217,119,6,0.1); color:var(--gold); border-color:rgba(217,119,6,0.3);">\${ICONS.shieldCheck} Fluxo 02 · Gestão de Carreata</span>
      <div class="score-badge" style="color:var(--gold); border-color:var(--gold);">Preparação — 72%</div>
    </div>
    <div class="intel-grid">
      <div class="intel-item"><span class="intel-label">Evento</span><div class="intel-value">Carreata Maceió (05/09)</div></div>
      <div class="intel-item"><span class="intel-label">Concentração</span><div class="intel-value">14h Praça X ➔ Saída 15h</div></div>
      <div class="intel-item"><span class="intel-label">Estimativa</span><div class="intel-value">120 Veículos (91 confirmados)</div></div>
      <div class="intel-item"><span class="intel-label">Compliance Eleitoral</span><div class="intel-value">Polícia Militar & TRE 24h</div></div>
    </div>
    <div style="margin-top:1.25rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem;">
      <div style="background:#f8fafc; padding:0.85rem; border-radius:8px; border:1px solid var(--border-glass);">
        <strong style="font-size:0.82rem; color:#0f172a; display:flex; align-items:center; gap:0.4rem;">\${ICONS.fileText} Ofício Polícia Militar</strong>
        <div style="font-size:0.75rem; color:var(--emerald-dark);">Gerado e pronto para assinatura</div>
      </div>
      <div style="background:#f8fafc; padding:0.85rem; border-radius:8px; border:1px solid var(--border-glass);">
        <strong style="font-size:0.82rem; color:#0f172a; display:flex; align-items:center; gap:0.4rem;">\${ICONS.fileText} Comunicado TRE</strong>
        <div style="font-size:0.75rem; color:var(--emerald-dark);">Gerado (Combustível 24h)</div>
      </div>
    </div>
    <div style="margin-top:1.5rem; display:flex; gap:0.6rem;">
      <button class="btn-primary btn-apple-blue" onclick="openDocModal('pm')">Ver Ofício PM / TRE Gerado</button>
    </div>
  \`;

  appendWaMsg(chatBody, 'out', \`Vamos fazer uma carreata sábado, dia 05/09.<br>Concentração às 14h na Praça X, Maceió. Saída às 15h.<br>Percurso: Praça X ➔ Av. A ➔ Av. B ➔ Rua C ➔ Praça Y.<br>Previsão: 120 carros. Responsável: João Silva (82 99999-1111).<br>Prepare a documentação necessária.\`, '16:04');

  setTimeout(() => {
    appendWaMsg(chatBody, 'in', \`<strong>Documentação da Carreata pronta!</strong><br><br>Foram gerados automaticamente:<br>• Comunicação à Polícia Militar (Trânsito)<br>• Comunicação à Justiça Eleitoral (Combustível 24h)<br>• Descrição oficial do percurso e termo de organizador<br><br>Tarefas criadas:<br>• <strong>João Silva:</strong> Assinar documentos (hoje 18h)<br>• <strong>Mariana:</strong> Protocolar na PM (amanhã 10h)<br><div class="wa-action-chips"><span class="wa-chip" onclick="openDocModal('pm')">BAIXAR PDF OFÍCIO</span></div>\`, '16:05');
  }, 1200);
}

// FLUXO 3: IA GERENCIAL DO CANDIDATO
function runFlow3(chatBody, intelContent) {
  intelContent.innerHTML = \`
    <div class="intel-badge-row">
      <span class="flow-step-pill" style="background:rgba(225,29,72,0.1); color:#be123c; border-color:rgba(225,29,72,0.25);">\${ICONS.cpu} Fluxo 03 · Decisão Executiva</span>
      <div class="score-badge" style="color:var(--apple-blue); border-color:var(--apple-blue);">Comando 22:00h</div>
    </div>
    <div class="intel-grid">
      <div class="intel-item"><span class="intel-label">Integrantes Ativos</span><div class="intel-value">163 em 28 Municípios</div></div>
      <div class="intel-item"><span class="intel-label">Novos Eleitores</span><div class="intel-value">+743 hoje (11 eventos)</div></div>
      <div class="intel-item"><span class="intel-label">Crescimento</span><div class="intel-value">Arapiraca +31% · Palmeira +24%</div></div>
      <div class="intel-item"><span class="intel-label">Atenção Crítica</span><div class="intel-value" style="color:var(--red);">União dos Palmares ↓38%</div></div>
    </div>
    <div style="margin-top:1.5rem; display:flex; gap:0.6rem;">
      <button class="btn-primary" style="background:var(--red);" onclick="setMapLOD('atencao'); window.locateByName('União dos Palmares');">Abrir Mapa de Atenção Operacional</button>
      <button class="btn-primary btn-install" onclick="openDataExplorer('União dos Palmares')">\${ICONS.database} <span>Ver Dados do Município</span></button>
    </div>
  \`;

  appendWaMsg(chatBody, 'out', \`Como foi minha campanha hoje? O que precisa da minha atenção amanhã?\`, '22:00');

  setTimeout(() => {
    appendWaMsg(chatBody, 'in', \`<strong>RESUMO EXECUTIVO — HOJE</strong><br><br>• 163 integrantes ativos em 28 municípios<br>• 743 novos registros válidos cadastrados<br><br><strong>Destaques Positivos:</strong><br>Arapiraca +31% · Palmeira +24%<br><br><strong>Atenção Necessária:</strong><br>• 4 municípios sem atividade há 72h<br>• Atividade em <strong>União dos Palmares caiu 38%</strong> (José Silva tem 9 tarefas vencidas)<br><br><strong>Recomendação:</strong> Cobre José Silva antes das 10h sobre a equipe de União dos Palmares.<br><div class="wa-action-chips"><span class="wa-chip" onclick="triggerAction('jose_task')">CRIAR TAREFA P/ JOSÉ SILVA</span><span class="wa-chip" onclick="setMapLOD('atencao')">VER MAPA DE ATENÇÃO</span></div>\`, '22:01');
  }, 1200);
}

function appendWaMsg(container, type, text, time) {
  const msgEl = document.createElement('div');
  msgEl.className = 'wa-msg ' + type;
  msgEl.innerHTML = text + \`<span class="wa-time">\${time}</span>\`;
  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
}

window.confirmWaStep = function(step) {
  const chatBody = document.getElementById('wa-chat-body');
  if (step === 'f1') {
    appendWaMsg(chatBody, 'out', 'CONFIRMAR', '14:24');
    setTimeout(() => {
      appendWaMsg(chatBody, 'in', '<strong>Cadastro efetuado com sucesso.</strong><br>Maria José adicionada ao Tabuleiro do Martins.<br>Indicadores de Maceió atualizados: 183 ➔ 184.<br>Data Quality: 96/100 gravado na base segura.', '14:24');
    }, 800);
  }
};

window.triggerAction = function(action) {
  const chatBody = document.getElementById('wa-chat-body');
  if (action === 'jose_task') {
    appendWaMsg(chatBody, 'out', 'Crie uma tarefa para José reorganizar a equipe amanhã e peça um retorno até 11h.', '22:02');
    setTimeout(() => {
      appendWaMsg(chatBody, 'in', '<strong>Tarefa criada no PULSO.</strong><br><br>Responsável: José Silva<br>Prioridade: Alta<br>Prazo: Amanhã às 11h<br>Território: União dos Palmares<br><br>José foi notificado no WhatsApp e a pendência foi adicionada ao Morning Briefing de amanhã.', '22:03');
    }, 900);
  }
};

// ============================================================================
// 3. COMMERCIAL CALCULATOR ENGINE (TABELA 2026 FLEXÍVEL)
// ============================================================================
function initCalculator() {
  updateCalculatorDisplay();
}

window.selectCargo = function(cargoKey) {
  selectedCargo = cargoKey;
  document.querySelectorAll('.cargo-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('cargo-card-' + cargoKey);
  if (card) card.classList.add('selected');
  updateCalculatorDisplay();
};

window.toggleModule = function(modKey) {
  activeModules[modKey] = !activeModules[modKey];
  updateCalculatorDisplay();
};

function updateCalculatorDisplay() {
  const cargo = cargoData[selectedCargo];
  const discounts = moduleDiscounts[selectedCargo];

  let totalDiscount = 0;
  for (const [key, active] of Object.entries(activeModules)) {
    if (!active) {
      totalDiscount += (discounts[key] || 0);
    }
  }

  const finalPrice = Math.max(cargo.piso, cargo.cheio - totalDiscount);

  const priceEl = document.getElementById('calc-final-price');
  const cargoNameEl = document.getElementById('calc-cargo-name');
  const discountEl = document.getElementById('calc-total-discount');
  const pisoNoticeEl = document.getElementById('calc-piso-notice');

  if (priceEl) priceEl.innerText = 'R$ ' + finalPrice.toLocaleString('pt-BR');
  if (cargoNameEl) cargoNameEl.innerText = cargo.nome;
  if (discountEl) discountEl.innerText = totalDiscount > 0 ? '- R$ ' + totalDiscount.toLocaleString('pt-BR') : 'Preço Cheio (Escopo Completo)';
  if (pisoNoticeEl) {
    pisoNoticeEl.innerText = \`Piso de Negociação da Categoria: R$ \${cargo.piso.toLocaleString('pt-BR')}\`;
  }
}

// ============================================================================
// 4. DATA EXPLORER & DOCUMENT MODAL
// ============================================================================
window.openDataExplorer = function(filterQuery) {
  const modal = document.getElementById('data-modal');
  const titleEl = document.getElementById('data-modal-title');
  const containerEl = document.getElementById('data-modal-table-container');
  if (!modal || !containerEl) return;

  titleEl.innerText = filterQuery ? \`Base de Dados Eleitorais 2026 — \${filterQuery}\` : 'Central de Dados & Eleitorado 2026 (Case Alagoas)';

  let filtered = DEMO_ELEITORES;
  if (filterQuery) {
    filtered = DEMO_ELEITORES.filter(e => e.bairro.toLowerCase().includes(filterQuery.toLowerCase()) || e.cidade.toLowerCase().includes(filterQuery.toLowerCase()));
    if (filtered.length === 0) filtered = DEMO_ELEITORES;
  }

  containerEl.innerHTML = \`
    <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; margin-bottom:1rem;">
      <input type="text" id="data-search-box" placeholder="Buscar eleitor, liderança, telefone ou seção..." style="flex:1; padding:0.6rem 1rem; border:1px solid #cbd5e1; border-radius:8px; font-size:0.82rem; outline:none;" onkeyup="window.filterTableLive(this.value)">
      <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">\${filtered.length} Registros Mapeados</span>
    </div>

    <div class="data-table-container">
      <table class="data-table" id="eleitores-live-table">
        <thead>
          <tr>
            <th>Eleitor(a)</th>
            <th>Bairro / Município</th>
            <th>Zona / Seção</th>
            <th>Liderança de Origem</th>
            <th>WhatsApp</th>
            <th>Consentimento</th>
            <th>Data Quality</th>
          </tr>
        </thead>
        <tbody>
          \${filtered.map(row => \`
            <tr>
              <td><strong>\${row.nome}</strong></td>
              <td>\${row.bairro} — \${row.cidade}</td>
              <td>Zona \${row.zona} · Seção \${row.secao}</td>
              <td>\${row.lideranca}</td>
              <td style="font-family:var(--font-mono); font-size:0.78rem;">\${row.tel}</td>
              <td><span class="status-badge-optin">\${ICONS.check} \${row.optin}</span></td>
              <td><strong style="color:var(--emerald-dark); font-family:var(--font-mono);">\${row.score}/100</strong></td>
            </tr>
          \`).join('')}
        </tbody>
      </table>
    </div>
  \`;

  modal.classList.add('open');
};

window.filterTableLive = function(query) {
  const table = document.getElementById('eleitores-live-table');
  if (!table) return;
  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    const text = rows[i].innerText.toLowerCase();
    rows[i].style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  }
};

window.closeDataModal = function() {
  const modal = document.getElementById('data-modal');
  if (modal) modal.classList.remove('open');
};

window.openDocModal = function(type) {
  const modal = document.getElementById('doc-modal');
  const bodyEl = document.getElementById('doc-modal-body');
  if (!modal || !bodyEl) return;

  bodyEl.innerHTML = \`
    <div class="doc-paper">
      <h2>OFÍCIO DE COMUNICAÇÃO DE ATO DE CAMPANHA</h2>
      <p style="text-align:right; margin-bottom:1.5rem;">Maceió/AL, 03 de Setembro de 2026</p>
      
      <p><strong>AO COMANDO DE POLICIAMENTO DA CAPITAL / POLÍCIA MILITAR DE ALAGOAS</strong><br>
      Assunto: Comunicação prévia de Carreata Eleitoral (Antecedência regulamentar de 24 horas)</p>
      
      <p style="margin-top:1.5rem;">Prezado(a) Comandante,</p>
      
      <p>Vimos, por meio deste instrumento oficial, em cumprimento à legislação eleitoral vigente para o pleito de 2026, COMUNICAR a realização de <strong>CARREATA POLÍTICA</strong> a ser realizada no município de <strong>Maceió/AL</strong>, no dia <strong>05 de Setembro de 2026</strong>, conforme cronograma abaixo:</p>
      
      <ul style="margin:1rem 0 1rem 1.5rem;">
        <li><strong>Concentração:</strong> 14h00 na Praça X</li>
        <li><strong>Saída Oficial:</strong> 15h00</li>
        <li><strong>Itinerário Aprovado:</strong> Praça X ➔ Av. Fernandes Lima ➔ Av. Menino Marcelo ➔ Rua C ➔ Praça Y</li>
        <li><strong>Previsão de Encerramento:</strong> 18h00</li>
        <li><strong>Estimativa de Veículos:</strong> 120 automóveis</li>
        <li><strong>Responsável Geral:</strong> João Silva (Telefone: 82 99999-1111)</li>
      </ul>
      
      <p>Solicitamos as providências cabíveis de ordenamento do trânsito e segurança preventiva ao longo do percurso delimitado.</p>
      
      <div style="margin-top:3rem; text-align:center;">
        ____________________________________________________<br>
        <strong>JOÃO SILVA</strong><br>
        Coordenador Geral de Operações de Campanha 2026
      </div>
    </div>
  \`;

  modal.classList.add('open');
};

window.closeDocModal = function() {
  const modal = document.getElementById('doc-modal');
  if (modal) modal.classList.remove('open');
};
`;

fs.writeFileSync(path.join(basePath, 'pulso.js'), jsCode, 'utf-8');
console.log('Successfully compiled pulso.js with Esri World Gray and Data Explorer!');
