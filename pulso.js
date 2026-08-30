"use strict";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#${name}"></use></svg>`;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const registrationMessages = [
  {
    type: "system",
    html: "Demonstração · dados 100% sintéticos",
  },
  {
    type: "out",
    time: "14:22",
    html: `<strong>Novo cadastro</strong><br>Maria José da Silva<br>WhatsApp: (82) 9••••-1234<br>Rua X, 125 · Tabuleiro do Martins<br>Nascimento: 15/04/1984<br>Título: •••• · Zona 02 · Seção 142<br><br>Origem: Reunião Tabuleiro 27/08<br>Responsável: Carlos Santos<br>Conhecida por João Ferreira.<br>Autorizou o cadastro e, separadamente, a comunicação.<div class="attachment-row"><span>${icon("i-file")} documento</span><span>${icon("i-file")} título</span><span>${icon("i-map")} localização</span></div>`,
  },
];

const registrationReviewMessage = {
  type: "in",
  time: "14:23",
  html: `<strong>Cadastro identificado.</strong><br><br>Maria José da Silva<br>Tabuleiro do Martins · Maceió<br>Origem: Reunião Tabuleiro 27/08<br>Responsável: Carlos Santos<br>Estrutura de origem: João Ferreira<br><br>Encontrei os campos necessários. Há revisão humana antes de gravar. Confirmar?<div class="chat-action"><button type="button" data-demo-next>Confirmar cadastro</button></div>`,
};

const registrationConfirmedMessage = {
  type: "out",
  time: "14:24",
  html: "<strong>CONFIRMAR</strong>",
};

const registrationDoneMessage = {
  type: "in",
  time: "14:24",
  html: `<strong>Cadastro concluído.</strong><br><br>Maria foi adicionada à base demonstrativa. Território, origem, evento e indicadores foram atualizados. Identificadores seguem mascarados por padrão.`,
};

const carreataMessages = [
  {
    type: "system",
    html: "Demonstração · regras e documentos simulados",
  },
  {
    type: "out",
    time: "16:04",
    html: `<strong>Prepare a carreata de sábado, 05/09.</strong><br><br>Concentração 14h na Praça X, Maceió. Saída 15h e encerramento 18h.<br>Percurso: Praça X → Av. A → Av. B → Rua C → Praça Y.<br>Previsão: 120 carros.<br>Responsável: João Silva · (82) 9••••-1111.`,
  },
];

const carreataQuestionMessage = {
  type: "in",
  time: "16:05",
  html: `<strong>Evento identificado: CARREATA.</strong><br><br>Data, horários, percurso, estimativa e responsável estão completos.<br><br>Para concluir o checklist configurado, falta a identificação do veículo responsável pelo carro de som.<div class="chat-action"><button type="button" data-demo-next>Informar veículo</button></div>`,
};

const carreataVehicleMessage = {
  type: "out",
  time: "16:06",
  html: `Carro de som: Van branca<br>Placa demonstrativa: QWE-0A26<br>Responsável: João Silva.`,
};

const carreataDraftMessage = {
  type: "in",
  time: "16:07",
  html: `<strong>Pacote documental preparado.</strong><br><br>✓ Comunicação à Polícia Militar<br>✓ Minuta para Justiça Eleitoral, se houver combustível<br>✓ Descrição do percurso<br>✓ Termo do responsável<br>✓ Checklist operacional<br><br><strong>Status:</strong> rascunho para validação jurídica. Nenhum protocolo foi realizado.`,
};

const briefingMessages = [
  {
    type: "system",
    html: "Demonstração · resumo baseado em dados sintéticos",
  },
  {
    type: "out",
    time: "22:00",
    html: `<strong>Como foi minha campanha hoje?</strong><br>O que precisa da minha atenção amanhã?`,
  },
];

const briefingSummaryMessage = {
  type: "in",
  time: "22:01",
  html: `<strong>RESUMO EXECUTIVO — HOJE</strong><br><br>163 integrantes ativos · 28 municípios<br>214 ações · 743 novos registros válidos<br>11 eventos · 186 tarefas concluídas<br><br><strong>Atenção:</strong><br>• 4 municípios sem atividade há 72h<br>• União dos Palmares caiu 38%<br>• 3 coordenadores concentram 61% dos atrasos<br><br><strong>Recomendação:</strong> revisar União dos Palmares antes das 10h.`,
};

const briefingDrilldownMessages = [
  {
    type: "out",
    time: "22:02",
    html: "Me mostra os municípios que precisam de atenção. O que aconteceu com José?",
  },
  {
    type: "in",
    time: "22:02",
    html: `José possui 9 tarefas vencidas, registrou uma atividade nos últimos quatro dias e sua equipe caiu de 12 para 4 usuários ativos no período.<br><br>Quer transformar essa leitura em ação?<div class="chat-action"><button type="button" data-demo-next>Criar tarefa para José</button></div>`,
  },
];

const briefingTaskMessages = [
  {
    type: "out",
    time: "22:03",
    html: "Crie uma tarefa para José reorganizar a equipe amanhã e peça retorno até 11h.",
  },
  {
    type: "in",
    time: "22:03",
    html: `<strong>Tarefa criada.</strong><br><br>Responsável: José Silva<br>Prioridade: Alta<br>Prazo: amanhã, 11h<br>Território: União dos Palmares<br><br>José foi notificado e o acompanhamento entrou no briefing de amanhã.`,
  },
];

function processRow(iconName, title, detail, state, running = false) {
  return `<div class="process-row"><span>${icon(iconName)}</span><div><strong>${title}</strong><small>${detail}</small></div><span class="process-state${running ? " running" : ""}">${state}</span></div>`;
}

function resultHead(kicker, title, description, pillText, pillClass = "neutral") {
  return `<div class="result-stage-head"><div><span class="result-kicker">${kicker}</span><h3>${title}</h3><p>${description}</p></div><span class="status-pill ${pillClass}">${pillClass === "success" ? icon("i-check") : "<i></i>"}${pillText}</span></div>`;
}

