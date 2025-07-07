import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skapa en ZIP-fil med hela dist-mappen
function createSiteExport() {
  const output = fs.createWriteStream('fixvia-website-export.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Högsta komprimering
  });

  output.on('close', function() {
    console.log('✅ Export klar! Fil: fixvia-website-export.zip');
    console.log('📦 Storlek: ' + (archive.pointer() / 1024 / 1024).toFixed(2) + ' MB');
    console.log('🚀 Redo för Netlify deployment!');
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  // Lägg till hela dist-mappen
  archive.directory('dist/', false);

  // Lägg till README för deployment
  const deployInstructions = `# Fixvia Website - Deployment Guide

## 📁 Innehåll
Denna ZIP-fil innehåller en komplett, produktionsklar version av Fixvia-webbplatsen.

## 🚀 Deployment till Netlify

### Metod 1: Drag & Drop (Enklast)
1. Gå till https://netlify.com
2. Logga in eller skapa gratis konto
3. Dra denna ZIP-fil direkt till Netlify's deploy-område
4. Vänta ~30 sekunder - klart!

### Metod 2: Via Dashboard
1. Klicka "Add new site" → "Deploy manually"
2. Ladda upp denna ZIP-fil
3. Netlify packar upp automatiskt

## ✅ Vad som ingår
- ✓ Alla HTML, CSS, JS filer (minifierade)
- ✓ Alla bilder och assets
- ✓ _redirects fil för React Router
- ✓ SEO-optimerad
- ✓ Responsiv design
- ✓ Produktionsklar

## 🌐 Efter deployment
- Du får en gratis .netlify.app URL
- HTTPS aktiveras automatiskt
- CDN för snabb global laddning
- Kan koppla egen domän senare

## 📞 Support
Om du behöver hjälp, kontakta Bolt AI support.

Skapad: ${new Date().toLocaleString('sv-SE')}
Version: 1.0.0
`;

  archive.append(deployInstructions, { name: 'DEPLOYMENT-GUIDE.txt' });

  archive.finalize();
}

// Kör export
createSiteExport();