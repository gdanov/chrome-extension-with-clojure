// update the price
function updatePrice( journey, priceref, taxref, index, evprcref, evtaxref,
                      fclass,  radioid, type, flt, day, comp) {

  var sel0, sel1, numJourneys = (oneway ? 1 : 2);

  // update the inbound radio buttons for the min- and maxstay
  // Check only when outbound is selected
  // In case there are no available options, reset the basket
  if( !oneway && journey === 0) {
    validateInbounds(radioid);
  }

  // set old price with default TSC
  if( sel[journey]) {
    oldPrice( journey, flt);
  }

  sel0 = $('input:radio[name=sel0]:checked').val();
  if( !oneway) {
    sel1 = $('input:radio[name=sel1]:checked').val();
  }

  // save new selection
  sel[journey]   = new Array( priceref, taxref, fclass, radioid, type, index);
  evsel[journey] = new Array( evprcref, evtaxref, fclass, radioid);

  // update radio buttons depends on selection
  if( !oneway) {
    updateFareGroups( sel0, sel1);
  }

  selectFlight(journey, day, flt, comp);

  if( !allJourneysSelected(numJourneys)) {
    return;
  }

  var tscix = getTSCIndex(numJourneys);
//  var tscix      = 'default';
//  var compart    = [];
//  var vouchertsc = true;
//  var classes    = "";
//
////check all journeys
// for( var jix = 0; jix < numJourneys; ++jix) {
//   if( !sel[jix]) {
//     // no price update if one journey empty
//     return;
//   }
//
//   priceref   = sel[jix][0];
//   evpriceref = evsel[jix][0];
//
//   compart.push(prices[priceref][3]);
//   classes += sel[jix][2];
//
//   if( evpriceref === -1) {
//     vouchertsc = false;
//   }
// }
//
// classes = classes.split('');
//
// // first check for voucher TSC
// if( vouchertsc && prices['tsc']['evoucher']) {
//   tscix = 'evoucher';
// }
//
// // set up a pattern to ignore compartments in first instance
// var pattern = /\w{2}(,\w{2})*$/;
//
// // check for classes
// var tsc_amount = 0.0;
// if( tscix === 'default') {
//   for( var fcla = 0; fcla < classes.length; fcla++) {
//     var found = false;
//     for( var key in prices['tsc']) {
//       // skip default and compartment
//       if( key === 'default' || pattern.test( key)) {
//         continue;
//       }
//
//       if( key.indexOf( classes[fcla]) != -1) {
//         found = true;
//         if( parseFloat( prices['tsc'][key][0]) >= tsc_amount) {
//           tscix = key;
//           tsc_amount = prices['tsc'][key][0];
//         }
//         break;
//       }
//     }
//
//     if( found == false && parseFloat( prices['tsc']['default'][0]) >= tsc_amount) {
//       tscix = 'default';
//       tsc_amount = prices['tsc']['default'][0];
//     }
//   }
// }
//
// if( tscix == 'default') {
//   for( var comp = 0; comp < compart.length; comp++) {
//     var found = false;
//     for( var key in prices['tsc']) {
//       // skip default and compartment
//       if( key == 'default') {
//         continue;
//       }
//
//       if( key.indexOf( compart[comp]) != -1) {
//         found = true;
//         if( parseFloat( prices['tsc'][key][0]) >= tsc_amount) {
//           tscix = key;
//           tsc_amount = prices['tsc'][key][0];
//         }
//         break;
//       }
//     }
//
//     if( found == false && parseFloat( prices['tsc']['default'][0]) >= tsc_amount) {
//       tscix = 'default';
//       tsc_amount = prices['tsc']['default'][0];
//     }
//   }
// }

  // set the price ref depending on compatibilities
  var priceref_com = [];
  if( !oneway) {
    priceref_com = combinability[ sel[0][3] ][ sel[1][3] ].split( '-');
  } else {
    priceref_com[0] = sel[0][0];
  }

  // if not combinable return
  if( priceref_com[0] === 'not') {
    return;
  }

  resetPricePanel(numJourneys, tscix, priceref_com);

//  for( var j = 0; j < numJourneys; ++j) {
//    priceref = priceref_com[j];
//    taxref   = sel[j][1];
//
//    var net = zeroIFNAN( prices[priceref][0]);
//    var tax = zeroIFNAN( taxes[taxref][0]);
//    var tsc;
//
//    if( oneway) {
//      tsc = zeroIFNAN( prices['tsc'][tscix][0]);
//    } else {
//      tsc = zeroIFNAN( prices['tsc'][tscix][0]) / 2.0;
//    }
//
//    var j_id = (j === 0 ? 'o' : 'i') + '_l_' + sel[j][0] + '_' + sel[j][3];
//    $( '.'+j_id).html(formatPrice( net + tax + tsc));
//  }


 var totalsByPax   = [];
 var net           = 0.0;
 var tax           = 0.0;
 var tsc           = 0.0;
 var total         = 0.0;
 var evnet         = 0.0;
 var evtax         = 0.0;
 var evtsc         = 0.0;
 var evtotal_all   = 0.0;
 var taxix         = _.map(sel, 1); // get all tax references
 var evused        = false;
 var evused_partly = false;
 var netr          = 0.0;
 var net_diff      = 0.0;

 // reset the total
 total_all = 0.0;

 // update the adult text
 if( numadt) {
   net = evnet = 0.0;
   tax = evtax = 0.0;

   for( var j = 0; j < (oneway ? 1 : 2); j++) {
     priceref   = priceref_com[j];
     taxref     = sel[j][1];
     evpriceref = evsel[j][0];
     evtaxref   = evsel[j][1];

     net += zeroIFNAN( prices[priceref][0]);
     tax += zeroIFNAN( taxes[taxref][0]);

     if( evpriceref != -1) {
       evused = true;
       evnet += zeroIFNAN( prices[evpriceref][0]);
       evtax += zeroIFNAN( taxes[evtaxref][0]);
     } else {
       evused_partly = true;
     }
   }

   netr         = roundit( net);
   net_diff     = netr - net;
   tsc          = zeroIFNAN( prices['tsc'][tscix][0]);
   total        = netr + tax + tsc;
   total_all   += total * numadt;
   // AUA-8759 and AUA-9438
   if( percent != '1') {
     evnet = evnet + net_diff;
   } else {
     evnet = evnet + (100-amount)*net_diff/100;
   }

   evtsc        = zeroIFNAN( prices['tsc'][tscix][1]);
   evtotal_all += (evnet + evtax + evtsc)*numadt;

   totalsByPax.push({
     paxType:    'ADT',
     numPax:     numadt,
     totalFares: netr,
     totalTaxes: tax,
     totalTSC:   tsc,
     total:      total,

//     roundDiff:  net_diff,
     taxRef:      taxix,
     outbRef:     sel0,
     inbRef:      numJourneys == 2 ? sel1 : null,
     hasFareDtls: (pod == 'CA')
   });
 }

 // update the child text
 if( numchd) {
 //for( var i = 0; i < numchd; i++) {
   net = evnet = 0.0;
   tax = evtax = 0.0;

   for( var j = 0; j < (oneway ? 1 : 2); j++) {
     priceref   = priceref_com[j];
     taxref     = sel[j][1];
     evpriceref = evsel[j][0];
     evtaxref   = evsel[j][1];

     net += zeroIFNAN( prices[priceref][1]);
     tax += zeroIFNAN( taxes[taxref][1]);

     if( evpriceref != -1) {
       evused = true;
       evnet += zeroIFNAN( prices[evpriceref][1]);
       evtax += zeroIFNAN( taxes[evtaxref][1]);
     } else {
       evused_partly = true;
     }
   }

   netr         = roundit( net);
   net_diff     = netr - net;
   tsc          = zeroIFNAN( prices['tsc'][tscix][2]);
   total        = netr + tax + tsc;
   total_all   += total * numchd;
   // AUA-8759 and AUA-9438
   if( percent != '1') {
     evnet = evnet + net_diff;
   } else {
     evnet = evnet + (100-amount)*net_diff/100;
   }
   evtsc        = zeroIFNAN( prices['tsc'][tscix][3]);
   evtotal_all += (evnet + evtax + evtsc)*numchd;

   totalsByPax.push({
     paxType:    'CHD',
     numPax:     numchd,
     totalFares: netr,
     totalTaxes: tax,
     totalTSC:   tsc,
     total:      total,

//     roundDiff:  net_diff,
     taxRef:     taxix,
     outbRef:    sel0,
     inbRef:     numJourneys == 2 ? sel1 : null
   });
 }

 // update the infant text
 if( numinf) {
   net = evnet = 0.0;
   tax = evtax = 0.0;

   for( var j = 0; j < (oneway ? 1 : 2); j++) {
     priceref   = priceref_com[j];
     taxref     = sel[j][1];
     evpriceref = evsel[j][0];
     evtaxref   = evsel[j][1];

     net += zeroIFNAN( prices[priceref][2]);
     tax += zeroIFNAN( taxes[taxref][2]);

     if( evpriceref !== -1) {
       evused = true;
       evnet += zeroIFNAN( prices[evpriceref][2]);
       evtax += zeroIFNAN( taxes[evtaxref][2]);
     } else {
       evused_partly = true;
     }
   }

   netr         = roundit( net);
   net_diff     = netr - net;
   tsc          = zeroIFNAN( prices['tsc'][tscix][4]);
   total        = netr + tax + tsc;
   total_all   += total * numinf;
   // AUA-8759 Rounding up evoucher fares
   evnet        = roundit( evnet);
   evtsc        = zeroIFNAN( prices['tsc'][tscix][5]);
   evtotal_all += (evnet + evtax + evtsc)*numinf;

   totalsByPax.push({
     paxType:    'INF',
     numPax:     numinf,
     totalFares: netr,
     totalTaxes: tax,
     totalTSC:   tsc,
     total:      total,

//     roundDiff:  net_diff,
     taxRef:     taxix,
     outbRef:    sel0,
     inbRef:     numJourneys == 2 ? sel1 : null
   });
 }

 var eVoucherPartlyUsed = false;
 var eVoucherRest = 0;
 // for rest value and booking evoucher (non %) we have different
 // calculation and text
 if( evoucher && (remaining || appliesbooking && !percent)) {
   evused        = false;
   evused_partly = false;
   var rest      = 0.0;

   for( var j = 0; j < (oneway ? 1 : 2); j++) {
     if( auagroup) {
       if( sel[j][4] === 'aua') {
         evused = true;
       } else {
         evused_partly = true;
       }
     } else {
       evused = true;
     }

     // check if classes match
     if( evused === true && evouclasses !== '') {
       for (var i = 0, len = sel[j][2].length; i < len; i++) {
         if( evouclasses.indexOf(sel[j][2][i]) === -1) {
           evused = false;
           break;
         }
       }
     }
   }

   if( evused && !evused_partly) {
     if( amount >= total_all) {
       evtotal_all = 0.0;
       rest = amount - total_all;
     } else {
       evtotal_all = total_all - amount;
       rest        = 0.0;
     }

     eVoucherPartlyUsed = !appliesbooking;
   }

   eVoucherRest = rest;
 }

 var eVoucherDiscount = 0;
 if( evused && !evused_partly && evtotal_all <= total_all) {
   eVoucherDiscount = Math.abs(Math.max( -total_all, evtotal_all - total_all));
   total_all = evtotal_all;
 }

  Basket.model.setFlightFares( totalsByPax);
  Basket.model.set({
    'totalFlights': Math.abs(total_all)
  });

  if( evoucher) {
    evused = (evused && eVoucherDiscount > 0);
    Basket.model.set({
      "eVoucherConditions": !evused,
      "eVoucherCode":       evoucherCode,
      "eVoucherUsed":       evused,
      "eVoucherPartlyUsed": eVoucherPartlyUsed,
      "eVoucherRest":       eVoucherRest,
      "eVoucherDiscount":   eVoucherDiscount
    });
  }
}

