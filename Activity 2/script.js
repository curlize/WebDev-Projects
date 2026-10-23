/* ════════════════════════════════════════════════════════════
   THE JSON
   All of the page's content lives in this one JSON string:
   your intro, the collections and every pick.
   Each pick points to a photo in the images folder ("img").
   ════════════════════════════════════════════════════════════ */
const PAGE_JSON = `
{
  "profile": {
    "name": "Charlize Mojares",
    "role": "3rd year BS IT student",
    "bio": "I collect small things that make a day better: songs on repeat, comfort food, places I still want to see. Pick a collection below and have a look. Every entry comes with my reason for loving it.",
    "closing": "The list keeps changing. That is the point."
  },

  "categories": [
    { "name": "Music",  "blurb": "On repeat while I code.",           "color": "#d4af37" },
    { "name": "Screen", "blurb": "Films and series I would rewatch.", "color": "#d4af37" },
    { "name": "Food",   "blurb": "Comfort first, always.",            "color": "#d4af37" },
    { "name": "Places", "blurb": "Visited, and still on the list.",   "color": "#d4af37" }
  ],

  "items": [
    { "id": 1, "title": "Libu-libong Buwan", "by": "Khyle Raphael", "category": "Music", "year": null, "rating": 5, "img": "images/music-1.jpg", "tags": ["opm", "soft"], "note": "Gentle and dreamy. It plays on repeat when I need to calm down." },
    { "id": 2, "title": "Always", "by": "Daniel Caesar", "category": "Music", "year": 2017, "rating": 5, "img": "images/music-2.jpg", "tags": ["r&b", "slow"], "note": "Smooth and soulful. Perfect for a quiet night." },
    { "id": 3, "title": "Needy", "by": "Ariana Grande", "category": "Music", "year": 2019, "rating": 4, "img": "images/music-3.jpg", "tags": ["pop", "mellow"], "note": "Soft, honest and somehow always relatable." },
    { "id": 4, "title": "Nonsense", "by": "Sabrina Carpenter", "category": "Music", "year": 2022, "rating": 4, "img": "images/music-4.jpg", "tags": ["pop", "fun"], "note": "Catchy, playful and an instant mood lifter." },
    { "id": 5, "title": "Four Sisters and a Wedding", "by": "Cathy Garcia-Molina", "category": "Screen", "year": 2013, "rating": 5, "img": "images/screen-1.jpg", "tags": ["filipino", "family"], "note": "Funny, emotional and so Filipino. I can rewatch it anytime." },
    { "id": 6, "title": "The Notebook", "by": "Nick Cassavetes", "category": "Screen", "year": 2004, "rating": 5, "img": "images/screen-2.jpg", "tags": ["romance", "classic"], "note": "A classic love story that gets me every time." },
    { "id": 7, "title": "World War Z", "by": "Marc Forster", "category": "Screen", "year": 2013, "rating": 4, "img": "images/screen-3.jpg", "tags": ["thriller", "zombies"], "note": "Fast, tense and impossible to pause." },
    { "id": 8, "title": "Locke and Key", "by": "Netflix series", "category": "Screen", "year": 2020, "rating": 4, "img": "images/screen-4.jpg", "tags": ["fantasy", "mystery"], "note": "Magical keys and a mystery that keeps pulling me in." },
    { "id": 9, "title": "Vanilla Ice Cream", "by": "Always a yes", "category": "Food", "year": null, "rating": 5, "img": "images/food-1.jpg", "tags": ["dessert", "sweet"], "note": "Simple, creamy and the perfect cure for a hot day." },
    { "id": 10, "title": "Sinigang", "by": "Filipino classic", "category": "Food", "year": null, "rating": 5, "img": "images/food-2.jpg", "tags": ["comfort", "soup"], "note": "Sour, hot and perfect on a rainy day." },
    { "id": 11, "title": "Sour Gummy Candies", "by": "Guilty pleasure", "category": "Food", "year": null, "rating": 4, "img": "images/food-3.jpg", "tags": ["candy", "sour"], "note": "Sweet, sour and hard to stop at just one." },
    { "id": 12, "title": "Beef Steak", "by": "Hearty meal", "category": "Food", "year": null, "rating": 4, "img": "images/food-4.jpg", "tags": ["savory", "dinner"], "note": "A proper treat meal, best with rice." },
    { "id": 13, "title": "Switzerland", "by": "Dream trip", "category": "Places", "year": null, "rating": 5, "img": "images/places-1.jpg", "tags": ["mountains", "lakes"], "note": "Alpine views and little wooden chalets. It looks like a painting." },
    { "id": 14, "title": "Japan", "by": "Dream trip", "category": "Places", "year": null, "rating": 5, "img": "images/places-2.jpg", "tags": ["culture", "blossoms"], "note": "Cherry blossoms, temples and food. Top of my travel list." },
    { "id": 15, "title": "Philippines", "by": "Home", "category": "Places", "year": null, "rating": 4, "img": "images/places-3.jpg", "tags": ["islands", "home"], "note": "So many beaches and islands I still want to explore." },
    { "id": 16, "title": "Iceland", "by": "Dream trip", "category": "Places", "year": null, "rating": 4, "img": "images/places-4.jpg", "tags": ["northern lights", "nature"], "note": "Waterfalls, glaciers and maybe the northern lights." }
  ]
}
`;

