/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');
// Only process .png files
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.png')).sort();

async function processFrames() {
  console.log(`Found ${files.length} PNG frames to process.`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.endsWith('.png')) continue;

    // Extract index from "ezgif-frame-XXX.png"
    const match = file.match(/ezgif-frame-(\d+)\.png/);
    if (!match) continue;
    
    const index = match[1];
    try {
      const src = path.join(framesDir, file);
      const dest = path.join(framesDir, `ezgif-frame-${index}.webp`);
      
      await sharp(src)
        .webp({ quality: 85, lossless: false })
        .toFile(dest);
      
      if (i % 20 === 0 || i === files.length - 1) {
        console.log(`Processed ${i + 1}/${files.length} frames...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  console.log('Finished processing all frames to WebP! New files are in public/frames/');
}

processFrames();
