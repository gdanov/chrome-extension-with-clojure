var keepAliveTimer = null;
var windowtimeout  = null;

// indexOf for IE < 9
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (elt /*, from*/) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) from += len;

    for (; from < len; from++) {
      if (from in this && this[from] === elt) return from;
    }
    return -1;
  };
}


function getElement( id)
{
  if( document.getElementById( id)) {
    return document.getElementById( id);
  }

  return null;
}

function show( x)
{
  var obj = getElement( x);
  if( obj) {
    obj.style.display = 'block';
  }
}

function hide( x)
{
  var obj = getElement( x);
  if( obj) {
    obj.style.display = 'none';
  }
}

function zeroIFNAN( x)
{
  if( isNaN( x) || x == '')
    return 0.0;

  return parseFloat( x);
}

function inputWithPrefilledText( id, active)
{
  if( active) {
    hide( id+'2');
    show( id);
    getElement( id).focus();
  } else if( getElement( id).value == '') {
    show( id+'2');
    hide( id);
  }
}

function sessionTimeout()
{
  var timeout_window = window.open( 'timeout.fly?p=AUA','sessiontimeout','scrollbars=no,menubar=no,status=yes,resizable=no,width=355,height=350');
  timeout_window.focus();
}

window.onload = function() {
  // check if we can do something after loading the page
  if( self.onLoad) {
    onLoad();
  }
}

window.onunload = function() {
  // reset doubleclick
  submit = false;

  // check if we can do something after unloading the page
  if( self.onUnLoad) {
    onUnLoad();
  }
}

var submit = false;
function do_submit()
{
  if( submit) { return false; }
  submit = true;
  return true;
}

function handleonmouseup( event)
{
  if( !event) {
    event = window.event;
  }

  posX = event.screenX;
  posY = event.screenY;
}

var posX;
var posY;
document.onmouseup = handleonmouseup;

function calendarweek( datum)
{
  var jh = datum.getFullYear();

  jh++;

  var calwo = caldiff( datum, jh);
  while( calwo < 1) {
    jh--;
    calwo = caldiff( datum, jh);
  }

  return calwo;
}

function caldiff( datum, jahr)
{
  var d4j = new Date( jahr, 0, 4);
  var wt4j = (d4j.getDay()+6)%7;
  return Math.floor(1.05+(datum.getTime()-d4j.getTime())/6048e5+wt4j/7);
}

function stopEvent( event)
{
  if( event.preventDefault) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.returnValue = false;
  }
}

function getXPosition( e)
{
  var x = parseInt( e.offsetLeft);

  if( e.offsetParent) {
    return x + getXPosition( e.offsetParent);
  }

  return x;
}

function getHTTP()
{
  var http;

  if( window.ActiveXObject) {
    http = new ActiveXObject( 'Microsoft.XMLHTTP');
  } else if( window.XMLHttpRequest) {
    http = new XMLHttpRequest();
  }

  if( !http) {
    alert( 'Sorry, no Ajax support!');
    return null;
  }

  return http;
}

function isOKHTTP( http)
{
  if( http.readyState != 4) {
    return false; // not ready
  }

  if( http.status != 200) {
    return false; // request failed
  }

  return true;
}

function startKeepAlive()
{
  if( keepAliveTimer) {
    window.clearTimeout( keepAliveTimer);
  }

  keepAliveTimer = window.setTimeout( keepAlive, 1000*60*10);
}

function keepAlive()
{
  // AJAX keepalive request
  var http = getHTTP();
  if( !http) {
    return;
  }

  // request the offers
  http.open( 'post', 'ka.fly');
  http.onreadystatechange = function() { keepAliveDone( http); };
  http.send( null);
}

function keepAliveDone( http)
{
  if( !isOKHTTP( http)) {
    return;
  }

  startKeepAlive();
}

function isMobile() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  if( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test( ua) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( ua.substr( 0, 4))) {
    return true;
  }
  return false;
}

function isDeeplink( module) {
  if( !request) {
    return false;
  }

  if( module === 'fb' && request.action && request.action === 'avail' &&
      request.origin && request.destin && request.day0 && request.month0 &&
      request.numadt && request.numchd && request.numinf && request.journey) {
    return true;
  }
  if( module === 'sp' && request.pos) {
    return true;
  }
  return false;
}

function translateDeeplink( module){
  var url = '';
  mobile_url = 'https://auamob-test.2e-systems.com';
  if( document.domain.indexOf( 'austrian.com') !== -1 || document.URL.indexOf( 'austrian.com') !== -1) {
    mobile_url = 'https://m.austrian.com';
  }
  if( module === 'fb') {
    url = mobile_url + '/#booking/start/?';

    var d0 = parseInt( request.day0 < 9) ? '0' + parseInt(request.day0) : request.day0;
    var m0 = parseInt( request.month0 < 9) ? '0' + parseInt(request.month0) : request.month0;
    var dateout = d0 + '.' + m0;
    var y0 = request.year0;
    if( !y0) {
      y0 = new Date().getFullYear();
    }

    if( new Date(y0, request.month0, request.day0) < new Date()) {
      y0++;
    }
    dateout += '.' + y0;

    url += 'pos=' + request.pos +
           '&origin=' + request.origin + '&destin=' + request.destin +
           '&numpax='+request.numadt+','+request.numchd +','+request.numinf +
           '&dateout=' + dateout +
           '&return=' + ( parseInt(request.journey) - 1);

    if( request.day1 && request.month1) {
      var d1 = parseInt( request.day1) < 9 ? '0' + parseInt( request.day1) : request.day1;
      var m1 = parseInt( request.month1) < 9 ? '0' + parseInt( request.month1) : request.month1;
      var datein = d1 + '.' + m1;
      var y1 = request.year1;
      if( !y1) {
        y1 = new Date().getFullYear();
      }
      if( new Date(y1, request.month1, request.day1) < new Date()) {
        y1++;
      }
      datein += '.' + y1;
      url += '&datein=' + datein;
    }

    if( request.direct) {
      url += '&direct=' + request.direct;
    }

  }

  if( module === 'sp') {
    url = mobile_url + '/#offers/start/?pos=' + request.pos;
    if( request.origin) {
      url += '&origin='+request.origin;
    }
    if( request.destin) {
      url += '&destin='+request.destin;
    }
  }

  if( url && request.ns_campaign) {
    url += '&ns_campaign=' + request.ns_campaign;
  }

  if( url && request.l) {
    url += '&l=' + request.l;
  }
  return url;
}

function checkDeeplinkRedirect() {
  var module = '';
  if( window.location.href.indexOf('fb.fly') > -1){
    module = 'fb';
  }
  if( window.location.href.indexOf('sp.fly') > -1){
    module = 'sp';
  }

  if( isMobile() && document.cookie.indexOf("noredirect") === -1 && isDeeplink( module)) {
    if( confirm( redirect_question)) {
      var url = translateDeeplink( module);
      if( url) {
       document.location = url;
      }
    } else {
      document.cookie = 'noredirect=1';
    }
  }
}

//waitScreen shows an overlay over the whole content screen, and shows the wait screen indicator
function waitScreen() { 
  jQuery('#waitScreenOverlay').show('slow',function() { 
    jQuery('#waitScreenContainer').fadeIn('slow'); 
    //we add the gif when showing the progress box. this will make sure that the 
    //gif is "activated" when shown, and also that it starts from zero
    jQuery('#waitScreenAnimation').html('<img src="/images/anim-overlay.gif" />');
  } 
); }


 
