(ns tt.fun
  (:require [figwheel.client :as fcl]))
       
(enable-console-print!)

(def fig-config
  {:load-warninged-code true,
   :debug false
   :build-id "dev"
   :websocket-url "wss://localhost:8443/figwheel-ws"})

(defn start-fig []

  (fcl/start fig-config))

(println "let the Fig begin!")

(start-fig)


