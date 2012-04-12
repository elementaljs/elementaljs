# Getting Started

## Dependencies

Currenty, elemental.js depends on jQuery and UnderscoreJS, we'll try and refactor these out, but in this early stage you'll need those too. Sorry.

## Running

Drop the elemental.js file into your project and load the container you want to apply this library too. In most cases you'll want to apply to the whole document.

	Elemental.load(document);
	
Then in any HTML, you can add a behaviour through a data attribute.

	<div data-behaviour="MybehaviourFunction"></div>
	
After load, ElementalJS will look for any elements with the data-behaviour attribute and run the function named.  It will pass the containing element through to the behaviour so that the function can apply behaviours directly to that element and it's children.

	MyBehaviour = function(element) {
		alert(element);
	}
	
The behaviour names can be namespaced so you can have HTML that looks like:

	<div data-behaviour="My.App.Behave"></div>

It is possible to either use fully qualified function names, or you can tell Elemental about a namespace where the function lives.

	My = { 
		App: {
			Behave: function(element){
				alert(element);
			}
		} 
	};
	
	Elemental.addNamespace(My.App);
	Elemental.load(document);
	
Then in your HTML, you can put the function name without the namespace.

	<div data-behaviour="Behave"></div>

# Development

## Dependencies

You'll need bundler to install the Rubygem dependencies for the build process.

	gem install bundler
	bundle install --binstubs
	
When you're developing, run the following command to use binaries in the bin folder that bundler has installed there. 

	export PATH=`pwd`/bin:$PATH

## Tests

### Jasmine

To get Jasmine up and running, run the following rake task

	rake jasmine
	
Then point your browser to http://localhost:8888	

### Continuous Integration

A rake task called 'ci' will run JSLint and Jasmine tests.

	rake ci

# Contributing

Fork this project and create a new branch. Make the code changes including tests and then send a pull request.

# Next Steps

We will look to add common behaviours and refactor out the dependencies on jQuery and Underscore. We think it'd be better to create a separate project for common behaviours using different libraries, i.e. elemental-jquery. 