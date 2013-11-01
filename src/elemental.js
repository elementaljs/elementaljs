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
            return fn($element);
        } else {
            if (window.console && console.warn) {
                console.warn("elementalJS: Unable to find behavior:", behavior);
            }
        }
    };

    ns.load = function(container) {
        var $selector = $('[data-behavior]', container).add($(container).filter('[data-behavior]'));

        $selector.each(function(index, element) {
            var $element = $(element);
            var behaviors = $element.data('behavior');
            behaviors.replace(/([^ ]+)/g, function(behavior) {
                attachBehavior($element, behavior);
            });
        });
    };

    ns.addNamespace = function(namespace) {
        namespaces.push(namespace);
    };

})(window.Elemental = {});