// update rebook and refund rules
function farerules( journey, flt)
{
  var compartments = new Array('eco_light', 'eco_classic', 'eco_flex', 'business_basic', 'business_flex');

  for( var i = 0; i < compartments.length; i++) {
    if( typeof fares[journey][0][flt][compartments[i]] == 'undefined') {
        continue;
    }

    if( farebox_row[fares[journey][0][flt][compartments[i]][0]][0] === 'Y') {
      if( farebox_row[fares[journey][0][flt][compartments[i]][0]][1] !== '') {
        //set price
        $('#rebook_price_' + journey + '_' + flt + '_' + compartments[i]).html( '('+farebox_row[fares[journey][0][flt][compartments[i]][0]][1]+')');
        $('#rebook_' + journey + '_' + flt + '_' + compartments[i]).next().removeClass();
        $('#rebook_' + journey + '_' + flt + '_' + compartments[i]).removeClass().addClass('rs_icon_checkmark');
      } else {
        // no price, for free
        $('#rebook_' + journey + '_' + flt + '_' + compartments[i]).removeClass().addClass('rs_icon_checkmark');
        $('#rebook_' + journey + '_' + flt + '_' + compartments[i]).next().removeClass();
        $('#rebook_price_' + journey + '_' + flt + '_' + compartments[i]).html();
      }
    } else if( farebox_row[fares[journey][0][flt][compartments[i]][0]][0] === 'N') {
      $('#rebook_' + journey + '_' + flt + '_' + compartments[i]).removeClass().addClass('lh-icon-no text-eased');
      $('#rebook_' + journey + '_' + flt + '_' + compartments[i]).next().addClass('text-eased');
    }

    if( farebox_row[fares[journey][0][flt][compartments[i]][0]][2] === 'Y') {
      if( farebox_row[fares[journey][0][flt][compartments[i]][0]][4] !== '') {
        $('#refund_price_' + journey + '_' + flt + '_' + compartments[i]).html( '('+farebox_row[fares[journey][0][flt][compartments[i]][0]][4]+')');
        $('#refund_' + journey + '_' + flt + '_' + compartments[i]).next().removeClass();
        $('#refund_' + journey + '_' + flt + '_' + compartments[i]).removeClass().addClass('rs_icon_checkmark');
      } else {
        $('#refund_' + journey + '_' + flt + '_' + compartments[i]).removeClass().addClass('rs_icon_checkmark');
        $('#refund_' + journey + '_' + flt + '_' + compartments[i]).next().removeClass();
        $('#refund_price_' + journey + '_' + flt + '_' + compartments[i]).html();
      }
    } else if( farebox_row[fares[journey][0][flt][compartments[i]][0]][2] === 'N') {
      $('#refund_' + journey + '_' + flt + '_' + compartments[i]).removeClass().addClass('lh-icon-no text-eased');
      $('#refund_' + journey + '_' + flt + '_' + compartments[i]).next().addClass('text-eased');
    }
  }
}

