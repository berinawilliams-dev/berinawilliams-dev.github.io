(function () {
  var path = location.pathname;
  var search = location.search;
  var hash = location.hash;
  var suffix = "/index.html";
  if (path.endsWith(suffix)) {
    var stem = path.slice(0, -suffix.length);
    path = stem === "" ? "/" : stem.replace(/\/+$/, "") || "/";
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.replace(/\/+$/, "") || "/";
  }
  var next = path + search + hash;
  var cur = location.pathname + search + hash;
  if (next !== cur && typeof history.replaceState === "function") {
    history.replaceState(null, "", next);
  }
})();
