(ns macro
(:require [clojure.test :refer [deftest is] :as t]
          [clojure.pprint :as pp]
          [macro-fn :as m :refer :all]))

(defmacro meta-with [m o]
  `(with-meta ~o ~m))

(defn fragment-fn-name [rule-name] (symbol (str (name rule-name) "-fragment")))
(defn parse-fn-name [rule-name] (symbol (str (name rule-name) "-parse")))

(defmacro rule
  {:use "(rule repeat [pred ^* operation] body. no support for varargs! use collections"}
  [rule-name params & body]
  (let [inp-param (last params)
        params (butlast params)
        params-lst (map (fn [p] (first {(name p) p})) params)
        rule-fns (map (fn [o#] [(name o#) o#])
                   (filter (fn [op] (:* (meta op))) params))
        rule-fns# (into #{} (map last rule-fns))]
    `(defn ~rule-name {:macro-fn/rule-fn true} [~@params]
       (assert-rule-fns-are-fragments [~@rule-fns])
       (meta-with {:macro-fn/fragment-fn true :rule '~rule-name}
         (fn ~(fragment-fn-name rule-name) [~'ctx] ;; fragment-fn
                                        ; (assert (instance? m/CallContext ~'ctx)) 
           (let [~'ctx (assoc ~'ctx
                         :rule '~rule-name
                         :&form `(~'~rule-name ~@(get-ops-desc [~@params-lst])))
                 [~@params] (contextualize-ops '~rule-name ~'ctx [~@params] ~rule-fns#)]
             (meta-with {:parse-fn true}
               (fn ~(parse-fn-name rule-name) [~inp-param] ;; parse-fn
                 ~@body))))))))

(pp/pprint (macroexpand-1 '(rule a [^:* a inp] true)))

(pp/pprint (macroexpand-1
             '(rule sub [a ^:* s input]
                (println ctx)
                (s input))))

(rule a [^:* a inp] true)
(rule t [a ^:* b inp] (println "eu"))
(rule e [ch inp] true)

(rule master [^:* s inp]
  ; (println "master:" s)
  (s inp))
     
(rule sub [a ^:* s input]
  ; (println "sub:" ctx a s input)
  (s input))

(rule terminal [e strm]
  ;;(println "terminal:" strm "|" ctx)
  )

(println "go")

(def s1 (sub 111 (terminal true)))
(def s2 (s1 (->CallContext nil)))
(s2 "hello")

(((master
    (sub nil
      (sub "thch"
        (sub 123
          (sub [1 false]
            (terminal \c)))
        )))
  (->CallContext ["-root-"]))
 "hello")
     



#_(
   (rule X [a b] <body>) => (defn X [a ctx] (defn [b]) <body>)
   rule X => (defn X [ops] (fn X* [ctx] (fn X** [input])))
   ctx is not const or literal! it's a protocol!
   
   rule => rule-fn
   fragment (rule-fn (fragment)) => fragment-fn
   fragment-fn (ctx) => parse-fn
   parse-fn (input) => Result
   
   (rule [body => rule-fn])
   (fragment [(rule-fn (rule-fn ... (rule-fn fragment))) => fragment-fn])
   (parse [fragment-fn => Token])

   (repeat (eq 1)) => (repeat* [ctx] )
   
   (fragment (repeat (eq 1))) => (fn [ctx] (fn [input] ((repeat (eq 1 ..) ctx) input)))
   
   (deffragment Y (ruleA ((ruleB) fragmentC))) => (defn Y [ctx] (partial ops))
   
   (deffragment blaa-g-frgmnt (blaa-group {} [(frgmnt1 {}) (eq {} 2)]))
   
   (parse fragment-fn input) => ((fragment-fn <ctx>) input)
   (PARSE blaa-f-fragment (seq ...)))



