describe("JS is enabled", function(){
    
   it("should add the class 'js' to the element", function(){
      setFixtures("<div id='testfixture'></div>");
      var jsEnabled = new Elemental.JavascriptEnabled($('#testfixture'));
      expect($('#testfixture').hasClass('js')).toBe(true);
   });
    
});