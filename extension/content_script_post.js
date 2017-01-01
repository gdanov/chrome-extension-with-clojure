function getSrcUrl (src){
		//for this to work "web_accessible_resources" in the manifest must contain the path with wildcard
		return chrome.extension.getURL ("js/out/goog/"+src);
}

function load_fn (srcurl){
		// I am decoupling the source file request from the evaluation so that the source is requested asap, but the evaluation is serialized. This is faster than eval and then request.
		var req=new XMLHttpRequest ();
		req.open ("GET", getSrcUrl (srcurl));
		var _loadPromise=new Promise ((resolve) => {
				req.onreadystatechange= () => {
						if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
								resolve (req.response);
						}}});
		req.send ();

		//must be function so that I have lazy eval
		return () => 
				new Promise ((resolve) => {
						_loadPromise.then ((src) => {
								eval (src);
								resolve ();
						})})}

(() => {
		var loadPromise = Promise.resolve (null);

		function myImport(src, srcText){
				//invoke outside of the then() so that the loading starts
				var next = load_fn (src);
				loadPromise=loadPromise.then (next);
		};

		CLOSURE_IMPORT_SCRIPT = myImport;
		
		//could be in the manifest as well. but can't comment there
		myImport ("deps.js");
		myImport ("../cljs_deps.js");
		
		loadPromise.then (() => {
				//trigger the async load. goog will first calculate the dependency tree and then request the files to be loaded bottom-up. I've taken care above to serialize that process
				goog.require ("tt.mini");
				//must've changed because of goog.require and should be pointing to the promise of the main namespace
				loadPromise.then (() => {
						//prevent from someone accidentally trying to load sth new
						CLOSURE_IMPORT_SCRIPT=function (src){throw ("I can't load:" + src);}

						//monkey patch it for figwheel to work
						goog.net.jsloader.load = (uri) => {
								var deferred = new goog.async.Deferred(function (){},{});
								load_fn (uri) ().then (() => deferred.callback (null))
								return deferred;
						}

						console.log ("happy figging");
				})
		});}) ();
