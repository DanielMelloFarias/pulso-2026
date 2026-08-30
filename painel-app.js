"use strict";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const icon = (name, className) => '<svg' + (className ? ' class="' + className + '"' : '') + ' aria-hidden="true"><use href="#p-i-' + name + '"></use></svg>';

const PROFILE_DATA = {
  governador: {
    label: "Governador",
    topbar: "Visão do Governador",
    kicker: "Comando estadual",
    title: "Alagoas em uma única leitura.",
    summary: "Acompanhe o ritmo da operação, encontre exceções e transforme sinais do território em ação coordenada.",
    priorityTitle: "União dos Palmares",
    priorityCopy: "Queda de atividade e tarefas acumuladas.",
    sidebarInsight: "Quatro municípios prioritários pedem acompanhamento.",
    defaultTerritory: "União dos Palmares",
    defaultLayer: "atencao",
    layers: [
      { id: "ritmo", label: "Ritmo", legend: [["high", "Ritmo alto"], ["mid", "Ritmo regular"], ["low", "Abaixo do esperado"]] },
      { id: "atencao", label: "Atenção", legend: [["high", "Sem alerta"], ["mid", "Acompanhar"], ["low", "Ação prioritária"]] },
      { id: "eventos", label: "Eventos", legend: [["high", "Agenda confirmada"], ["mid", "Em preparação"], ["low", "Com pendência"]] }
    ],
    kpis: [
      { icon: "users", label: "Integrantes ativos", value: "163", note: "em 28 municípios", tone: "success" },
      { icon: "user-plus", label: "Registros qualificados", value: "743", note: "+18% sobre a média diária", tone: "" },
      { icon: "activity", label: "Ações no território", value: "214", note: "11 eventos concluídos", tone: "" },
      { icon: "clock", label: "Pendências críticas", value: "23", note: "3 responsáveis concentram 61%", tone: "attention" }
    ],
    metricLabels: ["Equipes cadastradas", "Ativas hoje", "Demandas abertas", "Tarefas vencidas"],
    performanceKicker: "Leitura regional",
    performanceTitle: "Ritmo por região",
    performance: [
      { name: "Metropolitana", note: "41% da atividade do dia", score: 93, delta: "+12%", tone: "success" },
      { name: "Agreste", note: "Arapiraca lidera o avanço", score: 87, delta: "+31%", tone: "success" },
      { name: "Sertão", note: "Duas agendas em preparação", score: 72, delta: "−8%", tone: "regular" },
      { name: "Zona da Mata", note: "Quatro municípios em atenção", score: 64, delta: "−19%", tone: "attention" }
    ],
    tasks: [
      { icon: "warning", title: "Revisar coordenação em União", detail: "Coordenação territorial · amanhã, 10h", due: "Prioridade alta", tone: "alert" },
      { icon: "file", title: "Validar documentos da carreata", detail: "Jurídico · hoje, 17h", due: "2 pendências", tone: "alert" },
      { icon: "check", title: "Consolidar briefing do Agreste", detail: "Inteligência · amanhã, 8h", due: "No prazo", tone: "success" }
    ],
    agendaTitle: "Amanhã · 7 eventos",
    agenda: [
      { time: "09:00", title: "Reunião de coordenação", detail: "Arapiraca · equipe confirmada", status: "Pronto", tone: "success" },
      { time: "14:00", title: "Carreata Maceió", detail: "Assinatura e protocolo em acompanhamento", status: "2 pendências", tone: "alert" },
      { time: "17:30", title: "Encontro regional", detail: "Palmeira dos Índios · 8 equipes", status: "Preparação", tone: "neutral" }
    ],
    routeKicker: "Coordenação",
    routeTitle: "Janela de decisão",
    route: {
      stops: [
        ["Antes das 10h", "Alinhar União dos Palmares com a coordenação territorial"],
        ["Até 12h", "Confirmar responsáveis dos dois eventos com pendência"],
        ["Fim do dia", "Revisar retomada nos municípios sem atividade recente"]
      ],
      note: "A ordem prioriza impacto territorial, prazo e concentração de pendências."
    },
    demandTitle: "Radar temático",
    demands: [["Saúde", 31], ["Infraestrutura", 26], ["Emprego", 18], ["Transporte", 11]],
    networkKicker: "Estrutura operacional",
    networkTitle: "Rede em movimento",
    network: [
      { avatar: "MC", name: "Metropolitana", detail: "62 responsáveis com atividade", value: "+18%" },
      { avatar: "AG", name: "Agreste", detail: "41 responsáveis com atividade", value: "+31%" },
      { avatar: "ZM", name: "Zona da Mata", detail: "19 responsáveis com atividade", value: "−19%" }
    ],
    decisionTitle: "Comece pelas exceções.",
    decisionCopy: "Quatro municípios concentram a principal redução de atividade. Um contato objetivo pode destravar o dia.",
    territories: {
      "União dos Palmares": {
        state: "attention", delta: "−38%", deltaText: "de atividade nos últimos quatro dias", metrics: ["7", "2", "18", "9"],
        insight: "A queda coincide com menos integrantes ativos e tarefas concentradas sob a mesma coordenação.",
        signals: "atividades, tarefas e acessos · últimos 4 dias", levels: { ritmo: "low", atencao: "low", eventos: "mid" }
      },
      "Maceió": {
        state: "stable", delta: "+8%", deltaText: "de atividade, dentro do ritmo esperado", metrics: ["34", "29", "63", "7"],
        insight: "A capital mantém volume alto; as pendências estão concentradas em duas agendas de amanhã.",
        signals: "atividades, eventos e tarefas · hoje", levels: { ritmo: "high", atencao: "mid", eventos: "low" }
      },
      "Arapiraca": {
        state: "success", delta: "+31%", deltaText: "de crescimento operacional nesta semana", metrics: ["21", "19", "27", "2"],
        insight: "A distribuição de ações entre mais responsáveis sustenta o avanço e reduz concentração.",
        signals: "atividades e responsáveis · últimos 7 dias", levels: { ritmo: "high", atencao: "high", eventos: "high" }
      },
      "Palmeira dos Índios": {
        state: "success", delta: "+24%", deltaText: "de crescimento operacional nesta semana", metrics: ["8", "7", "15", "1"],
        insight: "A sequência de agendas locais ampliou atividade sem acumular retornos críticos.",
        signals: "agenda, atividades e tarefas · últimos 7 dias", levels: { ritmo: "high", atencao: "high", eventos: "high" }
      },
      "Penedo": {
        state: "success", delta: "+19%", deltaText: "de atividade em relação à média", metrics: ["6", "5", "11", "2"],
        insight: "Duas agendas recentes geraram continuidade de campo e novas tarefas dentro do prazo.",
        signals: "eventos, atividades e tarefas · últimos 7 dias", levels: { ritmo: "high", atencao: "high", eventos: "mid" }
      },
      "Delmiro Gouveia": {
        state: "attention", delta: "−16%", deltaText: "de atividade desde a última agenda", metrics: ["5", "2", "9", "6"],
        insight: "A redução está ligada à pausa de duas equipes e a retornos ainda sem responsável definido.",
        signals: "equipes, tarefas e agenda · últimos 5 dias", levels: { ritmo: "low", atencao: "low", eventos: "quiet" }
      }
    },
    commands: [
      {
        prompt: "Quais municípios precisam de atenção?",
        title: "Quatro territórios pedem acompanhamento.",
        answer: "União dos Palmares concentra o maior desvio: atividade caiu 38%, apenas duas das sete equipes atuaram hoje e nove tarefas estão vencidas. Delmiro Gouveia, Rio Largo e Santana do Ipanema completam a lista de atenção.",
        evidence: ["Atividade por município", "Tarefas por responsável", "Último registro de equipe"],
        action: { name: "Revisar operação em União dos Palmares", territory: "União dos Palmares", owner: "Coordenação territorial", due: "Amanhã, 10h" }
      },
      {
        prompt: "Quais eventos têm pendências?",
        title: "Dois eventos exigem decisão antes do meio-dia.",
        answer: "A carreata de Maceió ainda reúne duas pendências documentais. O encontro em São Miguel dos Campos aguarda definição do responsável operacional.",
        evidence: ["Checklists de evento", "Tarefas com prazo", "Responsáveis definidos"],
        action: { name: "Concluir pendências dos eventos de amanhã", territory: "Maceió", owner: "Operação", due: "Hoje, 17h" }
      },
      {
        prompt: "Onde a atividade mais cresceu?",
        title: "O Agreste lidera o crescimento.",
        answer: "Arapiraca avançou 31%, seguida por Palmeira dos Índios com 24% e Penedo com 19%. O ganho coincide com mais responsáveis ativos e continuidade após eventos.",
        evidence: ["Ações registradas", "Responsáveis ativos", "Continuidade pós-evento"]
      },
      {
        prompt: "O que precisa da minha atenção amanhã?",
        title: "Três decisões organizam a manhã.",
        answer: "Antes das 10h, alinhe União dos Palmares. Até o meio-dia, defina os responsáveis de dois eventos. Ao fim do dia, verifique a retomada dos municípios sem atividade recente.",
        evidence: ["Prioridades territoriais", "Agenda executiva", "Pendências críticas"],
        action: { name: "Conduzir alinhamento executivo da manhã", territory: "União dos Palmares", owner: "Coordenação estadual", due: "Amanhã, 9h30" }
      }
    ]
  },

  deputado: {
    label: "Deputado Estadual",
    topbar: "Visão do Deputado Estadual",
    kicker: "Base territorial",
    title: "Sua rede, território por território.",
    summary: "Veja onde a presença cresce, quais relações pedem retorno e como a agenda se conecta às demandas da base.",
    priorityTitle: "Retornos em Maceió",
    priorityCopy: "Doze contatos aguardam encaminhamento.",
    sidebarInsight: "Doze retornos em Maceió concentram a atenção de hoje.",
    defaultTerritory: "Maceió",
    defaultLayer: "pendencias",
    layers: [
      { id: "presenca", label: "Presença", legend: [["high", "Presença alta"], ["mid", "Presença regular"], ["low", "Presença reduzida"]] },
      { id: "relacoes", label: "Relações", legend: [["high", "Rede ativa"], ["mid", "Rede em formação"], ["low", "Pouca continuidade"]] },
      { id: "pendencias", label: "Pendências", legend: [["high", "Em dia"], ["mid", "Acompanhar"], ["low", "Retorno vencido"]] }
    ],
    kpis: [
      { icon: "users", label: "Pessoas com comunicação autorizada", value: "11.842", note: "+426 nesta semana", tone: "success" },
      { icon: "network", label: "Lideranças ativas", value: "384", note: "71 com atividade hoje", tone: "" },
      { icon: "map", label: "Territórios priorizados", value: "26", note: "9 com agenda nos próximos 7 dias", tone: "" },
      { icon: "clock", label: "Retornos pendentes", value: "17", note: "12 concentrados em Maceió", tone: "attention" }
    ],
    metricLabels: ["Pessoas com opt-in", "Lideranças ativas", "Ações em 7 dias", "Retornos pendentes"],
    performanceKicker: "Base por território",
    performanceTitle: "Presença e continuidade",
    performance: [
      { name: "Maceió", note: "12 retornos em acompanhamento", score: 91, delta: "+12%", tone: "success" },
      { name: "Arapiraca", note: "64 lideranças ativas", score: 84, delta: "+18%", tone: "success" },
      { name: "Palmeira dos Índios", note: "Agenda distribuída", score: 76, delta: "+9%", tone: "regular" },
      { name: "Penedo", note: "Ritmo estável", score: 69, delta: "+3%", tone: "regular" }
    ],
    tasks: [
      { icon: "message", title: "Responder demandas de Maceió", detail: "Relacionamento · amanhã, 11h", due: "12 retornos", tone: "alert" },
      { icon: "route", title: "Confirmar rota territorial", detail: "Operação · hoje, 18h", due: "3 municípios", tone: "" },
      { icon: "check", title: "Revisar agenda de lideranças", detail: "Coordenação territorial · amanhã, 9h", due: "No prazo", tone: "success" }
    ],
    agendaTitle: "Próximos 3 compromissos",
    agenda: [
      { time: "08:30", title: "Café com lideranças", detail: "Tabuleiro do Martins · 18 confirmações", status: "Pronto", tone: "success" },
      { time: "13:00", title: "Rota comunitária", detail: "Rio Largo e Pilar · logística em revisão", status: "Acompanhar", tone: "neutral" },
      { time: "18:30", title: "Escuta temática", detail: "Arapiraca · saúde e infraestrutura", status: "Confirmado", tone: "success" }
    ],
    routeKicker: "Rota territorial",
    routeTitle: "Presença com continuidade",
    route: {
      stops: [
        ["Maceió", "Responder demandas e alinhar lideranças locais"],
        ["Rio Largo", "Retomar três relacionamentos sem atividade recente"],
        ["Pilar", "Conectar a agenda às demandas de infraestrutura"]
      ],
      note: "A rota combina proximidade geográfica, retornos pendentes e agendas já confirmadas."
    },
    demandTitle: "Pautas da base",
    demands: [["Saúde", 34], ["Infraestrutura", 28], ["Educação", 17], ["Emprego", 12]],
    networkKicker: "Relacionamento territorial",
    networkTitle: "Lideranças para acompanhar",
    network: [
      { avatar: "JS", name: "José S.", detail: "União dos Palmares · 3 retornos", value: "Hoje" },
      { avatar: "AC", name: "Ana C.", detail: "Maceió · agenda confirmada", value: "+7 ações" },
      { avatar: "MF", name: "Marcos F.", detail: "Arapiraca · demanda encaminhada", value: "No prazo" }
    ],
    decisionTitle: "Transforme presença em continuidade.",
    decisionCopy: "Responder os doze retornos de Maceió antes da próxima rota reduz perda de contexto e fortalece a rede local.",
    territories: {
      "Maceió": {
        state: "attention", delta: "+12%", deltaText: "de crescimento da base nesta semana", metrics: ["4.286", "121", "14", "12"],
        insight: "A presença cresce, mas doze retornos estão concentrados em três bairros antes da próxima agenda.",
        signals: "relacionamentos, demandas e agenda · últimos 7 dias", levels: { presenca: "high", relacoes: "high", pendencias: "low" }
      },
      "Arapiraca": {
        state: "success", delta: "+18%", deltaText: "de atividade da rede nesta semana", metrics: ["1.946", "64", "9", "4"],
        insight: "As lideranças mantêm continuidade depois das agendas e os retornos estão distribuídos entre responsáveis.",
        signals: "relacionamentos, agenda e tarefas · últimos 7 dias", levels: { presenca: "high", relacoes: "high", pendencias: "mid" }
      },
      "Palmeira dos Índios": {
        state: "stable", delta: "+9%", deltaText: "de atividade da base nesta semana", metrics: ["1.124", "41", "7", "1"],
        insight: "A agenda está bem distribuída e há apenas um retorno aguardando encaminhamento.",
        signals: "agenda, relacionamentos e tarefas · últimos 7 dias", levels: { presenca: "mid", relacoes: "high", pendencias: "high" }
      },
      "Penedo": {
        state: "stable", delta: "+3%", deltaText: "de atividade, dentro do ritmo esperado", metrics: ["876", "33", "5", "0"],
        insight: "O território mantém ritmo estável e não apresenta retornos vencidos nesta leitura.",
        signals: "relacionamentos e tarefas · últimos 7 dias", levels: { presenca: "mid", relacoes: "mid", pendencias: "high" }
      },
      "Rio Largo": {
        state: "attention", delta: "−11%", deltaText: "de atividade desde a última agenda", metrics: ["648", "22", "3", "6"],
        insight: "Três relações relevantes perderam continuidade e seis retornos ainda não têm encaminhamento.",
        signals: "relacionamentos, tarefas e agenda · últimos 5 dias", levels: { presenca: "mid", relacoes: "low", pendencias: "low" }
      },
      "Pilar": {
        state: "stable", delta: "+6%", deltaText: "de atividade na última semana", metrics: ["512", "18", "4", "2"],
        insight: "A pauta de infraestrutura ganhou volume e pode orientar a próxima escuta territorial.",
        signals: "demandas, agenda e relacionamentos · últimos 7 dias", levels: { presenca: "mid", relacoes: "mid", pendencias: "mid" }
      }
    },
    commands: [
      {
        prompt: "Quais lideranças precisam de retorno?",
        title: "Cinco relações pedem continuidade.",
        answer: "José S. reúne três retornos em União dos Palmares. Em Maceió, duas lideranças aguardam encaminhamento antes da agenda no Tabuleiro do Martins.",
        evidence: ["Histórico de relacionamento", "Demandas sem retorno", "Próximas agendas"],
        action: { name: "Organizar retornos das lideranças prioritárias", territory: "Maceió", owner: "Relacionamento", due: "Amanhã, 11h" }
      },
      {
        prompt: "Onde minha base mais cresceu?",
        title: "Arapiraca lidera a atividade da rede.",
        answer: "Arapiraca avançou 18% nesta semana. Maceió cresceu 12%, com maior volume no Tabuleiro do Martins e no Jacintinho. Palmeira dos Índios mantém evolução de 9%.",
        evidence: ["Novos relacionamentos", "Lideranças com atividade", "Continuidade após agenda"]
      },
      {
        prompt: "Quais demandas aumentaram?",
        title: "Saúde e infraestrutura concentram a escuta.",
        answer: "Saúde representa 34% das demandas registradas e infraestrutura, 28%. O aumento recente está concentrado em Maceió, Pilar e Arapiraca.",
        evidence: ["Demandas por tema", "Distribuição territorial", "Variação dos últimos 7 dias"],
        action: { name: "Preparar síntese das demandas prioritárias", territory: "Pilar", owner: "Coordenação territorial", due: "Amanhã, 14h" }
      },
      {
        prompt: "Como organizar minha rota de amanhã?",
        title: "Uma rota curta resolve três prioridades.",
        answer: "Comece em Maceió pelos retornos pendentes, siga para Rio Largo para retomar três relacionamentos e encerre em Pilar conectando a agenda às demandas de infraestrutura.",
        evidence: ["Distância entre agendas", "Retornos pendentes", "Demandas prioritárias"],
        action: { name: "Confirmar rota Maceió, Rio Largo e Pilar", territory: "Maceió", owner: "Operação", due: "Hoje, 18h" }
      }
    ]
  }
};

