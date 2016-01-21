
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license  
(function requestAnimationFramePolyfill() {
  var x, lastTime, vendors;
  lastTime = 0;
  vendors = ['ms', 'moz', 'webkit', 'o'];
  for( x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
    window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if( !window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime, timeToCall, id;
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if( !window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) { clearTimeout(id); };
  }
}());

(function(Twoe){
  "use strict";

  /**
   *  @member jQuery
   *  @method serializeJSON
   *  Gets the data from the form in json object format.
   *  Uses jquery function serializeArray to get an array of
   *  values from the form and create an object with them.
   */
  jQuery.fn.serializeJSON = function() {
    var obj = {};
    var arr = $(this).serializeArray();

    for( var i=0; i<arr.length; ++i ) {
      var itm = arr[i];

      // If the element was already defined
      if( !_.isUndefined( obj[ itm.name ] )) {

        // Convert to array if not already one
        if( !_.isArray( obj[ itm.name ] )  ) {
          obj[ itm.name ] = [ obj[ itm.name ] ];
        }
        // add value to array
        obj[ itm.name ].push( itm.value || '' );
      } else {
        // For new elements just add the new property
        obj[ itm.name ] = itm.value || '';
      }
    }
    return obj;
  };

  if( window.Handlebars) {
	  /**
	   * @member HandlebarsHelpers
	   * @method text
	   * Screen text helper for handlebars.
	   * You only need to pass the text id as string parameter
	   *
	   *        {{text 'text_id'}}
	   * 
	   * In case the screen text support replacing tags with values, just add named params
	   *
	   *        {{text 'text_id' replaceId=replaceValue otherReplaceId='value'}}
	   *
	   */
	  Handlebars.registerHelper("text", function(textId, options) {
	    var key, replace, func = "basket", text;

	    if( textId.indexOf("/") >= 0) {
	      textId = textId.split("/");
	      func   = textId[0];
	      textId = textId[1];
	    }

	    if( Twoe.text && Twoe.text[func] && Twoe.text[func][textId]) {
	      text = Twoe.text[func][textId]
	    } else {
	      text = Twoe.debug ? "MISSING TEXT: " + func + "/" + textId : textId;
	    }

	    if( options && options.hash) {
	      for(key in options.hash) {
	        if( options.hash.hasOwnProperty(key) && options.hash[key]) {
	          replace = new RegExp("#" + key + "#", "g");
	          text    = text.replace(replace, options.hash[key]);
	        }
	      }
	    }
	    return new Handlebars.SafeString(text);
	  });

	  Handlebars.registerHelper("text_pluralize", function(data) {
	    var textFnId, options = data.hash;
	    if( !options['one'] || !options['many'] || options['one'] < 0) {
	      return '';
	    }
	    textFnId = options['count'] == 1 ? options['one'] : options['many'];
	    return Handlebars.helpers.text.apply(this, [textFnId, {}]);
	  });

	  /**
	   * @member HandlebarsHelpers
	   * @method price
	   * Price Formatter helper for handlebars
	   * Uses the global config from *Twoe* object to format.
	   */
	  Handlebars.registerHelper('price', function(price) {
	    return new Handlebars.SafeString(formatPrice(price));
	  });  

	  /**
	   * @member HandlebarsHelpers
	   * @method compartmentName
	   * Compartment formatter.
	   * This just translates the compartment code into a screen text
	   */
	  Handlebars.registerHelper('compartmentName', function(code) {
	    return Twoe.text.compartmentName[code] || code;
	  });

	  /**
	   * @member HandlebarsHelpers
	   * @method paxTypeLabel
	   * pax Type Label formatter
	   * Transforms the pax type (ADT, CHD, INF) into a screen text
	   */
	  Handlebars.registerHelper('paxTypeLabel', function(code) {
	    return Twoe.text.paxTypeLabel[code] || code;
	  });

	  /**
	   * @member HandlebarsHelpers
	   * @method lowercase
	   * To lower case
	   * Lowercases the text
	   */
	  Handlebars.registerHelper('lowercase', function(str) {
	    return str.toLowerCase();
	  });
  }

  /**
   * Print debug traces
   */
  function eeDebug() {
    var args  = _.toArray(arguments),
        level = args.pop();

    if( !Twoe.debug || typeof console == "undefined") {
      return;
    }

    if( args.length > 0 && (Twoe.debug & level)) {
      console.log.apply(console, args);
    }
  }

  /**
   * Debug levels
   */
  eeDebug.MSG = {
    TRACE:      1,
    MODEL:      2,
    BASKETVIEW: 4,
    ALL:        7
  };

  /**
   * Format prices following same conventions as its php counterpart.
   * The price config must be exported to the global Twoe.priceConfig
   * See Locations.inc :: getPriceConfig for this
   */
  function formatPrice(price) {
    var amount, label, layout, precision, curr;
    layout    = Twoe.priceConfig.layout;
    precision = Twoe.priceConfig.precision;
    curr      = Twoe.priceConfig.currency;
    price     = Number(price);
    if( _.isNaN(price)) {
      return "";
    }
    // Add same bug from Php version of formatPrice
    //if (precision === 0 && Twoe.priceConfig.thousandSep === '') {
    //	price = parseInt(price);
    //}
    amount = price.toFixed(precision) 											   // round number to fixed number of decimals
                  .replace(/\./, Twoe.priceConfig.decimalSep)                      // decimals separator
                  .replace(/\B(?=(\d{3})+(?!\d))/g, Twoe.priceConfig.thousandSep); // tousands separator
    label = layout.replace( /<curr>/,  curr)
                  .replace( /<price>/, amount);
    return label;
  }

//  function htmlDecode(encoded) {
//    if( !htmlDecode.div) {
//      htmlDecode.div = document.createElement("div");
//    }
//    htmlDecode.div.innerHTML = encoded;
//    return htmlDecode.div.firstChild.nodeValue;
//  }

  var RenderScheduler = function(options) { this.initialize(options); };
  RenderScheduler.prototype = {
    initialize: function(options) {
      this.UPDATE_FREQ = options.UPDATE_FREQ;
      this.DEBUG_LEVEL = options.DEBUG_LEVEL;
      this.tasks = [];
      this.animFrame = null;
      _.bindAll(this);
    },
    schedule: function(task) {
      this.tasks.push(task);
      if( !this.animFrame) {
        this.animFrame = window.requestAnimationFrame(this.render);
      }
    },
    render: function() {
      var task;
      eeDebug("RenderScheduler::render " + this.tasks.length + " tasks", this.DEBUG_LEVEL);
      while( this.tasks.length) {
        task = this.tasks.shift();
        task();
      }
      this.animFrame = null;
    },
    debounce: function(task, delay) {
      var Me = this;
      return _.debounce(function() { Me.schedule(task); }, delay || this.UPDATE_FREQ);
    }
  };

  // Exports
  window.formatPrice     = formatPrice;
  window.RenderScheduler = RenderScheduler;
  window.eeDebug         = eeDebug;

})(window.Twoe || {});  