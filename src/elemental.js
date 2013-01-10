(function(){

    var root = this;
    var Elemental;
    if (typeof exports !== 'undefined') {
        Elemental = exports;
    } else {
        Elemental = root.Elemental = {};
    }

    var namespaces = [root];

    Elemental.load = function(element){
        var container = $(element);
        container.find("*").andSelf().filter("[data-behavior]").each(function(index, element){
            var that = $(element);
            var behaviors = that.attr('data-behavior');
            _.each(behaviors.split(" "), function(behavior){
                var namespaced = behavior.split(".");

                var fns = _.map(namespaces, function(namespace){
                    return _.reduce(namespaced, function(prev, next){
                        return prev[next];
                    }, namespace);
                });

                var fn = _.find(fns, function(fn){
                    return undefined !== fn;
                });

                if (undefined !== fn) {
                    fn(that);
                }
            });
        });
    };

    Elemental.addNamespace = function(namespace){
        namespaces.push(namespace);
    };

})();
