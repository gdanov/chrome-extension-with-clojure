(ns tt.fun
  (:require [macro-fn :as m]
            [cljs.test :refer-macros [deftest is testing run-tests]])
  (:require-macros [macro :refer [rule]]))

(println "fun reloaded")

(defn p [r input]
  ((r (m/->CallContext nil)) input))

(defn nodelist-seq
  ([nl] (nodelist-seq nl 0))
  ([nl index]
   (reify cljs.core/ISeqable
     (-seq [_] 
       (reify cljs.core/ISeq
         (-first [this]
           (when (and nl (< index (.-length nl))) (.item nl index)))
         (-rest [this]
           (if (and nl (< (inc index) (.-length nl)))
             (nodelist-seq nl (inc index))
             '())))))))

(rule map> [^:* entries inp]
  (let [it-fn (fn [[res entries inp]]
                ; (println "\nit-fn [" res entries inp "]")
                (when (seq entries)
                  (let [r ((first entries) inp)]
                   [r (rest entries) (:stream r)])))
        
        res-strm (->>
                   (iterate it-fn (it-fn [nil entries inp]))
                   (take-while some?)
                   (map first))
        ; _ (println "\nXX:[" res-strm "|" entries inp ((first entries) inp) "]")
        res-processed (reduce
                        (fn [o res]
                          (if (m/matches? res)
                            (merge o (:val res))
                            (reduced (m/nomatch inp))))
                        {} res-strm)
        _ (println res-processed)]
    (if (reduced? res-processed) res-processed (m/match res-processed nil))))

(rule map-entry> [k ^:* val-fn input]
  (let [r (val-fn input)]
    (if (m/matches? r)
      (m/match {k (:val r)} (:stream r))
      (m/nomatch input))))

(rule t-identity [inp]
  (m/match inp inp))

(deftest t-mapentry
  (is (= (m/match {:hello-key "hello"} "hello") (p (map-entry> :hello-key (t-identity)) "hello")))
  (is (= (m/match {:key-hello "hello"} nil) (p (map> [(map-entry> :key-hello (t-identity))]) "hello"))))

(rule >node [selector ^:* op elem]
  (assert (string? selector) (str ":" selector))
  (assert (or (nil? op) (fn? op)))
  (assert (some? elem))
  
  (js/console.log "node:" selector elem)

  (let [node (.querySelector elem selector)]
    (if node
      (if op
        (let [res (op node)] res)
        (m/match node node))
      (m/nomatch nil))))

(rule >text [element]
  (assert element)
  (m/match (.innerHTML element) element))

(rule end [a inp]
  (m/match :end inp))

(rule fun> [fun ^:* r inp]
  (let [res (r inp)]
    (m/->Result (fun (:val res) (:stream res) (:match res)))))

(rule >fun [match-fn fun inp]
  (let [r (fun inp)]
    (if (match-fn r)
      (m/match r inp)
      (m/nomatch inp))))

(rule >child-node [filter-fn ^:* op e]
  (let [r (->> (nodelist-seq (.-childNodes e))
                        (filter filter-fn)
                        first)]
    (if r (op r) (m/nomatch e))))

; (((node "p" [(end nil)]) (m/->CallContext nil))
 ; js/document.documentElement)

; (((node "p" (end nil)) (m/->CallContext nil))
 ; js/document.documentElement)

;; TODO see Node.nodeType
(defn text-node? [n] (= (.-prototype js/Text) (js/Object.getPrototypeOf n)))

(def whole-text (>fun some? (fn [e] (.-wholeText e))))

(def inner-html (>fun some? (fn [e] (.-innerHTML e))))

(def dst
  (>node  "div"
    (map>
      [(map-entry> :the-span (>node  "span" (end nil)))
       (map-entry> :the-text (>node  "h3" (>node "span" (>text))))])))

((dst (m/->CallContext nil)) js/document.documentElement)

; (doall
  ; (map (fn [e] (js/console.log e))
    ; (((node :p "p" '()) (m/->CallContext nil)) document.documentElement)))

(js/console.log "--")
; (doall (map
         ; (fn [e]
           ; (js/console.log "!" e)
           ; (.-properties e))
         ; (((node :p "p" '()) (m/->CallContext nil)) document.documentElement)))

(dotimes [n 10] (js/console.log "FUN!!"))

(defn go []
  (println "l00t!&") 
  (let [children (.-children (.-body js/document))
        arr (into [] (js/Array.from children))]
    (map print-str arr)
    ))

;; (->> (p (>node "h3.fl_0" (t-identity)) js/document.documentElement) :val .-children nodelist-seq (map println))

;; (->> (p (>node "h3.fl_0" (t-identity)) js/document.documentElement) :val .-textContent)

; (run-tests)
(run-tests (cljs.test/empty-env :cljs.test/pprint))


; (->> (p (>node "h3.fl_0"
                  ; (>child-node
                    ; text-node?
                    ; whole-text))
               ; js/document.documentElement) :val)