/* ════════════════════════════════════════════════════════════
   THE CODE
   Reads the JSON above and builds everything on the page.
   ════════════════════════════════════════════════════════════ */
const data = JSON.parse(PAGE_JSON);
let current = 0;      // index of the selected collection
let openId = null;    // id of the pick shown in the modal

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function pad(n) { return n < 10 ? '0' + n : String(n); }
function dots(n) {
  var out = '';
  for (var i = 1; i <= 5; i++) out += '<i class="' + (i <= n ? 'on' : '') + '"></i>';
  return '<span class="dots" role="img" aria-label="' + n + ' out of 5">' + out + '</span>';
}

// Picks in a collection, highest rating first (ties keep the JSON order)
function picksOf(catName) {
  return data.items
    .filter(function (i) { return i.category === catName; })
    .map(function (it, idx) { return { it: it, idx: idx }; })
    .sort(function (a, b) { return b.it.rating - a.it.rating || a.idx - b.idx; })
    .map(function (w) { return w.it; });
}

/* ── Intro ── */
function renderIntro() {
  var p = data.profile;
  document.getElementById('bio').textContent = p.bio;
  document.getElementById('closing').textContent = p.closing;
}

/* ── Collection picker (circles) ── */
function renderSwatches() {
  document.getElementById('swatches').innerHTML = data.categories.map(function (cat, i) {
    var first = picksOf(cat.name)[0];
    var img = first ? '<img src="' + esc(first.img) + '" alt="" onerror="this.remove()">' : '';
    return '<button type="button" class="swatch' + (i === current ? ' active' : '') + '" role="tab" ' +
      'aria-selected="' + (i === current) + '" data-i="' + i + '" style="--c:' + cat.color + '">' +
      '<span class="swatch-dot">' + img + '</span><span>' + esc(cat.name) + '</span></button>';
  }).join('');
}

/* ── One picture tile ── */
function tile(item, cls, showBadge) {
  return '<button type="button" class="pick ' + cls + '" data-id="' + item.id + '" aria-label="Open ' + esc(item.title) + '">' +
    '<span class="pic-letter" aria-hidden="true">' + esc(item.title.charAt(0)) + '</span>' +
    '<img class="pic" src="' + esc(item.img) + '" alt="" loading="lazy" onerror="this.remove()">' +
    (showBadge ? '<span class="badge-top">Top pick</span>' : '') +
    '<span class="pick-over"><span class="d-block pick-title">' + esc(item.title) + '</span>' +
    '<span class="d-block pick-by">' + esc(item.by) + (item.year ? ' · ' + item.year : '') + '</span>' +
    dots(item.rating) + '</span></button>';
}

/* ── The selected collection ── */
function renderStage() {
  var cat = data.categories[current];
  var list = picksOf(cat.name);
  var avg = list.reduce(function (s, i) { return s + i.rating; }, 0) / list.length;

  var stage = document.getElementById('stage');
  document.documentElement.style.setProperty('--c', cat.color); // recolors the whole page glow
  document.getElementById('stageIndex').textContent =
    'Collection ' + pad(current + 1) + ' of ' + pad(data.categories.length);
  document.getElementById('stageBlurb').textContent = cat.blurb;
  document.getElementById('stageMeta').textContent =
    list.length + (list.length === 1 ? ' pick' : ' picks') + ' · average rating ' + avg.toFixed(1);

  // Title: letters drop in one by one
  var title = document.getElementById('stageTitle');
  title.setAttribute('aria-label', cat.name);
  title.innerHTML = cat.name.split('').map(function (ch, i) {
    return '<span aria-hidden="true" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : esc(ch)) + '</span>';
  }).join('');

  // Scrolling strip of titles (two identical halves so it loops seamlessly)
  var half = list.concat(list).map(function (it) {
    return '<span>' + esc(it.title) + '<b>&#10022;</b></span>';
  }).join('');
  document.getElementById('marquee').innerHTML = half + half;

  // Bento: one big tile, then a wide tile and two squares, then any extras
  var feature = list[0];
  var rest = list.slice(1, 4);
  var extra = list.slice(4);

  var right;
  if (rest.length === 3) {
    right = '<div class="col-12">' + tile(rest[0], 'pick-wide') + '</div>' +
            '<div class="col-6">' + tile(rest[1], 'pick-sq') + '</div>' +
            '<div class="col-6">' + tile(rest[2], 'pick-sq') + '</div>';
  } else {
    right = rest.map(function (r) {
      return '<div class="' + (rest.length === 1 ? 'col-12' : 'col-6') + '">' + tile(r, 'pick-std') + '</div>';
    }).join('');
  }

  var html = '<div class="row g-3">' +
    '<div class="col-12 col-lg-6">' + tile(feature, 'pick-feature', true) + '</div>' +
    '<div class="col-12 col-lg-6"><div class="row g-3">' + right + '</div></div></div>';

  if (extra.length) {
    html += '<div class="row g-3 mt-0">' + extra.map(function (e) {
      return '<div class="col-6 col-lg-3">' + tile(e, 'pick-std') + '</div>';
    }).join('') + '</div>';
  }

  var picks = document.getElementById('picks');
  picks.innerHTML = html;
  picks.classList.remove('fade');
  void picks.offsetWidth;          // restart the fade-in
  picks.classList.add('fade');
}

