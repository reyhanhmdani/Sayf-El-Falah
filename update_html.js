const fs = require('fs');
const path = require('path');

const filesToUpdate = ['KbTK.html', 'index.html', 'sd.html'];
const rootDir = __dirname; // c:\Coding\Project\sayf-el-falah

filesToUpdate.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. WebP replacement skipped due to missing sharp library.
  
  // 2. Add loading="lazy" to images

  // We want to skip the first few images (hero images)
  let imgCount = 0;
  content = content.replace(/<img\b([\s\S]*?)>/gi, (match, attributes) => {
    imgCount++;
    if (imgCount <= 2) {
        console.log(`Skipping image ${imgCount} (Hero candidate)`);
        return match; 
    }
    
    if (!attributes.includes('loading=')) {
        console.log(`Adding lazy load to image ${imgCount}`);
        // Insert loading="lazy" before the closing > (or /) if self-closing
        // Actually, match is the whole tag. attributes is the inside.
        // We need to return `<img ${attributes} loading="lazy">` equivalent.
        // But our regex capturing group is just the attributes part?
        // Wait, content.replace(regex, (match, group1) => ...)
        // My regex has (<group1>).
        // match is "<img ...>"
        // group1 is " ..."
        
        // Let's just append it to the end of attributes before the tag closes.
        // Safer: return match.replace('<img', '<img loading="lazy"');
        return match.replace(/<img/i, '<img loading="lazy"');
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No changes needed for ${file}`);
  }
});
