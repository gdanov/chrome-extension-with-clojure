console.log("hello background");

var background_script={
		show_me: function (){
				chrome.tabs.create({url: chrome.extension.getURL('background.html')});
		}		
}

goog.require ("tt.fun");

console.log("background script injected and bootstrapped...");

