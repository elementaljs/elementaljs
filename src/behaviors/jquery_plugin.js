$(function() {
  Elemental.$ = {};
  var pluginWrapper = function(pluginName) {
    return function(element) {
      var $element = $(element);
      var options = $element.data('options');
      if (options === undefined) { options = {}; }
      return $element[pluginName](options);
    };
  };
  for (var pluginName in $.fn) {
    Elemental.$[pluginName] = pluginWrapper(pluginName);
  }
});
