const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'hero-infrastructure.jpg');
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'hero-infrastructure.webp');

  try {
    console.log('Converting hero-infrastructure.jpg to WebP format...');
    
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(2);
    
    console.log(`✓ Conversion complete!`);
    console.log(`  Original: ${(inputStats.size / 1024).toFixed(2)} KB`);
    console.log(`  WebP: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Savings: ${savings}%`);
  } catch (error) {
    console.error('Error converting image:', error);
    process.exit(1);
  }
}

convertToWebP();