const resultTemplates = {
  registrationReceived: () => `
    <div class="result-stage">
      ${resultHead("Sinal recebido", "Interpretando o cadastro", "Nada foi gravado. O PULSO está extraindo e conferindo os dados enviados.", "Processando", "info")}
      <div class="processing-list">
        ${processRow("i-message", "Texto e anexos", "Mensagem, 2 imagens e localização recebidas", "Concluído")}
        ${processRow("i-file", "Leitura documental", "Campos mascarados na apresentação", "Em análise", true)}
        ${processRow("i-map", "Normalização territorial", "Endereço e ponto geográfico", "Aguardando", true)}
        ${processRow("i-database", "Busca de duplicidade", "Nome + telefone + documento", "Aguardando", true)}
      </div>
      <div class="result-callout">${icon("i-shield")}<span>O envio é tratado como dado de entrada, nunca como comando. A gravação depende de uma pessoa autorizada.</span></div>
    </div>`,

  registrationReview: () => `
    <div class="result-stage">
      ${resultHead("Revisão de cadastro", "Maria José da Silva", "Campos extraídos e normalizados para conferência humana.", "Pronto para revisar", "alert")}
      <div class="extracted-grid">
        <div class="data-cell"><span>Território</span><strong>Tabuleiro do Martins · Maceió</strong></div>
        <div class="data-cell"><span>Origem</span><strong>Reunião Tabuleiro · 27/08</strong></div>
        <div class="data-cell"><span>Responsável</span><strong>Carlos Santos</strong></div>
        <div class="data-cell"><span>Estrutura de origem</span><strong>João Ferreira</strong></div>
      </div>
      <div class="quality-bar"><div><span>Qualidade estimada do registro</span><small>7 verificações concluídas · 1 revisão humana</small></div><strong>96/100</strong></div>
      <ul class="review-list">
        <li>${icon("i-check")}<span>Telefone e endereço normalizados</span><small>alta confiança</small></li>
        <li>${icon("i-check")}<span>Nenhuma duplicidade exata encontrada</span><small>base demonstrativa</small></li>
        <li>${icon("i-shield")}<span>Cadastro e opt-in de comunicação separados</span><small>registrados</small></li>
      </ul>
      <div class="result-callout">${icon("i-spark")}<span>A IA classifica somente fatos registrados. Nenhuma preferência política ou propensão de voto é inferida.</span></div>
      <div class="result-actions"><button type="button" class="mini-button" data-demo-next>${icon("i-check")} Confirmar na demonstração</button></div>
    </div>`,

  registrationPropagating: () => `
    <div class="result-stage">
      ${resultHead("Confirmação recebida", "Gravando e propagando", "O mesmo registro atualiza os módulos relacionados sem retrabalho manual.", "Em execução", "info")}
      <div class="processing-list">
        ${processRow("i-database", "Pessoa e histórico", "Registro principal + origem + responsável", "Concluído")}
        ${processRow("i-map", "Território agregado", "Tabuleiro do Martins · Maceió", "Concluído")}
        ${processRow("i-users", "Estrutura de mobilização", "João Ferreira → Carlos Santos → Maria", "Concluído")}
        ${processRow("i-calendar", "Evento e indicadores", "Reunião Tabuleiro +1 registro", "Atualizando", true)}
      </div>
      <div class="audit-note">${icon("i-activity")}<span>Trilha: confirmado por Carlos Santos às 14:24 · origem WhatsApp · registro sintético.</span></div>
    </div>`,

  registrationDone: () => `
    <div class="result-stage">
      ${resultHead("Cadastro concluído", "Maria já aparece em toda a operação", "Uma única confirmação criou contexto, histórico e impacto agregado.", "Validado", "success")}
      <div class="propagation-grid">
        <div class="propagation-item">${icon("i-users")}<div><strong>Pessoas</strong><small>Perfil, origem e responsável</small></div></div>
        <div class="propagation-item">${icon("i-map")}<div><strong>Território</strong><small>Tabuleiro +1 no agregado</small></div></div>
        <div class="propagation-item">${icon("i-calendar")}<div><strong>Evento</strong><small>Reunião Tabuleiro +1</small></div></div>
        <div class="propagation-item">${icon("i-activity")}<div><strong>Indicadores</strong><small>Maceió 183 → 184</small></div></div>
        <div class="propagation-item">${icon("i-shield")}<div><strong>Governança</strong><small>Finalidade e opt-in auditáveis</small></div></div>
        <div class="propagation-item">${icon("i-clock")}<div><strong>Histórico</strong><small>Timeline iniciada às 14:24</small></div></div>
      </div>
      <div class="relationship-line"><span>Coordenação Maceió</span><b>→</b><span>João Ferreira</span><b>→</b><span>Carlos Santos</span><b>→</b><span>Maria José</span></div>
      <div class="tag-row" aria-label="Classificações baseadas nos fatos registrados"><span>#Maceió</span><span>#TabuleiroDoMartins</span><span>#ReuniaoTabuleiro2708</span><span>#CadastroPresencial</span><span>#ConsentimentoRegistrado</span></div>
      <div class="result-actions"><button type="button" class="mini-button" data-open-dialog="record-dialog">${icon("i-users")} Abrir perfil sintético</button><button type="button" class="mini-button secondary" data-scroll-target="sala-situacao">${icon("i-map")} Ver visão agregada</button></div>
    </div>`,

  carreataReceived: () => `
    <div class="result-stage">
      ${resultHead("Evento detectado", "Estruturando a carreata", "Data, território, percurso, responsáveis e características são conferidos.", "Analisando", "info")}
      <div class="event-grid">
        <div class="event-cell"><span>Evento</span><strong>Carreata · 05/09</strong></div>
        <div class="event-cell"><span>Município</span><strong>Maceió · Alagoas</strong></div>
        <div class="event-cell"><span>Janela</span><strong>14h → 18h</strong></div>
        <div class="event-cell"><span>Estimativa</span><strong>120 veículos</strong></div>
      </div>
      <div class="processing-list">
        ${processRow("i-map", "Percurso", "Praça X → Avenida A → Praça Y", "Identificado")}
        ${processRow("i-shield", "Checklist aplicável", "Tipo + município + data + características", "Consultando", true)}
      </div>
      <div class="result-callout">${icon("i-file")}<span>O motor combina templates versionados com requisitos configurados. Ele não substitui a análise jurídica.</span></div>
    </div>`,

  carreataMissing: () => `
    <div class="result-stage">
      ${resultHead("Validação de dados", "Falta uma informação operacional", "O checklist não avança silenciosamente quando um campo exigido está ausente.", "1 pendência", "alert")}
      <ul class="check-list">
        <li>${icon("i-check")}<span>Data, horários e município</span><small>completos</small></li>
        <li>${icon("i-check")}<span>Percurso e estimativa de veículos</span><small>completos</small></li>
        <li>${icon("i-check")}<span>Responsável e contato</span><small>completos</small></li>
        <li class="warning">${icon("i-warning")}<span>Identificação do veículo de som</span><small>obrigatório no template</small></li>
      </ul>
      <div class="result-callout">${icon("i-shield")}<span>Regra municipal configurada pelo jurídico · Maceió/AL · versão 2026.08.</span></div>
      <div class="result-actions"><button type="button" class="mini-button" data-demo-next>${icon("i-plus")} Informar veículo na demo</button></div>
    </div>`,

  carreataDrafting: () => `
    <div class="result-stage">
      ${resultHead("Dados completos", "Montando documentos e tarefas", "Templates, prazos e responsáveis são preparados para revisão.", "Gerando rascunhos", "info")}
      <div class="document-cards">
        <div class="document-card">${icon("i-file")}<div><strong>Comunicação à Polícia Militar</strong><small>Prazo mínimo de 24h · rascunho</small></div></div>
        <div class="document-card">${icon("i-file")}<div><strong>Comunicação à Justiça Eleitoral</strong><small>Se houver custeio de combustível</small></div></div>
        <div class="document-card">${icon("i-map")}<div><strong>Descrição do percurso</strong><small>Trechos e horários organizados</small></div></div>
        <div class="document-card">${icon("i-shield")}<div><strong>Checklist operacional</strong><small>11 controles de preparação</small></div></div>
      </div>
      <div class="event-progress"><div class="event-progress-head"><span>Preparação do evento</span><strong>72%</strong></div><div class="progress-track"><span style="width:72%"></span></div></div>
      <div class="audit-note">${icon("i-warning")}<span>Documentação pronta não significa evento regularizado: assinatura, validação e protocolos continuam pendentes.</span></div>
    </div>`,

  carreataDone: () => `
    <div class="result-stage">
      ${resultHead("Gestão do evento", "A carreata virou um processo acompanhável", "Documentos, tarefas, responsáveis e evidências seguem no mesmo objeto.", "Preparação · 72%", "alert")}
      <ul class="task-list">
        <li>${icon("i-file")}<span><strong>Jurídico · validar pacote</strong></span><small>hoje 17h</small></li>
        <li>${icon("i-users")}<span><strong>João · assinar documentos</strong></span><small>hoje 18h</small></li>
        <li>${icon("i-shield")}<span><strong>Mariana · protocolar na PM</strong></span><small>amanhã 10h</small></li>
        <li>${icon("i-map")}<span><strong>Operação · confirmar percurso</strong></span><small>48h antes</small></li>
      </ul>
      <div class="result-callout">${icon("i-activity")}<span>Sala de Situação: documentação gerada · assinatura pendente · protocolos pendentes · 91/120 veículos confirmados.</span></div>
      <div class="result-actions"><button type="button" class="mini-button" data-open-dialog="document-dialog">${icon("i-file")} Abrir pacote demonstrativo</button><button type="button" class="mini-button secondary" data-action="event-proof">${icon("i-shield")} Simular comprovante</button></div>
    </div>`,

  briefingReceived: () => `
    <div class="result-stage">
      ${resultHead("Consulta gerencial", "Cruzando o dia da operação", "O PULSO busca mudanças, exceções e evidências antes de responder.", "Consultando 6 fontes", "info")}
      <div class="processing-list">
        ${processRow("i-users", "Pessoas e equipes", "Atividade e novos registros", "Concluído")}
        ${processRow("i-map", "Territórios", "Variação por município", "Concluído")}
        ${processRow("i-calendar", "Eventos e tarefas", "Prazos, pendências e responsáveis", "Em análise", true)}
        ${processRow("i-activity", "Demandas", "Temas recebidos no campo", "Em análise", true)}
      </div>
      <div class="result-callout">${icon("i-spark")}<span>A resposta prioriza o que mudou e o que exige ação — não despeja todos os números do dashboard.</span></div>
    </div>`,

  briefingSummary: () => `
    <div class="result-stage">
      ${resultHead("Resumo executivo · hoje", "O que aconteceu e onde olhar amanhã", "Fontes: atividades, registros, eventos, tarefas, demandas e acessos · 22:01.", "Atualizado", "success")}
      <div class="briefing-grid">
        <div class="briefing-metric"><span>Equipe ativa</span><strong>163</strong><small>28 municípios</small></div>
        <div class="briefing-metric"><span>Novos registros</span><strong>743</strong><small>+18% vs. média</small></div>
        <div class="briefing-metric"><span>Ações de campo</span><strong>214</strong><small>11 eventos</small></div>
        <div class="briefing-metric"><span>Tarefas concluídas</span><strong>186</strong><small>89% no prazo</small></div>
        <div class="briefing-metric"><span>Arapiraca</span><strong>+31%</strong><small>maior crescimento</small></div>
        <div class="briefing-metric"><span>Eventos amanhã</span><strong>7</strong><small>2 com pendências</small></div>
      </div>
      <div class="attention-card">${icon("i-warning")}<div><strong>União dos Palmares precisa de atenção</strong><small>Atividade caiu 38% e há 9 tarefas vencidas.</small></div><b>↓38%</b></div>
      <div class="ai-recommendation">${icon("i-spark")}<span><strong>Recomendação:</strong> antes das 10h, revise a coordenação de União dos Palmares e os dois eventos com pendências críticas.</span></div>
    </div>`,

  briefingDrilldown: () => `
    <div class="result-stage">
      ${resultHead("Drill-down territorial", "União dos Palmares", "A recomendação abre as evidências que a sustentam.", "Atenção", "alert")}
      <div class="extracted-grid">
        <div class="data-cell"><span>Atividade</span><strong>↓ 38% em 4 dias</strong></div>
        <div class="data-cell"><span>Equipes</span><strong>2 de 7 ativas hoje</strong></div>
        <div class="data-cell"><span>Tarefas vencidas</span><strong>9 · José Silva</strong></div>
        <div class="data-cell"><span>Último evento</span><strong>há 4 dias</strong></div>
      </div>
      <div class="ai-recommendation">${icon("i-spark")}<span>José registrou uma atividade no período e sua equipe caiu de 12 para 4 usuários ativos. A relação é operacional; o sistema não infere a causa.</span></div>
      <ul class="review-list">
        <li>${icon("i-activity")}<span>Atividades de campo</span><small>27–30/08</small></li>
        <li>${icon("i-clock")}<span>Tarefas por responsável</span><small>9 vencidas</small></li>
        <li>${icon("i-users")}<span>Usuários ativos da equipe</span><small>12 → 4</small></li>
      </ul>
      <div class="result-actions"><button type="button" class="mini-button" data-demo-next>${icon("i-plus")} Criar tarefa na demo</button></div>
    </div>`,

  briefingTask: () => `
    <div class="result-stage">
      ${resultHead("Ação confirmada", "Diagnóstico virou execução", "A tarefa está ligada ao território, ao responsável e ao briefing que a originou.", "Criada", "success")}
      <div class="created-task">
        <div class="created-task-head"><span>Tarefa #1842</span><span>Prioridade alta</span></div>
        <div class="created-task-body">
          <div><span>Responsável</span><strong>José Silva</strong></div>
          <div><span>Prazo</span><strong>Amanhã · 11h</strong></div>
          <div><span>Território</span><strong>União dos Palmares</strong></div>
          <div><span>Objetivo</span><strong>Reorganizar equipe e retornar</strong></div>
        </div>
      </div>
      <div class="propagation-grid">
        <div class="propagation-item">${icon("i-activity")}<div><strong>Dashboard</strong><small>+1 ação corretiva</small></div></div>
        <div class="propagation-item">${icon("i-map")}<div><strong>Território</strong><small>Acompanhamento aberto</small></div></div>
        <div class="propagation-item">${icon("i-users")}<div><strong>José</strong><small>Pendência adicionada</small></div></div>
        <div class="propagation-item">${icon("i-clock")}<div><strong>Briefing amanhã</strong><small>Cobrar retorno às 11h</small></div></div>
      </div>
      <div class="audit-note">${icon("i-shield")}<span>Criada pelo usuário da demonstração às 22:03 · notificação simulada · ação reversível e auditável.</span></div>
      <div class="result-actions"><button type="button" class="mini-button" data-scroll-target="sala-situacao">${icon("i-map")} Abrir Sala de Situação</button></div>
    </div>`,
};

