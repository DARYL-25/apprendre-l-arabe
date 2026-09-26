# Bundle Firebase local (js/vendor/firebase.js)

L'app n'utilise pas le CDN de Google : Firebase (Auth + Firestore Lite, v10.14.1) est
regroupé dans un seul fichier local de ~150 Ko, chargé **uniquement** si
`js/firebase-config.js` est rempli. Avantages : fonctionne pareil sur le web et dans
les apps iOS/Android, hors-ligne compris, sans problème de domaine.

Pour le régénérer (rarement nécessaire) :

```
npm init -y && npm install firebase@10 esbuild
npx esbuild entry.js --bundle --minify --format=iife --target=es2018 --outfile=../../js/vendor/firebase.js --legal-comments=none
```
