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

      it("should load behaviors on all top-level container elements", function() {
          bar = jasmine.createSpy('bar');
          var container = "<div data-behavior='bar'> </div>   <div data-behavior='bar'> </div>";
          Elemental.load(container);
          expect(bar.calls.count()).toEqual(2);
      });

      it("should load the behavior as a function", function() {
          var scope = null;
          klass = function() {
              scope = this;
          };

          var container = "<div><div><div><div data-behavior='klass'> </div></div></div></div>";
          Elemental.load(container);
          expect(scope).toEqual(window);
      });

      describe("when Elemental.options.classBased is true", function() {
        beforeEach(function() {
            Elemental.options.classBased = true;
        });

        afterEach(function() {
            Elemental.options.classBased = false;
        });

        it("should load the behavior as a class using the new operator", function() {
            var scope = null;
            klass = function() {
                scope = this;
            };

            var container = "<div><div><div><div data-behavior='klass'> </div></div></div></div>";
            Elemental.load(container);
            expect(scope).not.toEqual(window);
        });
      });

      describe("when the container is some specific DOM", function() {
        it("should load a behavior nested deeply beneath the container element", function() {
            baz = jasmine.createSpy('baz');
            var container = "<div><div><div><div data-behavior='baz'> </div></div></div></div>";
            Elemental.load(container);
            expect(baz).toHaveBeenCalled();
        });

        it("should not load a behavior that is outside of the container element", function() {
            baz = jasmine.createSpy('baz');
            qux = jasmine.createSpy('qux');
            var container = "<div data-behavior='baz'> </div>";
            setFixtures("<div data-behavior='qux'> </div>");

            Elemental.load(container);

            expect(baz).toHaveBeenCalled();
            expect(qux).not.toHaveBeenCalled();
        });
      });

      describe("when the container is the document", function() {
        it("should load a behavior nested deeply beneath the container element", function() {
            buzz = jasmine.createSpy('buzz');
            setFixtures("<div><div><div><div data-behavior='buzz'> </div></div></div></div>");
            Elemental.load(document);
            expect(buzz).toHaveBeenCalled();
        });
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

   describe("#loadOnly", function(){
      it("should only the behaviors on the target element", function(){
          foo = jasmine.createSpy('qux');
          foo = jasmine.createSpy('foo');
          var container = "<div data-behavior='qux'><div data-behavior='foo'></div></div>";
          Elemental.loadOnly(container);
          expect(qux).toHaveBeenCalled();
          expect(foo).not.toHaveBeenCalled();
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

      it('should support multiple namespaces', function(){
        One = {
          AppOne: jasmine.createSpy('behave')
        };

        Two = {
          AppTwo: jasmine.createSpy('behaveAsWell')
        };

        var container = "<div><div data-behavior='Two.AppTwo One.AppOne'></div></div>";
        Elemental.load(container);

        expect(One.AppOne).toHaveBeenCalled();
        expect(Two.AppTwo).toHaveBeenCalled();

      });
   });

});