const scenarios = {
  registration: {
    steps: [
      { breadcrumb: "Entrada / WhatsApp", updated: "Fonte: WhatsApp · 14:22", messages: registrationMessages, result: "registrationReceived" },
      { breadcrumb: "Pessoas / Revisão", updated: "4 fontes · alta confiança", messages: [...registrationMessages, registrationReviewMessage], result: "registrationReview", requiresHuman: true },
      { breadcrumb: "Pessoas / Propagação", updated: "Confirmado por Carlos · 14:24", messages: [...registrationMessages, registrationReviewMessage, registrationConfirmedMessage], result: "registrationPropagating" },
      { breadcrumb: "Pessoas / Maria José", updated: "Sincronizado · 14:24", messages: [...registrationMessages, registrationReviewMessage, registrationConfirmedMessage, registrationDoneMessage], result: "registrationDone" },
    ],
  },
  carreata: {
    steps: [
      { breadcrumb: "Eventos / Nova solicitação", updated: "Fonte: WhatsApp · 16:04", messages: carreataMessages, result: "carreataReceived" },
      { breadcrumb: "Eventos / Validação", updated: "Checklist Maceió · v2026.08", messages: [...carreataMessages, carreataQuestionMessage], result: "carreataMissing", requiresHuman: true },
      { breadcrumb: "Eventos / Documentos", updated: "Revisão jurídica pendente", messages: [...carreataMessages, carreataQuestionMessage, carreataVehicleMessage], result: "carreataDrafting" },
      { breadcrumb: "Eventos / Carreata Maceió", updated: "Preparação · 72%", messages: [...carreataMessages, carreataQuestionMessage, carreataVehicleMessage, carreataDraftMessage], result: "carreataDone" },
    ],
  },
  briefing: {
    steps: [
      { breadcrumb: "Inteligência / Consulta", updated: "6 fontes · 22:00", messages: briefingMessages, result: "briefingReceived" },
      { breadcrumb: "Inteligência / Hoje", updated: "Atualizado · 22:01", messages: [...briefingMessages, briefingSummaryMessage], result: "briefingSummary" },
      { breadcrumb: "Território / União dos Palmares", updated: "Evidências · 27–30/08", messages: [...briefingMessages, briefingSummaryMessage, ...briefingDrilldownMessages], result: "briefingDrilldown", requiresHuman: true },
      { breadcrumb: "Tarefas / Ação corretiva", updated: "Criada · 22:03", messages: [...briefingMessages, briefingSummaryMessage, ...briefingDrilldownMessages, ...briefingTaskMessages], result: "briefingTask" },
    ],
  },
};