function roundit( value)
{
  if( rounding.type == '') {
    return value;
  }

  // is it rounding up
  if( rounding.type != 'UP TO') {
    return Math.round( value / rounding.amount) * rounding.amount;
  }

  // is it for normal values like EUR,USD,...
  if( rounding.amount != 1.0) {
    // values like SKK which are rounded to 5, 10, 100...
    return Math.ceil( value / rounding.amount) * rounding.amount;
  }

  // check if value < 0.1 and round down in that case
  if( value - Math.floor( value) < 0.1) {
    return Math.floor( value);
  }

  return Math.ceil( value);
}

// set old price with default TSC
function oldPrice( journey, flt)
{
  var priceref = sel[journey][0];
  var taxref   = sel[journey][1];

  var net = zeroIFNAN( prices[priceref][0]);
  var tax = zeroIFNAN( taxes[taxref][0]);
  var tsc;
  if( oneway) {
    tsc = zeroIFNAN( prices['tsc']['default'][0]);
  } else {
    tsc = zeroIFNAN( prices['tsc']['default'][0]) / 2.0;
  }

  var j_id = (journey === 0 ? 'o' : 'i') + '_l_' + sel[journey][0] + '_' + sel[journey][3];
  $( '.'+j_id).html( formatPrice( net + tax + tsc));
}

