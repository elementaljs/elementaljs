describe("Reload", function(){

  beforeEach(function(){
    setFixtures("<div id='testfixture'>");
    jasmine.clock().install();
  });

  it("reloads the element from the server", function(){


    var ajaxSpy = spyOn($, 'ajax').and.callFake(function(options){
      options.success("foo");
    });
    var behavior = new Elemental.Reload($('#testfixture'));
    jasmine.clock().tick(30001);
    expect(ajaxSpy).toHaveBeenCalled();
    expect($('#testfixture').html()).toBe('foo');
  });

});