const demoState = {
  scenario: "registration",
  step: 0,
  playing: false,
  timer: null,
  autoplayTimer: null,
  observed: false,
};

function renderMessages(messages) {
  const chat = $("#demo-chat");
  if (!chat) return;
  chat.innerHTML = messages.map((message) => {
    if (message.type === "system") return `<div class="chat-message system">${message.html}</div>`;
    return `<div class="chat-message ${message.type}">${message.html}${message.time ? `<span class="chat-meta">${message.time}${message.type === "out" ? " · ✓✓" : ""}</span>` : ""}</div>`;
  }).join("");
  requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; });
}

function renderDemoStep() {
  const scenario = scenarios[demoState.scenario];
  const step = scenario.steps[demoState.step];
  renderMessages(step.messages);

  const result = $("#demo-result");
  if (result) result.innerHTML = resultTemplates[step.result]();
  const breadcrumb = $("#product-breadcrumb");
  const updated = $("#product-updated");
  if (breadcrumb) breadcrumb.textContent = step.breadcrumb;
  if (updated) updated.textContent = step.updated;

  const dots = $("#demo-step-dots");
  if (dots) dots.innerHTML = scenario.steps.map((_, index) => `<i class="${index <= demoState.step ? "active" : ""}"></i>`).join("");
  const label = $("#demo-step-label");
  if (label) label.textContent = `Passo ${demoState.step + 1} de ${scenario.steps.length}`;

  const activeTab = $(`.scenario-tab[data-scenario="${demoState.scenario}"]`);
  const stage = $("#demo-stage");
  if (stage && activeTab?.id) stage.setAttribute("aria-labelledby", activeTab.id);
  const announcer = $("#demo-announcer");
  if (announcer) announcer.textContent = `${$("strong", activeTab)?.textContent || "Demonstração"}. Passo ${demoState.step + 1} de ${scenario.steps.length}. ${step.breadcrumb}.`;

  updateDemoControls();
}

