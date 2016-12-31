(ns user
  (:require [figwheel-sidecar.repl-api :use :all]))

(println "HELLO FROM USER")

;;wtf, doing this causes the repl process to hang. used to work before
;;yes, caused by the cljs hooks
(figwheel-sidecar.repl-api/start-figwheel!)


