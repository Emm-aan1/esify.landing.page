document.addEventListener('DOMContentLoaded', function () {
  var headerEl = document.getElementById('header-include');
  var footerEl = document.getElementById('footer-include');

  function markActiveNav(activeKey) {
    var nav = document.querySelector('#header-include nav');
    if (!nav) return;

    nav.querySelectorAll('.nav-link, .dropdown-toggle').forEach(function (a) {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    });

    if (activeKey) {
      var byKey = nav.querySelector('.nav-link[data-key="' + activeKey + '"]');
      if (byKey) {
        byKey.classList.add('active');
        byKey.setAttribute('aria-current', 'page');
        var parentDropdown = byKey.closest('.dropdown');
        if (parentDropdown) {
          var toggle = parentDropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
        return;
      }
    }

    var path = (location.pathname || '').split('/').pop() || 'index.html';
    var exact = nav.querySelector('.nav-link[href="' + path + '"]');
    if (exact) {
      exact.classList.add('active');
      exact.setAttribute('aria-current', 'page');
      var pd = exact.closest('.dropdown');
      if (pd) {
        var t = pd.querySelector('.dropdown-toggle');
        if (t) t.classList.add('active');
      }
      return;
    }

    if (/browse/i.test(path)) {
      var browseToggle = nav.querySelector('.dropdown-toggle[data-key="browse"]');
      if (browseToggle) browseToggle.classList.add('active');
    }
  }

  function tweakHeader() {
    var logo = document.querySelector('#header-include .navbar-brand img');
    if (logo) {
      var h = parseInt((logo.style.height || '').replace('px', '') || 0, 10);
      if (!h || h < 60) logo.style.height = '60px';
    }
  }

  if (headerEl) {
    fetch('header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        headerEl.innerHTML = html;
        tweakHeader();
        var activeKey = headerEl.getAttribute('data-active');
        markActiveNav(activeKey);
      });
  }

  if (footerEl) {
    fetch('footer.html')
      .then(function (r) { return r.text(); })
      .then(function (html) { footerEl.innerHTML = html; });
  }
});
