(function (){
		console.log("injecting my scripts...");

		// CLOSURE_BASE_PATH='http://127.0.0.1/out/';

		function ll(src){
				var fileref = document.createElement('script');
				fileref.setAttribute('type','text/javascript');
				fileref.setAttribute('src', src);
				console.log ("injecting:" ,src);
				document.getElementsByTagName('head')[0].appendChild(fileref);}

		ll('http://localhost:9000/out/cljs_base.js');
		setTimeout(function(){ ll('http://localhost:9000/out/main.js'); },1000);
		setTimeout(function(){ ll('http://localhost:9000/out/crawl.js'); },2000);

}).call(null);
