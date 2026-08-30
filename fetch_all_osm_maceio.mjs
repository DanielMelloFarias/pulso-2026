import https from 'https';
import fs from 'fs';

const overpassQuery = `
[out:json][timeout:30];
area["name"="Maceió"]["admin_level"="8"]->.maceio;
(
  relation["boundary"="administrative"](area.maceio);
  relation["place"="suburb"](area.maceio);
  relation["place"="neighbourhood"](area.maceio);
  way["place"="suburb"](area.maceio);
  way["place"="neighbourhood"](area.maceio);
);
out body;
>;
out skel qt;
`;

const postData = 'data=' + encodeURIComponent(overpassQuery);

const options = {
  hostname: 'overpass-api.de',
  port: 443,
  path: '/api/interpreter',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'MaceioGISMapper/2.0'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Overpass elements returned:', parsed.elements.length);
      fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/overpass_maceio_full.json', JSON.stringify(parsed));
      console.log('Saved overpass_maceio_full.json');
    } catch (e) {
      console.error('Parse error:', e.message, data.substring(0, 300));
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(postData);
req.end();
