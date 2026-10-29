/* Play links carry where the visitor came from, as utm_content inside the Play referrer, so the app's install
   source can tell AI assistants, Google and direct visits apart. Only a site name is kept (e.g. chatgpt.com,
   google.com), never a page or a person. The first outside source of the visit wins: it is kept in
   sessionStorage, so a visitor who lands on a guide and installs from the homepage keeps the source they arrived from.
   Values: the landing URL's utm_source, else the referrer's host, else "direct"; "site" when the first page seen
   was opened from another invoisapp.com page (new tab, storage blocked). */
(function () {
  var KEY = 'invois_from';
  function clean(s) {
    s = String(s || '').toLowerCase().replace(/^(www|m)\./, '');
    return /^[a-z0-9._-]{1,40}$/.test(s) ? s : '';
  }
  var from = '';
  try { from = sessionStorage.getItem(KEY) || ''; } catch (e) {}
  if (!from) {
    var ref = '';
    try { ref = clean(new URL(document.referrer).hostname); } catch (e) {}
    var here = clean(location.hostname);
    var q = '';
    try { q = clean(new URLSearchParams(location.search).get('utm_source')); } catch (e) {}
    from = q || (ref && ref !== here ? ref : (ref ? 'site' : 'direct'));
    try { sessionStorage.setItem(KEY, from); } catch (e) {}
  }
  var links = document.querySelectorAll('a[href*="play.google.com/store/apps/details?id=com.invoisapp"]');
  for (var i = 0; i < links.length; i++) {
    var h = links[i].getAttribute('href');
    if (h.indexOf('referrer=') < 0 || h.indexOf('utm_content') >= 0) continue;
    links[i].setAttribute('href', h + '%26utm_content%3D' + encodeURIComponent(from));
  }
})();
