const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'image');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else {
        filelist.push(dirFile);
      }
    } catch (err) {
      console.warn(`Skipping ${dirFile}: ${err.message}`);
    }
  });
  return filelist;
};

const processImages = async () => {
  const files = walkSync(imageDir);
  let processedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const filename = path.basename(file, ext);
      const dir = path.dirname(file);
      const outputFile = path.join(dir, `${filename}.webp`);

      // Skip if webp already exists and is newer (optional, but good for re-runs)
      // For now, we enforce overwrite or check if we want to replace
      // Let's just create the .webp side-by-side.

      try {
        console.log(`Processing: ${file}`);
        const metadata = await sharp(file).metadata();
        
        let pipeline = sharp(file);

        // Resize if too huge (e.g. > 1920px width)
        if (metadata.width > 1920) {
            pipeline = pipeline.resize({ width: 1920 });
        }

        await pipeline
          .webp({ quality: 80 })
          .toFile(outputFile);
          
        processedCount++;
        console.log(`Created: ${outputFile}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  console.log(`\nDone! Processed ${processedCount} images.`);
};

processImages();
