$(function() {
  Elemental.$ = {};
  var pluginWrapper = function(pluginName) {
    return function(element) {
      var $element = $(element);
      var options = $element.data('options');
      var fn = $element[pluginName];
      if (options === undefined) {
        return $element[pluginName]();
      } else {
        return $element[pluginName](options);
      }
    };
  };
  for (var pluginName in $.fn) {
    Elemental.$[pluginName] = pluginWrapper(pluginName);
  }
});
