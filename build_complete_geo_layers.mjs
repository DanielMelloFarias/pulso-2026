import https from 'https';
import fs from 'fs';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MaceioGIS/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// UF Name mapping
const UF_NAMES = {
  '11': 'Rondônia', '12': 'Acre', '13': 'Amazonas', '14': 'Roraima', '15': 'Pará', '16': 'Amapá', '17': 'Tocantins',
  '21': 'Maranhão', '22': 'Piauí', '23': 'Ceará', '24': 'Rio Grande do Norte', '25': 'Paraíba', '26': 'Pernambuco',
  '27': 'Alagoas', '28': 'Sergipe', '29': 'Bahia',
  '31': 'Minas Gerais', '32': 'Espírito Santo', '33': 'Rio de Janeiro', '35': 'São Paulo',
  '41': 'Paraná', '42': 'Santa Catarina', '43': 'Rio Grande do Sul',
  '50': 'Mato Grosso do Sul', '51': 'Mato Grosso', '52': 'Goiás', '53': 'Distrito Federal'
};

const UF_SIGLAS = {
  '11': 'RO', '12': 'AC', '13': 'AM', '14': 'RR', '15': 'PA', '16': 'AP', '17': 'TO',
  '21': 'MA', '22': 'PI', '23': 'CE', '24': 'RN', '25': 'PB', '26': 'PE',
  '27': 'AL', '28': 'SE', '29': 'BA',
  '31': 'MG', '32': 'ES', '33': 'RJ', '35': 'SP',
  '41': 'PR', '42': 'SC', '43': 'RS',
  '50': 'MS', '51': 'MT', '52': 'GO', '53': 'DF'
};

async function run() {
  // 1. Get Alagoas Municipios metadata (Names & IDs)
  console.log('Fetching AL municipios metadata...');
  const alMunis = await fetchJson('https://servicodados.ibge.gov.br/api/v1/localidades/estados/27/municipios');
  const muniMap = {};
  alMunis.forEach(m => {
    muniMap[m.id] = m.nome;
  });

  // 2. Process Brasil UFs GeoJSON
  console.log('Processing Brasil UFs...');
  const brGeo = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/brasil_ufs.geojson', 'utf8'));
  brGeo.features.forEach(f => {
    const cod = f.properties.codarea;
    f.properties.name = UF_NAMES[cod] || cod;
    f.properties.sigla = UF_SIGLAS[cod] || cod;
    // Mock electoral metrics for national level
    if (cod === '27') { // Alagoas
      f.properties.status = 'Base Principal';
      f.properties.meta = '48.000 votos';
      f.properties.pct = 76.8;
      f.properties.lideres = 218;
    } else if (['26', '28', '29', '25', '24', '23'].includes(cod)) { // Nordeste
      f.properties.status = 'Articulação Regional';
      f.properties.meta = '15.000 votos';
      f.properties.pct = 64.2;
      f.properties.lideres = 45;
    } else {
      f.properties.status = 'Expansão Nacional';
      f.properties.meta = '5.000 votos';
      f.properties.pct = 42.0;
      f.properties.lideres = 12;
    }
  });

  // 3. Process Alagoas Municipios GeoJSON
  console.log('Processing Alagoas Municipios...');
  const alGeo = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/alagoas_municipios.geojson', 'utf8'));
  alGeo.features.forEach(f => {
    const cod = f.properties.codarea;
    const name = muniMap[cod] || cod;
    f.properties.name = name;
    
    if (name === 'Maceió') {
      f.properties.status = 'Capital · Polo Central';
      f.properties.meta = '48.000 votos';
      f.properties.mapeados = '36.840';
      f.properties.pct = 76.8;
      f.properties.lideres = 218;
      f.properties.isCapital = true;
    } else if (name === 'Arapiraca') {
      f.properties.status = 'Polo Agreste';
      f.properties.meta = '14.000 votos';
      f.properties.mapeados = '10.850';
      f.properties.pct = 77.5;
      f.properties.lideres = 52;
    } else if (name === 'Rio Largo') {
      f.properties.status = 'Metropolitana Norte';
      f.properties.meta = '6.500 votos';
      f.properties.mapeados = '5.400';
      f.properties.pct = 83.1;
      f.properties.lideres = 28;
    } else if (name === 'Palmeira dos Índios') {
      f.properties.status = 'Polo Sertão/Agreste';
      f.properties.meta = '5.000 votos';
      f.properties.mapeados = '3.750';
      f.properties.pct = 75.0;
      f.properties.lideres = 22;
    } else if (name === 'Penedo') {
      f.properties.status = 'Baixo São Francisco';
      f.properties.meta = '4.500 votos';
      f.properties.mapeados = '3.600';
      f.properties.pct = 80.0;
      f.properties.lideres = 19;
    } else if (name === 'Marechal Deodoro') {
      f.properties.status = 'Metropolitana Sul';
      f.properties.meta = '4.200 votos';
      f.properties.mapeados = '3.650';
      f.properties.pct = 86.9;
      f.properties.lideres = 24;
    } else if (name === 'União dos Palmares') {
      f.properties.status = 'Zona da Mata';
      f.properties.meta = '4.000 votos';
      f.properties.mapeados = '2.980';
      f.properties.pct = 74.5;
      f.properties.lideres = 16;
    } else {
      // General municipalities
      const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const pct = 60 + (hash % 30);
      const meta = 1000 + (hash % 15) * 200;
      const mapeados = Math.round(meta * (pct / 100));
      f.properties.status = pct >= 80 ? 'Alta Densidade' : (pct >= 70 ? 'Média / Disputa' : 'Expansão');
      f.properties.meta = `${meta.toLocaleString('pt-BR')} votos`;
      f.properties.mapeados = mapeados.toLocaleString('pt-BR');
      f.properties.pct = pct;
      f.properties.lideres = 4 + (hash % 12);
    }
  });

  // Save optimized bundle
  fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/geo_brasil_ufs.json', JSON.stringify(brGeo));
  fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/geo_alagoas_municipios.json', JSON.stringify(alGeo));

  console.log('Successfully bundled BR and AL GeoJSON layers!');
}

run().catch(console.error);
