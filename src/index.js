(function () {
  // note: the `locales` is the stringified JSON from <script>var locales = {title:'...', ...};</script> tag in HTML
  console.log("title: ", locales.title, { locales });
})();