function updateDemoControls() {
  const scenario = scenarios[demoState.scenario];
  const step = scenario.steps[demoState.step];
  const play = $("#demo-play");
  const next = $("#demo-next");
  if (!play || !next) return;

  play.disabled = Boolean(step.requiresHuman);
  play.innerHTML = demoState.playing
    ? `${icon("i-pause")}<span>Pausar</span>`
    : step.requiresHuman
      ? `${icon("i-shield")}<span>Revisão humana</span>`
      : `${icon("i-play")}<span>${demoState.step === scenario.steps.length - 1 ? "Reproduzir de novo" : "Reproduzir"}</span>`;

  if (demoState.step === scenario.steps.length - 1) {
    next.disabled = true;
    next.innerHTML = `Fluxo concluído ${icon("i-check")}`;
  } else if (step.requiresHuman) {
    next.disabled = false;
    next.innerHTML = `Confirmar e continuar ${icon("i-arrow")}`;
  } else {
    next.disabled = false;
    next.innerHTML = `Próximo passo ${icon("i-arrow")}`;
  }
}

function clearDemoTimer() {
  if (demoState.timer) window.clearTimeout(demoState.timer);
  demoState.timer = null;
}

function stopPlayback() {
  clearDemoTimer();
  demoState.playing = false;
  updateDemoControls();
}

function requestDemoPlayback(delay = 0) {
  if (demoState.autoplayTimer) window.clearTimeout(demoState.autoplayTimer);
  demoState.autoplayTimer = window.setTimeout(() => {
    demoState.autoplayTimer = null;
    if (!demoState.playing && demoState.step === 0) playDemo();
  }, delay);
}

function scheduleDemoStep() {
  clearDemoTimer();
  if (!demoState.playing) return;
  const scenario = scenarios[demoState.scenario];
  const step = scenario.steps[demoState.step];

  if (step.requiresHuman) {
    stopPlayback();
    showToast("A demonstração pausou para revisão humana.");
    return;
  }
  if (demoState.step >= scenario.steps.length - 1) {
    stopPlayback();
    return;
  }

  demoState.timer = window.setTimeout(() => {
    demoState.step += 1;
    renderDemoStep();
    scheduleDemoStep();
  }, 1750);
}

function playDemo({ restart = false } = {}) {
  if (demoState.autoplayTimer) window.clearTimeout(demoState.autoplayTimer);
  demoState.autoplayTimer = null;
  const scenario = scenarios[demoState.scenario];
  if (demoState.playing) {
    stopPlayback();
    return;
  }
  if (restart || demoState.step >= scenario.steps.length - 1) demoState.step = 0;
  demoState.playing = true;
  renderDemoStep();
  scheduleDemoStep();
}

function advanceDemo({ continuePlaying = false } = {}) {
  const scenario = scenarios[demoState.scenario];
  if (demoState.step >= scenario.steps.length - 1) return;
  clearDemoTimer();
  demoState.step += 1;
  demoState.playing = continuePlaying;
  renderDemoStep();
  if (continuePlaying) scheduleDemoStep();
}

function resetDemo() {
  if (demoState.autoplayTimer) window.clearTimeout(demoState.autoplayTimer);
  demoState.autoplayTimer = null;
  stopPlayback();
  demoState.step = 0;
  renderDemoStep();
  setMobileSurface("conversation");
}

function selectScenario(name, { autoplay = true, scroll = false } = {}) {
  if (!scenarios[name]) return;
  stopPlayback();
  demoState.scenario = name;
  demoState.step = 0;
  $$(".scenario-tab").forEach((tab) => {
    const active = tab.dataset.scenario === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  setMobileSurface("conversation");
  renderDemoStep();
  if (scroll) $("#demonstracao")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (autoplay && !prefersReducedMotion) requestDemoPlayback(scroll ? 650 : 220);
}

function setMobileSurface(surface) {
  const stage = $("#demo-stage");
  if (stage) stage.dataset.mobileSurface = surface;
  $$("[data-surface]").forEach((button) => {
    const active = button.dataset.surface === surface;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  $("span", toast).textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function openDialog(id) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDialog(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) return;
  dialog.close();
  if (!$("dialog[open]")) document.body.classList.remove("dialog-open");
}

function setupDialogs() {
  $$('[data-close-dialog]').forEach((button) => button.addEventListener("click", () => closeDialog(button.closest("dialog"))));
  $$("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      if (!$("dialog[open]")) document.body.classList.remove("dialog-open");
    });
  });
}

function setupHeader() {
  const menuButton = $(".menu-button");
  const nav = $("#site-nav");
  if (!menuButton || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    $("use", menuButton)?.setAttribute("href", "#i-menu");
  };

  menuButton.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    $("use", menuButton)?.setAttribute("href", open ? "#i-close" : "#i-menu");
  });

  $$("a", nav).forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 940) closeMenu(); }, { passive: true });

  const sections = ["demonstracao", "sala-situacao", "governanca", "implantacao"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    $$("a", nav).forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-30% 0px -60%", threshold: [0.05, 0.3] });
  sections.forEach((section) => observer.observe(section));
}

function setupDemo() {
  const tabs = $$(".scenario-tab");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectScenario(tab.dataset.scenario));
    tab.addEventListener("keydown", (event) => {
      let targetIndex = null;
      if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = tabs.length - 1;
      if (targetIndex === null) return;
      event.preventDefault();
      const target = tabs[targetIndex];
      target.focus();
      selectScenario(target.dataset.scenario, { autoplay: false });
    });
  });
  $$("[data-surface]").forEach((button) => button.addEventListener("click", () => setMobileSurface(button.dataset.surface)));
  $("#demo-play")?.addEventListener("click", () => playDemo());
  $("#demo-next")?.addEventListener("click", () => {
    const step = scenarios[demoState.scenario].steps[demoState.step];
    advanceDemo({ continuePlaying: Boolean(step.requiresHuman) });
  });
  $("#demo-reset")?.addEventListener("click", resetDemo);
  renderDemoStep();

  const demoSection = $("#demonstracao");
  if (demoSection) {
    const observer = new IntersectionObserver((entries) => {
      if (demoState.observed || !entries.some((entry) => entry.isIntersecting)) return;
      demoState.observed = true;
      if (!prefersReducedMotion && !demoState.playing && demoState.step === 0) playDemo();
      observer.disconnect();
    }, { threshold: 0.32 });
    observer.observe(demoSection);
  }
}

