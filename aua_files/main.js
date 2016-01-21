'use strict';

$(function(){
	var $window = $(window),
		$body = $('body'),
		$rs_red = $('.rs_red');
	// make two or three teasers next to each other the same height
	if ($('.service_teaser').length) {
		$('.service_teaser_row').each(function() {
			var maxHeight = 0;
			$('.service_teaser', this).each(function() {
				if($(this).height() > maxHeight) {
					maxHeight = $(this).height();
				}
			});
			$('.service_teaser', this).css('min-height', maxHeight + 32);
		});
	}


//	*************************************************
//	passenger details: registered travellers
//	*************************************************
	$rs_red.on('show.bs.modal', '#registered-travellers-modal', function(/*Twoe:*/event) {
		var $modal = $(this);
                // TWOE Start
                var $eventTrigger = $(event.relatedTarget);
                //paxIndex is the place/index where to apply passenger chosen from the list
                var paxIndex = $eventTrigger.attr('id').replace("select_passenger_",'');
                // TWOE End
/* TWOE Start
		$modal.off('click').on('click', '.choose_traveller', function() {
			$modal.modal('hide');
		});

		setTimeout(function() {
			// set modal height after slider has been initialized
			setModalBodyHeight($modal, 'max-height');
		}, 300);
	});
TWOE End*/
// TWOE Start
                $modal.off('click')

                .on('click', '.choose_traveller', function() {
                        //button is labeled by id as: id = "choose_0" --> buttonId returns choose_0
                        var buttonId = $(this).attr('id');
                        //removing choose_ to be left only with index
                        var idx = buttonId.replace("choose_",'');
                        //retrieves lastname, firstname and title from the chosen profile
                        var lastName = $('#profileLastName_'+idx).html();
                        var firstName = $('#profileFirstName_'+idx).html();
                        var title = $('#profileTitle_'+idx).html();
                        var department = $('#profileDepartment_'+idx).html();
                        var profileDate = $('#profileDate_'+idx).html();
                        var dateArr = profileDate.split('.'); //a date looks like this: 31.12.1990

                        //apply found texts to paxIndex location
                        $("input[name=lastname_"+paxIndex+"]").val(lastName);
                        $("input[name=firstname_"+paxIndex+"]").val(firstName);
                        $("select[name=salutation_"+paxIndex+"]").val(title);
                        $("select[name=department_"+paxIndex+"] option").filter(function(){
                          return $(this).text()==department;
                        }).attr('selected',true);

                        //we have marked the 'select' department element with a update_if_1_pax
                        //class only if there is 1 travelling passenger involved. otherwise,
                        //the class will not exist (due to >=2 travelling passengers), and so
                        //nothing will be selected.
                        $(".update_if_1_pax").each(function() {
                          $("select[name=department] option").filter(function(){
                            return $(this).text()==department;
                          }).attr('selected',true);
                        });

                        if (dateArr.length==3) {
                          $("select[name=dob_day_"+paxIndex+"]").val(dateArr[0]);
                          $("select[name=dob_month_"+paxIndex+"]").val(dateArr[1]);
                          $("select[name=dob_year_"+paxIndex+"]").val(dateArr[2]);
                        }
			$modal.modal('hide');
		})
                //this is the search function when the passenger profile box is opened
                .on('click', '.filter_traveller', function() {
                  //first_name_registered --> inputbox, department_registered --> select/dropdown
                  var searchName = $('#first_name_registered').val();
                  var searchDept = $('#department_registered').val();
                  //we find all div items tagged by class passengerRowClass (header of row)
                  //we get the id from the div, then we can get the item's lastname and department
                  $(".passengerRowClass").each(function(idx,element){
                    var itemId = $(this).attr('id').replace("passengerRow_",'');
                    var itemLastName = $("#profileLastName_"+itemId).html();
                    var itemDept = $('#profileDepartment_'+itemId).html();
                    //cases for matching:
                    //1. empty input text, no dept selected: show all passengers
                    //2. empty input text, selected dept: show all passengers matching department
                    //3. filled text, no dept selected: show all passengers matching first part of text
                    //4. filled text, selected dept: show all passengers matching both text and department
                    //matching when searchName is contained in start of lastName, or when input box is empty
                    var matchLastName = (itemLastName.toUpperCase().indexOf(searchName.toUpperCase())==0) || (searchName.length==0);
                    //matching when department is matching, or when no department selected
                    var matchDept = (searchDept.toUpperCase() === itemDept.toUpperCase()) || (searchDept.length==0);
                    $(this).toggle(matchLastName && matchDept);
                  });

                });
// TWOE END

/* TWOE Start
//	*************************************************
//	extra services: insurance selection
//	*************************************************
	var $insurance_selected = 0,
		$insurance_teaser;

	// select an insurance
	$rs_red.on('show.bs.modal', '#insurance-modal', function(event) {
		var $modal = $(this),
			$teaser_trigger = $(event.relatedTarget);

		// get actual teaser to handle active / inactive state
		if ($teaser_trigger.parents('.service_teaser').length) {
			$insurance_teaser = $teaser_trigger.parents('.service_teaser');
		} else {
			$insurance_teaser = $teaser_trigger.parents('.service_teaser_small');
		}

		$modal.off('click').on('click', '.select_insurance', function() {
			var $this = $(this),
				$selected_insurance_name = $this.data('insurance'),
				$act_input = $this.prev(),
				$table = $modal.find('.insurance_table'),
				$all_inputs = $table.find('input[type="radio"].hidden');

			$all_inputs.prop( 'checked', false );
			$act_input.prop( 'checked', true );

			$table.attr('data-insurancename', $selected_insurance_name);

			// move focus to agb checkbox
			$('#insurance_agb').focus();


			$insurance_selected = 1;

			if ($('#insurance_agb').is(':checked')) {
				$modal.find('.save_modal').removeClass('disabled');
			}
		}).on('click', '#insurance_agb', function() {
			// Checkbox 'allgemeine Geschäftsbedingungen'
			if ($(this).is(':checked')) {
				if ($insurance_selected) {
					$modal.find('.save_modal').removeClass('disabled');
				}
			}
			else {
				$modal.find('.save_modal').addClass('disabled');
			}
		}).on('click', '.cancel_link, .close', function() {
			$('#insurance_agb').prop('checked', false);
			$modal.find('.insurance_table').attr('data-insurancename', '');
			$modal.find('.save_modal').addClass('disabled');
		});
TWOE End */
	});

    $rs_red.on('shown.bs.modal', '#registered-travellers-modal', function (event) {
    var $modal = $(this);
    $modal.css('max-height', 'none');
    setModalBodyHeight($modal, 'max-height');
  });

/* TWOE Start
	// save insurance modal
	$rs_red.on('click', '#insurance-modal .save_modal', function() {
		$insurance_teaser.addClass('active');
		$insurance_teaser.find('input.hidden').prop('checked', true);
		$insurance_teaser.find('.text .booked button').focus();
	});
  TWOE End*/
//	*************************************************
//	flight selection: tariff selection
//	*************************************************
	var $act_tariff_selection,
		$act_tariff_name;

	// click on economy or business
	$rs_red.on('click', '.flight_rep_container .tariff_container', function(e){
		e.preventDefault();
		var $this = $(this);

		if( $this.hasClass('disabled')) {
			return false;
		}

		if( !$this.hasClass('open_tariff_selection') ) {
			openTariffSelection($this);
		} else {
			closeTariffSelection($this);
		}

		$act_tariff_selection = $this;
	});

	$rs_red.on('click', '.flight_rep_container .btn.close', function(/*TWOE:*/e ){
    /*TWOE:*/e.preventDefault();
		closeTariffSelection($(this));
	});

	// show tariff
	function openTariffSelection($this) {
		var $flight_container = $this.parents('.flight_overview'),
			$tariff_container =  $flight_container.find('.tariff_container'),
			$tariff_selections = $flight_container.find('.tariff_selection');

			$tariff_container.removeClass('open_tariff_selection');
			$this.addClass('open_tariff_selection');

			$act_tariff_name = $this.data('basetariff');

			$tariff_selections.removeClass('active');

			$act_tariff_selection = $this.parents('.flight_rep_container').find('.tariff_selection.' + $act_tariff_name);
			$act_tariff_selection.addClass('active');

       // TWOE Start
      farerules( $this.data('journey'), $this.data('flt'));
      // get the Miles for this flight only if we didn't get them yet
      if( $( '#miles_' + $this.data('journey') + '_' + $this.data('flt') + '_0_eco_light')) {
        getMiles( $this.data('journey'), $this.data('flt'));
      }
// TWOE End

			if( $act_tariff_name === 'flight-economy' ) {
				var $extras_cont = $act_tariff_selection.find('.flight_extras'),
					height = $extras_cont.eq(2).outerHeight();
				$extras_cont.css('height', height);
				$extras_cont.css('height', height);
			}
	}

	// select a tariff
	$rs_red.on('click', '.flight_rep_container .select_tariff', function( /*TWOE:*/e){
    /*TWOE:*/ e.preventDefault();
		var $this = $(this),
			$selected_tariff_name = $this.data('tariff'),
			$flight_table = $this.parents('.flight_table'),
			$tariff_container = $flight_table.find('.tariff_container'),
      //TWOE Start
			//$act_input = $this.prev(),
			$act_input = $this.prevAll().not('.inactive'),
      //TWOE End
			$tariff_selections = $flight_table.find('.tariff_selection'),
			$all_inputs = $flight_table.find('input[type="radio"].hidden'),
			$current_tariff = ($this.parents('.tariff_selection').hasClass('flight-economy')) ? 'economy' : 'business';

		$all_inputs.prop( 'checked', false );
		$act_input.prop( 'checked', true );
    /*TWOE:*/ $act_input.trigger("click");

		$tariff_container.filter('.selected_tariff_selection').removeAttr('data-tariff').removeClass('selected_tariff_selection');
		$tariff_selections.removeAttr('data-tariff');

		$this.parents('.tariff_selection').attr('data-tariff', $selected_tariff_name);
    /*TWOE Start AUA-15170*/
    $this.parents('.flight_rep_container').find('.open_tariff_selection').addClass('selected_tariff_selection');
    //TWOE End
		$act_tariff_selection.attr('data-tariff', $selected_tariff_name).addClass('selected_tariff_selection');
		// move focus to tariff label
		$this.parents('.flight_rep_container').find('.flight_' + $current_tariff + ' .tariff_selector').focus();
	});

	function closeTariffSelection($this) {
		var $flight_container = $this.parents('.flight_overview'),
		    $tariff_selections = $flight_container.find('.tariff_selection.active'),
			$tariff_container = $flight_container.find('.tariff_container'),
			$current_tariff = ($tariff_selections.hasClass('flight-economy')) ? 'economy' : 'business';

		$tariff_selections.removeClass('active');
		$tariff_container.removeClass('open_tariff_selection');
		// move focus to tariff label
		$this.parents('.flight_rep_container').find('.flight_' + $current_tariff + ' .tariff_selector').focus();
	}


//	*********************************************************************************
//	flight selection + sidebar: set last sidebar element and button
//                              fixed, on scrolling
//	*********************************************************************************
	var $element_to_be_fixed, $element_to_be_fixed_top;

	/*TWOE: function fixGrandTotal() {
		$element_to_be_fixed = $rs_red.find('.add_on_selection').last();
		$element_to_be_fixed_top = $element_to_be_fixed.offset().top - 20;
	}

	function positionGrandTotal() {
		if ( $window.scrollTop() >= $element_to_be_fixed_top ) {
			$element_to_be_fixed.css({'position': 'fixed', 'top': 20});
		}
		if ( $window.scrollTop() < $element_to_be_fixed_top ) {
			$element_to_be_fixed.attr('style', '');
		}
	}

	function displayGrandTotal() {
		$rs_red.find('.flight_selection_container .add_on_selection.grand_total').addClass('active');
		fixGrandTotal();
		positionGrandTotal();
	}

	// call function on custom event
	$body.on('fixGrandTotal', fixGrandTotal);
	$body.on('displayGrandTotal', displayGrandTotal);
	End TWOE*/

	if( $rs_red.find('.add_on_selection').length ) {

		if( $rs_red.find('.flight_selection_container .voucher').length < 1 ) {
			// delete grand_total container in flight selection if included
			$rs_red.find('.flight_selection_container .add_on_selection.grand_total').remove();
		}
		/*
		else {
			$rs_red.find('.flight_selection_container .add_on_selection.grand_total').addClass('active');
		}

		*/

		/*TWOE: $window.on('scroll', function () {
			positionGrandTotal();
		});*/
	}

/* TWOE Start
//	*************************************************
//	flight selection: animate date-picker
//	*************************************************
	var $flight_picker_collection = '<li class="flight_picker_item"><a href=""><p><strong></strong></p><p class="small"></p></a></li><li class="flight_picker_item"><a href=""><p><strong></strong></p><p class="small"></p></a></li><li class="flight_picker_item"><a href=""><p><strong></strong></p><p class="small"></p></a></li><li class="flight_picker_item"><a href=""><p><strong></strong></p><p class="small"></p></a></li>';

	$rs_red.on('click', '.sort_flights_container button' , function() {

		var $this = $(this),
			$actual_datepicker_container = $this.parents('.sort_flights_container'),
			$flight_picker_container = $actual_datepicker_container.find('.flight_picker'),
			$flight_picker_items = $flight_picker_container.children();


		if( $this.hasClass('date_next') ) {
			$flight_picker_container.children('.flight_picker_item:lt(4)').remove();
			$flight_picker_container.append($flight_picker_collection);
		} else {
			$flight_picker_container.children('.flight_picker_item:gt(2)').remove();
			$flight_picker_container.prepend($flight_picker_collection);
		}

		setActiveDate($flight_picker_items, $flight_picker_container);
	});

	function setActiveDate($flight_picker_items, $flight_picker_container) {
		$flight_picker_items = $flight_picker_container.children();
		$flight_picker_items.removeClass('active');
		$flight_picker_items.eq(3).addClass('active');
	}

	$rs_red.on('click', '.sort_flights_container .flight_picker .flight_picker_item', function(e) {
		e.preventDefault();

		var $flight_picker_items = $(this).parent().children();

			$flight_picker_items.removeClass('active');
			$(this).addClass('active');
	});
  TWOE End*/

//	*************************************************
//	flight selection: airport change popover
//	*************************************************
	var $popover_toggles = $rs_red.find('[data-toggle="popover"]');
	if ($popover_toggles.size() > 0) {
		$popover_toggles.each(function() {
			$(this).attr('tabindex', 0);
		}).popover();
	}

//	*************************************************
//  toggle details
//	*************************************************
	$rs_red.on('click', '.details .detail_link', function (e) {
		e.preventDefault();

		var $this = $(this),
                        //we exclude the tariff_content because even though it behaves the same as add_on_content,
                        //we want it to operate independently of other content boxes
			$add_on_containers = $rs_red.find('.add_on_content').not('.tariff_content'),
			$actual_container = $this.parents('.add_on_content');

                //if user clicked on tariff box
		if ($actual_container.hasClass('tariff_content')) {
                  $actual_container.toggleClass('active');
                } else

		if(!$actual_container.hasClass('active')) {
			$add_on_containers.removeClass('active');
			$actual_container.addClass('active');
		} else {
			$add_on_containers.removeClass('active');
		}
		//TWOE: fixGrandTotal();
	});
/* TWOE Start
//	***************************************************
// 	extra services: baggage modal: add extra baggages
//	***************************************************

	// prevent toggle of checkboxes on label-click
	$rs_red.on('click', '#baggage-modal .checkbox label', function (e) {
		e.preventDefault();
	});

	var $baggage_modal = $('#baggage-modal'),
		$baggage_modal_trigger,
		$baggage_teaser,
	    calculated_baggage_price_outbound = 0.00,
		calculated_baggage_price_inbound = 0.00,
		$baggage_content = $baggage_modal.find('.baggage_modal_content'),
		$baggage_container = $baggage_content.children('.baggage_container'),
		$baggage_container_second,
		cpy_settings,
		$total_second,
		$baggage_container_first,
		$total_baggage_costs,
		baggage_price,
		$total_first,
		baggage_safe = null,
		baggage_save_or_cancel = false;

	if ($baggage_container.length <= 1 ) {
		// hide first subtotal section if there is no return flight
		$baggage_container.find('.outbound_price').css('display','none');
	} else {
		$baggage_container_second = $baggage_container.eq(1);
		cpy_settings = $baggage_container_second.find('input[type=checkbox]');
		$total_second = $baggage_container_second.find('.baggage_total');
	}

	$baggage_container_first = $baggage_container.eq(0);
	$total_baggage_costs = $baggage_content.find('.total_baggage_costs');
	baggage_price = parseFloat($baggage_content.find('#baggage_price').data('baggageprice'));
	$total_first =  $baggage_container_first.find('.baggage_total');


	$rs_red.on('show.bs.modal', '#baggage-modal', function (event) {
		// reset variable
		baggage_save_or_cancel = false;

		$baggage_modal_trigger = $(event.relatedTarget); // Button that triggered the modal

		// get actual teaser to handle active / inactive state
		if ($baggage_modal_trigger.parents('.service_teaser').length) {
			$baggage_teaser = $baggage_modal_trigger.parents('.service_teaser');
		} else {
			$baggage_teaser = $baggage_modal_trigger.parents('.service_teaser_small');
		}

		// reset height if modal was already opened
		$baggage_modal.find('.modal-body').css('height', 'auto');

		// handle status of save button
		$baggage_modal.find('.save_modal')
			.toggleClass('disabled', baggage_safe === null && (calculated_baggage_price_inbound + calculated_baggage_price_outbound === 0.00));

		setTimeout(function(){
			setModalBodyHeight($baggage_modal, 'height');
		}, 300);
		// add padding to prevent window "jump" because scrollbar disappears when modal
		// is opened
		if($body.height() > $window.height()) {
			$body.addClass('special');
		}
	}).on('hide.bs.modal', '#baggage-modal', function() {
		if (baggage_safe !== null && !baggage_save_or_cancel) {
			// reset baggage selection
			initializeBaggageWidgets();
		}
	});

	// save baggage modal
	$rs_red.on('click', '#baggage-modal .save_modal', function(){
		var $modal = $('#baggage-modal'),
			$bggOut = $modal.find('.baggage_outbound'),
			$bggIn = $modal.find('.baggage_inbound'),
			tmpSafe = {},
			activeArr = [],
			useOutForIn = $('#use_outbound_settings').prop('checked') === true,
			baggageBooked = (calculated_baggage_price_outbound + calculated_baggage_price_inbound) > 0.00;

		$baggage_teaser.toggleClass('active', baggageBooked);
		$baggage_teaser.find('input.hidden').prop('checked', baggageBooked);
		setTimeout(function() {
			$baggage_teaser.find('.booked button').focus();
		},200);

		// handle outbound
		$bggOut.find('.data_row .suitcase').each(function(idx, elem) {
			activeArr.push($(elem).hasClass('active'));
		});
		tmpSafe.outbound = activeArr;
		tmpSafe.outboundPrice = calculated_baggage_price_outbound;

		// handle inbound
		tmpSafe.useOutbound = useOutForIn;
		tmpSafe.inboundPrice = calculated_baggage_price_inbound;
		if (useOutForIn) {
			tmpSafe.inbound = tmpSafe.outbound;
		} else {
			activeArr = [];
			$bggIn.find('.data_row .suitcase').each(function(idx, elem) {
				activeArr.push($(elem).hasClass('active'));
			});
			tmpSafe.inbound = activeArr;
		}

		// write safe to global variable
		baggage_safe = tmpSafe;

		baggage_save_or_cancel = true;

		// close modal
		$modal.modal('hide');
	});

	// cancel or close modal
	$rs_red.on('click', '#baggage-modal .cancel_link, #baggage-modal button.close', function(event) {
		var $modal = $('#baggage-modal');

		event.preventDefault();

		initializeBaggageWidgets();

		baggage_save_or_cancel = true;

		$modal.modal('hide');
	});

	function initializeBaggageWidgets() {
		var $modal = $('#baggage-modal'),
			$bggOut = $modal.find('.baggage_outbound'),
			$bggIn = $modal.find('.baggage_inbound'),
			currArr = baggage_safe !== null ? baggage_safe.outbound : null;

		// outbound
		$bggOut.find('.data_row').each(function(idx, elem) {
			var $row = $(elem),
				val = currArr !== null ? currArr[idx] : false;

			// set checkbox
			$row.find('input.hidden').prop('checked', val);
			// should the price and suitcase be activated?
			$row.find('.baggage_costs, .suitcase').toggleClass('active', val);
			// buttons
			$row.find('.baggage_decrement').toggleClass('disabled', !val);
			$row.find('.baggage_increment').toggleClass('disabled', val);
		});

		// inbound
		currArr = baggage_safe !== null ? baggage_safe.inbound : null;
		$bggIn.find('.data_row').each(function(idx, elem) {
			var $row = $(elem),
				val = currArr !== null ? currArr[idx] : false;

			// set checkbox
			$row.find('input.hidden').prop('checked', val);
			// should the price and suitcase be activated?
			$row.find('.baggage_costs, .suitcase').toggleClass('active', val);
			// buttons
			$row.find('.baggage_decrement').toggleClass('disabled', !val);
			$row.find('.baggage_increment').toggleClass('disabled', val);
		});

		// prices
		calculated_baggage_price_outbound = baggage_safe !== null ? baggage_safe.outboundPrice : 0.00;
		calculated_baggage_price_inbound = baggage_safe !== null ? baggage_safe.inboundPrice : 0.00;
		calculateTotals(calculated_baggage_price_outbound, $total_first);
		calculateTotals(calculated_baggage_price_inbound, $total_second);
		calculateTotalSum( calculated_baggage_price_outbound, calculated_baggage_price_inbound );

		// use outbound checkbox
		$('#use_outbound_settings').prop('checked', baggage_safe !== null ? baggage_safe.useOutbound : true);
	}

	// handle adding and removing baggage
	$rs_red.on('click', '#baggage-modal .baggage_decrement, #baggage-modal .baggage_increment', function () {
		var $this = $(this);

		var $act_baggage_buttons = $this.parent().children('button'),
			$actual_suitcase = $this.parent().children('.suitcase'),
			$act_price = $this.parents('.data_row').find('.baggage_costs'),
			check_increment = $this.hasClass('baggage_increment'),
			use_outbound_settings = cpy_settings.prop( 'checked'),
			$actual_checkbox = $actual_suitcase.parent().find('input[type=checkbox]');

		$actual_suitcase.toggleClass('active', check_increment);
		if ($actual_suitcase.hasClass('active')) {
			$actual_suitcase.find('.counter').html('<span class="sr-only">1</span>');
		}
		else {
			$actual_suitcase.find('.counter').html('<span class="sr-only">0</span>');
		}
		$act_baggage_buttons.toggleClass('disabled');

		// handle suitcases of both container parallel
		if( $baggage_container.length > 1 && $baggage_container_first.find($this).length && use_outbound_settings ) {

			var act_dataselect = $actual_suitcase.data('select'),
				$twin_suitcase = $baggage_container_second.find('.suitcase[data-select=' + act_dataselect + ']'),
				$twin_checkbox = $twin_suitcase.parent().find('input[type=checkbox].hidden'),
				$twin_price = $twin_suitcase.parents('.data_row').find('.baggage_costs'),
				$twin_baggage_buttons = $twin_suitcase.parent().find('button');

			$twin_suitcase.toggleClass('active', check_increment);
			if ($twin_suitcase.hasClass('active')) {
				$twin_suitcase.find('.counter').html('<span class="sr-only">1</span>');
			}
			else {
				$twin_suitcase.find('.counter').html('<span class="sr-only">0</span>');
			}
			$twin_price.toggleClass('active', check_increment);
			if ($twin_price.hasClass('active')) {
				$twin_price.html('<span class="sr-only">12,90 €</span>');
			}
			else {
				$twin_price.find('.counter').html('<span class="sr-only">0,00 €</span>');
			}
			$twin_checkbox.prop( 'checked', check_increment );

			adaptPrice(check_increment, 'price_outbound');
			adaptPrice(check_increment, 'price_inbound');

			$twin_baggage_buttons.toggleClass('disabled');

		} else if( $baggage_container_first.find($this).length ) {
			//handle  suitcases of first container only
			adaptPrice(check_increment, 'price_outbound');

		} else if ( $baggage_container.length > 1 && $baggage_container_second.find($this).length) {
			//handle  suitcases of second container only
			adaptPrice(check_increment, 'price_inbound');
		}

		// check / uncheck hidden checkbox
		$actual_checkbox.prop('checked', check_increment );

		// set price value: toggling class active shows different data-attributes
		$act_price.toggleClass('active', check_increment);
		if ($act_price.hasClass('active')) {
			$act_price.html('<span class="sr-only">12,90 €</span>');
		}
		else {
			$act_price.find('.counter').html('<span class="sr-only">0,00 €</span>');
		}

		// set total amount
		calculateTotalSum( calculated_baggage_price_outbound, calculated_baggage_price_inbound );

		if( $baggage_container_second.find($this).length && use_outbound_settings ) {
			cpy_settings.prop('checked', false );
		}

		// disable / enable use outbound flight settings and adapt suitcase and button status
		if( $baggage_container.length > 1 ) {

			cpy_settings.off('click').on('click', function() {
				var suitcases = $baggage_container_first.find('.suitcase'),
					buttons = $baggage_container_first.find('button'),
					costs = $baggage_container_first.find('.baggage_costs'),
					checkboxes = $baggage_container_first.find('input[type=checkbox].hidden'),
					block_total = $baggage_container_first.find('.baggage_total'),
					$twin_suitcases = $baggage_container_second.find('.suitcase'),
					$twin_buttons = $baggage_container_second.find('button'),
					$twin_checkboxes = $baggage_container_second.find('input[type=checkbox].hidden'),
					twin_costs = $baggage_container_second.find('.baggage_costs'),
					twin_total = $baggage_container_second.find('.baggage_total'),
					index_suitcase = 0,
					index_costs = 0,
					index_btn = 0,
					index_checkbox;
				calculated_baggage_price_inbound = calculated_baggage_price_outbound;

				// equalize both subtotals
				twin_total.text(block_total.text());

				// recalculate new total
				calculateTotalSum( calculated_baggage_price_outbound, calculated_baggage_price_inbound );

				suitcases.each(function(){
					$twin_suitcases.eq(index_suitcase).attr('class', $(this).attr('class'));
					index_suitcase ++;
				});

				costs.each(function(){
					twin_costs.eq(index_costs).attr('class', $(this).attr('class'));
					index_costs ++;
				});

				buttons.each(function(){
					$twin_buttons.eq(index_btn).attr('class', $(this).attr('class'));
					index_btn ++;
				});

				checkboxes.each(function(){
					$twin_checkboxes.eq(index_checkbox).prop('checked', $(this).prop('checked'));
					index_checkbox ++;
				});

				// handle status of save button
				$baggage_modal.find('.save_modal')
					.toggleClass('disabled', baggage_safe === null && (calculated_baggage_price_inbound + calculated_baggage_price_outbound === 0.00));
			});
		}

		// handle status of save button
		$baggage_modal.find('.save_modal')
			.toggleClass('disabled', baggage_safe === null && (calculated_baggage_price_inbound + calculated_baggage_price_outbound === 0.00));
	});

	function adaptPrice(increment, price) {
		if( price === 'price_outbound') {
			calculated_baggage_price_outbound  = increment === true ? calculated_baggage_price_outbound + baggage_price : calculated_baggage_price_outbound - baggage_price;
			calculateTotals(calculated_baggage_price_outbound, $total_first);
		}
		if( price === 'price_inbound') {
			calculated_baggage_price_inbound  = increment === true ? calculated_baggage_price_inbound + baggage_price : calculated_baggage_price_inbound - baggage_price;
			calculateTotals(calculated_baggage_price_inbound, $total_second);
		}
	}

	function calculateTotals(cost, element) {
		cost = cost.toFixed(2).toString();
		cost = cost.replace('.', ',');
		element.text(cost);
	}

	function calculateTotalSum(sum1, sum2) {
		var total = sum1 + sum2;
		calculateTotals(total, $total_baggage_costs);
	}
TWOE End*/

//	*************************************************
// 	extra services: load data into dynamic modal
//	*************************************************

	var $act_teaser;

	$rs_red.on('show.bs.modal', '#dynamic-modal', function (event) {

		var $modal = $(this),
			$modal_dialog = $modal.find('.modal-dialog'),
			$modal_body = $modal.find('.modal-body'),
			$modal_footer = $modal.find('.modal-footer'),
			button = $(event.relatedTarget), // Button that triggered the modal
			$title_icon = button.data('icon'),
			$title_text = button.data('headline'),
			modal_size= button.data('size'),
			modal_class = button.data('class'),
			modal_save = button.data('save'),
			modal_send = button.data('send'),
			modal_note = button.data('note'),
			url = button.data('content');

		$modal_body.attr('style', '');

		// add padding to prevent window "jump" because scrollbar disappears when modal
		// is opened
		if($body.height() > $window.height()) {
			$body.addClass('special');
		}

		if( url.substring(0, 4) !== 'http' ) {

			//TWOE: $.get(url, function(data) {
      // TWOE Start
			$.get(url, {"__": $.now()}, function(data) {
      // TWOE End
				$modal_body.html(data);
				$modal_body.attr('class' ,'modal-body').addClass(modal_class);
				setTimeout(function() {
					setModalBodyHeight($modal, 'max-height');
				},200);
			});

		} else {
			$modal_body.html('<iframe></iframe>');
			$modal.find('iframe').attr('src', url);
			setTimeout(function() {
				setModalBodyHeight($modal, 'height', true);
				$modal_body.css('overflow-y', 'hidden');
			},300);

		}

		$modal_dialog.attr('class' ,'modal-dialog').addClass(modal_size);

		// set title, title-icon and close-button of actual modal
		$modal_dialog.find('.modal-title').text($title_text);
		$modal_dialog.find('.modal-icon').attr('class' ,'modal-icon').addClass($title_icon);
		$modal_footer.attr('class', 'modal-footer');

		if ( modal_save ) {
			$modal_footer.attr('class', 'modal-footer').addClass('save');
		}

		if ( modal_send ) {
			$modal_footer.attr('class', 'modal-footer').addClass('send');
		}

		if ( modal_note ) {
			$modal_footer.addClass('notification');
		}

		// handle active state of teasers on auxiliary site
		if( button.parents('.service_teaser').length ) {
			$act_teaser = button.parents('.service_teaser');
		} else {
			$act_teaser = button.parents('.service_teaser_small');
		}

		$modal.off('click').on('click', '.save_modal', function(event){
			/*TWOE:*/ $modal.trigger('dynamic-modal.save', event);

      // add class active by default in case it is not ASR, that is handle in fb_services
      if( !$act_teaser.hasClass('asr')) {
        $act_teaser.addClass('active');
      } else {
        event.stopImmediatePropagation();
        return;
      }

			$act_teaser.find('input.hidden').prop('checked', true);
			setTimeout(function() {
				$act_teaser.find('.booked button').focus();
			},200);
		});

		$act_teaser.off('click').on('click', '.js_delete', function(){
			$act_teaser.removeClass('active');
		});

	});

	/// remove active state of teaser when clicked on trash
	$rs_red.on('click', '.service_teaser .js_delete, .service_teaser_small .js_delete', function () {
		var $delete_btn = $(this),
		$act_teaser = $delete_btn.parents('section[class^="service_teaser"]');
		$act_teaser.removeClass('active');
		$act_teaser.find('input.hidden').prop('checked', false);
	});

	$rs_red.on('hidden.bs.modal', '#dynamic-modal', function () {
		$(this).find('.modal-body').empty();
	});

//	*************************************************
// 	extra services: DO & CO modal
//	*************************************************
/* TWOE Start
	var $doco_teaser,
        doco_menu_safe = null,
		doco_menu_save_or_cancel = false;

	$rs_red.on('show.bs.modal', '#doco-modal', function (event) {
		var $modal = $(this),
			$slider = $modal.find('.doco_menu_slider'),
            $checkbox = $modal.find('input[type="checkbox"]'),
            $saveBtn = $modal.find('.save_modal'),
			$teaser_trigger = $(event.relatedTarget);

		// reset variable
		doco_menu_save_or_cancel = false;

		// get actual teaser to handle active / inactive state
		if ($teaser_trigger.parents('.service_teaser').length) {
			$doco_teaser = $teaser_trigger.parents('.service_teaser');
		} else {
			$doco_teaser = $teaser_trigger.parents('.service_teaser_small');
		}

		// initialize slider
		$slider.off('init').on('init', function() {
			var $track = $slider.find('.slick-track'),
				$item = $slider.find('.doco_menu_slider_item');

			setTimeout(function() {
				// we need to set the width manually - otherwise no animation is shown on first slide change
				$track.css({width: $item.length * $item.eq(0).width()});
				// manually trigger display of first slide
				$slider.slick('slickGoTo', 0, true);
				$modal.css('max-height', 'none');
				// set modal height after slider has been initialized
				setModalBodyHeight($modal, 'max-height');
			}, 200);
		});

		// initialize slider
		$slider.slick({
			dots: true,
			infinite: true,
			speed: 0,
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>',
			customPaging: function($slider, i) {
				var $currSlide = $slider.$slides.eq(i),
					thumbSrc = $currSlide.attr('data-thumbnail-url'),
					title = $currSlide.attr('data-thumbnail-title');
				return '<button type="button" class="doco_menu_thumbnail" data-role="none" role="button" aria-required="false" tabindex="0"><img src="' + thumbSrc + '" alt="' + title + '"><span>' + title + '</span></button>';
			}
		});

		// for keyboard users
		$slider.find('button').attr('tabindex', '-1');
		$slider.find('.slick-active').off('focus').on('focus', function() {
				$('#notice-keyboard').show();
		});
		$slider.find('.slick-active').off('blur').on('blur', function() {
			$('#notice-keyboard').hide();
		});



		// handle availability of save button
        $checkbox.off('change').on('change', function() {
            $saveBtn.toggleClass('disabled', !$checkbox.prop('checked'));
        });

        // set save button status depending on current checkbox status
        $saveBtn.toggleClass('disabled', !$checkbox.prop('checked'));

	}).on('hide.bs.modal', '#doco-modal', function() {
		var $modal = $(this),
			$slider = $modal.find('.doco_menu_slider');

		$slider.slick('unslick');

		if (doco_menu_safe !== null && !doco_menu_save_or_cancel) {
			initializeDoCoMenuWidgets();
		}
	});

	// save Do & Co modal
	$rs_red.on('click', '#doco-modal .save_modal', function() {
        var $modal = $('#doco-modal'),
            $widgetContainer = $modal.find('.doco_menu_container'),
            $fields = $widgetContainer.find('input[type="hidden"]'),
            $field,
            i, l = $fields.length,
            tmpSafe = [];

        // loop over all fields
        for (i=0; i<l; i+=1) {
            $field = $fields.eq(i);
            // store name and value
            tmpSafe.push({
                name: $field.attr('name'),
                value: $field.val()
            });
        }
        // write entries to global variable
        doco_menu_safe = tmpSafe;

        // handle teaser
		$doco_teaser.addClass('active');
		$doco_teaser.find('input.hidden').prop('checked', true);

		doco_menu_save_or_cancel = true;

        // close modal
        $modal.modal('hide');
		$doco_teaser.find('.booked button').focus();
	});

    // cancel Do & Co modal
    $rs_red.on('click', '#doco-modal .cancel_link, #doco-modal button.close', function(event) {
        var $modal = $('#doco-modal');

        event.preventDefault();

	    initializeDoCoMenuWidgets();

	    doco_menu_save_or_cancel = true;

        $modal.modal('hide');
    });

	$rs_red.on('click', '#doco-modal .doco_menu_list a', function(e) {
		var $this = $(this),
			isThumbnailLink = $this.hasClass('doco_menu_thumbnail'),
			$widget = $this.parents('.doco_menu_widget'),
			$dropdown = $widget.find('.dropdown'),
			$hiddenField = $widget.find('input[type="hidden"]'),
			$selectedLabel = $widget.find('.doco_menu_selected');

		e.preventDefault();

		if (isThumbnailLink) {
			if (!$this.hasClass('active')) {
				// remove active class from other menu links
				$widget.find('a.active').removeClass('active');
				// add active class to the selected link
				$this.addClass('active');
				// save the menu id
				$hiddenField.val($this.attr('data-menu-id'));
				// change the name of the selected menu in the dropdown button
				$selectedLabel.text($this.attr('data-menu-title'));
				// show that the dropdown has a selection
				$dropdown.addClass('has_selection');
				//set focus to next dropdown
				//$widget.next().find('button').focus();
				$widget.find('button').focus();
			}
		} else { // cancel link
			// remove active mark from selected menu
			$widget.find('a.active').removeClass('active');
			// clear field
			$hiddenField.val('');
			// remove selected menu from button label
			$selectedLabel.text($selectedLabel.attr('data-empty'));
			// show that the dropdown has no selection
			$dropdown.removeClass('has_selection');
			// keep focus on dropdown
			$dropdown.find('button').focus();
		}
	});

    function initializeDoCoMenuWidgets() {
        var $widgets = $('#doco-modal').find('.doco_menu_widget'),
            i, l = $widgets.size(),
            si, sl,
            $currWidget, $dropdown,
            $selectedLabel, $menuListItems,
            $selectedItem, $field,
            currItem, item, fieldName,
            resetWidget = function($field, $dropdown, $selectedLabel, $menuListItems) {
                $field.val('');
                $dropdown.removeClass('has_selection');
                $selectedLabel.text($selectedLabel.attr('data-empty'));
                $menuListItems.filter('.active').removeClass('active');
            };

        for (i=0; i<l; i+=1) {
            $currWidget = $widgets.eq(i);
            $field = $currWidget.find('input.hidden');
            $dropdown = $currWidget.find('.dropdown');
            $selectedLabel = $dropdown.find('.doco_menu_selected');
            $menuListItems = $currWidget.find('.doco_menu_thumbnail');

            if (doco_menu_safe !== null) {
                item = null;
                fieldName = $field.attr('name');
                sl = doco_menu_safe.length;

                // find the related item in the safe
                for (si=0; si<sl; si+=1) {
                    currItem = doco_menu_safe[si];
                    if (currItem.name === fieldName) {
                        item = currItem;
                        break;
                    }
                }
                if (item !== null) {
                    $field.val(item.value);

                    if (item.value !== '') {
                        $field.val(item.value);
                        $selectedItem = $menuListItems.filter('[data-menu-id="' + item.value +  '"]');

                        if ($selectedItem.size() > 0) {
                            // set text
                            $selectedLabel.text($selectedItem.attr('data-menu-title'));
                            // highlight selection in list
                            $menuListItems.filter('.active').removeClass('active');
                            $selectedItem.addClass('active');
                            // show that the dropdown has a selection
                            $dropdown.addClass('has_selection');
                        }
                    } else {
                        resetWidget($field, $dropdown, $selectedLabel, $menuListItems);
                    }
                }
            } else {
                resetWidget($field, $dropdown, $selectedLabel, $menuListItems);
            }
        }
    }

//	*************************************************
// 	extra services: Climate Austria modal
//	*************************************************

	var $climate_teaser;

	$rs_red.on('show.bs.modal', '#climate-modal', function (event) {
		var $modal = $(this),
			$projectWidget = $modal.find('.climate_project_widget'),
			$projectField = $projectWidget.find('input[type="hidden"]'),
			$projectLabel = $projectWidget.find('.btn-label'),
			$checkbox = $modal.find('input[type="checkbox"]'),
            $saveBtn = $modal.find('.save_modal'),
			$teaser_trigger = $(event.relatedTarget);

		// uncheck agb checkbox and disable save button
		$('#climate_agb').prop('checked', false);
		$saveBtn.addClass('disabled');

		// get actual teaser to handle active / inactive state
		if ($teaser_trigger.parents('.service_teaser').length) {
			$climate_teaser = $teaser_trigger.parents('.service_teaser');
		} else {
			$climate_teaser = $teaser_trigger.parents('.service_teaser_small');
		}

		$projectWidget.off('click').on('click', '.dropdown-menu a', function (event) {
			var $link = $(this);

			event.preventDefault();
			// write link text into the dropdown's label
			$projectLabel.text($link.text());
			// store selected value in hidden field
			$projectField.val($link.attr('data-project-id'));
			// make focus remain on dropdown
			$projectLabel.parent().focus();
		});

		$checkbox.off('change').on('change', function() {
            $saveBtn.toggleClass('disabled', !$checkbox.prop('checked'));
        });

		setTimeout(function() {
			$modal.css('max-height', 'none');
			setModalBodyHeight($modal, 'max-height');
		}, 200);
	});

	// save Climate Austria modal
	$rs_red.on('click', '#climate-modal .save_modal', function() {
		$climate_teaser.addClass('active');
		$climate_teaser.find('input.hidden').prop('checked', true);
		$climate_teaser.find('.text .booked button').focus();
	});
TWOE End*/
//	*******************************************************
// 	modals: resize modal body on loading
//	*******************************************************

	function setModalBodyHeight($modal, style, iframe) {
		var $window_height = window.innerHeight || $window.height(),
			$this = $modal,
			$modal_body = $this.find('.modal-body'),
			$modal_dialog = parseInt($this.find('.modal-dialog').css('margin-top')),
			$modal_header_h = $this.find('.modal-header').outerHeight(),
			$modal_footer_h = $this.find('.modal-footer').outerHeight(),
			height,
			modal_height,
			max_height;

		height = $window_height - $modal_header_h - $modal_footer_h - ($modal_dialog*2);
		if (iframe) {
			$modal_body.css(style, height);
			return;
		}

		modal_height = $modal_body.outerHeight();
		max_height = modal_height < height ? modal_height : height;
		$modal_body.css(style, max_height);
	}
  window.setModalBodyHeight = setModalBodyHeight;
//	***************************************
// 	passenger-details: move focus on change
//	***************************************

	//$('.rs_red form [data-focus-next]').change(function(){
	$rs_red.on('change', 'form [data-focus-next]', function(){
		var $this = $(this),
			$form = $this.parents('form'),
			$next = $form.find('[name="' + $this.attr('data-focus-next') + '"]');

		if ($next.size() > 0) {
			$next.focus();
		}
	});

//	*******************************************************
// 	passenger-details: add / remove further email addresses
//	*******************************************************

	var counter_passenger_emails = 1;
	$rs_red.on('click', '.passenger_details.contact_information .add_email, .passenger_details.contact_information .btn_remove_email', function(e) {
		e.preventDefault();
		var $this = $(this),
				add_mail = $this.hasClass('add_email'),
				$email_elements = $this.parents('.email_container').find('.email'),
				$next_email_element = $this.parents('.email').next('.email'),
				$mail_container = $email_elements.eq(0).clone();

		$mail_container.find('input').val('');
		$mail_container.find('label').attr('for', 'email_' + counter_passenger_emails);
		$mail_container.find('input').attr('id', 'email_' + counter_passenger_emails);
		counter_passenger_emails++;
		$mail_container.find('.has-error').removeClass('has-error');
		$mail_container.find('input').after('<a href="#" class="btn_remove_email"><span class="lh-icon-close"><span class="sr-only">Remove e-mail</span></span></a>');

		if( add_mail ) {
			$email_elements.last().after($mail_container);
			$mail_container.find('input').focus();
      /*TWOE:*/      $mail_container.find('input').addClass('new-input').addClass('non-mandatory').removeAttr('required');
		} else {
			if ($next_email_element.length) {
				$next_email_element.find('input').focus();
			}
			else {
				$('button.add_email').focus();
			}
			$this.parents('.email').remove();
		}

	});


//	*******************************************************
// 	form error: focus first field that has error
//	*******************************************************

	$rs_red.on('click', '.form-error-info .goto_error', function(e) {
    // TWOE Start
    if( !($rs_red.find('form').hasClass('aua-validation')) ){
      e.preventDefault();
      $rs_red.find('form .form-group.has-error').eq(0).find('select, input, textarea').eq(0).focus();
    }
    // TWOE End
	});


//	**********************************************************
// 	summary: remove no-cash services
//	**********************************************************

	$rs_red.on('click','.summary .remove_services', function(e) {
		e.preventDefault();

    //Remove Services based on FOP
    removeServicesFOP( $(this));

    //Update the layout
    $rs_red.find('.passenger_services .no_cash_service').remove();
    $rs_red.find('.cash_payment').removeClass('no_cash');
    $rs_red.find('.has-services-toremove').each(function(){
      $(this).removeClass('has-services-toremove');
      $(this).find("#notice_cc").hide();
    });

		// keep focus on radio button
		$('#payment_location').focus();
	});


//	*************************************************
// 	summary: display details of payment methods in summary page
//	*************************************************

	$rs_red.on('click', '.payment input[type="radio"], .payment input[type="checkbox"]', function() {
		var $act_banking_container = $(this).parents('.banking_content'),
			$payment = $rs_red.find('.payment'),
			$all_banking_container = $payment.find('.banking_content');

		if( $(this).attr('type') === 'checkbox' ) {
			$payment.find('.billing_address').toggleClass('active');
		} else {
			$all_banking_container.removeClass('active');
			$act_banking_container.addClass('active');
		}
	});


//	*************************************************
// 	summary: switch cursor into next credit card field after typing 4 times
//	*************************************************

	$rs_red.on('keyup', '.cc_number input', function(event){
		var $act_input = $(this);
		var $val_length = $act_input.val().length;

		// if pressed key is not shiftkey
		if( event.which !== '16') {
			if ( $val_length >= $act_input.attr('maxlength') && !$act_input.hasClass('visited') ) {
				$act_input.addClass('visited');
				$act_input.parent().next().children().focus();
			}
			else if ( $act_input.hasClass('visited') ) {
				$act_input.removeClass('visited');
			}
		}
	}).on('focusin', '.cc_number input', function(){
		$(this).select();
	}).on('focusout', '.cc_number input', function(){
		var $act_input = $(this);
		if( $act_input.val().length > 0 ) {
			$act_input.addClass('visited');
		}
	});



//	*****************************************************************
// 	adapt contact data modal: add / remove further email addresses
//	*****************************************************************

	var contact_email_number = 3;
	$rs_red.on('click', '#dynamic-modal .adapt_contact_modal .add_email, #dynamic-modal .adapt_contact_modal .btn_remove_email', function(e) {
		e.preventDefault();
		var $this = $(this),
			add_mail = $this.hasClass('add_email'),
			$email_elements = $this.parents('.email_container').find('.email'),
			$next_email_element = $this.parents('.email').next('.email'),
			$mail_container = $email_elements.eq(0).clone(),
			$mail_input = $mail_container.find('input');

		$mail_input.val('');
		//var contact_email_number = $('.adapt_contact_modal .btn_remove_email').length + 2;
		$mail_container.find('label').attr('for', 'email_' + contact_email_number);
		$mail_container.find('input').attr('id', 'email_' + contact_email_number);
		contact_email_number++;
		$mail_container.find('.has-error').removeClass('has-error');
		$mail_input.after('<a href="#" class="btn_remove_email"><span class="lh-icon-close"></span></a>');

		if( add_mail ) {
			$email_elements.last().after($mail_container);
		} else {
			if ($next_email_element.length) {
				$next_email_element.find('input').focus();
			}
			else {
				$('button.add_email').focus();
			}
			$this.parents('.email').remove();
		}
	});


//	*****************************************************************
// 	confirmation: slider
//	*****************************************************************


	$rs_red.on('click', '.picto_content_wrapper .next', function(){
		var $picto_slider_container = $rs_red.find('.picto_slider'),
			$picto_slider_items = $picto_slider_container.children(),
			$picto_item_width = $picto_slider_items.eq(0).outerWidth(),
			$picto_width_to_slide = $picto_item_width;

		for(var i = 0; i < 6; i++) {
			($picto_slider_items.eq(i)).clone().appendTo($picto_slider_container);
			$picto_width_to_slide += $picto_item_width;
		}

		$picto_slider_container.animate({
			left: -$picto_width_to_slide
		}, 500, function() {
			$picto_slider_items.slice( 0, 6 ).remove();
			$picto_slider_container.css('left', 5);
		});
	});
// TWOE Start
//  *************************************************
//  Forgot Password Modal: load data into dynamic modal
//  *************************************************

  var $act_teaser;

  $rs_red.on('show.bs.modal', '#psw-forgot-modal', function (event) {

    var $modal = $(this),
        $modal_dialog = $modal.find('.modal-dialog'),
        $modal_body = $modal.find('.modal-body'),
        $modal_footer = $modal.find('.modal-footer'),
        button = $(event.relatedTarget), // Button that triggered the modal
        $title_icon = button.data('icon'),
        $title_text = button.data('headline'),
        modal_size= button.data('size'),
        modal_class = button.data('class'),
        modal_save = button.data('save'),
        modal_send = button.data('send'),
        modal_note = button.data('note'),
        url = button.data('content');

    $modal.show();
    $modal_body.attr('style', '');

    // add padding to prevent window "jump" because scrollbar disappears when modal
    // is opened
    if($body.height() > $window.height()) {
      $body.addClass('special');
    }

    $modal_body.html('<iframe id="psw-forgot-modal-iframe" scrolling="no" frameborder="0" src="'+url+'"></iframe>');

    var modal_iframe = document.getElementById('psw-forgot-modal-iframe');

    var modal_iframe_resize = function( iframe, modal_iframe_body, modal_iframe_height){
      iframe.find('.modal-content').css('height', ( modal_iframe_height+$(modal_iframe_body).outerHeight(true))+'px');
      iframe.css('height', ( $(modal_iframe_body).outerHeight(true))+'px');
    };

    modal_iframe.onload = function(){

      var modal_iframe_body = this.contentWindow.document.body;
      var modal_iframe_height = $(this).outerHeight();
      var iframe = $(this);

      $(modal_iframe_body).find('form').on('submit', function(){
        modal_iframe_resize( iframe, modal_iframe_body, modal_iframe_height);
      });

      $(modal_iframe_body).find('input').on('blur', function(){
        if( $(this).hasClass('error')){
          modal_iframe_resize( iframe, modal_iframe_body, modal_iframe_height);
        }
      });

      modal_iframe_resize( iframe, modal_iframe_body, modal_iframe_height);
    };

    $modal_dialog.attr('class' ,'modal-dialog').addClass(modal_size);

    // set title, title-icon and close-button of actual modal
    $modal_dialog.find('.modal-title').text($title_text);
    $modal_dialog.find('.modal-icon').attr('class' ,'modal-icon').addClass($title_icon);
    $modal_footer.attr('class', 'modal-footer');

    if ( modal_save ) {
      $modal_footer.attr('class', 'modal-footer').addClass('save');
    }

    if ( modal_send ) {
      $modal_footer.attr('class', 'modal-footer').addClass('send');
    }

    if ( modal_note ) {
      $modal_footer.addClass('notification');
    }

    // handle active state of teasers on auxiliary site
    if( button.parents('.service_teaser').length ) {
      $act_teaser = button.parents('.service_teaser');
    } else {
      $act_teaser = button.parents('.service_teaser_small');
    }

    $modal.off('click').on('click', '.save_modal', function(){
      $act_teaser.addClass('active');
      $act_teaser.find('input.hidden').prop('checked', true);
    });
    $act_teaser.off('click').on('click', '.delete_extra', function(){
      $act_teaser.removeClass('active');
    });

  });

});


