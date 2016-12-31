console.log ("I'm the content script");

/*
	the idea: the first ever goog.require invocation will trigger async load of the whole (known at the moment) dependency graph. subsequent goog.require calls shold have no effect because the required namespace is already available.

	corrolary: all needed namespaces and dependencies must be known to goog.* before that first goog.require invocation

	approach:
	#0 load base.js
	#1 load all deps files 
	#2 require the bootstrapping namespace that refers to everything I need. this triggers the async loading that eventually bootstraps everything
*/

if (typeof goog == "undefined") {
		goog={};
		
		this.goog=goog;
} else{
		throw ("goog is defined!");
}

myglobal=123;

console.log (chrome.extension.getURL ("public/js/out/goog/deps.js"));
