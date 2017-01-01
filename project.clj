(defproject
  crowl "0.0.0-SNAPSHOT"

  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.293"]


                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]

                 [clj-webdriver "0.7.2"]
                 [org.seleniumhq.selenium/selenium-java "2.47.1"]

                 [weasel "0.7.0" :exclusions [org.clojure/clojurescript]]

                 [ring/ring-core "1.4.0"]
                 [ring/ring-jetty-adapter "1.4.0"]

                 ;; needed only for the repl and user.clj. find cleaner way to spec it. I need `lein cljsbuild` to see it
                 [com.stuartsierra/component "0.3.2"]
                 ;; same here
                 [figwheel-sidecar "0.5.0-5"]
                 ]

  :plugins [[lein-cljsbuild "1.1.5"]
            [lein-figwheel "0.5.8"]]

  :jvm-opts ["-Dapple.awt.UIElement=true"]

  :figwheel {:reload-clj-files {:clj true :cljc true}}

  :clean-targets ^{:protect false} ["out/" "resources/public/js" :target]

  ;;this causes user.clj to be loaded TWICE and repl start-up hangs-up if user.clj automatically starts figwheel
  ;;:hooks [leiningen.cljsbuild]
  
  :profiles
  {:dev  {}
   :repl {:source-paths ["dev"]
          :dependencies [[com.cemerick/piggieback "0.2.1"]
                         [figwheel-sidecar "0.5.0-5"]]
          :repl-options
          {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}
          
          :plugins [[cider/cider-nrepl "0.12.0-SNAPSHOT"]
                    [refactor-nrepl "2.2.0-SNAPSHOT"]]}}

  :cljsbuild
  {:builds
   [{:id           "dev"
     :source-paths ["src"]
     :figwheel     {:load-warninged-code true}
     :compiler     {:main tt.fun
                    :asset-path "js/out"
                    ;; figwheel complains it needs at least one with :none or nil. but nil defaults to :whetespace according to doc
                    ;;:optimizations :whitespace

                    :print-input-delimiter true

                    ;; fig complains that it should be bool. but cljsbuild wants a value?
                    ;;:source-map "resources/public/js/the-source-map.map"
                    ;;make browsers less dumb
                    ;;:source-map-timestamp true

                    ;;does not matter, I bottstrap manually
                    :output-to  "extension/js/ignore-me.js"
                    :output-dir "extension/js/out"}}
    ]})
