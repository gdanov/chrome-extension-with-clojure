(require 'cljs.build.api)
(require 'cljs.repl)
(require 'cljs.repl.browser)

#_(do
  (println "starting watch...")
  (cljs.build.api/watch "src"
    {                                  ;:main 'repl.core
     :optimizations :simple
                                        ; :output-to "out/main.js"
     :output-dir "out"
     :modules {
               :repl {:output-to "out/main.js"
                      :entries #{"repl.core"}
                      }
               :crawl {:output-to "out/crawl.js"
                       :entries #{"tt.fun"}}}
     :verbose true}))

;; needed only to serve static content. for repl I use lein
(cljs.repl/repl (cljs.repl.browser/repl-env)
  :watch "src"
  :output-dir "out"
  :modules {
            :repl {:output-to "out/main.js"
                   :entries #{"repl.core"}
                   }
            :crawl {:output-to "out/crawl.js"
                    :entries #{"tt.fun"}}}
  ;:repl-verbose true
  )