// format price with currency
function formatPrice( amount)
{
  var formatted;

  amount    = parseFloat(amount);
  formatted = localinfo;
  formatted = formatted.replace( /<curr>/, currency);

  // all but yen to decimals
  if (currency == '&#165;' || currency == 'JPY' || currency == 'KZT' || currency == '¥') {
    amount = Math.round(amount);
    formatted = formatted.replace( /<price>/, amount);
  } else {
    formatted = formatted.replace( /<price>/, amount.toFixed( 2));
    formatted = formatted.replace( /\./, fullcombitext.separator);
  }

  return formatted;
}

// AJAX to get the miles
function getMiles( m_jour, m_flt)
{
  var http = getHTTP();
  if( !http) {
    return;
  }

  // set the cursor to wait style
  document.body.style.cursor = 'wait';

  // request the converted amount
  http.open( 'post', 'fb.fly?action=getmiles&jour=' + m_jour + '&flt=' + m_flt + '&day=0');
  http.onreadystatechange = function() { milesDisplay( http, m_jour, m_flt); };
  http.send( null);
}

// set the converted amount in field after AJAX response
function milesDisplay( http, m_jour, m_flt)
{
  if( !isOKHTTP( http)) {
    return;
  }

  // unset the cursor wait
  document.body.style.cursor = '';
  var miles = http.responseText;
  var miles_array = miles.split( ',');
  var compartments = new Array ('eco_light', 'eco_classic', 'eco_flex', 'business_flex', 'business_basic');

  for( var i = 0; i < compartments.length; i++) {
    if( miles_array[i] !== '--') {
      var bonusmiles = (compartments[i]=='eco_flex') ? fullcombitext.bonusmiles : '';
      $('#miles_' + m_jour + '_' + m_flt + '_'  + compartments[i]).html(miles_array[i] + ' ' + fullcombitext.miles+' '+bonusmiles);
    } else {
      $('#miles_' + m_jour + '_' + m_flt + '_' + compartments[i]).html('--');
    }
  }
}

