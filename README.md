# some background

## what's that?

Toy project to enable developing of Chrome extensions using ClojureScript and Figwheel.

## how clojurescript code is loaded

The compiler produces 2 sets of files: the `deps` and the module sources.

A `deps` file contains only `goog.addDependency(...)` directives. This creates the module map with namespace <--> path mapping plus namespace dependencies.

A source file begins with one or more `goog.provide(...)` followed by zero or more `goog.require(...)`. This duplicates the info in the `deps` files.

Important is to know that `goog.require(...)` must function as if the required module is loaded in blocking manner otherwise the evaluation of the subsequent code would fail. This presents the major challenge when devising any loading scheme inside the browser where every possible resource loading operation is asynchronous. 

The closure `require` implementation is *not* designed for dynamic loading (in browser runtimes). It's expected to operate on fully loaded and final dependency graph.

You are expected to load your web app source code (when not `:optimized`) by including in that order the `base.js` and the specified `output-to` file via `<script src=...` directives. This bootstraps the closure core, loads the generated bootstrap file which on it's turn injects the generated dependency map `cljs_deps.js` and then triggers the load by requiring the main namespace. On it's own `base.js` injects the `deps.js` file which is the dependency map for the closure library.

It's critical that the dependency maps are fully loaded before the first ever `goog.require()` invocation because on that invocation the full dependency graph is topologically sorted and loaded with the end result being that each subsequent `goog.require()` is guaranteed cache hit (once the loading has finished!). 

Google closure uses `<scrpit src=..` tags for loading & evaluating. Typically they are written in the documens via `document.write()` which loads and evaluates the files in sequence (and this is what we need). 

Unfortunatelly chrome extension background and content scripts present two different challenges that renders the approach above unusable:

* background pages cannot have `<script>..</>` tags
* content scripts would be unable to use code injected via `<script src=` as it would be loaded in the page environment
	
The background page limitation is easy to solve. Just create file that contains the script what would be otherwise been injected via `document.write(<script>...</>)` and include it as the rest. 

The content script solution requires custom file loading implementation. If we want to use Figwheel with unoptimized compilation (which is probably my main motivation) it also adds small extra challenge as Figwheel depends on goog.net.jsloader (which uses the same approach as above). The steps are:

* set global var `CLOSURE_IMPORT_SCRIPT` to your custom "write tag" function. Closure will use it to trigger the load&eval for each file once it has resolved the dependency graph. The function must invoke the loading and evaluation asynchronously. In my case it loads and evaluates the file in two separate `Promises` so that I can chain and serialize the evaluation process
* using the mechanism above directly load first `base.js` and then the dependency maps
* chain to the last `Promise` from previous step `goog.require("my-main-ns")`
* optionally chain a step to replace the `CLOSURE_IMPORT_SCRIPT` function with somthing throwing error just to be on the safe side
* monkeypatch goog.net.jsloader.load to use the same mechanism as above, but returning `Deferred` which Figwheel uses to serialize the loading which makes our job easier
* that's it!

# Q & A

## how to run that experiment

* start `haproxy -f haproxy.cfg` and take care to have self-signed certificates in the `cert` folder
* run `lein repl` or `lein figwheel`
* install the unpacked extension in develpment mode in Chrome
* open https://localhost:8443/index.html
* open the browser console and see if Figwheel greets you there

## I'm getting `ERR_INSECURE_RESPONSE`

haproxy uses self-signed certificate. just open https://localhost:8443/index.html and accept the self-signed cert warning.

## Q: why channel figwheel via https/haproxy?

because of the CSP. See the chrome extension dev manual for details. `http://` is not allowed as can enable MIM attack. The javascript files are loaded directly from the file system, but Figwheel needs WSS. 

