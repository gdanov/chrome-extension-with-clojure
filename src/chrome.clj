(ns chrome
  (:require [clojure.test :refer :all]
            [clojure.tools.logging :as log]

            ; [regfunc.macro :refer :all]
            
            [clj-webdriver.core :refer [start]]
            [clj-webdriver.taxi :refer :all]
   )  )

(println "reloaded")

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