function setCollection(i, updateHash) {
  var n = data.categories.length;
  current = (i + n) % n;
  renderSwatches();
  renderStage();
  if (updateHash) history.replaceState(null, '', '#' + slug(data.categories[current].name));
}

/* ── Details modal ── */
var modal = new bootstrap.Modal(document.getElementById('detail'));

function openPick(id) {
  var item = data.items.find(function (x) { return x.id === id; });
  if (!item) return;
  openId = id;
  var cat = data.categories.find(function (c) { return c.name === item.category; });
  var list = picksOf(item.category);
  var pos = list.findIndex(function (x) { return x.id === id; });

  document.querySelector('.detail-content').style.setProperty('--c', cat.color);
  document.getElementById('detailPic').innerHTML =
    '<img src="' + esc(item.img) + '" alt="" onerror="this.remove()">';
  document.getElementById('detailTitle').textContent = item.title;
  document.getElementById('detailBy').textContent =
    item.by + ' · ' + item.category + (item.year ? ' · ' + item.year : '');
  document.getElementById('detailDots').innerHTML = dots(item.rating);
  document.getElementById('detailPos').textContent = '#' + (pos + 1) + ' in ' + item.category;
  document.getElementById('detailNote').textContent = item.note;
  document.getElementById('detailTags').innerHTML =
    item.tags.map(function (t) { return '<span class="tag">#' + esc(t) + '</span>'; }).join('');
  modal.show();
}

function stepPick(dir) {
  var item = data.items.find(function (x) { return x.id === openId; });
  var list = picksOf(item.category);
  var pos = list.findIndex(function (x) { return x.id === openId; });
  openPick(list[(pos + dir + list.length) % list.length].id);
}

/* ── Events ── */
document.getElementById('swatches').addEventListener('click', function (e) {
  var b = e.target.closest('.swatch');
  if (b) setCollection(Number(b.dataset.i), true);
});
document.getElementById('prevCol').addEventListener('click', function () { setCollection(current - 1, true); });
document.getElementById('nextCol').addEventListener('click', function () { setCollection(current + 1, true); });

document.getElementById('surprise').addEventListener('click', function () {
  var item = data.items[Math.floor(Math.random() * data.items.length)];
  setCollection(data.categories.findIndex(function (c) { return c.name === item.category; }), true);
  openPick(item.id);
});

var picksEl = document.getElementById('picks');
picksEl.addEventListener('click', function (e) {
  var t = e.target.closest('.pick');
  if (t) openPick(Number(t.dataset.id));
});

// Tilt + cursor light on the tiles (mouse only)
picksEl.addEventListener('pointermove', function (e) {
  if (e.pointerType !== 'mouse') return;
  var t = e.target.closest('.pick');
  if (!t) return;
  var r = t.getBoundingClientRect();
  var x = (e.clientX - r.left) / r.width;
  var y = (e.clientY - r.top) / r.height;
  t.style.setProperty('--ry', ((x - 0.5) * 8).toFixed(2) + 'deg');
  t.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
  t.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
  t.style.setProperty('--my', (y * 100).toFixed(1) + '%');
});
picksEl.addEventListener('pointerout', function (e) {
  var t = e.target.closest('.pick');
  if (!t) return;
  t.style.setProperty('--rx', '0deg');
  t.style.setProperty('--ry', '0deg');
});

document.getElementById('prevPick').addEventListener('click', function () { stepPick(-1); });
document.getElementById('nextPick').addEventListener('click', function () { stepPick(1); });

document.addEventListener('keydown', function (e) {
  var open = document.getElementById('detail').classList.contains('show');
  if (open) {
    if (e.key === 'ArrowLeft') stepPick(-1);
    if (e.key === 'ArrowRight') stepPick(1);
  } else {
    if (e.key === 'ArrowLeft') setCollection(current - 1, true);
    if (e.key === 'ArrowRight') setCollection(current + 1, true);
  }
});

function fromHash() {
  var h = location.hash.replace('#', '');
  var i = data.categories.findIndex(function (c) { return slug(c.name) === h; });
  return i === -1 ? 0 : i;
}
window.addEventListener('hashchange', function () { setCollection(fromHash(), false); });

/* ── Go ── */
renderIntro();
current = fromHash();
renderSwatches();
renderStage();