describe("Jquery Plugin", function(){

  beforeEach(function(){
    var plainFixture = "<div id='testfixture'></div>"
    var optionsFixture = "<div id='testfixture2' data-options='{\"color\":\"rgb(0, 255, 0)\"}'></div>"
    setFixtures(plainFixture + optionsFixture);
  });

  it("calls the greenify plugin", function(){
    var behavior = new Elemental.$.greenify($('#testfixture'));
    expect($('#testfixture').css('color')).toBe('rgb(85, 107, 47)');
  });

  it("calls the redify plugin", function(){
    var behavior = new Elemental.$.redify($('#testfixture'));
    expect($('#testfixture').css('color')).toBe('rgb(107, 85, 47)');
  });

  it("passes the right option through", function(){
    var behavior = new Elemental.$.greenify($('#testfixture2'));
    expect($('#testfixture2').css('color')).toBe('rgb(0, 255, 0)');
  });

});

// example jquery plugin: http://learn.jquery.com/plugins/basic-plugin-creation/
(function ($) {

  var shade;

  var colorify = function(options) {
    if ('color' in options) shade = options['color'];
    this.css( "color", shade );
    return this;
  };

  $.fn.greenify = function(options) {
    shade = "rgb(85, 107, 47)";
    return colorify.call(this, options);
  }

  $.fn.redify = function(options) {
    shade = "rgb(107, 85, 47)";
    return colorify.call(this, options);
  };

}(jQuery));