const SVG_NS = "http://www.w3.org/2000/svg";
const MAP_FRAME = { width: 1000, height: 620, padding: 34 };
const state = {
  role: "governador",
  layer: "atencao",
  territory: "União dos Palmares",
  mapReady: false,
  mapData: null,
  mapSvg: null,
  mapFeatures: new Map(),
  viewBox: { x: 0, y: 0, width: MAP_FRAME.width, height: MAP_FRAME.height },
  createdActions: { governador: [], deputado: [] },
  toastTimer: null
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
}

function normalizeText(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function hashText(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  return Math.abs(hash);
}

function profile() {
  return PROFILE_DATA[state.role];
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function renderKpis() {
  const container = $("#kpi-grid");
  if (!container) return;
  container.innerHTML = profile().kpis.map(function (item) {
    return '<article class="kpi-card ' + escapeHtml(item.tone) + '"><span class="kpi-icon">' + icon(item.icon) + '</span><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + '</strong><small>' + escapeHtml(item.note) + '</small></article>';
  }).join("");
}

function renderPerformance() {
  const data = profile();
  setText("#performance-kicker", data.performanceKicker);
  setText("#performance-title", data.performanceTitle);
  $("#performance-list").innerHTML = data.performance.map(function (item) {
    return '<div class="performance-row ' + escapeHtml(item.tone) + '"><div><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.note) + '</small></div><span class="progress-track" aria-label="Índice ' + item.score + ' de 100"><i style="--progress:' + item.score + '%"></i></span><span class="performance-value">' + escapeHtml(item.delta) + '</span></div>';
  }).join("");
}

function renderTasks() {
  const items = state.createdActions[state.role].concat(profile().tasks);
  $("#task-list").innerHTML = items.map(function (item) {
    const created = item.created ? " created" : "";
    return '<div class="task-item' + created + '"><span class="task-status ' + escapeHtml(item.tone || "") + '">' + icon(item.icon || "check") + '</span><div><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.detail) + '</small></div><span class="task-due">' + escapeHtml(item.due) + '</span></div>';
  }).join("");
}

function renderAgenda() {
  const data = profile();
  setText("#agenda-title", data.agendaTitle);
  $("#agenda-list").innerHTML = data.agenda.map(function (item) {
    return '<div class="agenda-item"><span class="agenda-time">' + escapeHtml(item.time) + '</span><div><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.detail) + '</small></div><span class="status-pill ' + escapeHtml(item.tone) + '"><i></i>' + escapeHtml(item.status) + '</span></div>';
  }).join("");
}

function renderRoute() {
  const data = profile();
  setText("#route-kicker", data.routeKicker);
  setText("#route-title", data.routeTitle);
  $("#route-content").innerHTML = '<div class="route-path">' + data.route.stops.map(function (stop) {
    return '<div class="route-stop"><strong>' + escapeHtml(stop[0]) + '</strong><small>' + escapeHtml(stop[1]) + '</small></div>';
  }).join("") + '</div><div class="route-note">' + escapeHtml(data.route.note) + '</div>';
}

function renderDemands() {
  const data = profile();
  setText("#demand-title", data.demandTitle);
  $("#demand-bars").innerHTML = data.demands.map(function (item) {
    return '<div class="demand-row"><span>' + escapeHtml(item[0]) + '</span><span class="demand-track"><i style="--value:' + item[1] + '%"></i></span><strong>' + item[1] + '%</strong></div>';
  }).join("");
}

function renderNetwork() {
  const data = profile();
  setText("#network-kicker", data.networkKicker);
  setText("#network-title", data.networkTitle);
  $("#network-list").innerHTML = data.network.map(function (item) {
    return '<div class="network-item"><span class="network-avatar">' + escapeHtml(item.avatar) + '</span><div><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.detail) + '</small></div><span class="network-value">' + escapeHtml(item.value) + '</span></div>';
  }).join("");
}

function renderPrompts() {
  $("#prompt-list").innerHTML = profile().commands.map(function (command, index) {
    return '<button type="button" data-prompt-index="' + index + '">' + escapeHtml(command.prompt) + '</button>';
  }).join("");
  $("#command-result").innerHTML = '<div class="result-empty">' + icon("message") + '<p>Escolha uma pergunta ou escreva com suas palavras.</p></div>';
}

function renderRole(announce) {
  const data = profile();
  state.layer = data.defaultLayer;
  state.territory = data.defaultTerritory;
  document.documentElement.dataset.profile = state.role;
  document.title = "PULSO — " + data.topbar;
  setText("#topbar-role", data.topbar);
  setText("#intro-kicker", data.kicker);
  setText("#dashboard-title", data.title);
  setText("#dashboard-summary", data.summary);
  setText("#priority-title", data.priorityTitle);
  setText("#priority-copy", data.priorityCopy);
  setText("#sidebar-insight", data.sidebarInsight);
  setText("#decision-title", data.decisionTitle);
  setText("#decision-copy", data.decisionCopy);

  $$('[data-role]').forEach(function (button) {
    const active = button.dataset.role === state.role;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderKpis();
  renderPerformance();
  renderTasks();
  renderAgenda();
  renderRoute();
  renderDemands();
  renderNetwork();
  renderPrompts();
  renderLayerSwitch();

  if (state.mapReady) {
    setMapViewBox({ x: 0, y: 0, width: MAP_FRAME.width, height: MAP_FRAME.height });
    selectTerritory(data.defaultTerritory, false);
    paintMap();
  } else {
    renderTerritory(data.defaultTerritory, {});
  }

  try {
    localStorage.setItem("pulso-executive-profile", state.role);
  } catch (error) {
    void error;
  }
  const url = new URL(window.location.href);
  url.searchParams.set("perfil", state.role === "governador" ? "governador" : "deputado-estadual");
  history.replaceState(null, "", url.pathname + url.search + url.hash);
  if (announce) setText("#profile-announcer", "Visão alterada para " + data.label + ".");
}

function renderLayerSwitch() {
  const data = profile();
  $("#layer-switch").innerHTML = data.layers.map(function (layer) {
    const active = layer.id === state.layer;
    return '<button type="button" class="' + (active ? "active" : "") + '" data-layer="' + escapeHtml(layer.id) + '" aria-pressed="' + String(active) + '">' + escapeHtml(layer.label) + '</button>';
  }).join("");
  const activeLayer = data.layers.find(function (layer) { return layer.id === state.layer; }) || data.layers[0];
  $("#map-legend").innerHTML = activeLayer.legend.map(function (item) {
    return '<span><i class="' + escapeHtml(item[0]) + '"></i>' + escapeHtml(item[1]) + '</span>';
  }).join("") + '<small>Visão agregada · sem endereços individuais</small>';
}

function territoryLevel(name) {
  const configured = profile().territories[name];
  if (configured && configured.levels[state.layer]) return configured.levels[state.layer];
  const seed = hashText(name + state.role + state.layer) % 100;
  if (["atencao", "pendencias"].includes(state.layer)) {
    if (seed < 12) return "low";
    if (seed < 34) return "mid";
    return "quiet";
  }
  if (state.layer === "eventos") {
    if (seed < 8) return "low";
    if (seed < 23) return "mid";
    if (seed < 38) return "high";
    return "quiet";
  }
  if (seed > 72) return "high";
  if (seed > 36) return "mid";
  if (seed > 18) return "low";
  return "quiet";
}

function genericTerritory(name) {
  const seed = hashText(name + state.role);
  const level = territoryLevel(name);
  const attention = level === "low";
  const positive = level === "high";
  if (state.role === "governador") {
    const teams = 3 + (seed % 9);
    return {
      state: attention ? "attention" : positive ? "success" : "stable",
      delta: attention ? "−12%" : positive ? "+14%" : "+5%",
      deltaText: attention ? "de atividade em relação à média" : "de atividade no período",
      metrics: [String(teams), String(Math.max(1, teams - (attention ? 3 : 1))), String(5 + (seed % 19)), String(attention ? 4 + (seed % 5) : seed % 4)],
      insight: attention ? "O território apresenta redução de atividade e tarefas acumuladas; vale revisar responsáveis e agenda." : "O território mantém distribuição regular de atividades, responsáveis e prazos.",
      signals: "atividades, tarefas e acessos · últimos 7 dias"
    };
  }
  const people = 240 + (seed % 730);
  const leaders = 9 + (seed % 27);
  return {
    state: attention ? "attention" : positive ? "success" : "stable",
    delta: attention ? "−8%" : positive ? "+11%" : "+4%",
    deltaText: attention ? "de atividade desde a última agenda" : "de atividade da rede no período",
    metrics: [people.toLocaleString("pt-BR"), String(leaders), String(2 + (seed % 7)), String(attention ? 4 + (seed % 4) : seed % 3)],
    insight: attention ? "O território pede retomada de relacionamento e definição de responsáveis para os retornos em aberto." : "A rede mantém continuidade entre agenda, demandas e retornos.",
    signals: "relacionamentos, demandas e agenda · últimos 7 dias"
  };
}

function renderTerritory(name) {
  const data = profile();
  const territory = data.territories[name] || genericTerritory(name);
  const status = $("#territory-status");
  const statusData = territory.state === "attention" ? ["alert", "Atenção"] : territory.state === "success" ? ["success", "Destaque"] : ["neutral", "Estável"];
  status.className = "status-pill " + statusData[0];
  status.innerHTML = "<i></i>" + statusData[1];
  const metricHtml = data.metricLabels.map(function (label, index) {
    return "<div><dt>" + escapeHtml(label) + "</dt><dd>" + escapeHtml(territory.metrics[index]) + "</dd></div>";
  }).join("");
  const positive = territory.delta.indexOf("+") === 0;
  $("#territory-briefing").innerHTML = '<h3 class="territory-name">' + escapeHtml(name) + '</h3><p class="territory-delta ' + (positive ? "positive" : "") + '"><strong>' + escapeHtml(territory.delta) + '</strong> ' + escapeHtml(territory.deltaText) + '</p><dl class="territory-metrics">' + metricHtml + '</dl><div class="evidence-box"><span>' + icon("spark") + ' Leitura PULSO</span><p>' + escapeHtml(territory.insight) + '</p><small>Sinais considerados: ' + escapeHtml(territory.signals) + '</small></div><button class="button primary briefing-action" type="button" data-brief-action>' + (territory.state === "attention" ? "Criar ação corretiva" : "Criar acompanhamento") + icon("arrow") + "</button>";
}

function coordinatePairs(geometry) {
  const pairs = [];
  function walk(node) {
    if (!Array.isArray(node)) return;
    if (typeof node[0] === "number" && typeof node[1] === "number") {
      pairs.push(node);
      return;
    }
    node.forEach(walk);
  }
  walk(geometry && geometry.coordinates);
  return pairs;
}

function createProjection(data) {
  const pairs = data.features.flatMap(function (feature) { return coordinatePairs(feature.geometry); });
  const longitudes = pairs.map(function (pair) { return pair[0]; });
  const latitudes = pairs.map(function (pair) { return pair[1]; });
  const minLongitude = Math.min.apply(null, longitudes);
  const maxLongitude = Math.max.apply(null, longitudes);
  const minLatitude = Math.min.apply(null, latitudes);
  const maxLatitude = Math.max.apply(null, latitudes);
  const longitudeRange = maxLongitude - minLongitude || 1;
  const latitudeRange = maxLatitude - minLatitude || 1;
  const scale = Math.min((MAP_FRAME.width - MAP_FRAME.padding * 2) / longitudeRange, (MAP_FRAME.height - MAP_FRAME.padding * 2) / latitudeRange);
  const offsetX = (MAP_FRAME.width - longitudeRange * scale) / 2;
  const offsetY = (MAP_FRAME.height - latitudeRange * scale) / 2;
  return function (pair) {
    return [offsetX + (pair[0] - minLongitude) * scale, offsetY + (maxLatitude - pair[1]) * scale];
  };
}

function geometryPath(geometry, project) {
  function ringPath(ring) {
    return ring.map(function (coordinate, index) {
      const point = project(coordinate);
      return (index === 0 ? "M" : "L") + point[0].toFixed(2) + " " + point[1].toFixed(2);
    }).join(" ") + " Z";
  }
  if (geometry && geometry.type === "Polygon") return geometry.coordinates.map(ringPath).join(" ");
  if (geometry && geometry.type === "MultiPolygon") return geometry.coordinates.flatMap(function (polygon) { return polygon.map(ringPath); }).join(" ");
  return "";
}

function featureBounds(feature, project) {
  const points = coordinatePairs(feature.geometry).map(project);
  const xs = points.map(function (point) { return point[0]; });
  const ys = points.map(function (point) { return point[1]; });
  const minX = Math.min.apply(null, xs);
  const maxX = Math.max.apply(null, xs);
  const minY = Math.min.apply(null, ys);
  const maxY = Math.max.apply(null, ys);
  return { minX: minX, maxX: maxX, minY: minY, maxY: maxY, width: maxX - minX, height: maxY - minY };
}

function setMapViewBox(viewBox) {
  if (!state.mapSvg) return;
  state.viewBox = viewBox;
  state.mapSvg.setAttribute("viewBox", [viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(" "));
  const labelScale = viewBox.width / MAP_FRAME.width;
  state.mapFeatures.forEach(function (record) {
    if (!record.label) return;
    record.label.setAttribute("transform", "translate(" + record.label.dataset.x + " " + record.label.dataset.y + ") scale(" + labelScale.toFixed(3) + ")");
  });
}

function focusBounds(bounds) {
  const aspect = MAP_FRAME.width / MAP_FRAME.height;
  let width = Math.max(bounds.width * 4.7, 270);
  let height = Math.max(bounds.height * 4.7, 170);
  if (width / height > aspect) height = width / aspect;
  else width = height * aspect;
  width = Math.min(width, MAP_FRAME.width);
  height = Math.min(height, MAP_FRAME.height);
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  setMapViewBox({
    x: Math.max(0, Math.min(MAP_FRAME.width - width, centerX - width / 2)),
    y: Math.max(0, Math.min(MAP_FRAME.height - height, centerY - height / 2)),
    width: width,
    height: height
  });
}

function zoomMap(factor) {
  const width = Math.max(230, Math.min(MAP_FRAME.width, state.viewBox.width * factor));
  const height = width / (MAP_FRAME.width / MAP_FRAME.height);
  const centerX = state.viewBox.x + state.viewBox.width / 2;
  const centerY = state.viewBox.y + state.viewBox.height / 2;
  setMapViewBox({
    x: Math.max(0, Math.min(MAP_FRAME.width - width, centerX - width / 2)),
    y: Math.max(0, Math.min(MAP_FRAME.height - height, centerY - height / 2)),
    width: width,
    height: height
  });
}

function paintMap() {
  state.mapFeatures.forEach(function (record, name) {
    const level = territoryLevel(name);
    const selected = name === state.territory;
    record.path.dataset.level = level;
    record.path.classList.toggle("is-selected", selected);
    record.path.setAttribute("aria-label", name + " · " + (level === "low" ? "precisa de atenção" : level === "high" ? "ritmo alto" : level === "mid" ? "acompanhar" : "sem alerta prioritário"));
    if (record.label) record.label.classList.toggle("is-selected", selected);
  });
}

function selectTerritory(name, fit) {
  const record = state.mapFeatures.get(name);
  state.territory = name;
  renderTerritory(name);
  const select = $("#territory-select");
  if (select) select.value = name;
  const actionSelect = $("#action-territory");
  if (actionSelect && Array.from(actionSelect.options).some(function (option) { return option.value === name; })) actionSelect.value = name;
  if (!record) return;
  paintMap();
  if (fit !== false) focusBounds(record.bounds);
}

function populateTerritorySelects(data) {
  const names = data.features.map(function (feature) { return feature.properties && feature.properties.name; }).filter(Boolean).sort(function (a, b) { return a.localeCompare(b, "pt-BR"); });
  const options = names.map(function (name) { return '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + "</option>"; }).join("");
  $("#territory-select").innerHTML = '<option value="">Escolher município</option>' + options;
  $("#action-territory").innerHTML = options;
}

async function initMap() {
  const container = $("#territory-map");
  try {
    const response = await fetch("geo_alagoas_municipios.json", { cache: "force-cache" });
    if (!response.ok) throw new Error("Falha ao carregar território");
    const data = await response.json();
    state.mapData = data;
    populateTerritorySelects(data);
    const project = createProjection(data);
    const labels = new Set(["Maceió", "Arapiraca", "Palmeira dos Índios", "Penedo", "União dos Palmares"]);
    container.innerHTML = '<svg class="territory-map-svg" viewBox="0 0 1000 620" role="img" aria-labelledby="executive-map-title executive-map-description"><title id="executive-map-title">Mapa territorial de Alagoas</title><desc id="executive-map-description">Municípios coloridos conforme a camada escolhida. Selecione um município para abrir o briefing.</desc><g class="map-shapes"></g><g class="map-labels" aria-hidden="true"></g></svg><div class="map-controls" role="group" aria-label="Zoom do mapa"><button type="button" data-map-zoom="in" aria-label="Aproximar mapa">+</button><button type="button" data-map-zoom="out" aria-label="Afastar mapa">−</button></div><span class="map-count">102 municípios</span>';
    state.mapSvg = $(".territory-map-svg", container);
    const shapes = $(".map-shapes", container);
    const labelGroup = $(".map-labels", container);
    state.mapFeatures.clear();

    data.features.forEach(function (feature) {
      const name = feature.properties && feature.properties.name ? feature.properties.name : "Território";
      const bounds = featureBounds(feature, project);
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", geometryPath(feature.geometry, project));
      path.setAttribute("class", "territory-map-path");
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("role", "button");
      path.setAttribute("tabindex", "0");
      const title = document.createElementNS(SVG_NS, "title");
      title.textContent = name;
      path.append(title);
      path.addEventListener("click", function () { selectTerritory(name, true); });
      path.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectTerritory(name, true);
        }
      });
      shapes.append(path);

      let label = null;
      if (labels.has(name)) {
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        const labelWidth = Math.min(156, Math.max(54, name.length * 6 + 18));
        label = document.createElementNS(SVG_NS, "g");
        label.setAttribute("class", "territory-label");
        label.setAttribute("transform", "translate(" + centerX.toFixed(2) + " " + centerY.toFixed(2) + ")");
        label.dataset.x = centerX.toFixed(2);
        label.dataset.y = centerY.toFixed(2);
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", String(-labelWidth / 2));
        rect.setAttribute("y", "-12");
        rect.setAttribute("width", String(labelWidth));
        rect.setAttribute("height", "24");
        rect.setAttribute("rx", "7");
        const text = document.createElementNS(SVG_NS, "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("y", "4");
        text.textContent = name;
        label.append(rect, text);
        labelGroup.append(label);
      }
      state.mapFeatures.set(name, { feature: feature, path: path, label: label, bounds: bounds });
    });

    state.mapReady = true;
    setMapViewBox({ x: 0, y: 0, width: MAP_FRAME.width, height: MAP_FRAME.height });
    selectTerritory(profile().defaultTerritory, false);
    paintMap();
  } catch (error) {
    container.innerHTML = '<div class="map-error">' + icon("warning") + " Não foi possível preparar o mapa. Use o seletor e o briefing territorial.</div>";
    console.warn(error);
  }
}

function updateLayer(layerId) {
  if (!profile().layers.some(function (layer) { return layer.id === layerId; })) return;
  state.layer = layerId;
  renderLayerSwitch();
  paintMap();
}

function openDialog(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDialog(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.close();
  if (!$("dialog[open]")) document.body.classList.remove("dialog-open");
}

function openCommand() {
  openDialog($("#command-dialog"));
  setTimeout(function () { $("#command-input").focus(); }, 40);
}

function commandScore(command, query) {
  const promptWords = normalizeText(command.prompt).split(/\s+/).filter(function (word) { return word.length > 3; });
  return promptWords.reduce(function (score, word) { return score + (query.includes(word) ? 1 : 0); }, 0);
}

function runCommand(query) {
  const normalized = normalizeText(query);
  const commands = profile().commands;
  let selected = commands[0];
  let bestScore = -1;
  commands.forEach(function (command) {
    const score = commandScore(command, normalized);
    if (score > bestScore) {
      bestScore = score;
      selected = command;
    }
  });
  if (bestScore === 0) {
    const territory = profile().territories[state.territory] || genericTerritory(state.territory);
    selected = {
      title: state.territory + " em contexto.",
      answer: territory.insight + " A leitura combina o território selecionado com agenda, tarefas e relações disponíveis nesta visão.",
      evidence: ["Território selecionado", "Agenda e tarefas", "Atividade da rede"],
      action: { name: state.role === "governador" ? "Acompanhar operação em " + state.territory : "Organizar retorno em " + state.territory, territory: state.territory, owner: "Coordenação territorial", due: "Amanhã, 11h" }
    };
  }
  const evidence = selected.evidence.map(function (item) { return '<span>' + icon("check") + " " + escapeHtml(item) + "</span>"; }).join("");
  const actionButton = selected.action ? '<button class="button primary" type="button" data-command-action data-action-payload="' + encodeURIComponent(JSON.stringify(selected.action)) + '">Criar ação sugerida' + icon("arrow") + "</button>" : "";
  $("#command-result").innerHTML = '<div class="result-head"><span>' + icon("spark") + ' Leitura executiva</span><small>' + escapeHtml(profile().label) + '</small></div><h3>' + escapeHtml(selected.title) + '</h3><p>' + escapeHtml(selected.answer) + '</p><div class="result-evidence">' + evidence + "</div>" + actionButton;
}

function openAction(config) {
  if (!$("#action-territory").options.length) {
    const knownTerritories = Array.from(new Set(Object.keys(PROFILE_DATA.governador.territories).concat(Object.keys(PROFILE_DATA.deputado.territories)))).sort(function (a, b) { return a.localeCompare(b, "pt-BR"); });
    $("#action-territory").innerHTML = knownTerritories.map(function (name) { return '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + "</option>"; }).join("");
  }
  const fallbackName = state.role === "governador" ? "Acompanhar operação em " + state.territory : "Organizar retorno em " + state.territory;
  const data = Object.assign({ name: fallbackName, territory: state.territory, owner: "Coordenação territorial", due: "Amanhã, 11h" }, config || {});
  $("#action-name").value = data.name;
  $("#action-territory").value = data.territory;
  $("#action-due").value = data.due;
  const owner = $("#action-owner");
  owner.value = Array.from(owner.options).some(function (option) { return option.value === data.owner; }) ? data.owner : owner.options[0].value;
  openDialog($("#action-dialog"));
  setTimeout(function () { $("#action-name").focus(); }, 40);
}

function showToast(message) {
  const toast = $("#toast");
  $("span", toast).textContent = message;
  toast.classList.add("show");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3600);
}

function openMenu() {
  document.body.classList.add("menu-open");
  $("[data-open-menu]").setAttribute("aria-expanded", "true");
  setTimeout(function () { $(".sidebar-nav a").focus(); }, 30);
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  $("[data-open-menu]").setAttribute("aria-expanded", "false");
}

function setupNavigation() {
  $$('[data-nav-link]').forEach(function (link) {
    link.addEventListener("click", function () {
      $$('[data-nav-link]').forEach(function (item) {
        const active = item === link;
        item.classList.toggle("active", active);
        if (active) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
      closeMenu();
    });
  });
  if (!("IntersectionObserver" in window)) return;
  const sections = ["visao-geral", "territorios", "operacao", "agenda", "rede"].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  const observer = new IntersectionObserver(function (entries) {
    const visible = entries.filter(function (entry) { return entry.isIntersecting; }).sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
    if (!visible) return;
    $$('[data-nav-link]').forEach(function (link) {
      const active = link.getAttribute("href") === "#" + visible.target.id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-18% 0px -64% 0px", threshold: [0.05, 0.2, 0.5] });
  sections.forEach(function (section) { observer.observe(section); });
}

function setupEvents() {
  document.addEventListener("click", function (event) {
    const roleButton = event.target.closest("[data-role]");
    if (roleButton) {
      state.role = roleButton.dataset.role;
      renderRole(true);
      return;
    }
    const layerButton = event.target.closest("[data-layer]");
    if (layerButton) {
      updateLayer(layerButton.dataset.layer);
      return;
    }
    if (event.target.closest("[data-open-command]")) {
      openCommand();
      return;
    }
    if (event.target.closest("[data-open-menu]")) {
      openMenu();
      return;
    }
    if (event.target.closest("[data-close-menu]")) {
      closeMenu();
      return;
    }
    const closeButton = event.target.closest("[data-close-dialog]");
    if (closeButton) {
      closeDialog(closeButton.closest("dialog"));
      return;
    }
    const promptButton = event.target.closest("[data-prompt-index]");
    if (promptButton) {
      const command = profile().commands[Number(promptButton.dataset.promptIndex)];
      $("#command-input").value = command.prompt;
      runCommand(command.prompt);
      return;
    }
    const commandAction = event.target.closest("[data-command-action]");
    if (commandAction) {
      let payload = {};
      try { payload = JSON.parse(decodeURIComponent(commandAction.dataset.actionPayload)); } catch (error) { void error; }
      closeDialog($("#command-dialog"));
      openAction(payload);
      return;
    }
    if (event.target.closest("[data-brief-action]") || event.target.closest("[data-new-action]")) {
      openAction();
      return;
    }
    const zoomButton = event.target.closest("[data-map-zoom]");
    if (zoomButton) zoomMap(zoomButton.dataset.mapZoom === "in" ? 0.78 : 1.28);
  });

  $("#territory-select").addEventListener("change", function (event) {
    if (event.target.value) selectTerritory(event.target.value, true);
  });

  $("#command-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const query = $("#command-input").value.trim();
    if (query) runCommand(query);
  });

  $("#action-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.createdActions[state.role].unshift({
      icon: "check",
      title: String(formData.get("name")),
      detail: String(formData.get("owner")) + " · " + String(formData.get("territory")),
      due: String(formData.get("due")),
      tone: "success",
      created: true
    });
    renderTasks();
    closeDialog($("#action-dialog"));
    showToast("Ação adicionada ao acompanhamento.");
    document.getElementById("operacao").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  $$("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) closeDialog(dialog);
    });
    dialog.addEventListener("close", function () {
      if (!$("dialog[open]")) document.body.classList.remove("dialog-open");
    });
  });

  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openCommand();
    }
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu();
  });
}

function resolveInitialRole() {
  const parameter = new URLSearchParams(window.location.search).get("perfil");
  if (parameter === "deputado-estadual" || parameter === "deputado") return "deputado";
  if (parameter === "governador") return "governador";
  try {
    const saved = localStorage.getItem("pulso-executive-profile");
    if (saved === "deputado" || saved === "governador") return saved;
  } catch (error) {
    void error;
  }
  return "governador";
}

function init() {
  state.role = resolveInitialRole();
  renderRole(false);
  setupNavigation();
  setupEvents();
  initMap();
}

document.addEventListener("DOMContentLoaded", init);