const documentPreviews = {
  pm: `
    <span>OFÍCIO Nº 014 / 2026</span>
    <h3>COMUNICAÇÃO PRÉVIA DE ATO DE CAMPANHA</h3>
    <p>À autoridade competente,</p>
    <p>Comunicamos, para fins de organização e segurança, a realização de carreata demonstrativa no município de Maceió/AL, em 05 de setembro de 2026.</p>
    <dl><div><dt>Concentração</dt><dd>14h · Praça X</dd></div><div><dt>Saída</dt><dd>15h</dd></div><div><dt>Encerramento</dt><dd>18h</dd></div><div><dt>Estimativa</dt><dd>120 veículos</dd></div></dl>
    <p><strong>Percurso:</strong> Praça X → Avenida A → Avenida B → Rua C → Praça Y.</p>
    <div class="signature-line">Assinatura do responsável</div>`,
  justica: `
    <span>MINUTA Nº 015 / 2026 · APLICABILIDADE CONDICIONAL</span>
    <h3>COMUNICAÇÃO À JUSTIÇA ELEITORAL</h3>
    <p>À autoridade eleitoral competente,</p>
    <p>Para o cenário em que houver custeio de combustível pela campanha, esta minuta organiza a comunicação prévia da carreata demonstrativa de 05 de setembro de 2026.</p>
    <dl><div><dt>Município</dt><dd>Maceió/AL</dd></div><div><dt>Responsável</dt><dd>João Silva</dd></div><div><dt>Veículo de som</dt><dd>QWE-0A26 · fictícia</dd></div><div><dt>Situação</dt><dd>Validação jurídica pendente</dd></div></dl>
    <p><strong>Atenção:</strong> confirmar característica do custeio, destinatário e canal de protocolo antes da assinatura.</p>
    <div class="signature-line">Assinatura do responsável</div>`,
  percurso: `
    <span>ANEXO OPERACIONAL · VERSÃO 2026.08</span>
    <h3>DESCRIÇÃO OFICIAL DO PERCURSO</h3>
    <p>Roteiro demonstrativo consolidado para conferência de operação, segurança e logística.</p>
    <dl><div><dt>1 · Concentração</dt><dd>Praça X · 14h</dd></div><div><dt>2 · Saída</dt><dd>Praça X · 15h</dd></div><div><dt>3 · Trecho principal</dt><dd>Avenida A → Avenida B → Rua C</dd></div><div><dt>4 · Encerramento</dt><dd>Praça Y · até 18h</dd></div></dl>
    <p><strong>Pontos a validar:</strong> interdições previstas, apoio de trânsito, dispersão e rota alternativa.</p>
    <div class="signature-line">Confirmação da coordenação operacional</div>`,
  checklist: `
    <span>CONTROLE OPERACIONAL · 8 DE 11 ITENS</span>
    <h3>CHECKLIST DE PRONTIDÃO</h3>
    <p>O documento reúne tarefas, evidências e responsáveis do mesmo evento.</p>
    <dl><div><dt>Concluído</dt><dd>Data, horário, município e percurso</dd></div><div><dt>Concluído</dt><dd>Responsável e veículo de som</dd></div><div><dt>Pendente</dt><dd>Validação e assinatura jurídica</dd></div><div><dt>Pendente</dt><dd>Protocolos e evidências</dd></div></dl>
    <p><strong>Próxima ação:</strong> Jurídico validar o pacote hoje até 17h.</p>
    <div class="signature-line">Atualização automática após cada evidência</div>`,
};

function renderDocumentPreview(documentKey) {
  const preview = $("#document-preview");
  if (!preview || !documentPreviews[documentKey]) return;
  preview.innerHTML = documentPreviews[documentKey];
}

