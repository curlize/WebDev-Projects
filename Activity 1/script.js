
(function () {
  var photos = Array.prototype.slice.call(document.querySelectorAll('.tile-img'));
  photos.sort(function (a, b) { return Number(a.dataset.i) - Number(b.dataset.i); });

  var modalEl = document.getElementById('lightbox');
  var modal = new bootstrap.Modal(modalEl);
  var imgEl = document.getElementById('lightboxImg');
  var capEl = document.getElementById('lightboxCaption');
  var current = 0;

  function show(i) {
    current = (i + photos.length) % photos.length;
    imgEl.src = photos[current].src;
    imgEl.alt = photos[current].alt;
    capEl.textContent = photos[current].nextElementSibling.textContent;
  }

  photos.forEach(function (p, i) {
    p.addEventListener('click', function () { show(i); modal.show(); });
  });

  document.getElementById('lbPrev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(current + 1); });

  document.addEventListener('keydown', function (e) {
    if (!modalEl.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();