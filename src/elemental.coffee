(->
  root = this
  Elemental = undefined
  if typeof exports isnt "undefined"
    Elemental = exports
  else
    Elemental = root.Elemental = {}
  namespaces = [root]
  Elemental.load = (element) ->
    container = $(element)
    container.find("*").andSelf().filter("[data-behavior]").each (index, element) ->
      that = $(element)
      behaviors = that.attr("data-behavior")
      _.each behaviors.split(" "), (behavior) ->
        namespaced = behavior.split(".")
        fns = _.map(namespaces, (namespace) ->
          _.reduce namespaced, ((prev, next) ->
            (if prev isnt `undefined` then prev[next] else `undefined`)
          ), namespace
        )
        fn = _.find(fns, (fn) ->
          `undefined` isnt fn
        )
        fn that  if `undefined` isnt fn



  Elemental.addNamespace = (namespace) ->
    namespaces.push namespace
)()