/**
 * Check the info of the given outbound against all inbound flights
 * And disables the radios for the incompatible inbounds, taking
 * in consideration all the flight rules
 */
function validateInbounds( outbId) {
  var comb       = combinability[outbId];
  var inbounds   = gFlightRules[outbId].combinations;

  // all inbound radio buttons
  for( var i = 0; i < inbounds.length; i++) {
    // flight cannot be selected
    if( inbounds[i]===true && comb[i] !== "not-combinable") {
      var priceref = comb[i].split('-');

      // flight is Ok to select, enable all radios, hide them all
      //same for prices
      $('#radios_1_' + i + ' input.i_' + i).attr('disabled', false).addClass('hidden');
      $('#prices_1_' + i + ' .i_' + i).addClass('hidden');

      $('#i_' + parseInt( priceref[1]) + '_' + i).removeClass('hidden');
      $('#i_' + 'l_' + parseInt( priceref[1]) + '_' + i).removeClass('hidden');

      //noncombinable span
      $('#non_c_1_' + i).addClass('hidden');
      $('#prices_1_' + i + ' .seat_info').removeClass('hidden');
      $('#sellable_1_' + i).removeClass('hidden');
    } else {
      $radio = $('#radios_1_' + i + ' input.i_' + i);
      // If the radio was checked, clear the basket and the selection
      if ($radio.prop("checked")) {
        Basket.model.clear();
        sel = []; // validate global selection variable
        $('input:radio[name=sel1]:checked').val([]);
      }
      $radio.prop("checked", false).addClass("hidden");
      $('#prices_1_' + i + ' .i_' + i).addClass('hidden');
      $('#prices_1_' + i + ' .seat_info').addClass('hidden');

      //noncombinable span
      $('#non_c_1_' + i).removeClass('hidden');
      $('#sellable_1_' + i).addClass('hidden');
    }
  }// end for

  // Iterate each flight container
  $(".flight_table.journey_1 > .flt_row").each(function(idx, container) {
    var hasPrices, cls;
    $(".tariff_selection", container).each(function(idx, panel) {
      
      hasPrices = $(".flight_tariff .sellable_container", panel).not(".hidden").find("button.select_tariff").length;

      cls = $(panel).hasClass("flight-economy") ? ".flight_economy" : ".flight_business";
      $(cls, container).toggleClass("disabled", hasPrices ? false : true);
      
      if (!hasPrices) {
        // Disable the selections
        $(cls, container).removeClass("open_tariff_selection").removeClass("selected_tariff_selection");
        $(panel).removeClass("active");        
      }
    });
  });
}

