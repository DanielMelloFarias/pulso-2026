import fs from 'fs';

const brGeo = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/geo_brasil_ufs.json', 'utf8'));
const alGeo = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/geo_alagoas_municipios.json', 'utf8'));
const mcGeo = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/maceio_bairros_final_geojson.json', 'utf8'));

const code = `// GABINETE CENTRAL — MULTI-SCALE GIS ENGINE (BRASIL · ALAGOAS 102 MUNICÍPIOS · MACEIÓ 48 BAIRROS)

const GEO_DATA_BRASIL = ${JSON.stringify(brGeo)};
const GEO_DATA_ALAGOAS = ${JSON.stringify(alGeo)};
const GEO_DATA_MACEIO = ${JSON.stringify(mcGeo)};

const LEADS_DATA = [
  {
    id: 'lead-001',
    initials: 'HC',
    name: 'Dra. Helena Cavalcanti',
    role: 'Médica & Líder Comunitária',
    bairro: 'Farol',
    zona: '2ª Zona',
    categoria: 'Saúde',
    tagClass: 'health',
    capacidade: 450,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: 'Ontem · 16:30',
    phone: '(82) 99841-2044',
    history: [
      '24/08: Reunião presencial com o candidato no Farol. Entregou pauta de reivindicação para o Hospital 24h.',
      '18/08: Cadastrou 65 novos eleitores multiplicadores da área da saúde no comitê.',
      '10/08: Recebeu kit de propostas e adesivos para veículos.'
    ]
  },
  {
    id: 'lead-002',
    initials: 'BA',
    name: 'Roberto Alencar (Beto)',
    role: 'Pres. Assoc. Moradores Jacintinho',
    bairro: 'Jacintinho',
    zona: '54ª Zona',
    categoria: 'Comunitário',
    tagClass: 'comu',
    capacidade: 800,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: 'Hoje · 10:14',
    phone: '(82) 99122-8871',
    history: [
      'Hoje: Solicitou visita rápida do candidato ao novo calçadão antes do comício de sexta.',
      '22/08: Reuniu 40 lideranças de rua da Grota do Moreira para gravação de depoimentos.',
      '15/08: Mapeou 320 residências com compromisso de voto.'
    ]
  },
  {
    id: 'lead-003',
    initials: 'MA',
    name: 'Pastor Marcos Aurélio',
    role: 'Líder Eclesiástico & Social',
    bairro: 'Benedito Bentes',
    zona: '54ª Zona',
    categoria: 'Religioso',
    tagClass: 'rel',
    capacidade: 650,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: 'Hoje · 08:55',
    phone: '(82) 98834-5510',
    history: [
      'Hoje: Concluiu cadastro voluntário de 180 membros da comunidade na base própria.',
      '20/08: Participou do café com lideranças da Zona Norte.',
      '12/08: Agendou culto cívico com a presença do candidato.'
    ]
  },
  {
    id: 'lead-004',
    initials: 'CM',
    name: 'Claudio Mendonça',
    role: 'Dir. Associação Comercial do Centro',
    bairro: 'Centro',
    zona: '2ª Zona',
    categoria: 'Comércio',
    tagClass: 'comercio',
    capacidade: 520,
    status: 'Em Diálogo',
    statusTag: 'amber',
    statusLabel: 'Em Diálogo',
    lastContact: 'Hoje · 09:40',
    phone: '(82) 98103-9944',
    history: [
      'Hoje: Confirmou reunião com 45 lojistas do calçadão para sexta às 14h.',
      '23/08: Enviou pedido de esclarecimento sobre a alíquota municipal e segurança na Praça dos Palmares.'
    ]
  },
  {
    id: 'lead-005',
    initials: 'GF',
    name: 'Gabriel Fonseca (Biel)',
    role: 'Coord. Coletivo Universitário UFAL',
    bairro: 'Cidade Universitária',
    zona: '54ª Zona',
    categoria: 'Juventude',
    tagClass: 'youth',
    capacidade: 380,
    status: 'Multiplicador',
    statusTag: 'acid',
    statusLabel: 'Multiplicador Chave',
    lastContact: '25/08 · 19:10',
    phone: '(82) 99341-0022',
    history: [
      '25/08: Mobilizou 85 estudantes para panfletagem no campus.',
      '19/08: Gravou vídeo para redes sociais apoiando o passe livre universitário.'
    ]
  },
  {
    id: 'lead-006',
    initials: 'PD',
    name: 'Prof. Djalma Souza',
    role: 'Coord. Escolinha de Futebol Comunitária',
    bairro: 'Trapiche da Barra',
    zona: '2ª Zona',
    categoria: 'Esporte',
    tagClass: 'sport',
    capacidade: 420,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: '25/08 · 14:00',
    phone: '(82) 99655-7711',
    history: [
      '25/08: Agradeceu a inclusão da reforma do campo do Dique Estrada nas metas do mandato.',
      '17/08: Organizou reunião com 60 pais de alunos atletas.'
    ]
  },
  {
    id: 'lead-007',
    initials: 'SN',
    name: 'Severino Nascimento (Biu)',
    role: 'Pres. Clube de Mães do Vergel',
    bairro: 'Vergel do Lago',
    zona: '2ª Zona',
    categoria: 'Comunitário',
    tagClass: 'comu',
    capacidade: 550,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: 'Ontem · 11:20',
    phone: '(82) 98722-3344',
    history: [
      'Ontem: Recebeu 5.000 informativos para entrega nas margens da lagoa.',
      '21/08: Solicitou ampliação dos cursos profissionalizantes para mulheres.'
    ]
  },
  {
    id: 'lead-008',
    initials: 'AL',
    name: 'Ana Lúcia Vasconcelos',
    role: 'Líder dos Comerciantes da Orla',
    bairro: 'Pajuçara',
    zona: '2ª Zona',
    categoria: 'Comércio',
    tagClass: 'comercio',
    capacidade: 340,
    status: 'Em Diálogo',
    statusTag: 'amber',
    statusLabel: 'Em Diálogo',
    lastContact: '24/08 · 17:45',
    phone: '(82) 99911-4455',
    history: [
      '24/08: Reuniu artesãos e jangadeiros para discutir ordenamento da feirinha.'
    ]
  },
  {
    id: 'lead-009',
    initials: 'EM',
    name: 'Edvaldo Martins (Duda)',
    role: 'Líder dos Feirantes do Tabuleiro',
    bairro: 'Tabuleiro do Martins',
    zona: '3ª Zona',
    categoria: 'Comércio',
    tagClass: 'comercio',
    capacidade: 620,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: '23/08 · 08:30',
    phone: '(82) 99188-9900',
    history: [
      '23/08: Organizou café com feirantes da feirinha do Tabuleiro.'
    ]
  },
  {
    id: 'lead-010',
    initials: 'RL',
    name: 'Renata Lins',
    role: 'Coord. Coletivo Cultural da Orla',
    bairro: 'Ponta Verde',
    zona: '2ª Zona',
    categoria: 'Juventude',
    tagClass: 'youth',
    capacidade: 290,
    status: 'Multiplicador',
    statusTag: 'acid',
    statusLabel: 'Multiplicador Chave',
    lastContact: '22/08 · 20:00',
    phone: '(82) 99877-1234',
    history: [
      '22/08: Planejou o evento Domingo na Rua Aberta com apoio cultural da campanha.'
    ]
  },
  {
    id: 'lead-011',
    initials: 'JT',
    name: 'José Teles (Zito)',
    role: 'Agente Comunitário de Saúde',
    bairro: 'Clima Bom',
    zona: '3ª Zona',
    categoria: 'Saúde',
    tagClass: 'health',
    capacidade: 480,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: '21/08 · 15:10',
    phone: '(82) 98844-6677',
    history: [
      '21/08: Mapeou 190 famílias para recebimento do plano de saúde preventiva.'
    ]
  },
  {
    id: 'lead-012',
    initials: 'VO',
    name: 'Valmir Oliveira',
    role: 'Pres. Associação Amigos do Feitosa',
    bairro: 'Feitosa',
    zona: '54ª Zona',
    categoria: 'Comunitário',
    tagClass: 'comu',
    capacidade: 590,
    status: 'Firme',
    statusTag: 'green',
    statusLabel: 'Compromisso Firme',
    lastContact: '20/08 · 18:20',
    phone: '(82) 99311-2288',
    history: [
      '20/08: Reuniu moradores da Ladeira do Calmon para entrega de demandas de iluminação.'
    ]
  }
];

let map = null;
let currentLOD = 'maceio';

let layerGroupBrasil = null;
let layerGroupAlagoas = null;
let layerGroupMaceio = null;

let maceioGeoJsonLayer = null;
let activeHighlightLayer = null;
let activeMarker = null;

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupRoleModal();
  setupCRMTable();
  setupLeadModal();
  setupDemandaForm();
  setupLiveClock();
  initMultiScaleMap();
});

// 1. TABS MANAGEMENT
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const views = document.querySelectorAll('.tab-view');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      views.forEach(v => {
        if (v.id === 'view-' + targetTab) {
          v.hidden = false;
          v.classList.add('active');
        } else {
          v.hidden = true;
          v.classList.remove('active');
        }
      });

      if (targetTab === 'territorios' && map) {
        setTimeout(() => { map.invalidateSize(); }, 100);
      }
    });
  });
}

// 2. MULTI-SCALE LEVEL OF DETAIL (LOD) INITIALIZATION
function initMultiScaleMap() {
  const container = document.getElementById('maceio-leaflet-map');
  if (!container || typeof L === 'undefined') return;

  // Initialize Leaflet Map
  map = L.map('maceio-leaflet-map', {
    center: [-9.635, -35.735],
    zoom: 12,
    minZoom: 4,
    maxZoom: 16,
    zoomControl: true
  });

  // Base Dark Carto tile layer (Esri Canvas Dark Gray)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Cartografia de Precisão',
    maxZoom: 16
  }).addTo(map);

  layerGroupBrasil = L.layerGroup();
  layerGroupAlagoas = L.layerGroup();
  layerGroupMaceio = L.layerGroup();

  buildBrasilLayer();
  buildAlagoasLayer();
  buildMaceioLayer();

  // Setup LOD shortcut buttons
  const btnBr = document.getElementById('btn-lod-brasil');
  const btnAl = document.getElementById('btn-lod-alagoas');
  const btnMc = document.getElementById('btn-lod-maceio');

  btnBr?.addEventListener('click', () => { setMapLOD('brasil', true); });
  btnAl?.addEventListener('click', () => { setMapLOD('alagoas', true); });
  btnMc?.addEventListener('click', () => { setMapLOD('maceio', true); });

  // Google Maps Zoom-based LOD Algorithm
  map.on('zoomend', () => {
    const z = map.getZoom();
    if (z <= 5 && currentLOD !== 'brasil') {
      setMapLOD('brasil', false);
    } else if (z >= 6 && z <= 9 && currentLOD !== 'alagoas') {
      setMapLOD('alagoas', false);
    } else if (z >= 10 && currentLOD !== 'maceio') {
      setMapLOD('maceio', false);
    }
  });

  // Start in Maceió level with Benedito Bentes selected
  setMapLOD('maceio', false);
  setTimeout(() => {
    inspectMaceioBairro('Benedito Bentes', false);
  }, 200);
}

// 3. BUILD LAYERS FOR EACH HIERARCHICAL SCALE
function buildBrasilLayer() {
  L.geoJSON(GEO_DATA_BRASIL, {
    style: (feature) => {
      const isAL = feature.properties.sigla === 'AL';
      return {
        fillColor: isAL ? '#22c55e' : '#38bdf8',
        weight: isAL ? 2.5 : 1,
        opacity: 0.85,
        color: isAL ? '#e8ff68' : '#ffffff',
        fillOpacity: isAL ? 0.6 : 0.25
      };
    },
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindTooltip('<strong>' + p.name + ' (' + p.sigla + ')</strong><br>' + p.status + ' · ' + p.pct + '%', {
        className: 'custom-leaflet-tooltip-dark',
        sticky: true
      });

      layer.on('click', () => {
        if (p.sigla === 'AL') {
          setMapLOD('alagoas', true);
        } else {
          inspectBrasilUF(p);
        }
      });

      layer.on('mouseover', () => {
        layer.setStyle({ weight: 3, fillOpacity: 0.65, color: '#e8ff68' });
      });
      layer.on('mouseout', () => {
        const isAL = p.sigla === 'AL';
        layer.setStyle({
          weight: isAL ? 2.5 : 1,
          fillOpacity: isAL ? 0.6 : 0.25,
          color: isAL ? '#e8ff68' : '#ffffff'
        });
      });
    }
  }).addTo(layerGroupBrasil);
}

function buildAlagoasLayer() {
  L.geoJSON(GEO_DATA_ALAGOAS, {
    style: (feature) => {
      const p = feature.properties;
      const isCap = p.name === 'Maceió';
      const color = p.pct >= 80 ? '#22c55e' : (p.pct >= 70 ? '#eab308' : '#38bdf8');
      return {
        fillColor: color,
        weight: isCap ? 2.5 : 1.2,
        opacity: 0.85,
        color: isCap ? '#e8ff68' : '#ffffff',
        fillOpacity: isCap ? 0.65 : 0.35
      };
    },
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindTooltip('<strong>' + p.name + '</strong><br>' + p.status + ' · ' + p.pct + '% (' + p.mapeados + ' votos)', {
        className: 'custom-leaflet-tooltip-dark',
        sticky: true
      });

      layer.on('click', () => {
        if (p.name === 'Maceió') {
          setMapLOD('maceio', true);
        } else {
          inspectAlagoasMunicipio(p);
        }
      });

      layer.on('mouseover', () => {
        layer.setStyle({ weight: 3, fillOpacity: 0.7, color: '#e8ff68' });
      });
      layer.on('mouseout', () => {
        const isCap = p.name === 'Maceió';
        const color = p.pct >= 80 ? '#22c55e' : (p.pct >= 70 ? '#eab308' : '#38bdf8');
        layer.setStyle({
          fillColor: color,
          weight: isCap ? 2.5 : 1.2,
          fillOpacity: isCap ? 0.65 : 0.35,
          color: isCap ? '#e8ff68' : '#ffffff'
        });
      });
    }
  }).addTo(layerGroupAlagoas);
}

function buildMaceioLayer() {
  maceioGeoJsonLayer = L.geoJSON(GEO_DATA_MACEIO, {
    style: (feature) => {
      const p = feature.properties;
      return {
        fillColor: p.fillColor,
        weight: 1.5,
        opacity: 0.8,
        color: '#ffffff',
        fillOpacity: 0.35
      };
    },
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      
      // Crisp, non-intrusive tooltip that follows mouse (ZERO CLUTTER)
      layer.bindTooltip('<strong>' + p.name + '</strong><br>' + p.status + ' · ' + p.pct + '% (' + p.mapeados + ' votos)', {
        className: 'custom-leaflet-tooltip-dark',
        sticky: true
      });

      layer.on('click', () => {
        inspectMaceioBairro(p.name, true);
      });

      layer.on('mouseover', () => {
        if (activeHighlightLayer !== layer) {
          layer.setStyle({ weight: 2.5, fillOpacity: 0.6, color: '#e8ff68' });
        }
      });

      layer.on('mouseout', () => {
        if (activeHighlightLayer !== layer) {
          layer.setStyle({ weight: 1.5, fillOpacity: 0.35, color: '#ffffff' });
        }
      });
    }
  }).addTo(layerGroupMaceio);
}

// 4. LEVEL OF DETAIL (LOD) CONTROLLER
function setMapLOD(lod, animate = true) {
  currentLOD = lod;

  // Update switcher buttons
  document.querySelectorAll('.lod-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-lod-' + lod)?.classList.add('active');

  const indicator = document.getElementById('map-active-lod-indicator');
  const scopeTitle = document.getElementById('map-scope-header-title');

  if (lod === 'brasil') {
    if (map.hasLayer(layerGroupAlagoas)) map.removeLayer(layerGroupAlagoas);
    if (map.hasLayer(layerGroupMaceio)) map.removeLayer(layerGroupMaceio);
    if (!map.hasLayer(layerGroupBrasil)) map.addLayer(layerGroupBrasil);

    if (animate) map.flyTo([-14.235, -51.925], 4, { duration: 0.8 });
    if (indicator) indicator.textContent = '🛰️ Nível: Brasil (27 Estados)';
    if (scopeTitle) scopeTitle.textContent = 'Inteligência Geoespacial Nacional: 27 Estados do Brasil';
    renderDynamicListBrasil();
    inspectBrasilUF(GEO_DATA_BRASIL.features.find(f => f.properties.sigla === 'AL').properties);

  } else if (lod === 'alagoas') {
    if (map.hasLayer(layerGroupBrasil)) map.removeLayer(layerGroupBrasil);
    if (map.hasLayer(layerGroupMaceio)) map.removeLayer(layerGroupMaceio);
    if (!map.hasLayer(layerGroupAlagoas)) map.addLayer(layerGroupAlagoas);

    if (animate) map.flyTo([-9.571, -36.782], 8, { duration: 0.8 });
    if (indicator) indicator.textContent = '🛰️ Nível: Alagoas (102 Municípios)';
    if (scopeTitle) scopeTitle.textContent = 'Inteligência Territorial Estadual: 102 Municípios de Alagoas';
    renderDynamicListAlagoas();
    inspectAlagoasMunicipio(GEO_DATA_ALAGOAS.features.find(f => f.properties.name === 'Maceió').properties);

  } else if (lod === 'maceio') {
    if (map.hasLayer(layerGroupBrasil)) map.removeLayer(layerGroupBrasil);
    if (map.hasLayer(layerGroupAlagoas)) map.removeLayer(layerGroupAlagoas);
    if (!map.hasLayer(layerGroupMaceio)) map.addLayer(layerGroupMaceio);

    if (animate) map.flyTo([-9.635, -35.735], 12, { duration: 0.8 });
    if (indicator) indicator.textContent = '🛰️ Nível: Maceió (48 Bairros Oficiais)';
    if (scopeTitle) scopeTitle.textContent = 'Inteligência Territorial Urbana: Bairros de Maceió';
    renderDynamicListMaceio();
    inspectMaceioBairro('Benedito Bentes', false);
  }
}

// 5. DYNAMIC SIDEBAR LIST RENDERING
function renderDynamicListBrasil() {
  const list = document.getElementById('dynamic-geo-list');
  const title = document.getElementById('nav-list-header-title');
  const count = document.getElementById('nav-list-header-count');
  if (!list) return;

  if (title) title.textContent = 'ESTADOS DO BRASIL';
  if (count) count.textContent = '27 UFs';

  list.innerHTML = GEO_DATA_BRASIL.features.map(f => {
    const p = f.properties;
    const isAL = p.sigla === 'AL';
    const badgeClass = p.pct >= 75 ? 'green' : (p.pct >= 60 ? 'amber' : 'blue');
    return '<button type="button" class="bairro-item-row ' + (isAL ? 'active' : '') + '" data-uf="' + p.sigla + '"><div class="bir-info"><span class="bir-name">' + p.name + ' (' + p.sigla + ')</span><span class="bir-sub">' + p.status + ' · ' + p.meta + '</span></div><div class="bir-badge ' + badgeClass + '">' + p.pct + '%</div></button>';
  }).join('');

  list.querySelectorAll('.bairro-item-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const sigla = btn.getAttribute('data-uf');
      const feat = GEO_DATA_BRASIL.features.find(f => f.properties.sigla === sigla);
      if (feat) {
        list.querySelectorAll('.bairro-item-row').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (sigla === 'AL') {
          setMapLOD('alagoas', true);
        } else {
          inspectBrasilUF(feat.properties);
        }
      }
    });
  });
}

function renderDynamicListAlagoas() {
  const list = document.getElementById('dynamic-geo-list');
  const title = document.getElementById('nav-list-header-title');
  const count = document.getElementById('nav-list-header-count');
  if (!list) return;

  if (title) title.textContent = 'MUNICÍPIOS DE ALAGOAS';
  if (count) count.textContent = '102 Cidades';

  const sorted = [...GEO_DATA_ALAGOAS.features].sort((a, b) => {
    if (a.properties.name === 'Maceió') return -1;
    if (b.properties.name === 'Maceió') return 1;
    return a.properties.name.localeCompare(b.properties.name);
  });

  list.innerHTML = sorted.map(f => {
    const p = f.properties;
    const isCap = p.name === 'Maceió';
    const badgeClass = p.pct >= 80 ? 'green' : (p.pct >= 70 ? 'amber' : 'blue');
    return '<button type="button" class="bairro-item-row ' + (isCap ? 'active' : '') + '" data-muni="' + p.name + '"><div class="bir-info"><span class="bir-name">' + p.name + '</span><span class="bir-sub">' + p.status + ' · ' + p.mapeados + ' votos</span></div><div class="bir-badge ' + badgeClass + '">' + p.pct + '%</div></button>';
  }).join('');

  list.querySelectorAll('.bairro-item-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-muni');
      const feat = GEO_DATA_ALAGOAS.features.find(f => f.properties.name === name);
      if (feat) {
        list.querySelectorAll('.bairro-item-row').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (name === 'Maceió') {
          setMapLOD('maceio', true);
        } else {
          inspectAlagoasMunicipio(feat.properties);
        }
      }
    });
  });
}

function renderDynamicListMaceio() {
  const list = document.getElementById('dynamic-geo-list');
  const title = document.getElementById('nav-list-header-title');
  const count = document.getElementById('nav-list-header-count');
  if (!list) return;

  if (title) title.textContent = 'BAIRROS DE MACEIÓ';
  if (count) count.textContent = GEO_DATA_MACEIO.features.length + ' Bairros';

  const sorted = [...GEO_DATA_MACEIO.features].sort((a, b) => {
    if (a.properties.name === 'Benedito Bentes') return -1;
    if (b.properties.name === 'Benedito Bentes') return 1;
    return a.properties.name.localeCompare(b.properties.name);
  });

  list.innerHTML = sorted.map(f => {
    const p = f.properties;
    const isDef = p.name === 'Benedito Bentes';
    const badgeClass = p.pct >= 80 ? 'green' : (p.pct >= 70 ? 'amber' : 'blue');
    return '<button type="button" class="bairro-item-row ' + (isDef ? 'active' : '') + '" data-bairro="' + p.name + '"><div class="bir-info"><span class="bir-name">' + p.name + '</span><span class="bir-sub">' + p.mapeados + ' votos mapeados</span></div><div class="bir-badge ' + badgeClass + '">' + p.pct + '%</div></button>';
  }).join('');

  list.querySelectorAll('.bairro-item-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-bairro');
      list.querySelectorAll('.bairro-item-row').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      inspectMaceioBairro(name, true);
    });
  });
}

// 6. INSPECTORS FOR BRIEFING CARD
function inspectBrasilUF(p) {
  updateBriefingCard({
    kicker: 'FEDERAÇÃO NACIONAL · BRASIL',
    name: p.name + ' (' + p.sigla + ')',
    desc: 'Estado da Região ' + (p.sigla === 'AL' ? 'Nordeste (Base Central)' : 'Nacional'),
    badge: p.pct + '% Cobertura',
    meta: p.meta,
    mapeados: p.sigla === 'AL' ? '36.840' : 'Mapeamento Ativo',
    liderancas: p.lideres + ' delegados',
    densidade: p.status,
    pct: p.pct + '%',
    fillPct: p.pct + '%',
    fillColor: p.pct >= 70 ? '#22c55e' : '#38bdf8',
    lideres: [
      { avatar: p.sigla, name: 'Coordenação Estadual ' + p.sigla, desc: p.lideres + ' articuladores cadastrados' }
    ],
    pauta: '🇧🇷 <strong>Articulação Política Estadual:</strong> Diálogo com lideranças regionais e comitês partidários em ' + p.name + '.'
  });
}

function inspectAlagoasMunicipio(p) {
  updateBriefingCard({
    kicker: 'MUNICÍPIO DE ALAGOAS · 102 CIDADES',
    name: p.name,
    desc: p.isCapital ? 'Capital e Maior Colégio Eleitoral do Estado' : 'Cidade Estratégica do Interior de Alagoas',
    badge: p.pct + '% Batido',
    meta: p.meta,
    mapeados: p.mapeados,
    liderancas: p.lideres + ' ativas',
    densidade: p.status,
    pct: p.pct + '%',
    fillPct: p.pct + '%',
    fillColor: p.pct >= 80 ? '#22c55e' : (p.pct >= 70 ? '#eab308' : '#38bdf8'),
    lideres: [
      { avatar: p.name.slice(0, 2).toUpperCase(), name: 'Comitê Central de ' + p.name, desc: p.lideres + ' lideranças locais de campo' }
    ],
    pauta: '🏛️ <strong>Prioridade Municipal:</strong> Desenvolvimento econômico regional, saúde integrada e mobilização em ' + p.name + '.'
  });
}

function inspectMaceioBairro(name, fly = true) {
  const feat = GEO_DATA_MACEIO.features.find(f => f.properties.name === name);
  if (!feat) return;

  const p = feat.properties;

  // Reset existing highlight
  if (maceioGeoJsonLayer) {
    maceioGeoJsonLayer.eachLayer(layer => {
      if (layer.feature && layer.feature.properties.name === name) {
        if (activeHighlightLayer) {
          activeHighlightLayer.setStyle({ weight: 1.5, fillOpacity: 0.35, color: '#ffffff' });
        }
        activeHighlightLayer = layer;
        layer.setStyle({ weight: 3.5, fillOpacity: 0.65, color: '#e8ff68' });
        layer.bringToFront();
      }
    });
  }

  // Remove existing single active marker and place on selected
  if (activeMarker) {
    map.removeLayer(activeMarker);
    activeMarker = null;
  }

  if (p.center) {
    const singleIcon = L.divIcon({
      className: 'custom-leaflet-marker-wrap',
      html: '<div class="custom-leaflet-pin active"><strong>' + p.name + '</strong><small>' + p.pct + '% · ' + p.mapeados + ' votos</small></div>',
      iconSize: [120, 38],
      iconAnchor: [60, 19]
    });
    activeMarker = L.marker(p.center, { icon: singleIcon }).addTo(layerGroupMaceio);
    
    if (fly && map) {
      map.flyTo(p.center, 13.5, { duration: 0.6 });
    }
  }

  // Update Left sidebar active item
  document.querySelectorAll('.bairro-item-row').forEach(b => {
    if (b.getAttribute('data-bairro') === name) b.classList.add('active');
    else b.classList.remove('active');
  });

  // Specific contextual leaderships & demands
  let kicker = 'POLO URBANO · MACEIÓ';
  let desc = 'Área residencial e comercial estratégica';
  let lideres = [{ avatar: 'LC', name: 'Liderança Comunitária de ' + name, desc: p.lideres + ' multiplicadores locais' }];
  let pauta = '🛣️ <strong>Infraestrutura & Saúde:</strong> Demandas prioritárias de pavimentação, postos e iluminação em ' + name + '.';

  if (name === 'Benedito Bentes') {
    kicker = 'POLO ZONA NORTE · 54ª ZONA';
    desc = '64 Seções Eleitorais · Maior Colégio Eleitoral de Maceió';
    lideres = [
      { avatar: 'MA', name: 'Pastor Marcos Aurélio', desc: 'Líder Religioso & Social · ~650 votos sob influência' },
      { avatar: 'GF', name: 'Gabriel Fonseca (Biel)', desc: 'Coletivo Universitário UFAL · ~380 votos' }
    ];
    pauta = '🚌 <strong>Transporte Público & Linhas Noturnas:</strong> Moradores solicitam ampliação do quadro de horários no terminal integrado e iluminação LED na Rota do Mocambo.';
  } else if (name === 'Centro') {
    kicker = 'POLO COMERCIAL HISTÓRICO · 2ª ZONA';
    desc = '38 Seções Eleitorais · Coração Financeiro e Varejista';
    lideres = [{ avatar: 'CM', name: 'Claudio Mendonça', desc: 'Dir. Assoc. Comercial do Centro · ~520 votos' }];
    pauta = '🏪 <strong>Revitalização do Calçadão & Isenção:</strong> Segurança ostensiva na Praça dos Palmares e simplificação fiscal.';
  } else if (name === 'Farol') {
    kicker = 'POLO CENTRAL TRADICIONAL · 2ª ZONA';
    desc = '34 Seções Eleitorais · Centro Médico e Educacional';
    lideres = [{ avatar: 'HC', name: 'Dra. Helena Cavalcanti', desc: 'Médica & Líder Comunitária · ~450 votos' }];
    pauta = '🏥 <strong>Hospital Municipal & Especialidades:</strong> Apoio direto aos mutirões de cirurgias eletivas.';
  } else if (name === 'Jacintinho') {
    kicker = 'POLO POPULAR LESTE · 54ª ZONA';
    desc = '52 Seções Eleitorais · Maior Bairro da Região Leste';
    lideres = [{ avatar: 'BA', name: 'Roberto Alencar (Beto)', desc: 'Pres. Assoc. Moradores Jacintinho · ~800 votos' }];
    pauta = '⛰️ <strong>Contenção de Encostas & Posto 24h:</strong> Obras de contenção na Grota do Moreira e reforma emergencial do mini-pronto socorro.';
  } else if (name === 'Ponta Verde' || name === 'Pajuçara') {
    kicker = 'POLO ORLA MARÍTIMA · 2ª ZONA';
    desc = '42 Seções Eleitorais · Bairros Nobres e Setor Hoteleiro';
    lideres = [
      { avatar: 'AL', name: 'Ana Lúcia Vasconcelos', desc: 'Líder dos Comerciantes da Orla · ~340 votos' },
      { avatar: 'RL', name: 'Renata Lins', desc: 'Coletivo Cultural da Orla · ~290 votos' }
    ];
    pauta = '🏖️ <strong>Turismo, Orla Noturna & Cultura:</strong> Ordenamento dos ambulantes, segurança turística integrada e ciclofaixas.';
  } else if (name === 'Tabuleiro do Martins') {
    kicker = 'POLO COMERCIAL ALTO · 3ª ZONA';
    desc = '46 Seções Eleitorais · Grande Polo Comercial e de Serviços';
    lideres = [{ avatar: 'EM', name: 'Edvaldo Martins (Duda)', desc: 'Líder dos Feirantes do Tabuleiro · ~620 votos' }];
    pauta = '🏪 <strong>Estrutura da Feirinha & Drenagem:</strong> Cobertura do setor de hortifrúti e recapeamento asfáltico das vias de acesso.';
  }

  updateBriefingCard({
    kicker,
    name: p.name,
    desc,
    badge: p.pct + '% Batido',
    meta: p.meta + ' votos',
    mapeados: p.mapeados,
    liderancas: p.lideres + ' ativas',
    densidade: p.status,
    pct: p.pct + '%',
    fillPct: p.pct + '%',
    fillColor: p.fillColor,
    lideres,
    pauta
  });
}

function updateBriefingCard(info) {
  const kickerEl = document.getElementById('geo-kicker-zone');
  const nameEl = document.getElementById('geo-bairro-name');
  const descEl = document.getElementById('geo-bairro-desc');
  const badgeEl = document.getElementById('geo-bairro-badge');
  const metaEl = document.getElementById('geo-stat-meta');
  const mapEl = document.getElementById('geo-stat-mapeados');
  const lidEl = document.getElementById('geo-stat-liderancas');
  const denEl = document.getElementById('geo-stat-densidade');
  const pctEl = document.getElementById('geo-thermo-pct');
  const fillEl = document.getElementById('geo-thermo-fill');
  const pautaEl = document.getElementById('geo-pauta-text');
  const liderListEl = document.getElementById('geo-lider-list');

  if (kickerEl) kickerEl.textContent = info.kicker;
  if (nameEl) nameEl.textContent = info.name;
  if (descEl) descEl.textContent = info.desc;
  if (badgeEl) badgeEl.textContent = info.badge;
  if (metaEl) metaEl.textContent = info.meta;
  if (mapEl) mapEl.textContent = info.mapeados;
  if (lidEl) lidEl.textContent = info.liderancas;
  if (denEl) denEl.textContent = info.densidade;
  if (pctEl) pctEl.textContent = info.pct;
  if (fillEl) {
    fillEl.style.width = info.fillPct;
    fillEl.style.background = info.fillColor;
  }
  if (pautaEl) pautaEl.innerHTML = info.pauta;

  if (liderListEl) {
    liderListEl.innerHTML = info.lideres.map(l => {
      return '<div class="briefing-leader-item"><div class="bl-avatar">' + l.avatar + '</div><div class="bl-info"><strong>' + l.name + '</strong><small>' + l.desc + '</small></div><button type="button" class="btn-wa-ping" title="Falar no WhatsApp">💬</button></div>';
    }).join('');
  }
}

// 7. ROLE MODAL / LOGIN SIMULATION
function setupRoleModal() {
  const trigger = document.getElementById('user-badge-trigger');
  const modal = document.getElementById('role-modal');
  const closeBtn = document.getElementById('close-role-modal');
  const roleBtns = document.querySelectorAll('.role-option-btn');

  const userName = document.getElementById('current-user-name');
  const userRole = document.getElementById('current-user-role');
  const avatarDisplay = document.getElementById('avatar-display');

  if (trigger && modal) {
    trigger.addEventListener('click', () => { modal.hidden = false; });
    closeBtn.addEventListener('click', () => { modal.hidden = true; });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.hidden = true;
    });

    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const role = btn.getAttribute('data-role');
        const name = btn.getAttribute('data-name');
        const title = btn.getAttribute('data-title');

        userName.textContent = name;
        userRole.textContent = title;
        avatarDisplay.textContent = role.toUpperCase().slice(0, 3);

        modal.hidden = true;
      });
    });
  }

  const exportBtn = document.getElementById('btn-exportar');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      alert('📄 Relatório Estratégico Multi-Escala gerado com sucesso!\\n\\nDados consolidados de 27 Estados, 102 Municípios de Alagoas e todos os 48 bairros de Maceió.');
    });
  }
}

// 8. CRM TABLE RENDERING & FILTERS
function setupCRMTable() {
  const tbody = document.getElementById('crm-table-body');
  const searchInput = document.getElementById('crm-search-input');
  const filterBairro = document.getElementById('filter-bairro');
  const filterCategoria = document.getElementById('filter-categoria');
  const filterStatus = document.getElementById('filter-status');

  const countExibidos = document.getElementById('count-exibidos');
  const sumVotos = document.getElementById('sum-votos-filtrados');

  function render(data) {
    tbody.innerHTML = '';
    let totalVotos = 0;

    data.forEach(lead => {
      totalVotos += lead.capacidade;
      const tr = document.createElement('tr');
      tr.innerHTML = '<td><div class="contact-cell"><div class="contact-avatar">' + lead.initials + '</div><div class="contact-info"><strong>' + lead.name + '</strong><small>' + lead.role + '</small></div></div></td><td><strong>' + lead.bairro + '</strong><br><small class="text-muted">' + lead.zona + '</small></td><td><span class="tag-badge ' + lead.tagClass + '">' + lead.categoria + '</span></td><td><span class="votos-badge">~' + lead.capacidade + ' votos</span></td><td><span class="status-tag ' + lead.statusTag + '">' + lead.statusLabel + '</span></td><td><span>' + lead.lastContact + '</span></td><td><button type="button" class="btn-action-sm outline view-lead-btn" data-id="' + lead.id + '">Ver Ficha</button></td>';
      tbody.appendChild(tr);
    });

    if (countExibidos) countExibidos.textContent = data.length;
    if (sumVotos) sumVotos.textContent = '~' + totalVotos.toLocaleString('pt-BR') + ' votos';

    document.querySelectorAll('.view-lead-btn').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        openLeadModal(id);
      });
    });
  }

  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const bairro = filterBairro?.value || 'all';
    const categoria = filterCategoria?.value || 'all';
    const status = filterStatus?.value || 'all';

    const filtered = LEADS_DATA.filter(item => {
      const matchQuery = !query ||
        item.name.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.bairro.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.categoria.toLowerCase().includes(query);

      const matchBairro = bairro === 'all' || item.bairro.includes(bairro);
      const matchCat = categoria === 'all' || item.categoria.includes(categoria);
      const matchStatus = status === 'all' || item.status === status;

      return matchQuery && matchBairro && matchCat && matchStatus;
    });

    render(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  filterBairro?.addEventListener('change', applyFilters);
  filterCategoria?.addEventListener('change', applyFilters);
  filterStatus?.addEventListener('change', applyFilters);

  render(LEADS_DATA);
}

// 9. LEAD MODAL DETAILS
function openLeadModal(leadId) {
  const lead = LEADS_DATA.find(l => l.id === leadId);
  if (!lead) return;

  const modal = document.getElementById('lead-modal');
  document.getElementById('modal-lead-avatar').textContent = lead.initials;
  document.getElementById('modal-lead-name').textContent = lead.name;
  document.getElementById('modal-lead-title').textContent = lead.role + ' · ' + lead.bairro;
  document.getElementById('modal-lead-phone').textContent = lead.phone;
  document.getElementById('modal-lead-bairro').textContent = lead.bairro + ' · ' + lead.zona;
  document.getElementById('modal-lead-votos').textContent = '~' + lead.capacidade + ' votos';
  document.getElementById('modal-lead-status').textContent = lead.statusLabel;

  const histList = document.getElementById('modal-lead-history');
  histList.innerHTML = lead.history.map(h => '<li>' + h + '</li>').join('');

  if (modal) modal.hidden = false;
}

function setupLeadModal() {
  const modal = document.getElementById('lead-modal');
  const closeBtn = document.getElementById('close-lead-modal');
  const fecharBtn = document.getElementById('btn-lead-fechar');
  const waBtn = document.getElementById('btn-lead-whatsapp');

  if (modal) {
    closeBtn?.addEventListener('click', () => { modal.hidden = true; });
    fecharBtn?.addEventListener('click', () => { modal.hidden = true; });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.hidden = true;
    });
    waBtn?.addEventListener('click', () => {
      const phone = document.getElementById('modal-lead-phone').textContent;
      alert('Iniciando canal de WhatsApp Oficial com ' + phone + '...\\n(Histórico de diálogo registrado na coordenação).');
    });
  }
}

// 10. DEMANDA FORM
function setupDemandaForm() {
  const openDemandaBtn = document.getElementById('btn-abrir-form-demanda');
  if (openDemandaBtn) {
    openDemandaBtn.addEventListener('click', () => {
      const assunto = prompt('Título / Resumo da nova demanda de campo:');
      if (assunto && assunto.trim()) {
        alert('✅ Demanda "' + assunto.trim() + '" registrada e encaminhada para a triagem da equipe técnica com prazo de 24h.');
      }
    });
  }
}

// 11. LIVE CLOCK
function setupLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    clockEl.textContent = 'Ao Vivo · ' + timeStr;
  }

  update();
  setInterval(update, 1000);
}
`;

fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/painel.js', code);
console.log('Master painel.js compiled successfully with 48 official Maceió bairros and Zero-Clutter architecture!');
