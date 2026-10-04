const fs = require('fs');
const css = fs.readFileSync('dist/app.css', 'utf8'), js = fs.readFileSync('dist/app.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SwadesiGo Growth OS</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js}</script>
</body>
</html>`;
fs.mkdirSync('dist', { recursive: true }); fs.writeFileSync('dist/index.html', html); console.log('built', (html.length / 1024).toFixed(0) + ' KB');
