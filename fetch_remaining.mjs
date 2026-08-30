import https from 'https';
import fs from 'fs';

const missing = [
  { id: 'tabuleiro', query: 'Tabuleiro do Martins, Maceió, Região Geográfica Imediata de Maceió, Alagoas, Região Nordeste, Brasil' },
  { id: 'farol', query: 'Farol, Maceió, Região Geográfica Imediata de Maceió, Alagoas, Região Nordeste, Brasil' },
  { id: 'centro', query: 'Centro, Maceió, Região Geográfica Imediata de Maceió, Alagoas, Região Nordeste, Brasil' },
  { id: 'tabuleiro_alt', query: 'bairro Tabuleiro do Martins, Maceió, Alagoas' },
  { id: 'farol_alt', query: 'bairro Farol, Maceió, Alagoas' },
  { id: 'centro_alt', query: 'bairro Centro, Maceió, Alagoas' }
];

async function search(q) {
  return new Promise((resolve) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&polygon_geojson=1&limit=5`;
    https.get(url, { headers: { 'User-Agent': 'MaceioCRMRefined/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const arr = JSON.parse(data);
          const poly = arr.find(x => x.geojson && (x.geojson.type === 'Polygon' || x.geojson.type === 'MultiPolygon'));
          if (poly) {
            resolve({ type: poly.geojson.type, geojson: poly.geojson, name: poly.display_name });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  for (const item of missing) {
    const res = await search(item.query);
    if (res) {
      console.log(`[FOUND POLYGON] ${item.id} -> ${res.name}`);
      fs.writeFileSync(`C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/${item.id}.json`, JSON.stringify(res.geojson, null, 2));
    } else {
      console.log(`[NOT FOUND] ${item.id}`);
    }
    await new Promise(r => setTimeout(r, 1200));
  }
}

run();
