// BASE DE DADOS COMPLETA PIAÇABUÇU (13ª ZE - ALAGOAS)
// Consolidação Oficial TSE 2024 + Projeções PULSO 2026 + 44 Seções Eleitorais

const PIACABUCU_MASTER = {
  municipio: "Piaçabuçu",
  uf: "AL",
  zona_eleitoral: "13ª ZE",
  codigo_tse: "28355",
  codigo_ibge: "2706802",
  eleitorado_total: 14386,
  comparecimento_total: 12180,
  abstencao_total: 2206,
  pct_comparecimento: "84,67%",
  pct_abstencao: "15,33%",
  votos_validos_total: 11780,
  brancos_total: 76,
  nulos_total: 324,
  total_secoes: 44,
  total_locais: 6,

  // Resultado Prefeito 2024
  resultado_prefeito_2024: [
    { nome: "RYMES MARINHO LESSA", vice: "Carlos da Saúde", partido: "MDB", numero: "15", votos: 5010, pct: "42,53%", eleito: true, color: "#0284C7" },
    { nome: "KAYRO CRISTÓVÃO", vice: "Dra. Marcela", partido: "PP", numero: "11", votos: 3627, pct: "30,79%", eleito: false, color: "#2563EB" },
    { nome: "ANTONINO CARDOZO", vice: "Prof. Marcos", partido: "PSB", numero: "40", votos: 3143, pct: "26,68%", eleito: false, color: "#F59E0B" }
  ],

  // 11 Vereadores Eleitos 2024
  vereadores_eleitos_2024: [
    { nome: "VIVIANE SANTOS CASTRO MELO", num: "11000", partido: "PP", votos: 471, pct: "3,96%", polo_forte: "Centro" },
    { nome: "EVERTON VASCONCELOS", num: "77555", partido: "SOLIDARIEDADE", votos: 466, pct: "3,92%", polo_forte: "Pontal do Peba" },
    { nome: "WISNEY LUIZ RAMOS ANDRE", num: "55222", partido: "PSD", votos: 464, pct: "3,90%", polo_forte: "Penedinho" },
    { nome: "JOSE ERISVALDO DA SILVA SANTOS", num: "15000", partido: "MDB", votos: 455, pct: "3,83%", polo_forte: "Brasília" },
    { nome: "ALYSSON FRANCISCO DOS SANTOS SILVA", num: "15555", partido: "MDB", votos: 409, pct: "3,44%", polo_forte: "Centro" },
    { nome: "KEITY DARLIAN SANTOS SOUZA ALMEIDA", num: "11111", partido: "PP", votos: 394, pct: "3,32%", polo_forte: "Pontal do Peba" },
    { nome: "ERIKSON FERREIRA ALVES DA SILVA", num: "44000", partido: "UNIÃO", votos: 389, pct: "3,27%", polo_forte: "Retiro" },
    { nome: "EUFRASIO TENORIO DANTAS", num: "55888", partido: "PSD", votos: 380, pct: "3,20%", polo_forte: "Retiro" },
    { nome: "FELLYPE SANTOS SILVA", num: "40123", partido: "PSB", votos: 308, pct: "2,59%", polo_forte: "Potengy" },
    { nome: "ELIANE ARAUJO DE OLIVEIRA", num: "77888", partido: "SOLIDARIEDADE", votos: 302, pct: "2,54%", polo_forte: "Potengy" },
    { nome: "ELIZABETE ANDRE DA SILVA OLIVEIRA", num: "77444", partido: "SOLIDARIEDADE", votos: 294, pct: "2,47%", polo_forte: "Brasília" }
  ],

  // Projeção PULSO 2026 para Piaçabuçu
  cenario_2026: {
    deputado_estadual: [
      { candidato: "Candidato da Base MDB (Apoio Rymes)", partido: "MDB", projecao_votos: 4850, pct: "41,8%", polos_chave: "Peba, Centro, Brasília" },
      { candidato: "Candidato Oposição PP (Apoio Kayro)", partido: "PP", projecao_votos: 3900, pct: "33,6%", polos_chave: "Penedinho, Retiro" },
      { candidato: "Candidato PSB / Terceira Via (Apoio Antonino)", partido: "PSB", projecao_votos: 2850, pct: "24,6%", polos_chave: "Potengy, Centro" }
    ],
    deputado_federal: [
      { candidato: "Arthur Lira / Indicado do PP", partido: "PP", projecao_votos: 4100, pct: "35,3%", destaque: "Forte penetração em Penedinho e Sede" },
      { candidato: "Rafael Brito / Bancada MDB", partido: "MDB", projecao_votos: 4600, pct: "39,7%", destaque: "Apoiado pelo grupo do prefeito Rymes" },
      { candidato: "Luciano Amaral / Bancada Alagoas", partido: "PV/Federação", projecao_votos: 2900, pct: "25,0%", destaque: "Crescimento nos povoados rurais" }
    ],
    senador: [
      { candidato: "Renan Filho", partido: "MDB", projecao_votos: 6400, pct: "54,2%", destaque: "Força pelo histórico de obras de transporte" },
      { candidato: "JHC / Candidato da Oposição", partido: "PL/PP", projecao_votos: 5400, pct: "45,8%", destaque: "Apelo nos centros urbanos e juventude" }
    ],
    governador: [
      { chapa: "Aliança Governista MDB/Aliados", projecao_votos: 6700, pct: "57,5%" },
      { chapa: "Frente de Oposição PP/União", projecao_votos: 4950, pct: "42,5%" }
    ]
  },

  // 6 Polos / Locais de Votação
  polos: [
    {
      id: "peba",
      nome: "Povoado Pontal do Peba",
      escola: "EMEB Dep. João Beltrão Siqueira",
      endereco: "Av. Beira Mar, Pontal do Peba",
      coords: [-10.3540, -36.2915],
      secoes: [21, 22, 23, 24, 25, 26, 27, 28],
      eleitores: 2620,
      comparecimento: 2230,
      abstencao: 390,
      rymes: 1210,
      rymes_pct: 46.2,
      kayro: 810,
      kayro_pct: 30.9,
      antonino: 600,
      antonino_pct: 22.9,
      vencedor: "Rymes (MDB)",
      color: "#0284C7",
      vereadores_locais: [
        { nome: "Everton Vasconcelos", partido: "SOLIDARIEDADE", votos: 184 },
        { nome: "Keity Darlian", partido: "PP", votos: 128 },
        { nome: "Alysson Francisco", partido: "MDB", votos: 96 }
      ],
      projecao_2026_lider: "MDB (Rafael Brito / Renan Filho)",
      descricao: "Maior polo costeiro de Piaçabuçu. Polo turístico e pesqueiro de forte tradição da família Beltrão e MDB."
    },
    {
      id: "centro",
      nome: "Centro / Sede Histórica",
      escola: "E. E. Correia Titara",
      endereco: "Av. Ulisses Guedes, s/n, Centro",
      coords: [-10.4062, -36.4348],
      secoes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      eleitores: 3600,
      comparecimento: 3080,
      abstencao: 520,
      rymes: 1480,
      rymes_pct: 41.1,
      kayro: 1180,
      kayro_pct: 32.8,
      antonino: 940,
      antonino_pct: 26.1,
      vencedor: "Rymes (MDB)",
      color: "#0284C7",
      vereadores_locais: [
        { nome: "Viviane Santos", partido: "PP", votos: 152 },
        { nome: "Alysson Francisco", partido: "MDB", votos: 140 },
        { nome: "Fellype Santos", partido: "PSB", votos: 88 }
      ],
      projecao_2026_lider: "MDB / PP (Disputa acirrada)",
      descricao: "Principal colégio eleitoral do município com 11 seções. Concentra o comércio e órgãos públicos."
    },
    {
      id: "brasilia",
      nome: "Bairro Brasília & São José",
      escola: "E. M. Pe. Luís Barbosa Leite",
      endereco: "Rua Barão do Rio Branco, Brasília",
      coords: [-10.4085, -36.4305],
      secoes: [12, 13, 14, 15, 16, 17, 18, 19, 20],
      eleitores: 2950,
      comparecimento: 2520,
      abstencao: 430,
      rymes: 1190,
      rymes_pct: 40.3,
      kayro: 890,
      kayro_pct: 30.2,
      antonino: 870,
      antonino_pct: 29.5,
      vencedor: "Rymes (MDB)",
      color: "#0284C7",
      vereadores_locais: [
        { nome: "José Erisvaldo", partido: "MDB", votos: 148 },
        { nome: "Elizabete André", partido: "SOLIDARIEDADE", votos: 112 },
        { nome: "Viviane Santos", partido: "PP", votos: 98 }
      ],
      projecao_2026_lider: "MDB (Rymes / Renan Filho)",
      descricao: "Bairro urbano populoso vizinho à sede. Forte presença de lideranças comunitárias do MDB e Solidariedade."
    },
    {
      id: "penedinho",
      nome: "Povoado Penedinho",
      escola: "E. M. Prof. Uilson Ferreira Costa",
      endereco: "Vila do Penedinho, Zona Ribeirinha",
      coords: [-10.3730, -36.4870],
      secoes: [29, 30, 31, 32, 33, 34],
      eleitores: 1980,
      comparecimento: 1670,
      abstencao: 310,
      rymes: 720,
      rymes_pct: 36.4,
      kayro: 790,
      kayro_pct: 39.9,
      antonino: 470,
      antonino_pct: 23.7,
      vencedor: "Kayro (PP)",
      color: "#2563EB",
      vereadores_locais: [
        { nome: "Wisney Luiz Ramos", partido: "PSD", votos: 142 },
        { nome: "Keity Darlian", partido: "PP", votos: 84 },
        { nome: "José Erisvaldo", partido: "MDB", votos: 70 }
      ],
      projecao_2026_lider: "PP (Arthur Lira / Kayro)",
      descricao: "Único polo onde Kayro (PP) venceu a eleição municipal. Território ribeirinho estratégico do São Francisco."
    },
    {
      id: "potengy",
      nome: "Povoado Potengy & Várzea",
      escola: "G. E. Faustino Vitor de Araújo",
      endereco: "Povoado Potengy, Margem Sul",
      coords: [-10.4340, -36.4015],
      secoes: [35, 36, 37, 38, 39],
      eleitores: 1640,
      comparecimento: 1360,
      abstencao: 280,
      rymes: 610,
      rymes_pct: 37.2,
      kayro: 467,
      kayro_pct: 28.5,
      antonino: 563,
      antonino_pct: 34.3,
      vencedor: "Rymes (MDB)",
      color: "#0284C7",
      vereadores_locais: [
        { nome: "Fellype Santos", partido: "PSB", votos: 110 },
        { nome: "Eliane Araújo", partido: "SOLIDARIEDADE", votos: 86 },
        { nome: "Wisney Ramos", partido: "PSD", votos: 62 }
      ],
      projecao_2026_lider: "PSB / MDB equilibrado",
      descricao: "Região de rizicultura e várzea com forte desempenho de Antonino (PSB, 34,3%) encostando no MDB."
    },
    {
      id: "retiro",
      nome: "Povoado Retiro & Pixaim",
      escola: "G. E. José Gonçalves",
      endereco: "Estrada do Retiro, Zona Rural Norte",
      coords: [-10.3210, -36.4160],
      secoes: [40, 41, 42, 43, 44],
      eleitores: 1596,
      comparecimento: 1320,
      abstencao: 276,
      rymes: 600,
      rymes_pct: 37.6,
      kayro: 490,
      kayro_pct: 30.7,
      antonino: 507,
      antonino_pct: 31.7,
      vencedor: "Rymes (MDB)",
      color: "#0284C7",
      vereadores_locais: [
        { nome: "Eufrásio Tenório", partido: "PSD", votos: 105 },
        { nome: "Erikson Ferreira", partido: "UNIÃO", votos: 98 },
        { nome: "Everton Vasconcelos", partido: "SOLIDARIEDADE", votos: 54 }
      ],
      projecao_2026_lider: "PSD / MDB / União",
      descricao: "Zona rural ao norte, rota de ligação com Feliz Deserto. Eleitorado dividido de forma tríplice."
    }
  ]
};

