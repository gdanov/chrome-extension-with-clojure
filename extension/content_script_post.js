function load_fn (srcurl){
		// I am decoupling the source file request from the evaluation so that the source is requested asap, but the evaluation is serialized. This is faster than eval and then request.
		var r=new XMLHttpRequest ();
		r.open ("GET", srcurl);
		var loadPromise=new Promise ((resolve) => {
				r.onreadystatechange= () => {
						if(r.readyState === XMLHttpRequest.DONE && r.status === 200) {
								//console.log ("loaded",srcurl);
								resolve (r.response);
						}}});
		r.send ();
		//console.log (srcurl,"requested");

		return () => {
				return new Promise ((resolve) => {
						loadPromise.then ((src) => {
								// console.log ("eval",srcurl);
								eval (src);
								resolve ();
						})})}}

function getSrcUrl (src){
		return chrome.extension.getURL ("public/js/out/goog/"+src);
}

var loadPromise;

CLOSURE_IMPORT_SCRIPT = function (src, srcText){
		if (src != "deps.js"){
				//	var next=load_fn (base_url+src);
				//for this to work "web_accessible_resources" in the manifest must contain the path with wildcard
				var nextFn=load_fn (getSrcUrl (src))
				if (loadPromise) loadPromise=loadPromise.then (nextFn)
				else loadPromise=nextFn ();
		}};

//trigger the async load. goog will first calculate the dependency tree and then request the files to be loaded bottom-up. I've taken care above to serialize that process
goog.require ("tt.mini");

//prevent from someone accidentally trying to load sth new
CLOSURE_IMPORT_SCRIPT=function (src){
		throw ("I can't load:" + src);
}

loadPromise.then (() => {
		goog.net.jsloader.load = (uri) => {
				var deferred = new goog.async.Deferred(function (){},{});
				load_fn (getSrcUrl (uri)) ().then (function (){
						deferred.callback (null);
				})
				return deferred;
		}

		console.log ("I'm the post  content script");
});
