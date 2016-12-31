# some history and experience

## ERR_INSECURE_RESPONSE

just open https://localhost:8443/index2.html and accept the self-signed cert warning.

## Q: why channel figwheel via https/haproxy?

because of the CSP. See below for link. http:// is not allowed as can enable mim attack

if I could figure out way to load the files via file:// instead I'd be happy. so either link is needed or the build script hast to copy them

## Q: why compile with simple optimisations? why bother with all the dynamic loading instead of just plugging-in figwhehel & co as usual in the background.html page?

because of the fucking content security (CSP) for background pages. see https://developer.chrome.com/extensions/contentSecurityPolicy . bootstrapping from script without page reqires the same complex shit.

closure (and maybe figwheel) rely on writing `<script>if (typeof goog != "undefined") { goog.require("... ... ...</script>` and that's forbidden


# the current approach

get the job done with minimal trickery. work around the CSP limitations by packing everything into scripts that are loaded by the html page.

basic trick is to get the /public/resources/js/... folder into the extension folder via symlink. without this I have to suffer https. 

figheel requires web sockets so there is no way around haproxy. 

so far I can bootstrap the compiled app and load the referenced namespaces. pprint and some simple (tt.mini.a-fun) things work so we must be alright. figwheel not tested yet.

and now figwheel works (reloading, repl). only problem is closure's document.write brute force approach so the body gets erased and fig comlpains it can't attach it's widget.
