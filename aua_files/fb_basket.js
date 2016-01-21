(function(){
  "use strict";

  /**
   * Update frequency for debounced functions
   */
  var UPDATE_FREQ = 100; // DOM Updates
  var RECALC_FREQ =  50; // Model changes
  //var RESIZE_FREQ = 500; // Basket sticky function (expensive)

  /**
   * Debug levels
   */
  var DEBUG = eeDebug.MSG;

  /**
   *  @class   FlightModel
   *  @extends Backbone.Model
   *  Flight Journey data
   *  A Flight journey contains the data from all outbound or inbound legs.
   */
  var FlightModel = Backbone.Model.extend({
    idAttribute: "jix",
    defaults: {
      "compCode":        "",
      "originCode":      "",
      "originName":      "",
      "destinCode":      "",
      "destinName":      "",
      "departureDate":   null,
      "departureTime":   null,
      "arrivalTime":     0,
      "numStops":        0,
      "isOutbound":      true,
      // This are set only when airportChange is true
      "airportChange":   false,
      "arrivalCityName": null,
      "arrivalName":     null,
      "arrivalCode":     null,
      "departureName":   null,
      "departureCode":   null,
      // List of legs
      "legs":            []
    },

    /**
     * Stores the flight info
     */
    parse: function(fltData) {
      eeDebug("FlightModel::parse", DEBUG.MODEL);
      var legs   = this.parseFlightLegs(fltData);
      var change = _.findWhere(legs, {"airportChange": true});
      return _.extend(fltData, {
        "isOutbound":      fltData.jix == 0,
        "numStops":        legs.length - 1,
        "airportChange":   change ? true : false,
        "arrivalCityName": change ? change.destinCityName : null,
        "arrivalName":     change ? change.destinName     : null,
        "arrivalCode":     change ? change.destinCode     : null,        
        "departureName":   change ? change.departureName  : null,
        "departureCode":   change ? change.departureCode  : null,
        "legs":            legs
      });
    },

    /**
     * returns the flight legs info
     */    
    parseFlightLegs: function(fltData) {
      return _.map(fltData.legs, function(leg, idx, legs) {
        // Check for airport change
        leg.airportChange = (idx + 1 < legs.length && leg.destinCode !== legs[idx + 1].originCode) ? true : false;
        // In case of airport change, add extra info.
        if( leg.airportChange) {
          leg.departureCode = legs[idx + 1].originCode,
          leg.departureName = legs[idx + 1].originName
        }
        return leg;
      });
    }
  });

  /**
   * @class   FlightsCollection
   * @extends Backbone.Collection
   * Flights Collection
   * Stores one flight-journey per direction: Outbound, Inbound
   */
  var FlightsCollection = Backbone.Collection.extend({ "model": FlightModel });

  /**
   *  @class   FareModel
   *  @extends Backbone.Model
   *  Fares per pax type
   */
  var FareModel = Backbone.Model.extend({
    idAttribute: "paxType",
    defaults: {
      "numPax":      0,
      "totalFares":  0,
      "totalTaxes":  0,
      "totalTSC":    0, // Ticket service charges
      "total":       0,
      // These are only set at availability time
      "taxRef":      null,
      "outbRef":     null,
      "inbRef":      null,
      "hasFareDtls": false
    }
  });

  /**
   * @class   FaresCollection
   * @extends Backbone.Collection
   * Fares Collection 
   * We will have one fare per pax type ADT, CHD, INF
   */
  var FaresCollection = Backbone.Collection.extend({ "model": FareModel });

  /**
   * @class   SeatModel
   * @extends Backbone.Model
   * Data stored for the seats
   */
  var SeatModel = Backbone.Model.extend({
    defaults: {
      "pix":        0,
      "six":        0,
      "type":       "",
      "flightNum":  "",
      "number":     "",
      "price":      0,
      "currency":   ""
    }
  });

  /**
   * @class   SeatsCollection
   * @extends Backbone.Collection
   * Collection of seats,
   * There is max. one seat per pax and per flight-leg
   */
  var SeatsCollection = Backbone.Collection.extend({ "model": SeatModel });

  /**
   * @class   BagModel
   * @extends Backbone.Model
   * Data stored per baggage
   */
  var BagModel = Backbone.Model.extend({
    defaults: {
      "pix":    0,
      "jix":    0,
      "weight": 0,
      "price":  0,
      "num":    0
    }
  });

  /**
   * @class   BagsCollection
   * @extends Backbone.Collection
   * Collection of bags
   */
  var BagsCollection = Backbone.Collection.extend({ "model": BagModel });

  /**
   * @class   MealModel
   * @extends Backbone.Model
   * Data stored for the meals
   */
  var MealModel = Backbone.Model.extend({
    defaults: {
      "pix":        0,
      "six":        0,
      "title":      "",
      "price":      0,
      "currency":   ""
    }
  });

  /**
   * @class   MealsCollection
   * @extends Backbone.Collection
   * Collection of meals,
   * There is max. one meal per pax and per flight-leg
   */
  var MealsCollection = Backbone.Collection.extend({ "model": MealModel });

  /**
   *  @class   BasketModel
   *  @extends Backbone.Model
   *  Basket Model
   *  This contains all the info.
   */
  var BasketModel = Backbone.Model.extend({
    defaults: {
      "numJourneys":        1,
      "numAdt":             0,
      "numChd":             0,
      "numInf":             0,
      "currency":           "EUR",
      "totalFlights":       0,
      "totalAncillaries":   0,
//      "totalExtras":        0,
//      "totalServices":      0,   // totalAncillaries + totalExtras
      "eVoucherConditions": false,
      "eVoucherCode":       false,
      "eVoucherUsed":       false,
      "eVoucherPartlyUsed": false,
      "eVoucherRest":       0,
      "eVoucherDiscount":   0,
      "totalPayment":       0,
      "paxes":              [], // Array of passengers, used as read-only
    },

    initialize: function() {
      var updateFares, updateTotalAncillaries, updateTotal;
      _.bindAll(this);
      this.flights = new FlightsCollection();
      this.fares   = new FaresCollection();
      this.seats   = new SeatsCollection();
      this.bags    = new BagsCollection();
      this.meals   = new MealsCollection();
      this.extras  = new Backbone.Collection();

      updateFares = _.debounce(this.calcTotalFares, RECALC_FREQ);
      this.listenTo(this.fares, "add remove change reset", updateFares);

      updateTotalAncillaries = _.debounce(this.calcTotalAncillaries, RECALC_FREQ);
      this.listenTo(this.seats,  "add remove change reset", updateTotalAncillaries);
      this.listenTo(this.bags,   "add remove change reset", updateTotalAncillaries);
      this.listenTo(this.meals,  "add remove change reset", updateTotalAncillaries);

      updateTotal = _.debounce(this.calcTotalPayment, RECALC_FREQ);
      this.listenTo(this, "change:totalFlights",     updateTotal);
      this.listenTo(this, "change:totalAncillaries", updateTotal);
//      this.listenTo(this, "change:totalExtras",      updateTotal);
//      this.listenTo(this, "change:totalServices",    updateTotal);
      this.listenTo(this, "change:eVoucherDiscount", updateTotal);
    },

    clear: function() {
      eeDebug("BasketModel::clear", DEBUG.MODEL);
      this.set(_.extend({}, this.defaults, Twoe.basket.model));
      this.flights.remove(1);
      this.fares.reset();
      this.seats.reset();
      this.bags.reset();
      this.meals.reset();
      this.extras.reset();
    },

    /**
     * Given an array with flight-leg information and selected compartment,
     * stores a new flight-journey
     */
    addFlight: function(fltData, comp) {
      eeDebug("BasketModel::addFlight", DEBUG.MODEL);
      fltData = _.clone(fltData);
      fltData.compCode = comp;
      this.flights.add(fltData, {"parse":true, "merge":true});
    },

    /**
     * Adds flight-fare information per pax
     */
    setFlightFares: function(totalsByPax) {
      this.fares.set( totalsByPax);
    },

    /**
     * Sets the selected seats per pax.
     * Since all seats are rendered together, we just reset the whole collection
     */
    setSeats: function(seats) {
      this.seats.reset(seats);
    },

    /**
     * Sets the selected bags per pax.
     * Since all bags are rendered together, we just reset the whole collection
     */
    setBags: function(outbound, inbound) {
      var bags = _.union( outbound, inbound);
      // Remove not selected bags
      bags = _.reject(bags, function(bag) { return bag.num < 1; });
      this.bags.reset(bags);
    },

    setInsurance: function(insurance) {
      this.removeInsurance();
      this.extras.add({
        "id":          "erv",
        "isInsurance": true,
        "numAdt":      this.get("numAdt"),
        "numChdInf":   this.get("numChd") + this.get("numInf"),
        "name":        insurance.name,
        "total":       insurance.total
      });
    },

    removeInsurance: function() {
      this.extras.remove("erv");
    },

    setMeals: function(selectedMeals) {
      this.meals.set(selectedMeals);
    },

    setClimateAustria: function(greenseat) {
      this.extras.add({
        "id":          "climateaustria",
        "isClimate":   true,
        "total":       parseFloat(greenseat.total),
        "name":        greenseat.name,
        "value":       greenseat.value
      });
    },

    removeClimateAustria: function() {
      this.extras.remove("climateaustria");
    },

    addCarRental: function(data) {
      this.removeCarRental();
      this.extras.add({
        "id":          "cartrawler",
        "isCarRental": true,
        "model":       data.model,
        "total":       parseFloat(data.total),
        "insurance":   parseFloat(data.insurance),
        "img":         data.img,
        "pickupInfo":  data.pickupInfo,
        "fuelInfo":    data.fuelInfo
      });
    },

    removeCarRental: function() {
      this.extras.remove("cartrawler");
    },

    /**
     * Calculate total fares for flights
     */
    calcTotalFares: function() {
      eeDebug("BasketModel::calcTotalFares", DEBUG.MODEL);
      var totalFlights = _.sum( this.fares.map(function(fare) {
        return fare.get("total") * fare.get("numPax");
      }));
      this.set("totalFlights", totalFlights);
    },

    /**
     * Calculate total for ancillaries
     */
    calcTotalAncillaries: function() {
      eeDebug("BasketModel::calcTotalAncillaries", DEBUG.MODEL);
      var total = _.sum(this.seats.map('price')) +
                  _.sum(this.bags.map('price'))  + // Assuming only 1 bag per segment is allowed
                  _.sum(this.meals.map('price'));
      this.set("totalAncillaries", total);
    },

    /**
     * Calculates the grand total
     * Just makes a sum of all other totals
     */
    calcTotalPayment: function() {
      eeDebug("BasketModel::calcTotalPayment", DEBUG.MODEL);
      var totalPayment = this.get("totalFlights") + 
                         this.get("totalAncillaries");
//                         this.get("totalExtras"),
//                         this.get("totalServices");
      if( this.get("eVoucherCode")) {
        totalPayment -= this.get("eVoucherDiscount");
      }
      this.set("totalPayment", totalPayment);      
    },

    /**
     * Returns the seats info grouped by pax and journey
     */
    getSeatsPerPax: function() {
      var paxes = this.get("paxes");
      return {
        "numSeats":    this.seats.length,
        "seatsTotal":  _.sum(this.seats.map('price')),
        "seatsPerPax": _.compact(_.map(paxes, this.getSeatsPerJourney))
      };
    },

    /**
     * Returns the selected seats for the given pax.
     * Seats are grouped by journey
     */
    getSeatsPerJourney: function(pax) {
      var l, seat, seats, direction, fltLegs, six, selection;
      six       = 0; // Segment index including outbounds and inbounds
      selection = {"outbound":[], "inbound":[]};
      seats     = this.seats;

      // Iterate each flight journey
      this.flights.each( function(fltJourney) {
        direction = fltJourney.get("isOutbound") ? "outbound" : "inbound";
        fltLegs   = fltJourney.get("legs");
        // Per each flight leg, retrieve the seat data
        for( l = 0; l < fltLegs.length; ++l) {
          seat = seats.findWhere({ "six":six, "pix":pax.pix });
          ++six; // Increment the seat index
          if( !seat) {
            continue;
          }
          // Store the selection
          selection[direction].push({
            "flightNumber": fltLegs[l].carrierCode + ' ' + fltLegs[l].flightNumber,
            "seatNumber":   seat.get("number"),
            "seatPrice":    seat.get("price")
          });
        }
      });

      if( selection.outbound.length < 1 && selection.inbound.length < 1) {
        return null;
      }

      return {
        "firstName": pax.firstName,
        "lastName":  pax.lastName,
        "infant":    pax.infant || null,
        "outbounds": selection.outbound,
        "inbounds":  selection.inbound.length ? selection.inbound : null,
      }
    },

    getBagsPerPax: function() {
      var paxes = this.get("paxes");
      return {
        "numBags":      this.bags.length,
        "baggageTotal": _.sum(this.bags.map('price')),
        "bagsPerPax":   _.compact(_.map(paxes, this.getBagsPerJourney))
      };
    },

    getBagsPerJourney: function(pax, pix) {
      var bags, direction, selection;
      selection = {"outbound":[], "inbound":[]};
      bags      = this.bags.toJSON();
      _.each(bags, function(bag) {
        if( bag.pix !== pix || bag.num < 1) {
          return;
        }
        direction = bag.jix === 0 ? "outbound" : "inbound";
        selection[direction].push(bag);
      });

      if( selection.outbound.length < 1 && selection.inbound.length < 1) {
        return null;
      }
      return {
        "firstName": pax.firstName,
        "lastName":  pax.lastName,
        "infant":    pax.infant || null,
        "outbounds": selection.outbound,
        "inbounds":  selection.inbound.length ? selection.inbound : null,
      }
    },


    /**
     * Returns the seats info grouped by pax and journey
     */
    getMealsPerPax: function() {
      var paxes = this.get("paxes");
      return {
        "numMeals":    this.meals.length,
        "mealsTotal":  _.sum(this.meals.map('price')),
        "mealsPerPax": _.compact(_.map(paxes, this.getMealsPerJourney))
      };
    },

    /**
     * Returns the selected seats for the given pax.
     * Seats are grouped by journey
     */
    getMealsPerJourney: function(pax) {
      var l, meal, meals, direction, fltLegs, six, selection;
      six       = 0; // Segment index including outbounds and inbounds
      selection = {"outbound":[], "inbound":[]};
      meals     = this.meals;

      // Iterate each flight journey
      this.flights.each( function(fltJourney) {
        direction = fltJourney.get("isOutbound") ? "outbound" : "inbound";
        fltLegs   = fltJourney.get("legs");
        // Per each flight leg, retrieve the meal data
        for( l = 0; l < fltLegs.length; ++l) {
          meal = meals.findWhere({ "six":six, "pix":pax.pix });
          ++six; // Increment the meal index
          if( !meal) {
            continue;
          }
          // Store the selection
          selection[direction].push({
            "flightNumber": fltLegs[l].carrierCode + ' ' + fltLegs[l].flightNumber,
            "mealTitle":    meal.get("title"),
            "mealPrice":    meal.get("price")
          });
        }
      });

      if( selection.outbound.length < 1 && selection.inbound.length < 1) {
        return null;
      }
      return {
        "firstName": pax.firstName,
        "lastName":  pax.lastName,
        "infant":    pax.infant || null,
        "outbounds": selection.outbound,
        "inbounds":  selection.inbound.length ? selection.inbound : null,
      }
    }    
  });

  /**
   *  @class BasketView
   *  @extends Backbone.View
   *  Main view for the basket
   */
  var BasketView = Backbone.View.extend({
    /**
     * Component templates
     */
    templates: {
      "selection":    Twoe.templates.selection,
      "ancillaries":  Twoe.templates.ancillaries,
      "extras":       Twoe.templates.extras,
      "totals":       Twoe.templates.totals
    },    

    /**
     * Partial templates
     */
    partials: {
      "emptyFlights": Twoe.templates.emptyFlights,
      "flight":       Twoe.templates.flights,
      "flightLegs":   Twoe.templates.flightLegs,
      "paxes":        Twoe.templates.paxes,
      "paxDetails":   Twoe.templates.paxBreakdown,
      "totalFlights": Twoe.templates.totalFlights,
      "baggages":     Twoe.templates.baggages,
      "seats":        Twoe.templates.seats,
      "meals":        Twoe.templates.meals
    },

    /**
     * Constructor
     */
    initialize: function() {
      var rdr, updateFlights, updateAncillaries, updateExtras, updateTotals;
      _.bindAll(this);

      this.$selection   = this.$("#BasketSelection");
      this.$ancillaries = this.$("#BasketAncillaries");
      this.$extras      = this.$("#BasketExtras");
      this.$totals      = this.$("#BasketTotals");

      rdr = new RenderScheduler({
        DEBUG_LEVEL: DEBUG.BASKETVIEW,
        UPDATE_FREQ: UPDATE_FREQ
      });

      updateFlights = rdr.debounce(this.renderFlightsSelection);
      this.listenTo(this.model.flights, "add remove change reset", updateFlights);
      this.listenTo(this.model.fares,   "add remove change reset", updateFlights);
      this.listenTo(this.model, "change:totalFlights",             updateFlights);

      updateTotals = rdr.debounce(this.renderTotals);
      this.listenTo(this.model, "change", updateTotals);
      window.updateTotals = updateTotals;

      updateAncillaries = rdr.debounce(this.renderAncillaries);
      this.listenTo(this.model.seats,  "add remove change reset", updateAncillaries);
      this.listenTo(this.model.bags,   "add remove change reset", updateAncillaries);
      this.listenTo(this.model.meals,  "add remove change reset", updateAncillaries);

      updateExtras = rdr.debounce(this.renderExtras);
      this.listenTo(this.model.extras, "add remove change reset", updateExtras);

      /*this.triggerResize = rdr.debounce(function() { 
        eeDebug("BasketView::triggerResize", DEBUG.BASKETVIEW);
        $("body").trigger("displayGrandTotal");
      }, RESIZE_FREQ);*/
    },

    /**
     * Render the hole basket
     */
    render: function() {
      eeDebug("BasketView::render", DEBUG.BASKETVIEW);
      this.renderFlightsSelection();
      this.renderAncillaries();
      this.renderTotals();
      return this;
    },

    /**
     * Renders flight selection
     */
    renderFlightsSelection: function() {
      var view, partials;
      eeDebug("BasketView::renderFlightsSelection", DEBUG.BASKETVIEW);
      this.$selection.find("a[data-toggle=popover]").popover("destroy");

      if( this.model.flights.length < 1) {
        this.renderEmptyFlights()
        return;
      }

      view = _.extend(this.model.toJSON(), {
        "flights":   this.model.flights.toJSON(),
        "hasFares":  this.model.fares.length > 0,
        "paxTotals": this.model.fares.toJSON()
      });

      partials = {
        "flightTemplate":       this.partials.flight,
        "flightLegsTemplate":   this.partials.flightLegs,
        "paxesTemplate":        this.partials.paxes,
        "paxDetailsTemplate":   this.partials.paxDetails,
        "totalFlightsTemplate": this.partials.totalFlights
      };

      this.$selection.html( this.templates.selection(view, {"partials": partials}));
      this.$selection.find("a[data-toggle=popover]").popover();
      //this.triggerResize();
    },

    /**
     * Render flight selection when no flights are selected
     */
    renderEmptyFlights: function() {
      var j, l, view, partials;
      eeDebug("BasketView::renderEmptyFlights", DEBUG.BASKETVIEW);
      view = _.extend(this.model.toJSON(), {
        "flights":[]
      });
      for( j = 0, l = this.model.get("numJourneys"); j < l; ++j) {
        view.flights.push({ "isOutbound": j == 0 });
      }
      partials = {
        "flightTemplate": this.partials.emptyFlights,
        "paxesTemplate":  this.partials.paxes,
        "totalFlightsTemplate": this.partials.totalFlights
      };
      this.$selection.html( this.templates.selection(view, {"partials": partials}));
      //this.triggerResize();
    },

    /**
     * Render ancillaries per pax
     * TODO: Render each individually
     */
    renderAncillaries: function() {
      var view, partials, paxes = this.model.get("paxes");
      eeDebug("BasketView::renderAncillaries", DEBUG.BASKETVIEW);
      // Abort if no paxes are saved
      if( paxes.length < 1) {
        this.$ancillaries.empty().addClass("hide");
        return;
      }
      view = {
        "selectedSeats":    this.model.getSeatsPerPax(),
        "selectedBags":     this.model.getBagsPerPax(),
        "selectedMeals":    this.model.getMealsPerPax(),
        "totalAncillaries": this.model.get("totalAncillaries")
      };
      partials = {
        "seatsTemplate":    this.partials.seats,
        "baggagesTemplate": this.partials.baggages,
        "mealsTemplate":    this.partials.meals
      };

      if( view.selectedSeats.numSeats == 0 &&
          view.selectedBags.numBags   == 0 &&
          view.selectedMeals.numMeals == 0) {
          this.$ancillaries.empty().addClass("hide");
        return;
      }

      this.$ancillaries.html( this.templates.ancillaries(view, {"partials": partials})).removeClass("hide");
      //this.triggerResize();
    },

    renderExtras: function() {
      var view, paxes = this.model.get("paxes");
      eeDebug("BasketView::renderAncillaries", DEBUG.BASKETVIEW);
      // Abort if no paxes are saved
      if( paxes.length < 1 || this.model.extras.length < 1) {
        this.$extras.empty().addClass("hide");
        return;
      }
      view = {
        "selectedExtras":   this.model.extras.toJSON()
      };
      this.$extras.html( this.templates.extras(view)).removeClass("hide");;
      //this.triggerResize();
    },

    /**
     * Render totals
     * Don't render anything if no flights are selected
     */
    renderTotals: function() {
      eeDebug("BasketView::renderTotals", DEBUG.BASKETVIEW);
      this.$totals.html( this.templates.totals(this.model.toJSON()));
      //this.triggerResize();
    }
  });

  /**
   * Export interface
   */
  var Basket = {
    model: null,
    view:  null
  };

  /**
   * Auto initialize the basket on page ready
   */
  $(function() {
    // Create the model
    Basket.model = new BasketModel(Twoe.basket.model);
    // Create the view
    Basket.view  = new BasketView({
      el:    "#BasketContainer",
      model: Basket.model
    });
    // Add preselected flights
    if( Twoe.basket.flights) {
      Basket.model.flights.add(Twoe.basket.flights, {"parse":true, "merge":true});
    }
    // Add preselected fares
    if( Twoe.basket.fares) {
      Basket.model.fares.add(Twoe.basket.fares);
    }
    // Add preselected seats
    if( Twoe.basket.seats) {
      Basket.model.seats.add(Twoe.basket.seats);
    }
    // Add preselected baggages
    if( Twoe.baggages) {
      Basket.model.setBags(Twoe.baggages.outbounds, Twoe.baggages.inbounds);
    }
    // Add preselected insurances
    if( Twoe.erv) {
      var insurance = _.findWhere(Twoe.erv, {"selected": true});
      insurance && Basket.model.setInsurance(insurance);
    }
    if( Twoe.meals) {
      Basket.model.setMeals(_.flatten(_.map(Twoe.meals.paxes, 'meals')));
    }
    if( Twoe.greenseat) {
      Basket.model.setClimateAustria(Twoe.greenseat);
    }
    if( Twoe.cartrawler) {
      Basket.model.addCarRental(Twoe.cartrawler);
    }    
    // render once if empty
    if( Basket.model.flights.length < 1) {
      Basket.view.render();
    }
  });

  window.Basket = Basket;
  return Basket;
})();