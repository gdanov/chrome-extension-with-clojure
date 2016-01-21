(defproject
  crowl "0.0.0-SNAPSHOT"

  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.228"]
                 [org.clojure/tools.nrepl "0.2.12"]

                 [regfunc/regfunc "0.1.0-SNAPSHOT"]
                 
                 [clj-webdriver "0.7.2"]
                 [org.seleniumhq.selenium/selenium-java "2.47.1"]

                 [weasel "0.7.0" :exclusions [org.clojure/clojurescript]]

                 [ring/ring-core "1.4.0"]
                 [ring/ring-jetty-adapter "1.4.0"]
                 ]

  :plugins [[lein-cljsbuild "1.1.2"]]
  
  :jvm-opts ["-Dwebdriver.chrome.driver=/Users/gdanov/Downloads/chromedriver" "-Dapple.awt.UIElement=true"]

  :profiles {:dev {:dependencies [[com.cemerick/piggieback "0.2.1"]
                                  [org.clojure/tools.nrepl "0.2.10"]]
                   :repl-options {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}}
             :repl {:plugins [[cider/cider-nrepl "0.11.0-SNAPSHOT"]
                                        ;[refactor-nrepl "2.0.0-SNAPSHOT"]
                              ]}}
  

  :cljsbuild {
              :builds [{:source-paths ["src"]
                        :compiler  {:optimizations :simple
                                    :output-dir "out"
                                    :source-map true
                                    :cache-analysis true
                                    :parallel-build true
                                    :pretty-print true
                                    :modules {
                                              :repl {:output-to "out/main.js"
                                                     :entries #{"repl.core"}
                                                     }
                                              :crawl {:output-to "out/crawl.js"
                                                      :entries #{"tt.fun"}}}
                                        ; :verbose true
                                    }}]}
  :main chrome)

