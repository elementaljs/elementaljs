# Getting Started

## Dependencies

Currenty, elemental.js depends on jQuery and UnderscoreJS, we'll try and refactor these out, but in this early stage you'll need those too. Sorry.

## Rails Gem

In order to use in Rails, a Gem is available which integrates with the asset pipeline.

  gem 'elementaljs-rails'

## Running

Drop the elemental.js file into your project and load the container you want to apply this library too. In most cases you'll want to apply to the whole document.

	$(document).ready(function() {
		Elemental.load(document);
	});
	
Then in any HTML, you can add a behavior through a data attribute.

	<div data-behavior="Mybehavior"></div>
	
After load, ElementalJS will look for any elements with the data-behavior attribute and run the function named.  It will pass the containing element through to the behavior so that the function can apply behaviors directly to that element and it's children.

	MyBehavior = function(element) {
		alert(element);
	}
	
The behavior names can be namespaced so you can have HTML that looks like:

	<button data-behavior="My.App.ButtonClick"></button>

It is possible to either use fully qualified function names, or you can tell Elemental about a namespace where the function lives.

	My = { 
		App: {
			ButtonClick: function(element){
				element.bind('click', function() {
					alert('button was clicked');
				});
			}
		} 
	};
	Elemental.addNamespace(My.App);
	
	$(document).ready(function() {
		Elemental.load(document);
	});
	
Then in your HTML, you can put the function name without the namespace.

	<button data-behavior="ButtonClick"></button>
	
# Available Behaviors

## Javascript enabled

This behavior adds a class of 'js' to the element it's included on. This is useful for stylesheets to target environments knowing that Javascript is enabled or not. For maximum benefit, include this behavior on the body element.

- Include the file in src/behaviors/javascript_enabled.js
- Add 'Elemental.JavascriptEnabled' to the body element

## Reload element

This behavior will hit the server on the current URI with a header, x-pjax=true. It will then insert the response into the HTML of the element. 

Your server should only return the element which is being replace, and should use the x-pjax header to tell if it should do that.

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

We will look to add common behaviors and refactor out the dependencies on jQuery and Underscore. We think it'd be better to create a separate project for common behaviors using different libraries, i.e. elemental-jquery. 