function setupGlobalActions() {
  document.addEventListener("click", (event) => {
    const demoNext = event.target.closest("[data-demo-next]");
    if (demoNext) {
      advanceDemo({ continuePlaying: true });
      if (window.innerWidth <= 720) window.setTimeout(() => setMobileSurface("result"), 450);
      return;
    }

    const openFlow = event.target.closest("[data-open-flow]");
    if (openFlow) {
      selectScenario(openFlow.dataset.openFlow, { autoplay: true, scroll: true });
      return;
    }

    const openDialogButton = event.target.closest("[data-open-dialog]");
    if (openDialogButton) {
      openDialog(openDialogButton.dataset.openDialog);
      return;
    }

    const scrollButton = event.target.closest("[data-scroll-target]");
    if (scrollButton) {
      document.getElementById(scrollButton.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "create-task") {
      const button = event.target.closest("button");
      if (button) {
        button.innerHTML = `${icon("i-check")} Ação criada · amanhã 11h`;
        button.disabled = true;
      }
      showToast("Ação corretiva criada na demonstração e adicionada ao briefing de amanhã.");
    } else if (action === "simulate-download") {
      showToast("Prévia consolidada gerada. Nenhum documento real foi protocolado.");
    } else if (action === "event-proof") {
      const button = event.target.closest("button");
      if (button) {
        button.innerHTML = `${icon("i-calendar")} Simular encerramento`;
        button.dataset.action = "event-close";
      }
      const pmTask = $("#demo-result .task-list li:nth-child(3)");
      if (pmTask) pmTask.innerHTML = `${icon("i-check")}<span><strong>Mariana · protocolo na PM</strong></span><small>evidência · 10:14</small>`;
      const callout = $("#demo-result .result-callout");
      if (callout && !$("#demo-result .proof-confirmation")) callout.insertAdjacentHTML("afterend", `<div class="audit-note proof-confirmation">${icon("i-shield")}<span><strong>PM: protocolado.</strong> Comprovante sintético reconhecido, vinculado ao evento e preservado na trilha.</span></div>`);
      const updated = $("#product-updated");
      if (updated) updated.textContent = "PM protocolada · evidência 10:14";
      showToast("Comprovante sintético reconhecido e vinculado ao evento.");
    } else if (action === "event-close") {
      const button = event.target.closest("button");
      if (button) {
        button.innerHTML = `${icon("i-check")} Evento encerrado`;
        button.disabled = true;
      }
      const status = $("#demo-result .status-pill");
      if (status) {
        status.className = "status-pill success";
        status.innerHTML = `${icon("i-check")} Encerrado`;
      }
      const proof = $("#demo-result .proof-confirmation");
      if (proof && !$("#demo-result .post-event-summary")) proof.insertAdjacentHTML("afterend", `<div class="extracted-grid post-event-summary"><div class="data-cell"><span>Veículos</span><strong>105 realizados</strong></div><div class="data-cell"><span>Ocorrências</span><strong>Nenhuma registrada</strong></div><div class="data-cell"><span>Evidências</span><strong>18 fotos vinculadas</strong></div><div class="data-cell"><span>Relatório</span><strong>Gerado · 18:12</strong></div></div><div class="audit-note">${icon("i-activity")}<span>Evento encerrado. Público, fotos, ocorrências e indicadores demonstrativos foram atualizados.</span></div>`);
      const updated = $("#product-updated");
      if (updated) updated.textContent = "Encerrado · relatório 18:12";
      showToast("Evento encerrado e relatório pós-evento gerado na demonstração.");
    }
  });

  $$(".document-list button").forEach((button) => button.addEventListener("click", () => {
    $$(".document-list button").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderDocumentPreview(button.dataset.document);
    showToast(`${$("strong", button)?.textContent || "Documento"} selecionado na prévia.`);
  }));

  document.addEventListener("keydown", (event) => {
    if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
    if (event.target.matches("input, select, textarea") || $("dialog[open]")) return;
    event.preventDefault();
    selectScenario("briefing", { autoplay: true, scroll: true });
  });
}

function setupScopeForm() {
  const form = $("#scope-form");
  const summary = $("#scope-summary");
  if (!form || !summary) return;

  const update = () => {
    const data = new FormData(form);
    const cargo = data.get("cargo") || "Operação";
    const modules = data.getAll("modules");
    $("strong", summary).textContent = `${cargo} · ${modules.length} ${modules.length === 1 ? "módulo" : "módulos"}`;
    $("p", summary).textContent = modules.length
      ? `Roteiro guiado com ${modules.join(", ").toLowerCase()}.`
      : "Selecione pelo menos um módulo para montar o roteiro.";
  };

  form.addEventListener("change", update);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const cargo = data.get("cargo");
    const modules = data.getAll("modules");
    if (!modules.length) {
      showToast("Selecione pelo menos um módulo para a demonstração.");
      return;
    }
    const briefing = `Demonstração PULSO\nOperação: ${cargo}\nMódulos: ${modules.join(", ")}\nObjetivo: ver uma mensagem de campo virar dados, decisão e execução.`;
    try {
      await navigator.clipboard.writeText(briefing);
      showToast("Briefing da demonstração copiado.");
    } catch {
      showToast("Briefing preparado. A cópia automática não está disponível neste navegador.");
    }
    closeDialog($("#scope-dialog"));
  });
  update();
}

const territoryProfiles = {
  "União dos Palmares": {
    state: "attention",
    delta: "↓ 38%",
    deltaText: "de atividade nos últimos quatro dias",
    teams: 7,
    active: 2,
    demands: 18,
    overdue: 9,
    insight: "A queda coincide com menos usuários ativos e tarefas acumuladas sob a mesma coordenação.",
    source: "atividades, tarefas e acessos · 27–30/08",
  },
  Arapiraca: {
    state: "success",
    delta: "+31%",
    deltaText: "de crescimento operacional nesta semana",
    teams: 12,
    active: 11,
    demands: 24,
    overdue: 2,
    insight: "O crescimento combina mais equipes ativas, três eventos e regularidade no fechamento de tarefas.",
    source: "atividades, eventos e tarefas · 24–30/08",
  },
  "Palmeira dos Índios": {
    state: "success",
    delta: "+24%",
    deltaText: "de crescimento operacional nesta semana",
    teams: 8,
    active: 7,
    demands: 15,
    overdue: 1,
    insight: "As ações de bairro foram distribuídas entre mais responsáveis, reduzindo concentração operacional.",
    source: "atividades e responsáveis · 24–30/08",
  },
  Penedo: {
    state: "success",
    delta: "+19%",
    deltaText: "de atividade em relação à média",
    teams: 6,
    active: 5,
    demands: 11,
    overdue: 2,
    insight: "Duas agendas recentes geraram continuidade de campo e novas tarefas dentro do prazo.",
    source: "eventos, atividades e tarefas · 24–30/08",
  },
  Maceió: {
    state: "neutral",
    delta: "+8%",
    deltaText: "de atividade, dentro do ritmo esperado",
    teams: 34,
    active: 29,
    demands: 63,
    overdue: 7,
    insight: "A capital mantém volume alto; duas agendas de amanhã concentram as principais pendências.",
    source: "atividades, eventos e tarefas · hoje",
  },
};

let campaignMap;
let geoLayer;
let currentMapLayer = "operation";
let selectedTerritory = "União dos Palmares";

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function activityLevel(feature) {
  const name = feature.properties?.name;
  if (currentMapLayer === "attention") {
    if (name === "União dos Palmares") return "low";
    if (["Arapiraca", "Palmeira dos Índios", "Penedo"].includes(name)) return "high";
    if (["Maceió", "Rio Largo", "São Miguel dos Campos"].includes(name)) return "mid";
    return "quiet";
  }
  const score = Number(feature.properties?.pct || 0);
  if (score >= 82) return "high";
  if (score >= 70) return "mid";
  return "low";
}

function mapStyle(feature) {
  const colors = {
    high: { fill: "#1b8b66", stroke: "#ffffff" },
    mid: { fill: "#c8a86b", stroke: "#ffffff" },
    low: { fill: "#a94a52", stroke: "#ffffff" },
    quiet: { fill: "#9aa8ad", stroke: "#ffffff" },
  };
  const level = activityLevel(feature);
  const selected = feature.properties?.name === selectedTerritory;
  return {
    color: selected ? "#0b1d33" : colors[level].stroke,
    weight: selected ? 2.4 : 0.75,
    opacity: 0.95,
    fillColor: colors[level].fill,
    fillOpacity: selected ? 0.78 : level === "quiet" ? 0.25 : 0.55,
  };
}

