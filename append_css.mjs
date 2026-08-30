import fs from 'fs';

let css = fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/painel.css', 'utf8');

const customTooltip = `
/* CUSTOM LEAFLET DARK TOOLTIP (PREMIUM GIS HOVER) */
.leaflet-tooltip.custom-leaflet-tooltip-dark {
  background: rgba(8, 18, 14, 0.95) !important;
  backdrop-filter: blur(6px) !important;
  border: 1px solid rgba(232, 255, 104, 0.45) !important;
  color: #ffffff !important;
  border-radius: 6px !important;
  padding: 6px 11px !important;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif !important;
  font-size: 11.5px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7) !important;
}
.leaflet-tooltip.custom-leaflet-tooltip-dark::before {
  border-top-color: rgba(8, 18, 14, 0.95) !important;
}
.leaflet-tooltip.custom-leaflet-tooltip-dark strong {
  font-size: 12.5px;
  color: #ffffff;
  display: block;
}
`;

if (!css.includes('custom-leaflet-tooltip-dark')) {
  css += '\n' + customTooltip;
  fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/painel.css', css);
  console.log('Added custom-leaflet-tooltip-dark to painel.css');
}
