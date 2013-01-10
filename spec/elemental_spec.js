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

      it("should load a behavior on the container element", function() {
          bar = jasmine.createSpy('bar');
          var container = "<div data-behavior='bar'> </div>";
          Elemental.load(container);
          expect(bar).toHaveBeenCalled();
      });

      it("should load a behavior nested deeply beneat the container element", function() {
          baz = jasmine.createSpy('baz');
          var container = "<div><div><div><div data-behavior='baz'> </div></div></div></div>";
          Elemental.load(container);
          expect(baz).toHaveBeenCalled();
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

   describe("#addNamespace", function(){
      it("should add a namespace then load from that namespace", function(){
          My = {
              App : {
                  Behave: jasmine.createSpy('behave')
              }
          };
          var container = "<div><div data-behavior='Behave'></div></div>";
          Elemental.addNamespace(My.App);
          Elemental.load(container);

          expect(My.App.Behave).toHaveBeenCalled();
      });
   });

});
