const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');

// Files to transform
const files = [
  'components/ui/card.jsx',
  'components/TranscriptionViewer.jsx',
  'public/app.jsx'
];

// Ensure dist/js directory exists
const distDir = path.join(__dirname, 'dist', 'js');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Transform each file
files.forEach(file => {
  const source = fs.readFileSync(file, 'utf8');
  const outputPath = path.join(distDir, path.basename(file, '.jsx') + '.js');
  
  babel.transform(source, {
    presets: ['@babel/preset-react'],
    plugins: [],
  }, (err, result) => {
    if (err) {
      console.error(`Error transforming ${file}:`, err);
      return;
    }
    fs.writeFileSync(outputPath, result.code);
    console.log(`Transformed ${file} -> ${outputPath}`);
  });
});