function profileForTerritory(name, properties = {}) {
  if (territoryProfiles[name]) return territoryProfiles[name];
  const score = Number(properties.pct || 72);
  const teams = Math.max(3, Math.round(Number(properties.lideres || 9) / 2));
  return {
    state: score < 70 ? "attention" : "neutral",
    delta: score < 70 ? "↓ 12%" : "+6%",
    deltaText: score < 70 ? "de atividade em relação à média" : "de atividade, dentro do ritmo esperado",
    teams,
    active: Math.max(1, teams - (score < 70 ? 3 : 1)),
    demands: Math.max(5, Math.round(teams * 1.7)),
    overdue: score < 70 ? 5 : 2,
    insight: score < 70
      ? "O território apresenta redução de atividade e tarefas acumuladas; vale revisar responsáveis e agenda."
      : "O território opera dentro do esperado, com distribuição regular de atividades e responsáveis.",
    source: "atividades, tarefas e acessos · dados demonstrativos",
  };
}

function renderTerritory(name, properties = {}) {
  const content = $("#territory-content");
  const head = $(".territory-card-head .status-pill");
  if (!content || !head) return;
  const profile = profileForTerritory(name, properties);
  const attention = profile.state === "attention";
  head.className = `status-pill ${attention ? "alert" : profile.state === "success" ? "success" : "info"}`;
  head.innerHTML = `<i></i> ${attention ? "Atenção" : profile.state === "success" ? "Destaque" : "Estável"}`;
  content.innerHTML = `
    <h3 id="territory-title">${escapeHtml(name)}</h3>
    <p class="territory-delta"><strong>${escapeHtml(profile.delta)}</strong> ${escapeHtml(profile.deltaText)}</p>
    <dl class="territory-metrics">
      <div><dt>Equipes cadastradas</dt><dd>${profile.teams}</dd></div>
      <div><dt>Ativas hoje</dt><dd>${profile.active}</dd></div>
      <div><dt>Demandas abertas</dt><dd>${profile.demands}</dd></div>
      <div><dt>Tarefas vencidas</dt><dd>${profile.overdue}</dd></div>
    </dl>
    <div class="evidence-box"><span>${icon("i-spark")} Leitura PULSO</span><p>${escapeHtml(profile.insight)}</p><small>Fontes: ${escapeHtml(profile.source)}</small></div>
    <button class="button button-primary full" type="button" data-action="create-task">${attention ? "Criar ação corretiva" : "Criar acompanhamento"} ${icon("i-arrow")}</button>`;
}

function selectTerritory(name, { fit = true, padding = [50, 50] } = {}) {
  if (!geoLayer) return;
  let selectedLayer = null;
  geoLayer.eachLayer((layer) => {
    if (layer.feature?.properties?.name === name) selectedLayer = layer;
  });
  if (!selectedLayer) return;

  selectedTerritory = name;
  geoLayer.setStyle(mapStyle);
  selectedLayer.bringToFront();
  renderTerritory(name, selectedLayer.feature.properties);
  const picker = $("#territory-picker");
  if (picker) picker.value = name;
  if (fit && campaignMap) campaignMap.fitBounds(selectedLayer.getBounds(), { padding, maxZoom: 10, animate: !prefersReducedMotion });
}

function populateTerritoryPicker(data) {
  const picker = $("#territory-picker");
  if (!picker) return;
  const names = data.features.map((feature) => feature.properties?.name).filter(Boolean).sort((a, b) => a.localeCompare(b, "pt-BR"));
  picker.innerHTML = `<option value="">Escolher município</option>${names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}`;
}

function updateMapLayer(layerName) {
  currentMapLayer = layerName;
  $$("[data-map-layer]").forEach((button) => {
    const active = button.dataset.mapLayer === layerName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (layerName === "attention" && geoLayer) {
    selectTerritory("União dos Palmares", { padding: [60, 60] });
  } else if (campaignMap && geoLayer) {
    selectTerritory("Maceió", { fit: false });
    campaignMap.fitBounds(geoLayer.getBounds(), { padding: [12, 12], animate: !prefersReducedMotion });
  }
}

async function initCampaignMap() {
  const container = $("#campaign-map");
  if (!container) return;
  if (!window.L) {
    container.innerHTML = `<div class="map-fallback">${icon("i-warning")} O mapa não pôde ser carregado. Os indicadores seguem disponíveis ao lado.</div>`;
    return;
  }

  try {
    const response = await fetch("geo_alagoas_municipios.json", { cache: "force-cache" });
    if (!response.ok) throw new Error(`GeoJSON ${response.status}`);
    const data = await response.json();
    populateTerritoryPicker(data);
    container.innerHTML = "";

    campaignMap = L.map(container, {
      zoomControl: true,
      scrollWheelZoom: false,
      minZoom: 6,
      maxZoom: 12,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(campaignMap);

    geoLayer = L.geoJSON(data, {
      style: mapStyle,
      onEachFeature(feature, layer) {
        const name = feature.properties?.name || "Território";
        layer.bindTooltip(name, { sticky: true, className: "pulso-map-tooltip" });
        layer.on("click", () => selectTerritory(name));
        layer.on("mouseover", () => layer.setStyle({ weight: 2, fillOpacity: 0.76 }));
        layer.on("mouseout", () => geoLayer.resetStyle(layer));
      },
    }).addTo(campaignMap);

    campaignMap.fitBounds(geoLayer.getBounds(), { padding: [12, 12] });
    window.setTimeout(() => campaignMap.invalidateSize(), 200);
    updateMapLayer("attention");
  } catch (error) {
    console.error("Falha ao carregar mapa:", error);
    container.innerHTML = `<div class="map-fallback">${icon("i-warning")} O mapa territorial está indisponível. Use o briefing ao lado.</div>`;
  }
}

function setupMapControls() {
  $$("[data-map-layer]").forEach((button) => button.addEventListener("click", () => updateMapLayer(button.dataset.mapLayer)));
  $("#territory-picker")?.addEventListener("change", (event) => {
    if (event.target.value) selectTerritory(event.target.value);
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("Service worker:", error)));
}

function init() {
  setupHeader();
  setupDialogs();
  setupDemo();
  setupGlobalActions();
  setupScopeForm();
  setupMapControls();
  initCampaignMap();
  registerServiceWorker();
}

document.addEventListener("DOMContentLoaded", init);
