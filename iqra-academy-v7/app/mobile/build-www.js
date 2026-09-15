// Copie l'app web (dossier parent) dans mobile/www — c'est ce que Capacitor embarque dans l'app native.
// Lancer :  npm run www   (ou npm run sync pour copier + synchroniser iOS/Android)
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), out = path.join(__dirname, "www");
const KEEP = ["index.html", "manifest.webmanifest", "css", "js", "icons"]; // pas de sw.js : inutile dans l'app native
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const item of KEEP) fs.cpSync(path.join(root, item), path.join(out, item), { recursive: true });
// pont natif (plugins) compilé avec esbuild → www/native.js
require("esbuild").buildSync({ entryPoints: [path.join(__dirname, "native-src.js")], bundle: true, minify: true,
  format: "iife", target: "es2017", outfile: path.join(out, "native.js") });
let html = fs.readFileSync(path.join(out, "index.html"), "utf8");
html = html.replace("<head>", '<head>\n<script src="native.js"></script>');
fs.writeFileSync(path.join(out, "index.html"), html);
console.log("✅ www/ prêt (" + KEEP.join(", ") + ")");
