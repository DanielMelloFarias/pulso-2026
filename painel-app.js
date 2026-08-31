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
      { icon: "clock", label: "Tarefas atrasadas", value: "23", note: "3 responsáveis concentram 61%", tone: "attention" }
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
        state: "success", delta: "+18%", deltaText: "de atividade da rede nesta semana", metrics: ["1.946", "64", "9", "1"],
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
        state: "attention", delta: "−11%", deltaText: "de atividade desde a última agenda", metrics: ["648", "22", "3", "2"],
        insight: "Três relações relevantes perderam continuidade e dois retornos ainda não têm encaminhamento.",
        signals: "relacionamentos, tarefas e agenda · últimos 5 dias", levels: { presenca: "mid", relacoes: "low", pendencias: "low" }
      },
      "Pilar": {
        state: "stable", delta: "+6%", deltaText: "de atividade na última semana", metrics: ["512", "18", "4", "1"],
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

const PANEL_DETAIL_DATA = {
  governador: {
    defaultTerritory: "Maceió",
    scopeLabel: "Alagoas · consolidado",
    operationStats: [
      { icon: "check", label: "Concluídas hoje", value: "186", note: "+14% sobre ontem", tone: "success" },
      { icon: "activity", label: "Em andamento", value: "41", note: "12 vencem hoje", tone: "neutral" },
      { icon: "warning", label: "Atrasadas", value: "23", note: "7 são críticas", tone: "attention" },
      { icon: "target", label: "Dentro do prazo", value: "82%", note: "meta operacional: 90%", tone: "regular" }
    ],
    tasks: [
      { id: "gov-uniao", icon: "warning", title: "Reorganizar a operação em União", detail: "União dos Palmares · José Silva", owner: "José Silva · Coordenação territorial", territory: "União dos Palmares", due: "Amanhã, 10h", status: "critical", priority: "Alta", tone: "alert", source: "Leitura PULSO", checklist: [1, 3], evidence: 2, updated: "há 18 min" },
      { id: "gov-carreata-docs", icon: "file", title: "Validar documentos da carreata", detail: "Maceió · Jurídico", owner: "Jurídico", territory: "Maceió", due: "Hoje, 17h", status: "critical", priority: "Alta", tone: "alert", source: "Evento · Carreata Maceió", checklist: [4, 6], evidence: 5, updated: "há 9 min" },
      { id: "gov-veiculos", icon: "route", title: "Confirmar veículos e carro de som", detail: "Maceió · Operação", owner: "Operação", territory: "Maceió", due: "Hoje, 18h", status: "today", priority: "Média", tone: "today", source: "Checklist do evento", checklist: [2, 4], evidence: 1, updated: "há 27 min" },
      { id: "gov-briefing", icon: "spark", title: "Consolidar briefing do Agreste", detail: "Arapiraca · Inteligência", owner: "Inteligência", territory: "Arapiraca", due: "Amanhã, 8h", status: "scheduled", priority: "Média", tone: "neutral", source: "Briefing gerencial", checklist: [2, 3], evidence: 3, updated: "há 34 min" },
      { id: "gov-equipes", icon: "check", title: "Distribuir equipes da Metropolitana", detail: "Maceió · Coordenação estadual", owner: "Coordenação estadual", territory: "Maceió", due: "Concluída às 16h12", status: "done", priority: "Normal", tone: "success", source: "Plano do dia", checklist: [4, 4], evidence: 4, updated: "há 52 min", completed: true }
    ],
    eventStats: [
      { icon: "calendar", label: "Eventos amanhã", value: "7", note: "5 territórios" },
      { icon: "warning", label: "Com pendência", value: "2", note: "decisão até 12h", tone: "attention" },
      { icon: "file", label: "Documentação", value: "5/7", note: "pacotes revisados", tone: "regular" },
      { icon: "activity", label: "Carreata Maceió", value: "72%", note: "prontidão geral", tone: "attention" }
    ],
    agendaDefault: "amanha",
    agendaTotals: { hoje: 5, amanha: 7, semana: 19 },
    agenda: [
      { id: "gov-coordenacao-hoje", day: "hoje", dayLabel: "Hoje", time: "18:00", title: "Reunião de fechamento", detail: "Sala de situação · coordenação estadual", territory: "Maceió", owner: "Coordenação estadual", status: "Pronto", tone: "success", readiness: 100, checklist: ["Pauta consolidada", "Indicadores atualizados", "Responsáveis confirmados"] },
      { id: "gov-briefing-hoje", day: "hoje", dayLabel: "Hoje", time: "20:30", title: "Briefing regional", detail: "Agreste · transmissão confirmada", territory: "Arapiraca", owner: "Inteligência", status: "Confirmado", tone: "success", readiness: 94, checklist: ["Dados consolidados", "Síntese territorial", "Link enviado"] },
      { id: "gov-reuniao-amanha", day: "amanha", dayLabel: "Amanhã", time: "09:00", title: "Reunião de coordenação", detail: "Arapiraca · equipe confirmada", territory: "Arapiraca", owner: "Coordenação regional", status: "Pronto", tone: "success", readiness: 96, checklist: ["Local confirmado", "Equipe confirmada", "Pauta distribuída"] },
      { id: "gov-carreata-amanha", day: "amanha", dayLabel: "Amanhã", time: "14:00", title: "Carreata Maceió", detail: "Assinatura e protocolo em acompanhamento", territory: "Maceió", owner: "João Silva", status: "2 pendências", tone: "alert", readiness: 72, checklist: ["Percurso confirmado", "91 de 120 veículos", "Assinatura pendente", "Protocolo PM pendente"] },
      { id: "gov-encontro-amanha", day: "amanha", dayLabel: "Amanhã", time: "17:30", title: "Encontro regional", detail: "Palmeira dos Índios · 8 equipes", territory: "Palmeira dos Índios", owner: "Coordenação Agreste", status: "Preparação", tone: "neutral", readiness: 84, checklist: ["Local confirmado", "Equipes em confirmação", "Material separado"] },
      { id: "gov-escuta-semana", day: "semana", dayLabel: "Sexta", time: "10:00", title: "Escuta temática", detail: "Penedo · saúde e infraestrutura", territory: "Penedo", owner: "Mobilização", status: "Confirmado", tone: "success", readiness: 88, checklist: ["Convidados confirmados", "Pauta preparada", "Registro designado"] },
      { id: "gov-plenario-semana", day: "semana", dayLabel: "Sábado", time: "16:00", title: "Plenária territorial", detail: "Delmiro Gouveia · responsável pendente", territory: "Delmiro Gouveia", owner: "Coordenação Sertão", status: "Atenção", tone: "alert", readiness: 58, checklist: ["Local reservado", "Responsável pendente", "Logística em revisão"] }
    ],
    route: {
      progress: 72,
      progressLabel: "Carreata Maceió",
      progressNote: "Documentação, logística e equipe",
      stops: [
        ["Antes das 10h", "Alinhar União dos Palmares com a coordenação territorial"],
        ["Até 12h", "Confirmar responsáveis dos dois eventos com pendência"],
        ["Fim do dia", "Revisar retomada nos municípios sem atividade recente"]
      ],
      note: "A ordem prioriza impacto territorial, prazo e concentração de pendências."
    },
    networkStats: [
      { icon: "users", label: "Responsáveis ativos", value: "163", note: "71 com atividade hoje", tone: "success" },
      { icon: "map", label: "Municípios ativos", value: "28", note: "+4 nesta semana" },
      { icon: "message", label: "Demandas hoje", value: "84", note: "31% em saúde", tone: "regular" },
      { icon: "clock", label: "Sem encaminhamento", value: "18", note: "6 vencem hoje", tone: "attention" }
    ],
    demands: [
      { label: "Saúde", percent: 31, count: 26, trend: "+6%", tone: "up", insight: "Saúde cresce em Maceió e Arapiraca; 11 registros citam acesso a consultas e exames." },
      { label: "Infraestrutura", percent: 26, count: 22, trend: "+3%", tone: "up", insight: "Infraestrutura se concentra em Maceió, Pilar e Rio Largo, com atenção para drenagem e iluminação." },
      { label: "Emprego", percent: 18, count: 15, trend: "−2%", tone: "down", insight: "Emprego recuou no volume relativo, mas mantém presença em nove municípios do Agreste." },
      { label: "Transporte", percent: 11, count: 9, trend: "+1%", tone: "stable", insight: "Transporte aparece associado a acesso regional e horários de linhas na Zona da Mata." },
      { label: "Outros", percent: 14, count: 12, trend: "—", tone: "stable", insight: "Os demais registros se distribuem entre educação, segurança, assistência e serviços locais." }
    ],
    network: [
      { avatar: "MC", name: "Metropolitana", territory: "Maceió", detail: "62 responsáveis com atividade", value: "+18%", tone: "success", focus: "A rede cresce, mas sete retornos estão concentrados em duas agendas de Maceió." },
      { avatar: "AG", name: "Agreste", territory: "Arapiraca", detail: "41 responsáveis com atividade", value: "+31%", tone: "success", focus: "Arapiraca sustenta o melhor ritmo e distribui as tarefas entre mais responsáveis." },
      { avatar: "ZM", name: "Zona da Mata", territory: "União dos Palmares", detail: "19 responsáveis com atividade", value: "−19%", tone: "attention", focus: "Quatro municípios precisam de retomada e nove tarefas seguem vencidas." }
    ]
  },
  deputado: {
    scopeLabel: "Base estadual · consolidado",
    operationStats: [
      { icon: "check", label: "Retornos concluídos", value: "42", note: "+9 desde ontem", tone: "success" },
      { icon: "activity", label: "Em andamento", value: "18", note: "7 vencem hoje", tone: "neutral" },
      { icon: "warning", label: "Pendentes", value: "17", note: "12 em Maceió", tone: "attention" },
      { icon: "target", label: "Dentro do prazo", value: "86%", note: "meta territorial: 90%", tone: "regular" }
    ],
    tasks: [
      { id: "dep-retornos-maceio", icon: "message", title: "Responder demandas de Maceió", detail: "Maceió · Relacionamento", owner: "Relacionamento", territory: "Maceió", due: "Amanhã, 11h", status: "critical", priority: "Alta", tone: "alert", source: "Demandas sem retorno", checklist: [3, 12], evidence: 6, updated: "há 12 min" },
      { id: "dep-rota", icon: "route", title: "Confirmar rota territorial", detail: "Maceió, Rio Largo e Pilar · Operação", owner: "Operação", territory: "Maceió", due: "Hoje, 18h", status: "today", priority: "Alta", tone: "today", source: "Agenda territorial", checklist: [2, 4], evidence: 2, updated: "há 21 min" },
      { id: "dep-liderancas", icon: "users", title: "Reatribuir retornos de lideranças", detail: "União dos Palmares · Coordenação", owner: "Coordenação territorial", territory: "União dos Palmares", due: "Hoje, 16h30", status: "critical", priority: "Alta", tone: "alert", source: "Rede de relacionamento", checklist: [1, 3], evidence: 3, updated: "há 8 min" },
      { id: "dep-agenda", icon: "calendar", title: "Revisar agenda de lideranças", detail: "Arapiraca · Coordenação territorial", owner: "Coordenação territorial", territory: "Arapiraca", due: "Amanhã, 9h", status: "scheduled", priority: "Média", tone: "neutral", source: "Agenda", checklist: [2, 3], evidence: 1, updated: "há 42 min" },
      { id: "dep-sintese", icon: "check", title: "Consolidar síntese de infraestrutura", detail: "Pilar · Inteligência", owner: "Inteligência", territory: "Pilar", due: "Concluída às 15h48", status: "done", priority: "Normal", tone: "success", source: "Radar de demandas", checklist: [4, 4], evidence: 5, updated: "há 1h", completed: true }
    ],
    eventStats: [
      { icon: "calendar", label: "Compromissos", value: "3", note: "nas próximas 24h" },
      { icon: "map", label: "Territórios", value: "4", note: "na rota da semana" },
      { icon: "users", label: "Confirmações", value: "18", note: "lideranças no café", tone: "success" },
      { icon: "route", label: "Rota territorial", value: "86%", note: "prontidão geral", tone: "regular" }
    ],
    agendaDefault: "hoje",
    agendaTotals: { hoje: 3, amanha: 4, semana: 11 },
    agenda: [
      { id: "dep-cafe-hoje", day: "hoje", dayLabel: "Hoje", time: "08:30", title: "Café com lideranças", detail: "Tabuleiro do Martins · 18 confirmações", territory: "Maceió", owner: "Ana C.", status: "Pronto", tone: "success", readiness: 100, checklist: ["Local confirmado", "18 confirmações", "Pauta distribuída"] },
      { id: "dep-rota-hoje", day: "hoje", dayLabel: "Hoje", time: "13:00", title: "Rota comunitária", detail: "Rio Largo e Pilar · logística em revisão", territory: "Rio Largo", owner: "Operação", status: "Acompanhar", tone: "neutral", readiness: 78, checklist: ["Veículo confirmado", "Roteiro definido", "Logística em revisão"] },
      { id: "dep-escuta-hoje", day: "hoje", dayLabel: "Hoje", time: "18:30", title: "Escuta temática", detail: "Arapiraca · saúde e infraestrutura", territory: "Arapiraca", owner: "Relacionamento", status: "Confirmado", tone: "success", readiness: 92, checklist: ["Convidados confirmados", "Pauta preparada", "Registro designado"] },
      { id: "dep-visita-amanha", day: "amanha", dayLabel: "Amanhã", time: "09:00", title: "Visita territorial", detail: "Penedo · duas lideranças locais", territory: "Penedo", owner: "Coordenação territorial", status: "Pronto", tone: "success", readiness: 90, checklist: ["Rota confirmada", "Lideranças avisadas", "Demandas revisadas"] },
      { id: "dep-reuniao-amanha", day: "amanha", dayLabel: "Amanhã", time: "15:00", title: "Reunião de base", detail: "Maceió · retorno de demandas", territory: "Maceió", owner: "Relacionamento", status: "1 pendência", tone: "alert", readiness: 74, checklist: ["Local confirmado", "Síntese pendente", "Responsável definido"] },
      { id: "dep-plenario-semana", day: "semana", dayLabel: "Sexta", time: "17:00", title: "Plenária de bairro", detail: "Benedito Bentes · mobilização local", territory: "Maceió", owner: "Mobilização", status: "Preparação", tone: "neutral", readiness: 69, checklist: ["Local reservado", "Convites em andamento", "Material em separação"] }
    ],
    route: {
      progress: 86,
      progressLabel: "Rota territorial",
      progressNote: "Maceió, Rio Largo e Pilar",
      stops: [
        ["Maceió", "Responder demandas e alinhar lideranças locais"],
        ["Rio Largo", "Retomar três relacionamentos sem atividade recente"],
        ["Pilar", "Conectar a agenda às demandas de infraestrutura"]
      ],
      note: "A rota combina proximidade geográfica, retornos pendentes e agendas confirmadas."
    },
    networkStats: [
      { icon: "network", label: "Lideranças ativas", value: "384", note: "71 com atividade hoje", tone: "success" },
      { icon: "map", label: "Territórios", value: "26", note: "9 com agenda próxima" },
      { icon: "message", label: "Demandas na semana", value: "196", note: "34% em saúde", tone: "regular" },
      { icon: "clock", label: "Retornos pendentes", value: "17", note: "12 em Maceió", tone: "attention" }
    ],
    demands: [
      { label: "Saúde", percent: 34, count: 67, trend: "+8%", tone: "up", insight: "Saúde lidera a escuta em Maceió e Arapiraca, especialmente consultas, exames e atenção básica." },
      { label: "Infraestrutura", percent: 28, count: 55, trend: "+5%", tone: "up", insight: "Infraestrutura cresce em Pilar e Rio Largo, com drenagem, pavimentação e iluminação." },
      { label: "Educação", percent: 17, count: 33, trend: "Estável", tone: "stable", insight: "Educação mantém volume estável e se concentra em três agendas comunitárias da semana." },
      { label: "Emprego", percent: 12, count: 24, trend: "−2%", tone: "down", insight: "Emprego perdeu participação relativa, mas continua recorrente entre jovens da região metropolitana." },
      { label: "Outros", percent: 9, count: 17, trend: "—", tone: "stable", insight: "Os demais registros reúnem transporte, segurança, assistência e serviços comunitários." }
    ],
    network: [
      { avatar: "JS", name: "José S.", territory: "União dos Palmares", detail: "União dos Palmares · 3 retornos", value: "Hoje", tone: "attention", focus: "José concentra três retornos vencidos e sua equipe reduziu atividade nos últimos quatro dias." },
      { avatar: "AC", name: "Ana C.", territory: "Maceió", detail: "Maceió · agenda confirmada", value: "+7 ações", tone: "success", focus: "Ana ampliou a mobilização no Tabuleiro do Martins e mantém todos os retornos dentro do prazo." },
      { avatar: "MF", name: "Marcos F.", territory: "Arapiraca", detail: "Arapiraca · demanda encaminhada", value: "No prazo", tone: "success", focus: "Marcos distribuiu as demandas entre quatro responsáveis e mantém continuidade após a última agenda." }
    ]
  }
};

Object.keys(PANEL_DETAIL_DATA).forEach(function (role) {
  Object.assign(PROFILE_DATA[role], PANEL_DETAIL_DATA[role]);
});

const SVG_NS = "http://www.w3.org/2000/svg";
const MAP_FRAME = { width: 1000, height: 620, padding: 34 };
const state = {
  role: "governador",
  layer: "atencao",
  territory: "União dos Palmares",
  taskFilter: "all",
  agendaView: "amanha",
  demandIndex: 0,
  networkIndex: 0,
  mapReady: false,
  mapData: null,
  mapSvg: null,
  mapFeatures: new Map(),
  viewBox: { x: 0, y: 0, width: MAP_FRAME.width, height: MAP_FRAME.height },
  createdActions: { governador: [], deputado: [] },
  taskCompletion: { governador: {}, deputado: {} },
  toastTimer: null
};

const RESTORED_TASK_ICONS = new Set(["activity", "calendar", "check", "clock", "file", "message", "route", "spark", "users", "warning"]);
const RESTORED_TASK_STATUS = new Set(["critical", "today", "scheduled"]);

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function cleanString(value, maximum, fallback) {
  if (typeof value !== "string") return fallback;
  const normalized = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  return normalized ? normalized.slice(0, maximum) : fallback;
}

function normalizedChecklist(value) {
  const rawDone = Array.isArray(value) ? Number(value[0]) : 0;
  const rawTotal = Array.isArray(value) ? Number(value[1]) : 1;
  const total = Number.isFinite(rawTotal) ? Math.max(1, Math.min(100, Math.trunc(rawTotal))) : 1;
  const done = Number.isFinite(rawDone) ? Math.max(0, Math.min(total, Math.trunc(rawDone))) : 0;
  return [done, total];
}

function sanitizeRestoredAction(item, role) {
  if (!isPlainObject(item)) return null;
  const id = cleanString(item.id, 80, "");
  const title = cleanString(item.title, 180, "");
  if (!new RegExp("^created-" + role + "-[0-9]{6,}$").test(id) || !title) return null;
  const territory = cleanString(item.territory, 100, "Maceió");
  const owner = cleanString(item.owner, 100, "Coordenação territorial");
  const status = RESTORED_TASK_STATUS.has(item.status) ? item.status : "scheduled";
  return {
    id: id,
    icon: RESTORED_TASK_ICONS.has(item.icon) ? item.icon : "clock",
    title: title,
    detail: territory + " · " + owner,
    owner: owner,
    territory: territory,
    due: cleanString(item.due, 80, "Prazo a definir"),
    status: status,
    priority: cleanString(item.priority, 30, "Média"),
    tone: status === "critical" ? "alert" : status === "today" ? "today" : "neutral",
    source: cleanString(item.source, 80, "Criação manual"),
    checklist: normalizedChecklist(item.checklist),
    evidence: Number.isFinite(Number(item.evidence)) ? Math.max(0, Math.min(999, Math.trunc(Number(item.evidence)))) : 0,
    updated: cleanString(item.updated, 40, "agora"),
    created: true
  };
}

function sanitizeCompletionMap(value) {
  const clean = {};
  if (!isPlainObject(value)) return clean;
  Object.entries(value).forEach(function (entry) {
    if (/^[a-z0-9-]{1,100}$/.test(entry[0]) && typeof entry[1] === "boolean") clean[entry[0]] = entry[1];
  });
  return clean;
}

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

function renderStatStrip(selector, items) {
  const container = $(selector);
  if (!container) return;
  container.innerHTML = items.map(function (item) {
    return '<article class="module-stat ' + escapeHtml(item.tone || "neutral") + '"><span class="module-stat-icon">' + icon(item.icon || "activity") + '</span><div><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + '</strong><small>' + escapeHtml(item.note) + '</small></div></article>';
  }).join("");
}

function allTasks() {
  return state.createdActions[state.role].concat(profile().tasks);
}

function isTaskDone(item) {
  const completion = isPlainObject(state.taskCompletion[state.role]) ? state.taskCompletion[state.role] : {};
  if (Object.prototype.hasOwnProperty.call(completion, item.id)) return completion[item.id];
  return Boolean(item.completed || item.status === "done");
}

function taskVisualStatus(item, done) {
  if (done) return "done";
  if (item.status === "done") return "scheduled";
  return RESTORED_TASK_STATUS.has(item.status) ? item.status : "scheduled";
}

function taskDueLabel(item, done) {
  if (!done && item.status === "done") return "Prazo a redefinir";
  return cleanString(item.due, 80, "Prazo a definir");
}

function taskChecklist(item, done) {
  const checklist = normalizedChecklist(item.checklist);
  return done ? [checklist[1], checklist[1]] : checklist;
}

function renderOperationSummary() {
  const baseItems = profile().tasks;
  const createdItems = state.createdActions[state.role];
  const completionDelta = allTasks().reduce(function (total, item) {
    const baseline = Boolean(item.completed || item.status === "done");
    return total + (isTaskDone(item) ? 1 : 0) - (baseline ? 1 : 0);
  }, 0);
  const resolvedCritical = baseItems.filter(function (item) { return item.status === "critical" && isTaskDone(item); }).length;
  const stats = profile().operationStats.map(function (item, index) {
    const copy = Object.assign({}, item);
    const numeric = Number.parseInt(String(item.value), 10);
    if (index === 0 && Number.isFinite(numeric)) copy.value = String(numeric + completionDelta);
    if (index === 1 && Number.isFinite(numeric)) copy.value = String(Math.max(0, numeric + createdItems.length - completionDelta));
    if (index === 2 && Number.isFinite(numeric)) copy.value = String(Math.max(0, numeric - resolvedCritical));
    return copy;
  });
  renderStatStrip("#operation-summary", stats);
}

function renderPerformance() {
  const data = profile();
  setText("#performance-kicker", data.performanceKicker);
  setText("#performance-title", data.performanceTitle);
  $("#performance-list").innerHTML = data.performance.map(function (item) {
    return '<article class="performance-row ' + escapeHtml(item.tone) + '"><div><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.note) + '</small></div><span class="progress-track" role="progressbar" aria-label="Índice operacional de ' + escapeHtml(item.name) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + item.score + '"><i style="--progress:' + item.score + '%"></i></span><span class="performance-value"><strong>' + escapeHtml(item.delta) + '</strong><small>' + item.score + '/100</small></span></article>';
  }).join("");
}

function renderTasks() {
  const items = allTasks();
  const filtered = items.filter(function (item) {
    const done = isTaskDone(item);
    if (state.taskFilter === "critical") return item.status === "critical" && !done;
    if (state.taskFilter === "today") return item.status === "today" && !done;
    if (state.taskFilter === "done") return done;
    return true;
  });
  $$('[data-task-filter]').forEach(function (button) {
    const active = button.dataset.taskFilter === state.taskFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setText("#task-count", filtered.length + (filtered.length === 1 ? " destaque" : " destaques"));
  const criticalCount = items.filter(function (item) { return item.status === "critical" && !isTaskDone(item); }).length;
  const health = $("#task-health");
  health.className = "status-pill " + (criticalCount ? "alert" : "success");
  health.innerHTML = "<i></i>" + (criticalCount ? criticalCount + " críticas na fila" : "Fila em dia");
  if (!filtered.length) {
    $("#task-list").innerHTML = '<div class="module-empty">' + icon("check") + '<strong>Nenhuma tarefa neste filtro</strong><span>A fila está limpa para este recorte.</span></div>';
    return;
  }
  $("#task-list").innerHTML = filtered.map(function (item) {
    const done = isTaskDone(item);
    const status = taskVisualStatus(item, done);
    const statusLabel = done ? "Concluída" : item.status === "done" ? "Reaberta" : status === "critical" ? "Prioridade alta" : status === "today" ? "Vence hoje" : "Programada";
    const created = item.created ? " created" : "";
    const checklist = taskChecklist(item, done);
    const evidence = Number(item.evidence || 0);
    const stateIcon = done ? "check" : status === "critical" ? "warning" : status === "today" ? "clock" : item.icon || "activity";
    return '<article class="task-item task-' + escapeHtml(status) + created + '" role="listitem"><button class="task-check" type="button" data-task-toggle="' + escapeHtml(item.id) + '" aria-pressed="' + String(done) + '" aria-label="Revisar ' + (done ? "reabertura" : "conclusão") + ' da tarefa: ' + escapeHtml(item.title) + '">' + icon(stateIcon) + '</button><button class="task-main" type="button" data-task-open="' + escapeHtml(item.id) + '"><span class="task-title-line"><strong>' + escapeHtml(item.title) + '</strong><span class="task-priority ' + escapeHtml(status) + '">' + escapeHtml(statusLabel) + '</span></span><small>' + escapeHtml(item.detail) + '</small><span class="task-meta"><span>' + escapeHtml(item.source || "Operação") + '</span><span>' + checklist[0] + '/' + checklist[1] + ' etapas</span><span>' + evidence + (evidence === 1 ? ' evidência' : ' evidências') + '</span></span></button><div class="task-side"><span class="task-due ' + escapeHtml(status) + '">' + escapeHtml(taskDueLabel(item, done)) + '</span><button class="task-open" type="button" data-task-open="' + escapeHtml(item.id) + '" aria-label="Abrir detalhes de ' + escapeHtml(item.title) + '">' + icon("chevron") + '</button></div></article>';
  }).join("");
}

function renderAgenda() {
  const data = profile();
  const items = state.agendaView === "semana" ? data.agenda : data.agenda.filter(function (item) { return item.day === state.agendaView; });
  const total = data.agendaTotals[state.agendaView];
  const periodLabel = state.agendaView === "hoje" ? "hoje" : state.agendaView === "amanha" ? "amanhã" : "nos próximos 7 dias";
  setText("#agenda-title", items.length + (items.length === 1 ? " destaque" : " destaques") + " de " + total + " eventos");
  setText("#agenda-count", total + " " + periodLabel);
  $$('[data-agenda-view]').forEach(function (button) {
    const active = button.dataset.agendaView === state.agendaView;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $("#agenda-list").innerHTML = items.map(function (item) {
    return '<button class="agenda-item" type="button" data-event-open="' + escapeHtml(item.id) + '"><span class="agenda-time"><small>' + escapeHtml(item.dayLabel) + '</small><strong>' + escapeHtml(item.time) + '</strong></span><div class="agenda-copy"><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.detail) + '</small><span class="event-readiness"><span><i style="--progress:' + item.readiness + '%"></i></span><small>' + item.readiness + '% pronta</small></span></div><span class="status-pill ' + escapeHtml(item.tone) + '"><i></i>' + escapeHtml(item.status) + '</span>' + icon("chevron", "agenda-arrow") + '</button>';
  }).join("");
}

function renderRoute() {
  const data = profile();
  setText("#route-kicker", data.routeKicker);
  setText("#route-title", data.routeTitle);
  $("#route-content").innerHTML = '<div class="route-readiness"><div><span>Prontidão em foco</span><strong>' + escapeHtml(data.route.progressLabel) + '</strong><small>' + escapeHtml(data.route.progressNote) + '</small></div><b>' + data.route.progress + '%</b></div><span class="readiness-track" role="progressbar" aria-label="Prontidão de ' + escapeHtml(data.route.progressLabel) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + data.route.progress + '"><i style="--progress:' + data.route.progress + '%"></i></span><div class="route-path">' + data.route.stops.map(function (stop) {
    return '<div class="route-stop"><strong>' + escapeHtml(stop[0]) + '</strong><small>' + escapeHtml(stop[1]) + '</small></div>';
  }).join("") + '</div><div class="route-note">' + escapeHtml(data.route.note) + '</div>';
}

function renderDemands() {
  const data = profile();
  setText("#demand-title", data.demandTitle);
  $("#demand-bars").innerHTML = data.demands.map(function (item, index) {
    const active = index === state.demandIndex;
    return '<button class="demand-row ' + (active ? "is-selected" : "") + '" type="button" data-demand-index="' + index + '" aria-pressed="' + String(active) + '"><span class="demand-label"><strong>' + escapeHtml(item.label) + '</strong><small>' + item.count + ' registros</small></span><span class="demand-track" role="progressbar" aria-label="Participação de ' + escapeHtml(item.label) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + item.percent + '"><i style="--value:' + item.percent + '%"></i></span><strong class="demand-percent">' + item.percent + '%</strong><span class="demand-trend ' + escapeHtml(item.tone) + '">' + escapeHtml(item.trend) + '</span></button>';
  }).join("");
  const selected = data.demands[state.demandIndex] || data.demands[0];
  $("#demand-insight").innerHTML = '<span>' + icon("spark") + ' Leitura da pauta</span><strong>' + escapeHtml(selected.label) + '</strong><p>' + escapeHtml(selected.insight) + '</p><button type="button" data-demand-action="' + escapeHtml(selected.label) + '">Criar encaminhamento' + icon("arrow") + '</button>';
}

function renderNetwork() {
  const data = profile();
  setText("#network-kicker", data.networkKicker);
  setText("#network-title", data.networkTitle);
  $("#network-list").innerHTML = data.network.map(function (item, index) {
    const active = index === state.networkIndex;
    return '<button class="network-item ' + (active ? "is-selected" : "") + '" type="button" data-network-index="' + index + '" aria-pressed="' + String(active) + '"><span class="network-avatar">' + escapeHtml(item.avatar) + '</span><span class="network-copy"><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.detail) + '</small></span><span class="network-value ' + escapeHtml(item.tone || "neutral") + '">' + escapeHtml(item.value) + '</span>' + icon("chevron", "network-arrow") + '</button>';
  }).join("");
  const selected = data.network[state.networkIndex] || data.network[0];
  $("#network-focus").innerHTML = '<div class="network-chain" aria-label="Estrutura da rede"><span>Coordenação</span><i>→</i><span>Liderança</span><i>→</i><span>Equipe</span><i>→</i><span>Campo</span></div><span class="network-focus-kicker">' + icon("spark") + ' Foco recomendado · ' + escapeHtml(selected.name) + '</span><p>' + escapeHtml(selected.focus) + '</p><button type="button" data-network-action="' + escapeHtml(selected.name) + '" data-network-territory="' + escapeHtml(selected.territory || state.territory) + '">Criar retorno' + icon("arrow") + '</button>';
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
  state.taskFilter = "all";
  state.agendaView = data.agendaDefault;
  state.demandIndex = 0;
  state.networkIndex = 0;
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
  ["#operation-scope", "#agenda-scope", "#network-scope"].forEach(function (selector) {
    $(selector).innerHTML = "<i></i>" + escapeHtml(data.scopeLabel);
  });

  $$('[data-role]').forEach(function (button) {
    const active = button.dataset.role === state.role;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderKpis();
  renderOperationSummary();
  renderStatStrip("#event-summary", data.eventStats);
  renderStatStrip("#network-summary", data.networkStats);
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
  if (state.role === "governador" && state.layer === "atencao") {
    const priorities = new Set(["União dos Palmares", "Delmiro Gouveia", "Rio Largo", "Santana do Ipanema"]);
    const watch = new Set(["Maceió", "São Miguel dos Campos", "Coruripe", "Pão de Açúcar", "Marechal Deodoro", "Pilar"]);
    if (priorities.has(name)) return "low";
    if (watch.has(name)) return "mid";
    return "quiet";
  }
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
  $("#territory-briefing").innerHTML = '<h3 class="territory-name">' + escapeHtml(name) + '</h3><p class="territory-delta ' + (positive ? "positive" : "") + '"><strong>' + escapeHtml(territory.delta) + '</strong> ' + escapeHtml(territory.deltaText) + '</p><dl class="territory-metrics">' + metricHtml + '</dl><div class="evidence-box"><span>' + icon("spark") + ' Leitura PULSO</span><p>' + escapeHtml(territory.insight) + '</p><small>Sinais considerados: ' + escapeHtml(territory.signals) + '</small></div><div class="briefing-actions"><button class="button primary" type="button" data-brief-action>' + (territory.state === "attention" ? "Criar ação corretiva" : "Criar acompanhamento") + icon("arrow") + '</button><button class="button secondary" type="button" data-map-focus>' + icon("target") + ' Aproximar no mapa</button></div>';
}

function mapLevelLabel(level) {
  const layer = profile().layers.find(function (item) { return item.id === state.layer; });
  const match = layer && layer.legend.find(function (item) { return item[0] === level; });
  return match ? match[1] : "Sem sinal prioritário";
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
    record.path.setAttribute("tabindex", selected ? "0" : "-1");
    record.path.setAttribute("aria-pressed", String(selected));
    record.path.setAttribute("aria-label", name + " · " + (level === "low" ? "precisa de atenção" : level === "high" ? "ritmo alto" : level === "mid" ? "acompanhar" : "sem alerta prioritário"));
    if (record.label) record.label.classList.toggle("is-selected", selected);
  });
  const selection = $("#map-selection");
  if (selection) selection.innerHTML = icon("map") + " <strong>" + escapeHtml(state.territory) + "</strong> selecionado";
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
    container.innerHTML = '<svg class="territory-map-svg" viewBox="0 0 1000 620" role="img" aria-labelledby="executive-map-title executive-map-description"><title id="executive-map-title">Mapa territorial de Alagoas</title><desc id="executive-map-description">Municípios coloridos conforme a camada escolhida. Selecione um município para abrir o briefing. O mapa preserva a visão estadual até que o zoom seja solicitado.</desc><g class="map-shapes"></g><g class="map-labels" aria-hidden="true"></g></svg><div class="map-controls" role="group" aria-label="Controles do mapa"><button type="button" data-map-zoom="in" aria-label="Aproximar mapa">+</button><button type="button" data-map-zoom="out" aria-label="Afastar mapa">−</button><button type="button" data-map-zoom="reset" aria-label="Mostrar Alagoas inteiro">' + icon("map") + '</button></div><span class="map-count">102 municípios</span><span class="map-selection" id="map-selection" aria-live="polite"></span><div class="map-tooltip" id="map-tooltip" role="tooltip" hidden></div>';
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
      path.setAttribute("tabindex", "-1");
      const title = document.createElementNS(SVG_NS, "title");
      title.textContent = name;
      path.append(title);
      path.addEventListener("click", function () { selectTerritory(name, false); });
      path.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectTerritory(name, false);
        }
      });
      path.addEventListener("pointerenter", function (event) {
        const tooltip = $("#map-tooltip", container);
        const level = territoryLevel(name);
        tooltip.innerHTML = "<strong>" + escapeHtml(name) + "</strong><span>" + escapeHtml(mapLevelLabel(level)) + "</span>";
        tooltip.hidden = false;
        const rect = container.getBoundingClientRect();
        tooltip.style.left = Math.max(12, Math.min(rect.width - 172, event.clientX - rect.left + 12)) + "px";
        tooltip.style.top = Math.max(12, Math.min(rect.height - 70, event.clientY - rect.top + 12)) + "px";
      });
      path.addEventListener("pointermove", function (event) {
        const tooltip = $("#map-tooltip", container);
        if (tooltip.hidden) return;
        const rect = container.getBoundingClientRect();
        tooltip.style.left = Math.max(12, Math.min(rect.width - 172, event.clientX - rect.left + 12)) + "px";
        tooltip.style.top = Math.max(12, Math.min(rect.height - 70, event.clientY - rect.top + 12)) + "px";
      });
      path.addEventListener("pointerleave", function () { $("#map-tooltip", container).hidden = true; });
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
    const knownTerritories = state.mapData
      ? state.mapData.features.map(function (feature) { return feature.properties && feature.properties.name; }).filter(Boolean).sort(function (a, b) { return a.localeCompare(b, "pt-BR"); })
      : Array.from(new Set(Object.keys(PROFILE_DATA.governador.territories).concat(Object.keys(PROFILE_DATA.deputado.territories)))).sort(function (a, b) { return a.localeCompare(b, "pt-BR"); });
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

function findTask(taskId) {
  return allTasks().find(function (item) { return item.id === taskId; });
}

function findEvent(eventId) {
  return profile().agenda.find(function (item) { return item.id === eventId; });
}

function persistPanelState() {
  try {
    localStorage.setItem("pulso-panel-actions-v1", JSON.stringify(state.createdActions));
    localStorage.setItem("pulso-panel-completion-v1", JSON.stringify(state.taskCompletion));
  } catch (error) {
    void error;
  }
}

function restorePanelState() {
  try {
    const actions = JSON.parse(localStorage.getItem("pulso-panel-actions-v1") || "null");
    const completion = JSON.parse(localStorage.getItem("pulso-panel-completion-v1") || "null");
    if (isPlainObject(actions) && Array.isArray(actions.governador) && Array.isArray(actions.deputado)) {
      state.createdActions = {
        governador: actions.governador.slice(0, 100).map(function (item) { return sanitizeRestoredAction(item, "governador"); }).filter(Boolean),
        deputado: actions.deputado.slice(0, 100).map(function (item) { return sanitizeRestoredAction(item, "deputado"); }).filter(Boolean)
      };
    }
    if (isPlainObject(completion)) {
      state.taskCompletion = {
        governador: sanitizeCompletionMap(completion.governador),
        deputado: sanitizeCompletionMap(completion.deputado)
      };
    }
  } catch (error) {
    void error;
  }
}

function toggleTask(taskId) {
  const item = findTask(taskId);
  if (!item) return;
  if (!isPlainObject(state.taskCompletion[state.role])) state.taskCompletion[state.role] = {};
  const nextState = !isTaskDone(item);
  state.taskCompletion[state.role][taskId] = nextState;
  persistPanelState();
  renderTasks();
  renderOperationSummary();
  showToast(nextState ? "Tarefa concluída e indicadores atualizados." : "Tarefa reaberta na fila de execução.");
}

function openTask(taskId) {
  const item = findTask(taskId);
  if (!item) return;
  const done = isTaskDone(item);
  const checklist = taskChecklist(item, done);
  const visualStatus = taskVisualStatus(item, done);
  const statusLabel = done ? "Concluída" : item.status === "done" ? "Reaberta" : visualStatus === "critical" ? "Prioridade alta" : visualStatus === "today" ? "Vence hoje" : "Programada";
  setText("#task-detail-title", item.title);
  $("#task-detail-body").innerHTML = '<div class="detail-status-row"><span class="status-pill ' + (done ? "success" : visualStatus === "critical" ? "alert" : "neutral") + '"><i></i>' + escapeHtml(statusLabel) + '</span><span>Atualizada ' + escapeHtml(item.updated || "agora") + '</span></div><dl class="detail-facts"><div><dt>Território</dt><dd>' + escapeHtml(item.territory || state.territory) + '</dd></div><div><dt>Responsável</dt><dd>' + escapeHtml(item.owner || "Coordenação") + '</dd></div><div><dt>Prazo</dt><dd>' + escapeHtml(taskDueLabel(item, done)) + '</dd></div><div><dt>Origem</dt><dd>' + escapeHtml(item.source || "Operação") + '</dd></div></dl><div class="detail-progress"><div><span>Checklist</span><strong>' + checklist[0] + ' de ' + checklist[1] + ' etapas</strong></div><span role="progressbar" aria-label="Progresso do checklist" aria-valuemin="0" aria-valuemax="' + checklist[1] + '" aria-valuenow="' + checklist[0] + '"><i style="--progress:' + Math.round(checklist[0] / Math.max(1, checklist[1]) * 100) + '%"></i></span></div><div class="detail-evidence"><span>' + icon("file") + ' Evidências e histórico</span><p>' + Number(item.evidence || 0) + ' evidências anexadas. A origem, as mudanças de responsável e cada atualização permanecem na linha do tempo.</p></div><div class="dialog-actions"><button class="button secondary" type="button" data-close-dialog>Fechar</button><button class="button primary" type="button" data-task-toggle="' + escapeHtml(item.id) + '">' + (done ? "Reabrir tarefa" : "Confirmar conclusão") + icon(done ? "activity" : "check") + '</button></div>';
  openDialog($("#task-dialog"));
}

function openEvent(eventId) {
  const item = findEvent(eventId);
  if (!item) return;
  setText("#event-detail-title", item.title);
  const checklist = item.checklist.map(function (entry) {
    const pending = /pendente|revisão|andamento|confirmação|separação|\d+\s+de\s+\d+/i.test(entry);
    return '<li class="' + (pending ? "pending" : "done") + '"><span>' + icon(pending ? "clock" : "check") + '</span><strong>' + escapeHtml(entry) + '</strong></li>';
  }).join("");
  $("#event-detail-body").innerHTML = '<div class="event-detail-hero"><div><span class="status-pill ' + escapeHtml(item.tone) + '"><i></i>' + escapeHtml(item.status) + '</span><h3>' + escapeHtml(item.dayLabel) + ' · ' + escapeHtml(item.time) + '</h3><p>' + escapeHtml(item.detail) + '</p></div><strong>' + item.readiness + '%<small>prontidão</small></strong></div><span class="readiness-track large" role="progressbar" aria-label="Prontidão do evento" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + item.readiness + '"><i style="--progress:' + item.readiness + '%"></i></span><dl class="detail-facts"><div><dt>Município</dt><dd>' + escapeHtml(item.territory) + '</dd></div><div><dt>Responsável</dt><dd>' + escapeHtml(item.owner) + '</dd></div><div><dt>Status</dt><dd>' + escapeHtml(item.status) + '</dd></div><div><dt>Atualização</dt><dd>há poucos minutos</dd></div></dl><div class="event-checklist"><span class="detail-section-title">Checklist operacional</span><ul>' + checklist + '</ul></div><div class="dialog-actions"><button class="button secondary" type="button" data-close-dialog>Fechar</button><button class="button primary" type="button" data-event-action="' + escapeHtml(item.id) + '">' + (item.tone === "alert" ? "Criar tarefa para pendência" : "Criar acompanhamento") + icon("arrow") + '</button></div>';
  openDialog($("#event-dialog"));
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

function closeMenu(restoreFocus) {
  const menuButton = $("[data-open-menu]");
  const wasOpen = document.body.classList.contains("menu-open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  if (restoreFocus && wasOpen) requestAnimationFrame(function () { menuButton.focus(); });
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
    const taskFilter = event.target.closest("[data-task-filter]");
    if (taskFilter) {
      state.taskFilter = taskFilter.dataset.taskFilter;
      renderTasks();
      return;
    }
    const agendaFilter = event.target.closest("[data-agenda-view]");
    if (agendaFilter) {
      state.agendaView = agendaFilter.dataset.agendaView;
      renderAgenda();
      return;
    }
    const taskToggle = event.target.closest("[data-task-toggle]");
    if (taskToggle) {
      const detailDialog = taskToggle.closest("#task-dialog");
      if (!detailDialog) {
        openTask(taskToggle.dataset.taskToggle);
        return;
      }
      toggleTask(taskToggle.dataset.taskToggle);
      closeDialog(detailDialog);
      return;
    }
    const taskOpen = event.target.closest("[data-task-open]");
    if (taskOpen) {
      openTask(taskOpen.dataset.taskOpen);
      return;
    }
    const eventOpen = event.target.closest("[data-event-open]");
    if (eventOpen) {
      openEvent(eventOpen.dataset.eventOpen);
      return;
    }
    const eventAction = event.target.closest("[data-event-action]");
    if (eventAction) {
      const item = findEvent(eventAction.dataset.eventAction);
      if (item) {
        closeDialog($("#event-dialog"));
        const hasPending = item.tone === "alert";
        const due = item.day === "hoje" ? "Hoje, 17h" : item.day === "amanha" ? "Amanhã, 10h" : "Até " + item.dayLabel + ", 10h";
        openAction({ name: (hasPending ? "Resolver pendências de " : "Acompanhar ") + item.title, territory: item.territory, owner: "Operação", due: due });
      }
      return;
    }
    const demandButton = event.target.closest("[data-demand-index]");
    if (demandButton) {
      state.demandIndex = Number(demandButton.dataset.demandIndex);
      renderDemands();
      return;
    }
    const networkButton = event.target.closest("[data-network-index]");
    if (networkButton) {
      state.networkIndex = Number(networkButton.dataset.networkIndex);
      renderNetwork();
      return;
    }
    const demandAction = event.target.closest("[data-demand-action]");
    if (demandAction) {
      openAction({ name: "Encaminhar demandas de " + demandAction.dataset.demandAction, territory: state.territory, owner: "Coordenação territorial", due: "Amanhã, 14h" });
      return;
    }
    const networkAction = event.target.closest("[data-network-action]");
    if (networkAction) {
      openAction({ name: "Organizar retorno de " + networkAction.dataset.networkAction, territory: networkAction.dataset.networkTerritory || state.territory, owner: "Relacionamento", due: "Amanhã, 11h" });
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
      closeMenu(true);
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
    if (event.target.closest("[data-map-focus]")) {
      const record = state.mapFeatures.get(state.territory);
      if (record) focusBounds(record.bounds);
      return;
    }
    const zoomButton = event.target.closest("[data-map-zoom]");
    if (zoomButton) {
      if (zoomButton.dataset.mapZoom === "reset") setMapViewBox({ x: 0, y: 0, width: MAP_FRAME.width, height: MAP_FRAME.height });
      else zoomMap(zoomButton.dataset.mapZoom === "in" ? 0.78 : 1.28);
    }
  });

  $("#territory-select").addEventListener("change", function (event) {
    if (event.target.value) selectTerritory(event.target.value, false);
  });

  $("#command-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const query = $("#command-input").value.trim();
    if (query) runCommand(query);
  });

  $("#action-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const due = String(formData.get("due"));
    const status = normalizeText(due).startsWith("hoje") ? "today" : "scheduled";
    state.createdActions[state.role].unshift({
      id: "created-" + state.role + "-" + Date.now(),
      icon: "clock",
      title: String(formData.get("name")),
      detail: String(formData.get("territory")) + " · " + String(formData.get("owner")),
      owner: String(formData.get("owner")),
      territory: String(formData.get("territory")),
      due: due,
      status: status,
      priority: "Média",
      tone: status === "today" ? "today" : "neutral",
      source: "Criação manual",
      checklist: [0, 1],
      evidence: 0,
      updated: "agora",
      created: true
    });
    persistPanelState();
    renderTasks();
    renderOperationSummary();
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
      if ($("dialog[open]")) return;
      openCommand();
    }
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu(true);
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
  restorePanelState();
  state.role = resolveInitialRole();
  renderRole(false);
  setupNavigation();
  setupEvents();
  initMap();
}

document.addEventListener("DOMContentLoaded", init);
