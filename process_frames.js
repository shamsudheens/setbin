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
    const src = path.join(framesDir, file);
    const dest = path.join(framesDir, `frame_${i}.webp`);
    
    try {
      const meta = await sharp(src).metadata();
      
      // We only crop from the bottom to remove the Veo text.
      // E.g., cutting off the bottom 60 pixels. We do NOT crop top, left, or right.
      const cropBottomPx = 60;
      
      await sharp(src)
        .extract({ 
          left: 0, 
          top: 0, 
          width: meta.width, 
          height: meta.height - cropBottomPx 
        })
        .webp({ quality: 80 })
        .toFile(dest);
      
      // Wait to delete PNGs until confirmed by user.
      if (i % 10 === 0 || i === files.length - 1) {
        console.log(`Processed ${i + 1}/${files.length} frames...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  console.log('Finished processing all frames!');
}

processFrames();