/**
 * Check combinations of different faregroups
 * And hide the radios for the incompatible flights, taking
 * in consideration restrict array
 */
function updateFareGroups( sel0, sel1)
{
  if( sel0 && sel1 && sel[0] && sel[1]) {
    var priceref_com = combinability[sel[0][3]][sel[1][3]].split( '-');

    var selector;

    for( var i = 0; i < 2; i++) {

      if( i === 0) {
        selector = "o_";
      } else {
        selector = "i_";
      }
      // get visible one and check if it is ok
      if( sel[i][0] !== parseInt( priceref_com[i])) {
        $('input.' + selector + sel[i][3]).prop( 'checked', false).addClass('inactive');
        $('.'+ selector + sel[i][3]).addClass( 'hidden');

        $('#' + selector + parseInt( priceref_com[i]) + '_' + sel[i][3]).removeClass( 'inactive');
        $('.' + selector + 'l_' + parseInt( priceref_com[i]) + '_' + sel[i][3]).removeClass( 'hidden');
        $('#' + selector + parseInt( priceref_com[i]) + '_' + sel[i][3]).prop( 'checked', true).trigger('click');
      }
    }
  }
}

function sortBy( journey, sortBy ) {

var rows = $('.journey_' + journey + ' .flt_row');

rows.sort(function(a, b) {
  orderToFilter = [sortBy];
  //the order to filter in case they are equal
  orderToFilter.push('nos','tod', 'duration', 'toa');

  var orderVal = 0;

  $.each( orderToFilter,function( key,val ) {
    if(val === 'price') {
      var A = parseFloat($(a).find('.lowestPrice').attr('data-lowestPrice'));
      var B = parseFloat($(b).find('.lowestPrice').attr('data-lowestPrice'));
    } else {
      var A = $(a).attr('data-'+val);
      var B = $(b).attr('data-'+val);
    }

    if(A < B) {
      orderVal = 1;
      return false;
    }

    if(A > B) {
      orderVal = -1;
      return false;
    }
  });

  return orderVal;

 });

 $.each(rows, function(index, row) {
  $('.journey_' + journey).prepend(row);
 });
}

function moreFlights( moreFlightsObj, onload) {
  showHideFlights( moreFlightsObj, onload);
}

