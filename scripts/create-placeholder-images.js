// Script to create placeholder PNG images for projects
// This avoids CORS issues with SVG in WebGL

const fs = require('fs');
const path = require('path');

// Project colors
const projects = [
  { name: 'mobile-banking-app', color1: '#667eea', color2: '#764ba2' },
  { name: 'ecommerce-platform', color1: '#f093fb', color2: '#f5576c' },
  { name: 'dashboard-analytics', color1: '#4facfe', color2: '#00f2fe' },
  { name: 'design-system-library', color1: '#43e97b', color2: '#38f9d7' },
];

// Create a simple SVG that will be converted to PNG
function createGradientSVG(color1, color2, name) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad)" />
  <text x="400" y="300" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" opacity="0.3">
    ${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
  </text>
</svg>`;
}

// Create directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public', 'projects');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate SVG files with gradients
projects.forEach(project => {
  const svg = createGradientSVG(project.color1, project.color2, project.name);
  const filePath = path.join(publicDir, `${project.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Created: ${project.name}.svg`);
});

console.log('\n✅ All placeholder images created successfully!');
console.log('Note: These are gradient SVGs that should work better with WebGL.');
