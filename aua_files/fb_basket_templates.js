this["Twoe"] = this["Twoe"] || {};
this["Twoe"]["templates"] = this["Twoe"]["templates"] || {};

this["Twoe"]["templates"]["ancillaries"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"col-md-12\">\r\n  <div class=\"border_wrapper\">\r\n    <div class=\"row\">\r\n      <div class=\"add_on_header col-md-12\">\r\n        <h3 class=\"text-large\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"your_services",{"name":"text","hash":{},"data":data}))
    + "</h3>\r\n      </div>\r\n    </div>\r\n\r\n"
    + ((stack1 = container.invokePartial(partials.baggagesTemplate,depth0,{"name":"baggagesTemplate","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = container.invokePartial(partials.seatsTemplate,depth0,{"name":"seatsTemplate","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = container.invokePartial(partials.mealsTemplate,depth0,{"name":"mealsTemplate","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n    <div class=\"add_on_footer row spacing_horizontal\">\r\n      <div class=\"price_block\">\r\n        <p class=\"col-md-6\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"services",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n        <p class=\"col-md-6 price\"><strong>"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalAncillaries : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong></p>\r\n      </div>\r\n    </div>  \r\n\r\n  </div>\r\n</div>";
},"usePartial":true,"useData":true});

this["Twoe"]["templates"]["baggages"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.numBags : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"row price_block add_on_content\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"row add_on_item\">\r\n          <div class=\"col-md-2 spacing_horizontal_small\">\r\n            <span class=\"lh-icon-baggage text-largest text-eased icon\"></span>\r\n          </div>\r\n          <div class=\"col-md-10 spacing_top\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"row \">\r\n                  <div class=\"col-md-7\">\r\n                    <p class=\"fl_left\">"
    + alias3(((helper = (helper = helpers.numBags || (depth0 != null ? depth0.numBags : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numBags","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.text_pluralize || (depth0 && depth0.text_pluralize) || alias2).call(alias1,{"name":"text_pluralize","hash":{"count":(depth0 != null ? depth0.numBags : depth0),"one":"fb_services/bags_extra_singular","many":"fb_services/bags_extra_plural"},"data":data}))
    + "</p>\r\n                  </div>\r\n                  <div class=\"col-md-5\">\r\n                    <strong class=\"fl_right\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.baggageTotal : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 spacing_top_small spacing_btm_med details\">\r\n                <span class=\"detail_icon\"></span>\r\n                <a href=\"\" class=\"detail_link\" data-active=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"hide_details",{"name":"text","hash":{},"data":data}))
    + "\" data-inactive=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"show_details",{"name":"text","hash":{},"data":data}))
    + "\"></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bagsPerPax : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n    <hr>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"detail_container row spacing_horizontal\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <p class=\"h5\">"
    + alias4(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</p>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.infant : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\r\n            </div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.outbounds : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inbounds : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n          </div>\r\n        </div>\r\n        "
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=container.lambda;

  return "                <p class=\"h5 spacing_top_small\">+ "
    + alias1((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"infant",{"name":"text","hash":{},"data":data}))
    + ": "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.infant : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.infant : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "</p>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"row spacing_top_med\">\r\n              \r\n              <div class=\"col-md-2\">\r\n                <span class=\"lh-icon-outbound text-largest text-eased icon fl_left\"></span>\r\n              </div>\r\n\r\n              <div class=\"col-md-10\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.outbounds : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\r\n\r\n            </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"row\">\r\n                  <div class=\"col-md-7\">\r\n                    <p>"
    + alias4(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num","hash":{},"data":data}) : helper)))
    + " &times; "
    + alias4(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data}) : helper)))
    + " kg</p>\r\n                  </div>\r\n                  <div class=\"col-md-5 text-right\">\r\n                    <p>"
    + alias4((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"price","hash":{},"data":data}))
    + "</p>\r\n                  </div>\r\n                </div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"row spacing_top_med\">\r\n              \r\n              <div class=\"col-md-2\">\r\n                <span class=\"lh-icon-inbound  text-largest text-eased icon fl_left\"></span> \r\n              </div>\r\n              <div class=\"col-md-10\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.inbounds : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\r\n\r\n            </div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return " <hr> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.selectedBags || (depth0 != null ? depth0.selectedBags : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"selectedBags","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.selectedBags) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

this["Twoe"]["templates"]["emptyFlights"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "          <span class=\"lh-icon-outbound\"><span class=\"sr-only\">"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"outbound",{"name":"text","hash":{},"data":data}))
    + "</span></span> \r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "          <span class=\"lh-icon-inbound\"><span class=\"sr-only\">"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"inbound",{"name":"text","hash":{},"data":data}))
    + "</span></span>  \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"row flight_container add_on_content empty\">\r\n  <div class=\"col-md-12\">\r\n    <div class=\"row\">\r\n      <h4 class=\"col-md-2 text-muted text-largest spacing_horizontal_small\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isOutbound : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </h4>\r\n      <div class=\"col-md-10 spacing_horizontal\">\r\n        <p class=\"placeholder h5\"> - </p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});

this["Twoe"]["templates"]["extras"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"col-md-12\">\r\n	<div class=\"border_wrapper\">\r\n		<div class=\"row\">\r\n			<div class=\"add_on_header col-md-12\">\r\n				<h3 class=\"text-large fl_left\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"other_services",{"name":"text","hash":{},"data":data}))
    + "</h3>\r\n				<p class=\"fl_right small\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"charged_seperately",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n			</div>\r\n		</div>\r\n		\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.selectedExtras : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInsurance : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isClimate : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCarRental : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<div class=\"row price_block add_on_content\">\r\n			<div class=\"col-md-2 spacing_top_med\">\r\n				<h4>\r\n					<span class=\"rs_icon_insurance text-larger text-eased icon fl_left\">\r\n						<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"insurance",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n					</span>\r\n				</h4>\r\n			</div>\r\n			<div class=\"col-md-6 spacing_horizontal_big\">\r\n				<p>\r\n					"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"travel_insurance_for",{"name":"text","hash":{},"data":data}))
    + "\r\n					<small>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</small>\r\n				</p>\r\n			</div>\r\n			<div class=\"col-md-4 spacing_horizontal_big text-right\">\r\n				<strong class=\"\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.total : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n			</div>\r\n		</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<div class=\"row price_block add_on_content \">\r\n			<div class=\"col-md-2 spacing_horizontal_small\">\r\n				<h4>\r\n					<span class=\"lh-icon-travelguide text-largest text-eased icon fl_left\">\r\n						<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"climate_austria",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n					</span>\r\n				</h4>\r\n			</div>\r\n			<div class=\"col-md-6 spacing_horizontal_big\">\r\n				<p>\r\n					"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"climate_austria",{"name":"text","hash":{},"data":data}))
    + "\r\n					<small>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</small>\r\n				</p>\r\n			</div>\r\n			<div class=\"col-md-4 spacing_horizontal_big text-right\">\r\n				<strong class=\"\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.total : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n			</div>\r\n		</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function", alias5=helpers.blockHelperMissing, buffer = 
  "		<div class=\"row price_block add_on_content car_rental\">\r\n			<div class=\"col-md-12\">\r\n				<div class=\"row add_on_item\">\r\n					<div class=\"col-md-2 spacing_horizontal\">\r\n						<h4>\r\n							<span class=\"lh-icon-car text-largest text-eased icon fl_left\">\r\n								<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"car_rental",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n							</span>\r\n						</h4>\r\n					</div>\r\n					<div class=\"col-md-10 spacing_top\">\r\n						<div class=\"row\">\r\n							<div class=\"col-md-12\">\r\n								<div class=\"row\">\r\n									<div class=\"col-md-7\">\r\n										<p class=\"fl_left\">\r\n											"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"car_model",{"name":"text","hash":{},"data":data}))
    + ": <br>"
    + alias3(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"model","hash":{},"data":data}) : helper)))
    + "\r\n										</p>\r\n									</div>\r\n									<div class=\"col-md-5\">\r\n										<strong class=\"fl_right\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.total : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n									</div>\r\n								</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.insurance : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</div>\r\n							<div class=\"col-md-12 spacing_top_small spacing_btm_med details\" aria-hidden=\"true\">\r\n								<span class=\"detail_icon\"></span>\r\n								<a href=\"#\" class=\"detail_link\" data-active=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"hide_details",{"name":"text","hash":{},"data":data}))
    + "\" data-inactive=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"show_details",{"name":"text","hash":{},"data":data}))
    + "\">\r\n									<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"toggle_details",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n								</a>\r\n							</div>\r\n						</div>\r\n					</div>\r\n				</div>\r\n\r\n				<div class=\"detail_container\">\r\n					<div class=\"row\">\r\n						<div class=\"col-md-12 spacing_horizontal_big\">\r\n							<img src=\""
    + alias3(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" class=\"img-thumbnail\"> <!-- http://placehold.it/293x293 -->\r\n						</div>\r\n					</div>\r\n					<div class=\"row\">\r\n						<div class=\"col-md-12\">\r\n							<h5>\r\n								<strong>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"pickup_station",{"name":"text","hash":{},"data":data}))
    + "</strong>\r\n							</h5>\r\n							<p>"
    + alias3(((helper = (helper = helpers.pickupInfo || (depth0 != null ? depth0.pickupInfo : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"pickupInfo","hash":{},"data":data}) : helper)))
    + "</p>\r\n						</div>\r\n					</div>\r\n					<hr>\r\n";
  stack1 = ((helper = (helper = helpers.pickup || (depth0 != null ? depth0.pickup : depth0)) != null ? helper : alias2),(options={"name":"pickup","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias4 ? helper.call(alias1,options) : helper));
  if (!helpers.pickup) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = helpers["return"] || (depth0 != null ? depth0["return"] : depth0)) != null ? helper : alias2),(options={"name":"return","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias4 ? helper.call(alias1,options) : helper));
  if (!helpers["return"]) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "					<div class=\"row\">\r\n						<div class=\"col-md-12 spacing_btm_med\">\r\n							<p>* "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"car_rental_small_letter",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "								<div class=\"row\">\r\n									<div class=\"col-md-7\">\r\n										<p class=\"fl_left\">\r\n											"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"car_insurance",{"name":"text","hash":{},"data":data}))
    + "\r\n										</p>\r\n									</div>\r\n									<div class=\"col-md-5\">\r\n										<strong class=\"fl_right\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.insurance : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n									</div>\r\n								</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "					<div class=\"row\">\r\n						<div class=\"col-md-12\">\r\n							<h5>\r\n								<strong>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"pickup_station",{"name":"text","hash":{},"data":data}))
    + "</strong>\r\n							</h5>\r\n							<p>"
    + alias3(((helper = (helper = helpers.stationName || (depth0 != null ? depth0.stationName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"stationName","hash":{},"data":data}) : helper)))
    + ", "
    + alias3(((helper = (helper = helpers.stationAddr || (depth0 != null ? depth0.stationAddr : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"stationAddr","hash":{},"data":data}) : helper)))
    + "</p>\r\n							<p>"
    + alias3(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</p>\r\n						</div>\r\n					</div>\r\n					<div class=\"row\">\r\n						<div class=\"col-md-12 spacing_top_med\">\r\n							<h6 class=\"h5\"><strong>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"station_details",{"name":"text","hash":{},"data":data}))
    + "</strong></h6>\r\n							<p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"city",{"name":"text","hash":{},"data":data}))
    + ":  "
    + alias3(((helper = (helper = helpers.stationCity || (depth0 != null ? depth0.stationCity : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"stationCity","hash":{},"data":data}) : helper)))
    + "</p>\r\n							<p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"phone",{"name":"text","hash":{},"data":data}))
    + ": "
    + alias3(((helper = (helper = helpers.stationPhone || (depth0 != null ? depth0.stationPhone : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"stationPhone","hash":{},"data":data}) : helper)))
    + "</p>\r\n						</div>\r\n					</div>\r\n					<hr>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "					<div class=\"row\">\r\n						<div class=\"col-md-12\">\r\n							<h5><strong>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"return_station",{"name":"text","hash":{},"data":data}))
    + "</strong></h5>\r\n							<p>"
    + alias3(((helper = (helper = helpers.stationName || (depth0 != null ? depth0.stationName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"stationName","hash":{},"data":data}) : helper)))
    + ", "
    + alias3(((helper = (helper = helpers.stationAddr || (depth0 != null ? depth0.stationAddr : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"stationAddr","hash":{},"data":data}) : helper)))
    + "</p>\r\n							<p>"
    + alias3(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</p>\r\n						</div>\r\n					</div>\r\n					<hr>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "<hr>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.selectedExtras : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["Twoe"]["templates"]["flightLegs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"information_block col-md-12\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-10 spacing_horizontal col-md-offset-2\">\r\n          <div class=\"carrier_container\">\r\n            <span class=\"icon-airline icon-"
    + alias4(((helper = (helper = helpers.carrierIcon || (depth0 != null ? depth0.carrierIcon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"carrierIcon","hash":{},"data":data}) : helper)))
    + "\"></span>\r\n            <div class=\"small fl_left\">\r\n              <p>\r\n                <strong>"
    + alias4(((helper = (helper = helpers.carrierCode || (depth0 != null ? depth0.carrierCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"carrierCode","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.flightNumber || (depth0 != null ? depth0.flightNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flightNumber","hash":{},"data":data}) : helper)))
    + "</strong>\r\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.operatorCode : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.partnerCode : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n              </p>\r\n            </div>\r\n          </div>\r\n          <p class=\"h5\">"
    + alias4(((helper = (helper = helpers.originName || (depth0 != null ? depth0.originName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"originName","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.originCode || (depth0 != null ? depth0.originCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"originCode","hash":{},"data":data}) : helper)))
    + ") - "
    + alias4(((helper = (helper = helpers.destinName || (depth0 != null ? depth0.destinName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"destinName","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.destinCode || (depth0 != null ? depth0.destinCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"destinCode","hash":{},"data":data}) : helper)))
    + ")</p>\r\n          <p>"
    + alias4(((helper = (helper = helpers.departureDate || (depth0 != null ? depth0.departureDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"departureDate","hash":{},"data":data}) : helper)))
    + "</p>\r\n          <p>"
    + alias4(((helper = (helper = helpers.departureTime || (depth0 != null ? depth0.departureTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"departureTime","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.arrivalTime || (depth0 != null ? depth0.arrivalTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"arrivalTime","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.daysDiff : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.airportChange : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"operated_by",{"name":"text","hash":{},"data":data}))
    + " "
    + alias3(((helper = (helper = helpers.operatorName || (depth0 != null ? depth0.operatorName : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"operatorName","hash":{},"data":data}) : helper)))
    + "<br> ";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"for",{"name":"text","hash":{},"data":data}))
    + " "
    + alias3(((helper = (helper = helpers.partnerName || (depth0 != null ? depth0.partnerName : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"partnerName","hash":{},"data":data}) : helper)))
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"text-eased add_days small\">+"
    + container.escapeExpression(((helper = (helper = helpers.daysDiff || (depth0 != null ? depth0.daysDiff : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"daysDiff","hash":{},"data":data}) : helper)))
    + "</span>";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"information_block col-md-12\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-10 spacing_horizontal col-md-offset-2\">\r\n          <div class=\"carrier_container\">\r\n            <span class=\"lh-icon-carrier lh-icon-info airport_change_icon\"></span>\r\n            <div class=\"small fl_left\">\r\n              <strong>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"airport_change_title",{"name":"text","hash":{},"data":data}))
    + "</strong><br>\r\n              "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"airport_change_alert",{"name":"text","hash":{"DepartureCode":(depth0 != null ? depth0.departureCode : depth0),"DepartureName":(depth0 != null ? depth0.departureName : depth0),"DestinCode":(depth0 != null ? depth0.destinCode : depth0),"DestinName":(depth0 != null ? depth0.destinName : depth0),"DestinCityName":(depth0 != null ? depth0.destinCityName : depth0)},"data":data}))
    + "\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.legs : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["Twoe"]["templates"]["flights"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "          <span class=\"lh-icon-outbound\"><span class=\"sr-only\"> "
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"outbound",{"name":"text","hash":{},"data":data}))
    + " </span></span> \r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "          <span class=\"lh-icon-inbound\"><span class=\"sr-only\"> "
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"inbound",{"name":"text","hash":{},"data":data}))
    + " </span></span>  \r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"text-eased add_days small\">+"
    + container.escapeExpression(((helper = (helper = helpers.daysDiff || (depth0 != null ? depth0.daysDiff : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"daysDiff","hash":{},"data":data}) : helper)))
    + "</span>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <p>"
    + alias3(((helper = (helper = helpers.numStops || (depth0 != null ? depth0.numStops : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numStops","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"stop",{"name":"text","hash":{},"data":data}))
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.airportChange : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </p>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <a class=\"lh-icon-info airport_change_icon bs-docs-popover\" \r\n             role=\"button\" \r\n             data-toggle=\"popover\" \r\n             data-trigger=\"focus\" \r\n             data-placement=\"bottom\" \r\n             tabindex=\"102\" title=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"airport_change_title",{"name":"text","hash":{},"data":data}))
    + "\"\r\n             data-content=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"airport_change_alert",{"name":"text","hash":{"DepartureCode":(depth0 != null ? depth0.departureCode : depth0),"DepartureName":(depth0 != null ? depth0.departureName : depth0),"DestinCode":(depth0 != null ? depth0.arrivalCode : depth0),"DestinName":(depth0 != null ? depth0.arrivalName : depth0),"DestinCityName":(depth0 != null ? depth0.arrivalCityName : depth0)},"data":data}))
    + "\"\r\n             aria-hidden=\"true\">\r\n            <span class=\"sr-only\">\r\n              "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"airport_change_alert",{"name":"text","hash":{"DepartureCode":(depth0 != null ? depth0.departureCode : depth0),"DepartureName":(depth0 != null ? depth0.departureName : depth0),"DestinCode":(depth0 != null ? depth0.arrivalCode : depth0),"DestinName":(depth0 != null ? depth0.arrivalName : depth0),"DestinCityName":(depth0 != null ? depth0.arrivalCityName : depth0)},"data":data}))
    + "\r\n            </span>\r\n          </a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row flight_container add_on_content\">\r\n  <div class=\"col-md-12\">\r\n    <div class=\"row\">\r\n      <h4 class=\"col-md-2 text-muted text-largest spacing_horizontal_small\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOutbound : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </h4>\r\n      <div class=\"col-md-10 spacing_top\">\r\n\r\n        <p class=\"h5\">"
    + alias4(((helper = (helper = helpers.originName || (depth0 != null ? depth0.originName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"originName","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.originCode || (depth0 != null ? depth0.originCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"originCode","hash":{},"data":data}) : helper)))
    + ") - "
    + alias4(((helper = (helper = helpers.destinName || (depth0 != null ? depth0.destinName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"destinName","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.destinCode || (depth0 != null ? depth0.destinCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"destinCode","hash":{},"data":data}) : helper)))
    + ")</p>\r\n        <p>"
    + alias4(((helper = (helper = helpers.departureDate || (depth0 != null ? depth0.departureDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"departureDate","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <p>"
    + alias4(((helper = (helper = helpers.departureTime || (depth0 != null ? depth0.departureTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"departureTime","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.arrivalTime || (depth0 != null ? depth0.arrivalTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"arrivalTime","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.daysDiff : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.numStops : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n        <div class=\"spacing_top_small details spacing_btm_med\">\r\n          <span class=\"detail_icon\"></span>\r\n          <a href=\"#\" class=\"detail_link\" data-active=\""
    + alias4((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"hide_details",{"name":"text","hash":{},"data":data}))
    + "\" data-inactive=\""
    + alias4((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"show_details",{"name":"text","hash":{},"data":data}))
    + "\">\r\n            <span class=\"sr-only\">"
    + alias4((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"toggle_details",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n          </a>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"detail_container row\">\r\n     <div class=\"information_block col-md-12 spacing_horizontal\">\r\n      <p class=\"h5\" data-compartment=\""
    + alias4(((helper = (helper = helpers.compCode || (depth0 != null ? depth0.compCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"compCode","hash":{},"data":data}) : helper)))
    + "\">\r\n        "
    + alias4((helpers.compartmentName || (depth0 && depth0.compartmentName) || alias2).call(alias1,(depth0 != null ? depth0.compCode : depth0),{"name":"compartmentName","hash":{},"data":data}))
    + "\r\n      </p>\r\n     </div>\r\n"
    + ((stack1 = container.invokePartial(partials.flightLegsTemplate,depth0,{"name":"flightLegsTemplate","data":data,"indent":"     ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\r\n\r\n  </div>\r\n</div>";
},"usePartial":true,"useData":true});

this["Twoe"]["templates"]["meals"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.numMeals : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"row price_block add_on_content\">\r\n	<div class=\"col-md-12\">\r\n		<div class=\"row add_on_item\">\r\n			<div class=\"col-md-2 spacing_horizontal\">\r\n				<h4>\r\n					<span class=\"lh-icon-meal text-largest text-eased icon fl_left\">\r\n						<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"meals",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n					</span>\r\n				</h4>\r\n			</div>\r\n			<div class=\"col-md-10 spacing_top\">\r\n				<div class=\"row\">\r\n					<div class=\"col-md-12\">\r\n						<div class=\"row\">\r\n							<div class=\"col-md-7\">\r\n								<p class=\"fl_left\"> "
    + alias3(((helper = (helper = helpers.numMeals || (depth0 != null ? depth0.numMeals : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numMeals","hash":{},"data":data}) : helper)))
    + "&times; "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"doco_alacarte",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n							</div>\r\n							<div class=\"col-md-5\">\r\n								<strong class=\"fl_right\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.mealsTotal : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					<div class=\"col-md-12 spacing_top_small spacing_btm_med details\" aria-hidden=\"true\">\r\n						<span class=\"detail_icon\"></span>\r\n						<a href=\"\" class=\"detail_link\" data-active=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"hide_details",{"name":"text","hash":{},"data":data}))
    + "\" data-inactive=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"show_details",{"name":"text","hash":{},"data":data}))
    + "\">\r\n							<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"toggle_details",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n						</a>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.mealsPerPax : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n</div>\r\n<hr>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<div class=\"detail_container row spacing_horizontal\">\r\n			<div class=\"col-md-12\">\r\n				<div class=\"row\">\r\n					<div class=\"col-md-12\">\r\n						<h5 class=\"h5\">"
    + alias4(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</h5>\r\n					</div>\r\n				</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.outbounds : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inbounds : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\r\n		"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "				<div class=\"row spacing_top_med\">\r\n					<div class=\"col-md-2 \">\r\n						<h6>\r\n							<span class=\"lh-icon-outbound text-largest text-eased icon fl_left\">\r\n								<span class=\"sr-only\">"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(alias1,"outbound",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n							</span>\r\n						</h6>\r\n					</div>\r\n					<div class=\"col-md-10\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.outbounds : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "						<div class=\"row \">\r\n							<div class=\"col-md-7\">\r\n								<p>"
    + alias4(((helper = (helper = helpers.mealTitle || (depth0 != null ? depth0.mealTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mealTitle","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.flightNumber || (depth0 != null ? depth0.flightNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flightNumber","hash":{},"data":data}) : helper)))
    + ")</p>\r\n							</div>\r\n							<div class=\"col-md-5 text-right\">\r\n								<p> "
    + alias4((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.mealPrice : depth0),{"name":"price","hash":{},"data":data}))
    + "</p>\r\n							</div>\r\n						</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "			<div class=\"col-md-12 spacing_top_med\">\r\n				<div class=\"row \">\r\n					<div class=\"col-md-2\">\r\n						<h6>\r\n							<span class=\"lh-icon-inbound text-largest text-eased icon fl_left\">\r\n								<span class=\"sr-only\">"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(alias1,"inbound",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n							</span>\r\n						</h6>\r\n					</div>\r\n					<div class=\"col-md-10\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.inbounds : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n			</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "						<div class=\"row \">\r\n							<div class=\"col-md-7\">\r\n								<p>"
    + alias4(((helper = (helper = helpers.mealTitle || (depth0 != null ? depth0.mealTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mealTitle","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.flightNumber || (depth0 != null ? depth0.flightNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flightNumber","hash":{},"data":data}) : helper)))
    + ")</p>\r\n							</div>\r\n							<div class=\"col-md-5 text-right\">\r\n								<p>"
    + alias4((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.mealPrice : depth0),{"name":"price","hash":{},"data":data}))
    + "</p>\r\n							</div>\r\n						</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return " <hr>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.selectedMeals || (depth0 != null ? depth0.selectedMeals : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"selectedMeals","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.selectedMeals) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true});

this["Twoe"]["templates"]["paxBreakdown"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "          <a href=\"#\" \r\n             data-toggle=\"modal\" \r\n             data-target=\"#dynamic-modal\" \r\n             data-content=\"/app/fb.fly?action=netdetailsr&ref=F,"
    + alias3((helpers.lowercase || (depth0 && depth0.lowercase) || alias2).call(alias1,(depth0 != null ? depth0.paxType : depth0),{"name":"lowercase","hash":{},"data":data}))
    + ","
    + alias3(((helper = (helper = helpers.taxRef || (depth0 != null ? depth0.taxRef : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"taxRef","hash":{},"data":data}) : helper)))
    + ","
    + alias3(((helper = (helper = helpers.totalFares || (depth0 != null ? depth0.totalFares : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"totalFares","hash":{},"data":data}) : helper)))
    + "\"\r\n             data-headline=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"fare_and_carrier_charges",{"name":"text","hash":{},"data":data}))
    + "\" \r\n             data-icon=\"\" \r\n             data-save=\"false\">\r\n             "
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalFares : depth0),{"name":"price","hash":{},"data":data}))
    + "\r\n          </a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression((helpers.price || (depth0 && depth0.price) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.totalFares : depth0),{"name":"price","hash":{},"data":data}))
    + "\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "text-highlight";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <a href=\"#\" \r\n             class=\"detail_link\" \r\n             data-toggle=\"modal\" \r\n             data-target=\"#dynamic-modal\"\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.taxRef : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "             data-headline=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"taxes_surcharges",{"name":"text","hash":{},"data":data}))
    + "\" \r\n             data-icon=\"\"\r\n             data-save=\"false\">\r\n           "
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalTaxes : depth0),{"name":"price","hash":{},"data":data}))
    + "\r\n          </a>           \r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "             data-content=\"/app/fb.fly?action=taxdetailsr&amp;ref=F,"
    + alias3((helpers.lowercase || (depth0 && depth0.lowercase) || alias2).call(alias1,(depth0 != null ? depth0.paxType : depth0),{"name":"lowercase","hash":{},"data":data}))
    + ","
    + alias3(((helper = (helper = helpers.taxRef || (depth0 != null ? depth0.taxRef : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"taxRef","hash":{},"data":data}) : helper)))
    + "&amp;sel0="
    + alias3(((helper = (helper = helpers.outbRef || (depth0 != null ? depth0.outbRef : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"outbRef","hash":{},"data":data}) : helper)))
    + "&amp;sel1="
    + alias3(((helper = (helper = helpers.inbRef || (depth0 != null ? depth0.inbRef : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"inbRef","hash":{},"data":data}) : helper)))
    + "\"\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "             data-content=\"/app/fb.fly?action=taxdetailsr&amp;ref=I,"
    + container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.paxType : depth0),{"name":"lowercase","hash":{},"data":data}))
    + ",\"\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression((helpers.price || (depth0 && depth0.price) || helpers.helperMissing).call(depth0 != null ? depth0 : {},0,{"name":"price","hash":{},"data":data}))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"price_block information_block col-md-12 spacing_horizontal\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12 spacing_horizontal_small\">\r\n          <h5 class=\"h5\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"price_per",{"name":"text","hash":{},"data":data}))
    + " "
    + alias3((helpers.paxTypeLabel || (depth0 && depth0.paxTypeLabel) || alias2).call(alias1,(depth0 != null ? depth0.paxType : depth0),{"name":"paxTypeLabel","hash":{},"data":data}))
    + "</h5>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"fares",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n        </div>\r\n        <div class=\"col-md-6 price\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasFareDtls : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-7\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"taxes_fees_charges",{"name":"text","hash":{},"data":data}))
    + "</div>\r\n        <div class=\"col-md-5 price "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalTaxes : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalTaxes : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-7\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"ticket_service_charges",{"name":"text","hash":{},"data":data}))
    + "</div>\r\n        <div class=\"col-md-5 price\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalTSC : depth0),{"name":"price","hash":{},"data":data}))
    + "</div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <hr>\r\n        <div class=\"col-md-6\">\r\n          <h5 class=\"h5\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"total",{"name":"text","hash":{},"data":data}))
    + "</h5>\r\n        </div>\r\n        <div class=\"col-md-6 price\">\r\n          <h5 class=\"h5\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.total : depth0),{"name":"price","hash":{},"data":data}))
    + "</h5>\r\n        </div>\r\n      </div>\r\n    </div>";
},"useData":true});

this["Twoe"]["templates"]["paxes"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return ", "
    + alias3(((helper = (helper = helpers.numChd || (depth0 != null ? depth0.numChd : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numChd","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.text_pluralize || (depth0 && depth0.text_pluralize) || alias2).call(alias1,{"name":"text_pluralize","hash":{"count":(depth0 != null ? depth0.numChd : depth0),"many":"general/CHDS","one":"general/CHD"},"data":data}))
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return ", "
    + alias3(((helper = (helper = helpers.numInf || (depth0 != null ? depth0.numInf : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numInf","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.text_pluralize || (depth0 && depth0.text_pluralize) || alias2).call(alias1,{"name":"text_pluralize","hash":{"count":(depth0 != null ? depth0.numInf : depth0),"many":"general/INFS","one":"general/INF"},"data":data}))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <div class=\"details spacing_top_small spacing_btm_med\">\r\n          <span class=\"detail_icon\"></span>\r\n          <a href=\"#\" class=\"detail_link\" data-active=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"hide_details",{"name":"text","hash":{},"data":data}))
    + "\" data-inactive=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"show_details",{"name":"text","hash":{},"data":data}))
    + "\">\r\n            <span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"toggle_details",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n          </a>\r\n        </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = container.invokePartial(partials.paxDetailsTemplate,depth0,{"name":"paxDetailsTemplate","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <hr>\r\n    <div class=\"fellow_traveller add_on_content row\">\r\n      <h4 class=\"col-md-2 text-muted text-largest spacing_horizontal_small\">\r\n        <span class=\"lh-icon-link-profile\">\r\n          <span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"passengers",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n        </span>\r\n      </h4>\r\n      <div class=\"col-md-10 spacing_top\">\r\n        <p class=\"h5\">\r\n          "
    + alias3(((helper = (helper = helpers.numAdt || (depth0 != null ? depth0.numAdt : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numAdt","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.text_pluralize || (depth0 && depth0.text_pluralize) || alias2).call(alias1,{"name":"text_pluralize","hash":{"count":(depth0 != null ? depth0.numAdt : depth0),"many":"general/ADTS","one":"general/ADT"},"data":data}))
    + "\r\n          "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.numChd : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n          "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.numInf : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n        </p>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.paxTotals : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\r\n      <div class=\"detail_container\">\r\n      "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.paxTotals : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n      </div>\r\n    </div>";
},"usePartial":true,"useData":true});

this["Twoe"]["templates"]["seats"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.numSeats : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"row price_block add_on_content seat_reservation\">\r\n	<div class=\"col-md-12\">\r\n		<div class=\"row add_on_item\">\r\n			<div class=\"col-md-2 spacing_horizontal\">\r\n				<h4><span class=\"lh-icon-seat text-largest text-eased icon fl_left\"><span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"seats",{"name":"text","hash":{},"data":data}))
    + "</span></span></h4>\r\n			</div>\r\n			<div class=\"col-md-10 spacing_top\">\r\n				<div class=\"row\">\r\n					<div class=\"col-md-12\">\r\n						<div class=\"row\">\r\n							<div class=\"col-md-7\">\r\n								<p class=\"fl_left\">"
    + alias3(((helper = (helper = helpers.numSeats || (depth0 != null ? depth0.numSeats : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"numSeats","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"seat_reservations",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n							</div>\r\n							<div class=\"col-md-5\">\r\n								<strong class=\"fl_right\">"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.seatsTotal : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					<div class=\"col-md-12 spacing_top_small spacing_btm_med details\" aria-hidden=\"true\">\r\n						<span class=\"detail_icon\"></span>\r\n						<a href=\"\" class=\"detail_link\" data-active=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"hide_details",{"name":"text","hash":{},"data":data}))
    + "\" data-inactive=\""
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"show_details",{"name":"text","hash":{},"data":data}))
    + "\">\r\n							<span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"toggle_details",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n						</a>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.seatsPerPax : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \r\n	</div>\r\n</div>\r\n<hr>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<div class=\"detail_container row spacing_horizontal\">\r\n			<div class=\"col-md-12\">\r\n				<div class=\"row\">\r\n					<div class=\"col-md-12\">\r\n						<h5 class=\"h5\">"
    + alias4(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.infant : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</h5>\r\n					</div>\r\n				</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.outbounds : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inbounds : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\r\n		</div>\r\n		"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n		";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=container.lambda;

  return "						<br>\r\n						<span class=\"h5 spacing_top_small inline_block\">+ "
    + alias1((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"infant",{"name":"text","hash":{},"data":data}))
    + ": "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.infant : depth0)) != null ? stack1.firstName : stack1), depth0))
    + " "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.infant : depth0)) != null ? stack1.lastName : stack1), depth0))
    + "</span>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "				<div class=\"row spacing_top_med\">\r\n					<div class=\"col-md-2\">\r\n						<h6>\r\n							<span class=\"lh-icon-outbound text-largest text-eased icon fl_left\">\r\n								<span class=\"sr-only\">"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(alias1,"outbound",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n							</span>\r\n						</h6>\r\n					</div>\r\n					<div class=\"col-md-10\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.outbounds : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "						<div class=\"row \">\r\n							<div class=\"col-md-7\">\r\n								<p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"seat",{"name":"text","hash":{},"data":data}))
    + " "
    + alias3(((helper = (helper = helpers.seatNumber || (depth0 != null ? depth0.seatNumber : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"seatNumber","hash":{},"data":data}) : helper)))
    + " ("
    + alias3(((helper = (helper = helpers.flightNumber || (depth0 != null ? depth0.flightNumber : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"flightNumber","hash":{},"data":data}) : helper)))
    + ")</p>\r\n							</div>\r\n							<div class=\"col-md-5 text-right\">\r\n								<p>"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.seatPrice : depth0),{"name":"price","hash":{},"data":data}))
    + "</p>\r\n							</div>\r\n						</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "				<div class=\"row spacing_top_med\">\r\n					<div class=\"col-md-2\">\r\n						<h6>\r\n							<span class=\"lh-icon-inbound text-largest text-eased icon fl_left\">\r\n								<span class=\"sr-only\">"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(alias1,"inbound",{"name":"text","hash":{},"data":data}))
    + "</span>\r\n							</span>\r\n						</h6>\r\n					</div>\r\n					<div class=\"col-md-10\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.inbounds : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "  <hr> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.selectedSeats || (depth0 != null ? depth0.selectedSeats : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"selectedSeats","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.selectedSeats) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true});

this["Twoe"]["templates"]["selection"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.flightTemplate,depth0,{"name":"flightTemplate","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"col-md-12\">\r\n  <div class=\"border_wrapper\">\r\n    <div class=\"row\">\r\n      <div class=\"add_on_header col-md-12\">\r\n        <h3 class=\"text-large\"> "
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(alias1,"title",{"name":"text","hash":{},"data":data}))
    + " </h3>\r\n      </div>\r\n    </div>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.flights : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = container.invokePartial(partials.paxesTemplate,depth0,{"name":"paxesTemplate","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = container.invokePartial(partials.totalFlightsTemplate,depth0,{"name":"totalFlightsTemplate","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </div>\r\n</div>";
},"usePartial":true,"useData":true});

this["Twoe"]["templates"]["totalFlights"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"add_on_footer row spacing_horizontal\">\r\n      <div class=\"price_block \">\r\n        <h4 class=\"col-md-6\"><span class=\"sr-only\">"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"total_cost",{"name":"text","hash":{},"data":data}))
    + " </span>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"flights",{"name":"text","hash":{},"data":data}))
    + "</h4>\r\n        <p class=\"col-md-6 price\"><strong>"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalFlights : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong></p>\r\n      </div>\r\n    </div>\r\n";
},"useData":true});

this["Twoe"]["templates"]["totals"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <div class=\"col-md-6\">\r\n            <p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"services",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n          </div>\r\n          <div class=\"col-md-6 price\">\r\n            <p><strong>"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalAncillaries : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong></p>\r\n          </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <div class=\"col-md-6\">\r\n            <p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"voucher",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n          </div>\r\n          <div class=\"col-md-6 price\">\r\n            <p>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.eVoucherUsed : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "            </p>\r\n          </div>\r\n          <div class=\"col-md-12 voucher_details\">\r\n            <p class=\"small\">\r\n            "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"voucher_code",{"name":"text","hash":{},"data":data}))
    + ": "
    + alias3(((helper = (helper = helpers.eVoucherCode || (depth0 != null ? depth0.eVoucherCode : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"eVoucherCode","hash":{},"data":data}) : helper)))
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.eVoucherPartlyUsed : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.eVoucherConditions : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "              <strong>-"
    + container.escapeExpression((helpers.price || (depth0 && depth0.price) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.eVoucherDiscount : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "              <strong>"
    + container.escapeExpression((helpers.text || (depth0 && depth0.text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"evo_not_valid_for_selection",{"name":"text","hash":{},"data":data}))
    + "</strong>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "              <br>\r\n              "
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"remaining_voucher_value",{"name":"text","hash":{},"data":data}))
    + ": "
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.eVoucherRest : depth0),{"name":"price","hash":{},"data":data}))
    + "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "              <br>\r\n              See <a href=\"#VoucherTermsConds\">Voucher Conditions</a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"col-md-12\">\r\n      <div class=\"border_wrapper\">\r\n\r\n        <div class=\"grand_total_container add_on_content row price_block spacing_horizontal\">\r\n          \r\n          <div class=\"col-md-6\">\r\n            <p>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"flights",{"name":"text","hash":{},"data":data}))
    + "</p>\r\n          </div>\r\n          <div class=\"col-md-6 price\">\r\n            <p><strong>"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalFlights : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong></p>\r\n          </div>\r\n          \r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalAncillaries : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.eVoucherCode : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n\r\n        <div class=\"add_on_footer row price_block spacing_horizontal\">\r\n          <div class=\"col-md-6\">\r\n            <h4>"
    + alias3((helpers.text || (depth0 && depth0.text) || alias2).call(alias1,"total_payment",{"name":"text","hash":{},"data":data}))
    + "</h4>\r\n          </div>\r\n          <div class=\"col-md-6 price\">\r\n            <p><strong>"
    + alias3((helpers.price || (depth0 && depth0.price) || alias2).call(alias1,(depth0 != null ? depth0.totalPayment : depth0),{"name":"price","hash":{},"data":data}))
    + "</strong></p>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>";
},"useData":true});