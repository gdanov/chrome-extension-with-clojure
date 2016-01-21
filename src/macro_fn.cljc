(ns macro-fn)

(defrecord Result [val stream match])

(defn matches? [result]
  (:match result))

(defn match [val stream]
  #?(:cljs (js/console.log "match:" val))
  (->Result val stream true))

(defn nomatch [stream]
  #?(:cljs (js/console.log "nomatch:" stream))
  (->Result nil stream false))

(defrecord CallContext [parents])

(defn assert-is-fragment [op-name# op#]
  (assert (::fragment-fn (meta op#)) (str "param " op-name# " must be fragment-fn")))

(defn assert-rule-fns-are-fragments [fns]
  (doall
    (map
      (fn [[op-name# op#]]
        (if (or (seq? op#) (coll? op#))
          (map (partial assert-is-fragment op-name#)  op#)
          (assert-is-fragment op-name# op#)))
      fns)))

(defn get-ops-desc [ops]
  (map
    (fn [[str-name v]]
      (cond
        (and (fn? v) (::fragment-fn (meta v))) (:rule (meta v))
        (string? v) (str "\"" v "\"")
        :else v))
    ops))

(defn child-ctx [my-name ctx]
  #?(:cljs (js/console.log "|" my-name "||" ctx)
     :clj (println "|" my-name "||" ctx))
  (update-in ctx [:parents] (fn [parents# n] (conj parents# n)) my-name))

(defn contextualize-ops [my-name ctx params rule-fns#]
  (assert (symbol? my-name) (str my-name))
  (assert (instance? CallContext ctx))
  (assert (or (seq? params) (coll? params)) (str params))
  #?(:cljs
     (js/console.log "!!" (print-str params)))
  (map (fn [p]
         #?(:cljs (js/console.log "!!!" p))
         (if (rule-fns# p) ;; that's just param marker!
           (if (coll? p)
             (map (fn [pa]
                    (assert (fn? pa))
                    (pa (child-ctx my-name ctx))) p)
             (do
               (assert (fn? p) (str p))
               (p (child-ctx my-name ctx))))
           p))
    params))