function showHideFlights( moreFlightsObj, onload) {

  var journeyTable = $('.flight_table.journey_'+ moreFlightsObj.attr('data-journey'));
  var moreFltMaxNo = parseInt(moreFlightsObj.attr('data-moreFltMaxNo'));
  var noOfNonstopFlts = journeyTable.find('.flt_row.nonstop').length;
  var operation = moreFlightsObj.hasClass('active');

  var iconClass = $('#show_more_flights_icon_'+moreFlightsObj.attr('data-journey'));
  iconClass.removeClass();
  //we hide all of flights that have stops
   if( operation) {
     $('#more_flights_'+ moreFlightsObj.attr('data-journey')).hide();
     $('#less_flights_'+ moreFlightsObj.attr('data-journey')).show();
     journeyTable.find('.flt_row:not(.nonstop)').slideDown("slow");
     moreFlightsObj.html($('.lessFlightsTriggerText').html());
     //update the + icon to a -
     iconClass.addClass('detail_icon_minus');
   } else {
     $('#more_flights_'+ moreFlightsObj.attr('data-journey')).show();
     $('#less_flights_'+ moreFlightsObj.attr('data-journey')).hide();

     if( !onload) {
        $('html, body').animate({
          scrollTop: $('.h1.fl_left.fl_'+ moreFlightsObj.attr('data-journey')).offset().top
        }, {
          duration: 1000, 
        }).promise().done( function(){
          journeyTable.find('.flt_row:not(.nonstop)').each( function(){
            if( typeof $(this).data('was_visible') == 'undefined'){ 
              $( this).slideUp("slow");
            }
          });
        });
     }else{
        journeyTable.find('.flt_row:not(.nonstop)').slideUp("slow");
     }
    
     moreFlightsObj.html($('.moreFlightsTriggerText').html());
     //update the - icon to a +
     iconClass.addClass('detail_icon');
  }
  //in case the number of non stop flights is bigger than 5(the number of max flights set up)
  if( noOfNonstopFlts <= moreFltMaxNo && !operation) {
    if( onload) {
      noOfFlightsWithStopsToShow = moreFltMaxNo - noOfNonstopFlts;
      journeyTable.find(".flt_row:not(.nonstop):lt("+noOfFlightsWithStopsToShow+")").toggle('blind');  
    }
  }
}

function allJourneysSelected(numJourneys) {

  return _.compact(sel).length == numJourneys;
}

function getSelClasses(numJourneys) {
  return _.map(sel, 2).join('').split('');
}

function getSelCompartments(numJourneys) {
  return _.map(sel, 0);
}

function hasSelPriceVoucherTSC(numJourneys) {
  // evsel[jix][0] holds the EVO price reference
  return _.indexOf(_.map(evsel,0), -1) === -1;
}

function getTSCIndex(numJourneys) {

  var vouchertsc  = hasSelPriceVoucherTSC( numJourneys);
  // first check for voucher TSC
  if( vouchertsc && prices['tsc']['evoucher']) {
    return 'evoucher';
  }

  // set up a pattern to ignore compartments in first instance
  var pattern     = /\w{2}(,\w{2})*$/;
  var classes     = getSelClasses( numJourneys);
  var tsc_amount  = 0.0;
  var tscix       = 'default';

  // check for classes
  for( var fcla = 0; fcla < classes.length; fcla++) {
    var found = false;
    for( var key in prices['tsc']) {
      // skip default and compartment
      if( key === 'default' || pattern.test( key)) {
        continue;
      }

      if( key.indexOf( classes[fcla]) != -1) {
        found = true;
        if( parseFloat( prices['tsc'][key][0]) >= tsc_amount) {
          tscix = key;
          tsc_amount = prices['tsc'][key][0];
        }
        break;
      }
    }

    if( found == false && parseFloat( prices['tsc']['default'][0]) >= tsc_amount) {
      tscix = 'default';
      tsc_amount = prices['tsc']['default'][0];
    }
  }

  if( tscix === 'default') {
    var compart     = getSelCompartments( numJourneys);
    for( var comp = 0; comp < compart.length; comp++) {
      var found = false;
      for( var key in prices['tsc']) {
        // skip default and compartment
        if( key == 'default') {
          continue;
        }

        if( key.indexOf( compart[comp]) != -1) {
          found = true;
          if( parseFloat( prices['tsc'][key][0]) >= tsc_amount) {
            tscix = key;
            tsc_amount = prices['tsc'][key][0];
          }
          break;
        }
      }

      if( found == false && parseFloat( prices['tsc']['default'][0]) >= tsc_amount) {
        tscix = 'default';
        tsc_amount = prices['tsc']['default'][0];
      }
    }
  }

  return tscix;
}

