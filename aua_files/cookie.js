/**
 * Initialization code for all pages
 */
jQuery(function() {
  // Create some globals
  window.d      = document;
  window.safari = (navigator.userAgent.toLowerCase().indexOf('safari') != -1) ? true : false;
  window.gebtn  = function(parEl,child) { return parEl.getElementsByTagName(child); };
  window.body   = gebtn(d,'body')[0];

  jQuery('body').addClass('has-js');

  //  Cookie management for AUA-12589
  jQuery(".cop .btn").click(function () {
    closecookiepolicy(200);
  });

  coPl = jQuery(".cop");
  if (coPl.length > 0) {
    var cookievalue = getcookiepolicy("ckp");
    if (cookievalue == "1" || cookievalue == "0") {
        closecookiepolicy(0);
    } else {
        coPl.fadeIn(0);
    }
  }

  jQuery(".cop .close").click(function () {
    jQuery(".cop").fadeOut(200);
  });

});

/**
 * returns cookiepolicy
 * @param  {string} cname
 * @return {string} cookiepolicy name
 */
function getcookiepolicy(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
/**
 * Setups the cookipolicy
 * @param  {int} fadeout time
 */
function closecookiepolicy(time) {
  jQuery(".cop").fadeOut(time);
  if (time > 0) {
    var dtclose = new Date();
    dtclose.setDate(dtclose.getDate() + 180);
    document.cookie = "ckp=1; expires=" + dtclose.toUTCString() + "; path=/; domain="+cookiedomain;
  }
}
