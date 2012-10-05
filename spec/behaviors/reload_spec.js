describe("Reload", function(){

  beforeEach(function(){
    setFixtures("<div id='testfixture'>");
    jasmine.Clock.useMock();
  });

  it("reloads the element from the server", function(){
    var ajaxSpy = spyOn($, 'ajax').andCallFake(function(options){
      options.success("foo");
    });
    var behavior = new Elemental.Reload($('#testfixture'));
    jasmine.Clock.tick(30001);
    expect(ajaxSpy).toHaveBeenCalled();
    expect($('#testfixture').html()).toBe('foo');
  });

});
