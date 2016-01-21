(ns repl.core
  (:require ;[clojure.browser.repl :as repl]
            [weasel.repl :as repl]

            ;[test.fun :as f]
            ))


#_(defonce conn
  (repl/connect "http://192.168.1.100:9000/repl")) 

(when-not (repl/alive?)
  (repl/connect "ws://localhost:9001"))

(enable-console-print!)

(println "Hello world!")

(defn tt []
  3)
