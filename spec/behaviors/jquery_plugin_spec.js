describe("Jquery Plugin", function(){

  beforeEach(function(){
    var plainFixture = "<div id='testfixture'></div>"
    var optionsFixture = "<div id='testfixture2' data-options='{\"color\":\"rgb(0, 255, 0)\"}'></div>"
    setFixtures(plainFixture + optionsFixture);
  });

  it("calls the appropriate jquery plugin", function(){
    var behavior = new Elemental.$.greenify($('#testfixture'));
    expect($('#testfixture').css('color')).toBe('rgb(85, 107, 47)');
  });

  it("passes the right option through", function(){
    var behavior = new Elemental.$.greenify($('#testfixture2'));
    expect($('#testfixture2').css('color')).toBe('rgb(0, 255, 0)');
  });

});

// example jquery plugin: http://learn.jquery.com/plugins/basic-plugin-creation/
(function ($) {

  var shade = "rgb(85, 107, 47)";

  $.fn.greenify = function(options) {
    if ('color' in options) shade = options['color'];
    this.css( "color", shade );
    return this;
  };

}(jQuery));
