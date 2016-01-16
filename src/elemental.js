(function(ns) {

    var namespaces = [this];

    var attachBehavior = function($element, behavior) {
        var fn = namespaces;

        behavior.replace(/([^.]+)/g, function(object) {
            if(fn === namespaces) {
                for(var nextFn, index = 0; index < fn.length; ++index) {
                    nextFn = fn[index][object];
                    if(nextFn) {
                        fn = nextFn;
                        break;
                    }
                }
            } else if(typeof fn === 'object') {
                fn = fn[object];
            }
        });

        if(typeof fn === 'function') {
            if(ns.options.classBased) {
                return new fn($element);
            } else {
                return fn($element);
            }
        } else {
            if (window.console && console.warn) {
                console.warn("elementalJS: Unable to find behavior:", behavior);
            }
        }
    };

    var attachBehaviorsToElement = function(element) {
        var $element = $(element);
        var behaviors = $element.data('behavior') || $element.data('behaviour');
        behaviors.replace(/([^ ]+)/g, function(behavior) {
            attachBehavior($element, behavior);
        });
    };

    ns.options = {
        classBased: false
    };

    ns.loadOnly = function(element) {
        attachBehaviorsToElement(element);
    };

    ns.load = function(container) {
        var selector_name = '[data-behavior], [data-behaviour]';
        var $behaviors = $(selector_name, container).add($(container).filter(selector_name));

        $behaviors.each(function(index, element) {
            attachBehaviorsToElement(element);
        });
    };

    ns.addNamespace = function(namespace) {
        namespaces.push(namespace);
    };

})(window.Elemental = {});
