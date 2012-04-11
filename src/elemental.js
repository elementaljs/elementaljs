(function(){
    
    var root = this;
    var Elemental;
    if (typeof exports !== 'undefined') {
        Elemental = exports;
    } else {
        Elemental = root.Elemental = {};
    }

    Elemental.load = function(element){
        var container = $(element);
        container.find("*[data-behavior]").each(function(index, element){
            var that = $(element);
            var behaviors = that.attr('data-behavior');
            _.each(behaviors.split(" "), function(behavior){
                var namespaced = behavior.split(".");
                var fn = _.reduce(namespaced, function(prev, next){
                    return prev[next];
                }, root);
                if (undefined !== fn) {
                    fn(that);
                }
            });
        });
    };

}).call(this);