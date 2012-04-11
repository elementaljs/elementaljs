describe("Elemental", function(){
   
   describe("#load", function(){
      
      it("should load a single behaviour in the global namespace", function(){
          foo = jasmine.createSpy('foo');
          var container = "<div><div data-behavior='foo'></div></div>";
          Elemental.load(container);
          expect(foo).toHaveBeenCalled();
      });
      
      it("should load a single namespaced behaviour", function(){
          Behavior = {
              First: jasmine.createSpy('first')
          }; 
         var container = "<div><div data-behavior='Behavior.First'></div></div>";
         Elemental.load(container); 
         expect(Behavior.First).toHaveBeenCalled(); 
      });
      
      it("should load a single deep namespaced behaviour", function(){
           Behavior = {
               Another:{
                   AndAnother: {
                       First: jasmine.createSpy('first')
                   }
               }
           }; 
          var container = "<div><div data-behavior='Behavior.Another.AndAnother.First'></div></div>";
          Elemental.load(container); 
          expect(Behavior.Another.AndAnother.First).toHaveBeenCalled();          
      });
      
      it("should not load a behaviour that does not exist", function(){
          var container = "<div><div data-behavior='doesNotExist'/></div>";
          Elemental.load(container);
      });
      
      it("should load multiple behaviours", function(){
           Behavior = {
               First: jasmine.createSpy('first'),
               Second: jasmine.createSpy('second')
           }; 
          var container = "<div><div data-behavior='Behavior.First Behavior.Second'></div></div>";
          Elemental.load(container); 
          expect(Behavior.First).toHaveBeenCalled();          
          expect(Behavior.Second).toHaveBeenCalled();      
      });
   });
    
});