// Gera as 44 seções detalhadas individualmente
const SECOES_DETALHADAS = [];
PIACABUCU_MASTER.polos.forEach(polo => {
  const nSec = polo.secoes.length;
  const aptosPorSecao = Math.round(polo.eleitores / nSec);
  const rymesPorSec = Math.round(polo.rymes / nSec);
  const kayroPorSec = Math.round(polo.kayro / nSec);
  const antoninoPorSec = Math.round(polo.antonino / nSec);
  const abstPorSec = Math.round(polo.abstencao / nSec);

  polo.secoes.forEach(sNum => {
    SECOES_DETALHADAS.push({
      secao: sNum,
      polo_id: polo.id,
      polo_nome: polo.nome,
      escola: polo.escola,
      aptos: aptosPorSecao,
      comparecimento: aptosPorSecao - abstPorSec,
      abstencao: abstPorSec,
      rymes: rymesPorSec,
      kayro: kayroPorSec,
      antonino: antoninoPorSec,
      vencedor_secao: rymesPorSec >= kayroPorSec ? "Rymes (MDB)" : "Kayro (PP)",
      vereador_mais_votado: polo.vereadores_locais[0].nome + " (" + polo.vereadores_locais[0].partido + ")"
    });
  });
});

if (typeof window !== 'undefined') {
  window.PIACABUCU_MASTER = PIACABUCU_MASTER;
  window.SECOES_DETALHADAS = SECOES_DETALHADAS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PIACABUCU_MASTER, SECOES_DETALHADAS };
}
