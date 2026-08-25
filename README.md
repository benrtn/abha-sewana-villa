# Abha Sewana Villa — site web

Site vitrine de la maison d'hôtes, en 9 langues.
**Il n'y a rien à installer et rien à compiler.** Ce sont de simples fichiers :
on les modifie avec un éditeur de texte, et on les redépose sur Netlify.

---

## 1. Ce qu'il y a dans le dossier

```
index.html          La page d'accueil
experiences.html    La page des expériences et des excursions
contact.html        La page contact et « comment venir »

main.js             Le cerveau du site : menu, langues, galerie, bouton Booking
i18n/               Les traductions (fr.json, si.json, ta.json, zh.json,
                    ru.json, hi.json, ja.json, ko.json)
images/             Toutes les photos

favicon.svg         La petite icône dans l'onglet du navigateur
apple-touch-icon.png  La même, pour les iPhone
netlify.toml        Réglages Netlify (à ne pas toucher)
robots.txt          Pour Google (à ne pas toucher)
sitemap.xml         La liste des pages, pour Google
```

> ⚠️ **Important : ouvrez toujours ces fichiers avec un éditeur de texte**
> (Bloc-notes, TextEdit, VS Code…), **jamais avec Word**. Word ajoute des
> caractères invisibles qui cassent la page.
> Et enregistrez toujours en **UTF-8** (c'est le réglage par défaut partout),
> sinon les accents et les alphabets cinghalais, tamoul, chinois… s'abîment.

---

## 2. ⚠️ À FAIRE EN PREMIER : remplacer les photos

Les 18 photos du dossier `images/` sont des **images provisoires**.
Elles affichent le nom du fichier écrit dessus, pour qu'on ne les confonde
pas avec de vraies photos. **Il faut toutes les remplacer avant de publier.**

### Comment remplacer une photo

1. Choisissez votre photo.
2. **Renommez-la exactement comme celle qu'elle remplace**, en gardant
   `.jpg` à la fin. Par exemple `veranda-day.jpg`.
3. Glissez-la dans le dossier `images/` et acceptez de remplacer l'ancienne.
4. C'est tout. Il n'y a rien à modifier dans les pages HTML.

### La liste des photos et où elles apparaissent

| Nom du fichier | Où on la voit |
|---|---|
| `veranda-day.jpg` | Grande photo d'accueil + section « Where you'll eat » |
| `sriyani-portrait.jpg` | Portrait de Sriyani (page d'accueil) |
| `sriyani-chef.jpg` | Image affichée quand on partage le lien sur Facebook / WhatsApp |
| `dinner-clay-pots.jpg` | Section repas + page Expériences |
| `dinner-egg-curry.jpg` | Page Expériences (dîner) |
| `dinner-guests.jpg` | Page Expériences (dîner) |
| `cooking-prep.jpg` | Carte « Cooking » + haut de la page Expériences |
| `cooking-guests.jpg` | Page Expériences (cuisine) |
| `cooking-serving.jpg` | Page Expériences (cuisine) |
| `market-tour-1.jpg` | Carte « Market » + page Expériences |
| `market-tour-2.jpg` | Page Expériences (marché) |
| `craft-workshop.jpg` | Carte « Craft » + page Expériences |
| `sriyani-breakfast.jpg` | Page Expériences (petit-déjeuner) |
| `breakfast-spread-1.jpg` | Page Expériences (petit-déjeuner) |
| `breakfast-spread-2.jpg` | Page Expériences (petit-déjeuner) |
| `guest-sriyani-garden.jpg` | Bandeau de fin de la page Expériences |
| `guests-family-kitchen.jpg` | Bandeau de fin de la page Expériences |
| `entrance-gate.jpg` | Page Contact — le portail blanc et le panneau vert |

Toutes celles qui ne sont pas déjà placées ailleurs apparaissent en plus
dans la galerie de la page d'accueil.

### Conseils pour les photos

- **Format paysage** (plus large que haut) pour toutes, sauf
  `sriyani-portrait.jpg` qui doit être **en portrait** (plus haut que large).
- **Largeur idéale : 1600 pixels.** Plus grand, c'est inutile et ça ralentit
  le site pour les visiteurs en 3G.
- Si vos photos sortent du téléphone et font 5 ou 8 Mo, réduisez-les avant
  de les mettre en ligne. Un site outil gratuit comme **squoosh.app** fait
  ça très bien : ouvrez la photo, réglez la qualité vers 75 %, téléchargez.
  Visez **moins de 400 Ko par photo**.
- Gardez bien l'extension `.jpg` en minuscules.

---

## 3. Modifier un texte

Le site est écrit **en anglais dans les pages HTML**. L'anglais est la langue
par défaut, celle que Google lit.

1. Ouvrez la page concernée (`index.html`, `experiences.html` ou `contact.html`).
2. Cherchez la phrase avec `Ctrl + F` (`Cmd + F` sur Mac).
3. Modifiez **uniquement le texte**, entre `>` et `<`.

Exemple — pour changer le slogan de la page d'accueil, cherchez `hero.tagline` :

```html
<p ... data-i18n="hero.tagline">Your Peaceful Retreat in the Heart of History</p>
         ↑ ne touchez pas à ça      ↑ modifiez seulement ce texte-ci
```

> `data-i18n="hero.tagline"` est l'**étiquette** de la phrase. C'est elle qui
> relie le texte anglais à ses traductions. **Ne la changez jamais.**

**Si vous modifiez une phrase en anglais, pensez à modifier aussi sa
traduction** dans les 8 fichiers de `i18n/` (voir ci-dessous). Sinon les
visiteurs verront l'ancienne version dans leur langue.

---

## 4. Corriger ou modifier une traduction

Chaque langue a son fichier dans `i18n/` :

| Fichier | Langue |
|---|---|
| `fr.json` | Français |
| `si.json` | Cinghalais (සිංහල) |
| `ta.json` | Tamoul (தமிழ்) |
| `zh.json` | Chinois (中文) |
| `ru.json` | Russe (Русский) |
| `hi.json` | Hindi (हिन्दी) |
| `ja.json` | Japonais (日本語) |
| `ko.json` | Coréen (한국어) |

> Il n'y a pas de fichier `en.json` : l'anglais est déjà dans les pages HTML.

Chaque fichier contient des lignes de cette forme :

```json
"hero.tagline": "Votre havre de paix au cœur de l'Histoire",
```

Pour corriger une traduction :

1. Ouvrez le fichier de la langue.
2. Cherchez l'étiquette avec `Ctrl + F` (par exemple `hero.tagline`).
3. Modifiez **uniquement le texte entre les guillemets de droite**.

**Les trois règles à respecter :**

1. Ne changez jamais le texte à **gauche** des deux-points (l'étiquette).
2. Gardez les **guillemets droits** `"` autour du texte, et la **virgule**
   à la fin de la ligne — sauf sur la toute dernière ligne du fichier.
3. Si votre texte contient un guillemet `"`, écrivez-le `\"`.

**Pour vérifier que vous n'avez rien cassé :** copiez tout le contenu du
fichier dans **jsonlint.com** et cliquez sur « Validate ». S'il dit *Valid
JSON*, c'est bon. Si un fichier de langue est cassé, le site n'affichera
simplement pas cette langue — il restera en anglais, il ne plantera pas.

### Ajouter une langue

1. Copiez `fr.json`, renommez-le avec le code de la langue (`de.json`,
   `es.json`…), et traduisez les textes de droite.
2. Ouvrez `main.js`, trouvez la liste `LANGS` vers le début du fichier,
   et ajoutez une ligne avec le nom de la langue **dans cette langue** :
   ```js
   { code: 'de', name: 'Deutsch' },
   ```
3. Dans les 3 fichiers HTML, ajoutez la ligne correspondante à côté des
   autres `<link rel="alternate" hreflang=...>`.

---

## 5. Ajouter un avis de client

Trois emplacements vides attendent sur la page d'accueil, dans la section
**« What our guests say »**.

Ouvrez `index.html`, cherchez `reviews.soon`. Vous trouverez trois blocs
identiques. Dans celui que vous voulez remplir :

```html
<p class="..." data-i18n="reviews.soon">A guest review will appear here soon.</p>
```
devient
```html
<p class="...">"We felt part of the family from the very first evening."</p>
```

et juste en dessous :

```html
<figcaption class="..." data-i18n="reviews.placeholderName">Name — country</figcaption>
```
devient
```html
<figcaption class="...">Marie &amp; Paul — France</figcaption>
```

> Supprimez bien le `data-i18n="..."` sur les deux lignes que vous remplissez.
> Sans ça, le vrai avis serait remplacé par le texte d'attente dans les
> autres langues.

---

## 6. Changer un numéro, l'adresse, le lien Booking.com

Tout est réuni **au même endroit** : ouvrez `main.js`, tout en haut du
fichier se trouve le bloc `SITE` :

```js
var SITE = {
  name: 'Abha Sewana Villa',
  booking: 'https://www.booking.com/Share-aISSaEQ',
  email: 'wgsdgamage@gmail.com',
  phones: [
    { label: '+94 71 288 0371', tel: '+94712880371' },
    { label: '+94 77 140 5266', tel: '+94771405266' }
  ],
  address: 'No. 3323, Stage 3, Anuradhapura, Sri Lanka',
  instagram: '',
  tiktok: ''
};
```

- `label` = le numéro tel qu'il s'affiche (avec les espaces).
- `tel` = le même numéro **sans espaces**, c'est celui qu'appelle le téléphone.
- Une modification ici met à jour l'en-tête et le pied de page des 3 pages.

⚠️ Le téléphone, l'e-mail et l'adresse apparaissent **aussi** en toutes
lettres sur `contact.html` et dans le bloc `LodgingBusiness` (celui pour
Google) des 3 pages. Si un numéro change, cherchez l'ancien numéro dans
tous les fichiers et remplacez-le partout.

### Instagram et TikTok

Quand les comptes existeront, collez simplement les liens entre les
guillemets :

```js
  instagram: 'https://www.instagram.com/votre_compte',
  tiktok: 'https://www.tiktok.com/@votre_compte',
```

Les boutons gris du pied de page et de la page Contact deviennent alors
cliquables tout seuls. Tant que c'est vide, ils restent grisés avec la
mention « Coming soon ».

---

## 7. Mettre le site en ligne sur Netlify

### La première fois

1. Allez sur **app.netlify.com** et créez un compte gratuit.
2. Sur la page d'accueil de Netlify, cherchez la zone
   **« Deploy manually »** / **« Drag and drop your site folder here »**.
3. **Glissez-y le dossier complet du site** (celui qui contient
   `index.html`), pas les fichiers un par un, et pas un fichier `.zip`.
4. Attendez une minute. Netlify affiche une adresse du type
   `https://nom-au-hasard-123.netlify.app`. Le site est en ligne.
5. Dans **Site configuration → Change site name**, remplacez le nom au
   hasard par quelque chose comme `abhasewanavilla`.

### Pour mettre à jour ensuite

Onglet **Deploys** → glissez à nouveau le dossier complet.
La nouvelle version remplace l'ancienne en une minute.

> Si vous ne voyez pas vos changements, faites un rafraîchissement forcé :
> `Ctrl + Shift + R` (`Cmd + Shift + R` sur Mac).

### Pour utiliser votre propre nom de domaine

**Domain management → Add a domain**, puis suivez les instructions.
Le certificat HTTPS est ajouté automatiquement et gratuitement.

---

## 8. À faire une fois, quand l'adresse du site sera définitive

Le site contient pour l'instant une adresse provisoire :
`https://abhasewanavilla.netlify.app`

Quand vous connaîtrez l'adresse finale, remplacez-la **partout** :

- dans `index.html`, `experiences.html` et `contact.html`
  (fonction « Remplacer tout » de votre éditeur) ;
- dans `sitemap.xml` ;
- dans `robots.txt`.

C'est ce qui permet à Google d'associer correctement les 9 versions
linguistiques entre elles.

### Les coordonnées GPS

Le bloc `LodgingBusiness` des 3 pages contient :

```json
"geo": { "@type": "GeoCoordinates", "latitude": 8.3114, "longitude": 80.4037 }
```

Ce sont les coordonnées du **centre d'Anuradhapura**, pas celles exactes
de la maison. Pour les corriger : ouvrez Google Maps, faites un clic droit
sur la maison, cliquez sur les chiffres qui s'affichent (ils se copient
tout seuls), et remplacez les deux nombres dans les 3 pages.

---

## 9. Petites questions fréquentes

**La réservation passe-t-elle par le site ?**
Non, et c'est voulu. Toutes les nuitées passent par Booking.com. Le
téléphone et l'e-mail servent aux questions et aux excursions.

**Comment tester le site sur mon ordinateur avant de publier ?**
Double-cliquez sur `index.html`. Presque tout fonctionnera.
Seul le **changement de langue** ne marchera pas en local (le navigateur
bloque la lecture du dossier `i18n/` quand on ouvre un fichier
directement). Ce n'est pas un problème : une fois en ligne sur Netlify,
les langues fonctionnent normalement.

**Comment forcer une langue dans un lien ?**
Ajoutez `?lang=` suivi du code, par exemple :
`https://…/index.html?lang=fr` ou `?lang=si`.
Pratique pour envoyer le bon lien à un client selon son pays.

**Le site se souvient-il de la langue ?**
Oui. Le choix fait dans le menu du haut est retenu dans le navigateur du
visiteur et suit sur les 3 pages. Si le visiteur n'a rien choisi, le site
utilise la langue de son navigateur, et l'anglais s'il ne la connaît pas.

**J'ai cassé quelque chose, comment revenir en arrière ?**
Dans Netlify, onglet **Deploys** : cliquez sur une version précédente puis
sur **Publish deploy**. L'ancienne version revient immédiatement.

---

## 10. Détails techniques (pour la personne qui aide)

- HTML statique + Tailwind via CDN + un seul `main.js`. Aucun build, aucun npm.
- L'en-tête, le pied de page et la barre « Book » collante sont injectés par
  `main.js` dans `#site-header`, `#site-footer` et `#book-bar`.
- Traductions : chaque nœud traduisible porte `data-i18n="clé"`, et
  `data-i18n-attr="alt"` (ou `content`) quand c'est un attribut qu'il faut
  traduire. L'anglais d'origine est mémorisé au chargement, ce qui permet de
  revenir à l'anglais sans recharger la page.
- Ordre de détection de la langue : `?lang=` → `localStorage` →
  `navigator.language` → anglais. Un choix explicite est mémorisé ; une
  langue simplement devinée d'après le navigateur ne l'est pas.
- Les polices Noto Sinhala / Tamil / Devanagari ne sont téléchargées que si
  le visiteur choisit une de ces trois langues.
- Toutes les images ont `width` et `height` explicites et `loading="lazy"`
  (sauf les images de haut de page), pour éviter les sauts de mise en page
  et rester utilisable en 3G.
- Si une photo manque, un cadre discret s'affiche à la place : la page ne
  montre jamais d'icône d'image cassée.
- **Note de performance :** Tailwind est chargé depuis son CDN, comme demandé.
  C'est très pratique à modifier, mais cela représente un fichier JavaScript
  assez lourd à télécharger avant que la mise en page ne s'affiche. Si un
  jour le site paraît lent sur une connexion 3G, la seule vraie optimisation
  consiste à remplacer ce CDN par une feuille de style CSS figée. Cela
  demande de générer le fichier une fois — et fait perdre le « zéro
  installation » qui fait tout l'intérêt de la version actuelle.