////////////////////////
// Custom AUA Methods //
////////////////////////

var AUAValidation = ( function( $) {

  /*****
  Public jQuery Validation Attributes:
    creditcard: ( value, element )
    date: ( value, element )
    dateISO: ( value, element )
    digits: ( value, element )
    email: ( value, element )
    equalTo: ( value, element, param )
    max: ( value, element, param )
    maxlength: ( value, element, param )
    min: ( value, element, param )
    minlength: ( value, element, param )
    number: ( value, element )
    password: ( value, el)
    range: ( value, element, param )
    rangelength: ( value, element, param )
    remote: ( value, element, param )
    required: ( value, element, param )
    url: ( value, element )
  ******/


  //  Private attributes
  var forms,
      alphaNumeric = /^[a-zA-Z0-9\-\_\.\@\ ]*$/,
      onlyLetters = /^[a-zA-Z\,\(\)\/\s]+$/,
      dateFormat = /^((0?[1-9]|[12][0-9]|3[01])[- ..](0?[1-9]|1[012])[- ..](201[5-7]))*$/,//From 2015-2017
      onlyNumbers = /^[1-9][0-9]*$/,
      numberInString = /\d+/g,
      validationRules = {
        password: {
          minlength: 4,
          maxlength: 40
        },
        email: {
          email: true
        },
        phone_prefix: {
          number: true,
          maxlength: 10
        },
        phone_number: {
          number: true,
          maxlength: 20
        }
      };

  /*
  * @description: add custom validation methods to the plugin
  * @private
  */
  function addMethods() {

    // Custom methods
    $.validator.addMethod( 'only_letters', function( value, el) {
      return $('#card_profile').is(':enabled') ? true : value.match(onlyLetters);
    });

    $.validator.addMethod( 'no_numbers', function( value, el) {
      return !value.match(numberInString);
    });

    $.validator.addMethod( 'alpha_numeric', function( value, el) {
      return value.match(alphaNumeric);
    });

    $.validator.addMethod( 'dateformat', function( value, el) {
      return value.match(dateFormat);
    });

    // inf has to be zero to num adt
    $.validator.addMethod( 'numchd', function( value, el) {
      var numchd = parseInt( $('#numchd').val());

      if( numchd > 8){
        $('#numchd').val( 0);
        return false;
      }

      if( numchd == 8){
        $('#numchd').siblings('.passenger_increment').addClass('disabled');
        $('#numchd').siblings('.passenger_decrement').removeClass('disabled');
      }else if( numchd == 0){
        $('#numchd').siblings('.passenger_decrement').addClass('disabled');
        $('#numchd').siblings('.passenger_increment').removeClass('disabled');
      }else if( numchd <= 8){
        $('#numchd').siblings('.passenger_increment').removeClass('disabled');
        $('#numchd').siblings('.passenger_decrement').removeClass('disabled');
      }

      return true;
    });

    // inf has to be zero to num adt
    $.validator.addMethod( 'numinf', function( value, el) {
      var numinf = parseInt( $('#numinf').val()),
          numadt = parseInt( $('#numadt').val());

      if( numinf > 9){
        $('#numinf').val( 0);
        return false;
      }

      if( numinf == 9){
        $('#numinf').siblings('.passenger_increment').addClass('disabled');
        $('#numinf').siblings('.passenger_decrement').removeClass('disabled');
      }else if( numinf == 0){
        $('#numinf').siblings('.passenger_decrement').addClass('disabled');
        $('#numinf').siblings('.passenger_increment').removeClass('disabled');
      }else if( numinf <= 9){
        $('#numinf').siblings('.passenger_increment').removeClass('disabled');
        $('#numinf').siblings('.passenger_decrement').removeClass('disabled');
      }

      if( numinf > 0 && numinf > numadt){
        return false;
      }
      return true;
    });

    // inf has to be zero to num adt
    $.validator.addMethod( 'numadt', function( value, el) {
      var numadt = parseInt( $('#numadt').val());
      if( numadt > 9 || numadt == 0){
        $('#numadt').val(1);
        return false;
      }

      if( numadt == 9){
        $('#numadt').siblings('.passenger_increment').addClass('disabled');
        $('#numadt').siblings('.passenger_decrement').removeClass('disabled');
      }else if( numadt == 1){
        $('#numadt').siblings('.passenger_decrement').addClass('disabled');
        $('#numadt').siblings('.passenger_increment').removeClass('disabled');
      }else if( numadt <= 8){
        $('#numadt').siblings('.passenger_increment').removeClass('disabled');
        $('#numadt').siblings('.passenger_decrement').removeClass('disabled');
      }

      return true;
    });

    // max 9 pax are allowed
    $.validator.addMethod( 'totalpax', function( value, el) {
      var numinf = parseInt( $('#numinf').val()),
          numchd = parseInt( $('#numchd').val()),
          numadt = parseInt( $('#numadt').val());

      if( ( numadt + numchd) > 9){
        return false;
      }
      return true;
    });

    $.validator.addClassRules( 'flight_date_js', {
      dateformat: 'dateformat'
    });

    $.validator.addClassRules( 'alpha_numeric', {
      alpha_numeric: 'alpha_numeric'
    });

    $.validator.addClassRules( 'only_letters', {
      only_letters: 'only_letters'
    });

    //Custom validator for input origin & destin
    $.validator.addClassRules( 'airportname', {
      required: true,
      no_numbers: 'no_numbers'
    });

    //Custom validator for summary credit card option
    $.validator.addClassRules( 'credit_card', {
      required: function( el){

        //If we are validating CVC, detect if its using an CC Airplus
        if( $(el).attr('id') == 'card_cvc' && !$('#card_profile').is(':enabled')){
          return ( $('#card_type').val() == 'TP') ? false : true;
        }
        return $('#card_profile').is(':enabled') ? false : true;
      }
    });

    //Custom validator for summary credit card option
    $.validator.addClassRules( 'credit_card_number', {
      digits: true
    });

    //Custom Validator for PostalCode
    $.validator.addClassRules( 'postal_code', {
      maxlength: 8
    });

    //Custom validator for summary profile credit card
    $.validator.addClassRules( 'card_profile_cvc', {
      required: function(){
        var creditCardVal = $('#card_profile_card').val().split(",");
        creditCardVal = creditCardVal[3];

        if( creditCardVal == 'TP' && $('#card_profile').is(':enabled')){
          return false;
        }
        return $('#card_profile').is(':enabled');
      }
    });

    //Custom validator for fqtv number
    $.validator.addClassRules( 'fqtvnumber', {
      required: function( el){
        var fqtvtype = $(el).data("fqtvtype");
        $('#'+fqtvtype).valid();
        return ( $('#'+fqtvtype).val() != '' ? true : false);
      }
    });

    //Custom validator for fqtv dropdown
    $.validator.addClassRules( 'fqtvtype', {
      required: function( el){
        var fqtvnumber = $(el).data("fqtvnumber");
        if( $('#'+fqtvnumber).val() == ''){
          $(el).removeClass('has-error').closest('.form-group').removeClass('has-error');
          $('#'+fqtvnumber).removeClass('has-error').closest('.form-group').removeClass('has-error');
        }
        return ( $('#'+fqtvnumber).val() != '' ? true : false);
      }
    });

    //Custom validator for no numbers allowed
    $.validator.addClassRules( 'no_numbers', {
      no_numbers: 'no_numbers'
    });

    //Custom validator for optional billing address
    $.validator.addClassRules( 'digits', {
      digits: true
    });

    //Custom validator for optional billing address
    $.validator.addClassRules( 'optional-address', {
      required: function(){
        return $('#billing_address').is(':enabled');
      }
    });

    //Custom validator for input numadt
    $.validator.addClassRules( 'numadt', {
      required: true,
      numadt: 'numadt',
      range: [1,9],
      digits: true,
      numinf: 'numinf',
      totalpax: 'totalpax'
    });

    //Custom validator for input numchd
    $.validator.addClassRules( 'numchd', {
      required: true,
      numchd: 'numchd',
      range: [0,8],
      digits: true,
      totalpax: 'totalpax'
    });

    //Custom validator for input numinf
    $.validator.addClassRules( 'numinf', {
      required: true,
      numinf: 'numinf',
      range: [0,9],
      digits: true,
      totalpax: 'totalpax'
    });
  }

  /*
  * @description: sets up validation for a single form
  * @private
  * @param: jQuery Form
  */
  function setupValidation( form){
    form.addClass( 'aua-validation');
    form.validate({
      //debug: true,//Uncomment for not submiting the form
      onfocusout: function ( element) {

        if( $(element).hasClass('pref_date')){
          return;
        }

        var clearErrors = $(element).valid();
        if( clearErrors){
          $(element).closest('.form-group').removeClass('has-error');
        }
      },
      errorPlacement: function( error, element) {
        if( !$(element).hasClass('new-input')){
          $(element).closest('.form-group').addClass('has-error');

          var errorId = $(element).data('errorid');

          if( typeof( errorId) != 'undefined') {
            $('#'+errorId).css('display', 'block');
          }
        }else{
          $(element).removeClass('new-input');
        }
      },
      success: function( label, element){
        $(element).closest('.form-group').removeClass('has-error');

        var errorId = $(element).data('errorid');

        if( typeof( errorId) != 'undefined') {
          $('#'+errorId).css('display', 'none');
        }
      },
      rules: validationRules,
      focusInvalid: false,
    });
    form.on('submit', function(e){
      var errorWrap = $('#error_wrap'),
          isSubmit = true;

      var genericErrorDisplay = function( typeError){

        typeError = ( typeof( typeError) == 'undefined') ? false : typeError;

        errorWrap.addClass('has-error');
        errorWrap.find('.text-danger-specific').hide();
        errorWrap.find('.text-danger-fop').hide();
        errorWrap.find('.text-danger-general').show();

        if( typeError === 'fop_services'){
          var cFOP = $('input[name=fop]:checked').val();
          errorWrap.find('.text-danger-specific').hide();
          errorWrap.find('.text-danger-general').hide();
          errorWrap.find('.error_fop_'+cFOP).show();
        }

        $('html,body').animate({scrollTop: (errorWrap.offset().top)-50},'slow');
      };

      if( !$(this).valid()){

        genericErrorDisplay();

        //specific case for dates in prefs and summary screen
        $('.pref_date').each( function(){
          if( $(this).hasClass('error')){
            var errorId = $(this).data('errorid');
            $(this).closest('.form-group').addClass('has-error');
            $('#'+errorId).css('display', 'block');
          }
        });

        isSubmit = false;
      }

      if ( $(this).hasClass("aua-search-form") && isSubmit) {
        waitScreen();
      }

      //Specific case for services removal
      if( $('.services-toremove:visible').length > 0){
        genericErrorDisplay('fop_services');
        isSubmit = false;
      }

      //Specific case for additional email on prefScreen
      if( $('.non-mandatory').length > 0){
        $('.non-mandatory').each( function(){
          if( typeof($(this).val()) == 'undefined' || $(this).val() == ''){
            $(this).attr('disabled', 'disabled');
          }else{
            var emailRe = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            if( !emailRe.test( $(this).val())){
              $(this).closest('.form-group').addClass('has-error')
              genericErrorDisplay();
              isSubmit = false;
            }
          }
        });
      }

      return isSubmit;
      e.preventDefault();
    });
  }

  /*
  * @description: sets up validation for all the forms
  * @param
  * @public
  */
  function init(){
    addMethods();

    forms = $('form');
    forms.each( function( i, el) {
      setupValidation( $(el));
    });
  }

$(document).on("click.aua.dropdown", function() {
	$("a.showRechtliches.active").removeClass("active");
});

$("a.showRechtliches").on("click", function (e) {
    var $mnu 	   = $(this),
		offsetLeft = $mnu.offset().left - $("#footer .service").offset().left + 10;
	$mnu.toggleClass("active");
  	// Recalculate layout
    $("#rechtlichesBox .middle").css("padding-left", offsetLeft);
    $(window).scrollTop( $mnu.offset().top);
});

  return{
    init: init
  }

})(jQuery);

$(function() {
  AUAValidation.init();

  //Control FQTV number + Profile numbers
  $('.fqtvtype').on('change', function(){
    var isProfile  = $(this).find('option:selected').data('number'),
        fqtvNumber = $(this).data('fqtvnumber');

    if( typeof(isProfile) != 'undefined' && isProfile != ''){
      $('#'+fqtvNumber).val(isProfile);
    }else{
      $('#'+fqtvNumber).val('');
    }
  });

  //Trigger prefilled data for FQTV only if theres prefilled info
  if( $('.fqtvtype').find('option[data-number]').length > 0){
    $('.fqtvtype').change();
    $('.fqtvnumber').blur();
  }
});
// TWOE End