function resetPricePanel(numJourneys, tscix, priceref_com) {
  for( var j = 0; j < numJourneys; ++j) {
    priceref = priceref_com[j];
    taxref   = sel[j][1];

    var net = zeroIFNAN( prices[priceref][0]);
    var tax = zeroIFNAN( taxes[taxref][0]);
    var tsc;

    if( oneway) {
      tsc = zeroIFNAN( prices['tsc'][tscix][0]);
    } else {
      tsc = zeroIFNAN( prices['tsc'][tscix][0]) / 2.0;
    }

    var j_id = (j === 0 ? 'o' : 'i') + '_l_' + sel[j][0] + '_' + sel[j][3];
    $( '.'+j_id).html(formatPrice( net + tax + tsc));
  }
}

function selectFlight(jix, dix, fix, comp) {
  var flight = _.findWhere( Twoe.allFlights, {"jix":jix, "dix": dix, "fix":fix });
  flight && Basket.model.addFlight(flight, comp);
}

$(document).ready(function(){

  /* $( '#progressbar').progressbar({
     value: 100
   });

  $('.ui-progressbar-value').append('<img id="wait" src="'+image_path+'/anim-overlay.gif"/>');*/

  $('.form-control').each(function() {
    sortBy( $(this).data('journey'), $(this).val());
  });

  $( ".form-control" ).change(function() {
    sortBy( $(this).data('journey'), $(this).val());
  });

  $('.moreFlightsTrigger').each(function(){
    moreFlights( $(this), true);
  });

  $('.moreFlightsTrigger').click(function( e){
    e.preventDefault();
    $(this).toggleClass('active');
    moreFlights( $(this), false);
  });

  //we store the two p functions as toggle text and hide it at startup
  $('.lessFlightsTriggerText').each(function(){$(this).hide();});
  $('.moreFlightsTriggerText').each(function(){$(this).hide();});

  $('.tabClick').click(function( e) {
    e.preventDefault();
    if( $(this).attr('data-avail') === '0') {
      return;
    }

    waitScreen();

    //unbind click events for buttons requesting AVAIL to avoid DUPLICATE_MESSAGE
    //until page will reload again
    $(".tabClick").off('click');
    $(".tabClickIcon").off('click');

  	var newDate       = $(this).attr('data-date');
  	var journey       = $(this).attr('data-journey');
  	var mode          = $(this).attr('data-mode');
  	var ix            = $(this).attr('data-ix');
  	var newUrl        = 'fb.fly?action=newdate&journey='+ journey +'&mode=' + mode +'&selected_date=' + newDate +'&ix='+ix;
  	window.location.replace(newUrl);
  });

  $('.backinput').click(function( e) {
    e.preventDefault();
  	var newUrl        = 'fb.fly?action=backinput';
  	window.location.replace(newUrl);
  });

  $('.tabClickIcon').click(function( e) {
    e.preventDefault();
    waitScreen();

    //unbind click events for buttons requesting AVAIL to avoid DUPLICATE_MESSAGE
    //until page will reload again
    $(".tabClick").off('click');
    $(".tabClickIcon").off('click');
    //set waiting pointer
    document.body.style.cursor = 'wait';
    $('.tabClick .tab_inner').css('cursor','wait');
    $('.tabClickIcon').css('cursor','wait');

  	var journey       = $(this).attr('data-journey');
  	var direction     = $(this).attr('data-direction');
  	var newUrl        = 'fb.fly?action=newdate&journey='+ journey +'&direction=' + direction;
  	window.location.replace(newUrl);
  });

  setTimeout( function(){
    $('.flight_table .flt_row:visible').each(function(){
      $(this).data('was_visible', 'true');
    });
  }, 1000);

});
