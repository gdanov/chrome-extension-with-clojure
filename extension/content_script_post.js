
if (typeof goog == "undefined") {
		throw ("goog is undefined");
} else{
		//collect deps graph
		require_queue=[];
		CLOSURE_IMPORT_SCRIPT = function (src, srcText){
				console.log ("WRITE TAG",src,srcText);
				if (src != "deps.js"){
						require_queue.push (src)
				}
		};
		//trigger the async load. capture the dependency tree without loading anything, inlcluding the namespace bellow. so nothing is evaluated yet
		goog.require ("tt.mini");

		//prevent from someone accidentally trying to load sth new
		CLOSURE_IMPORT_SCRIPT=function (src){
				throw ("go home you are drunk, I can't load:" + src);
		}

		//process the require_queue
		var base_url="https://localhost:8443/js/out/goog/"
		function load_fn (promise, src){
				return promise.then (
						function (){
								return new Promise (function (resolve){
										var myself=this;
										var srcurl=chrome.extension.getURL ("public/js/out/goog/"+src);
												//base_url+src;
										var r=new XMLHttpRequest ();
										r.open ("GET", srcurl);
										r.onreadystatechange=function (){
												if(r.readyState === XMLHttpRequest.DONE && r.status === 200) {
														console.log("syncloaded", srcurl);
														eval (r.response);
														resolve (myself);
												}
										}
										r.send ();		
								});
						})}
		
		var p=new Promise (function (accept,reject){accept (this)});
		require_queue.reduce (load_fn, p).then (function (){
				console.log ("loading DONE");
				goog.net.jsloader.load=function (uri){
						var srcurl=base_url+uri;
						console.log ("monkeypatchload!",srcurl);
						var deferred = new goog.async.Deferred(function (){},{});
						var r=new XMLHttpRequest ();
						r.open ("GET", srcurl);
						r.onreadystatechange=function (){
								if(r.readyState === XMLHttpRequest.DONE && r.status === 200) {
										console.log("LOADED", srcurl,typeof r.response);
										eval (r.response);
										deferred.callback (null);
								}
						}
						r.send ();		
						
						return deferred;
				}
		});
		
}

console.log ("I'm the post  content script", require_queue);
