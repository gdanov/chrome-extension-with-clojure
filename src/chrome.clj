(ns chrome
  (:require [clojure.test :refer :all]
            [clojure.tools.logging :as log]

            ; [regfunc.macro :refer :all]
            
            [clj-webdriver.core :refer [start]]
            [clj-webdriver.taxi :refer :all]

            [ring.adapter.jetty :as ring-j]
            [ring.middleware.file :as ring-f]
            [ring.middleware.resource :refer :all]
            [ring.middleware.content-type :refer :all]
            [ring.middleware.not-modified :refer :all]
   )  )

(println "reloaded")

(def handler
  (->
    (fn [request]
      ; (println "request:" request)
      {:status 200})
    (ring-f/wrap-file ".")
    (wrap-content-type)
    (wrap-not-modified)))

(future
  (ring-j/run-jetty handler {:port 9000}))

(println "######################\n static content server started \n ######################")

(defn inject []
  (execute-script (slurp "src/inject_browser.js")))

; (def driver (new-driver {:browser :chrome}))
(defn -main [& args]
  ;(def driver (start {:browser :chrome} "https://google.com"))
  (set-driver! {:browser :chrome})
;;  (to "http://www.boden.co.uk/")
  (to "file:///Users/gdanov/work/playground/crowl/aua.html")
  (inject)

  (execute-script "tt.fun.go()")

  ; (println "BODY" (time(find-element {:tag :body}))) ;; -> does not fetch the children
   ; (println "XX" (time (find-elements {:xpath "//body//*"}))) ;; -> does not give hierarchy
  )

