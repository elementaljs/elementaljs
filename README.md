# Getting Started

[![Build Status](https://travis-ci.org/elementaljs/elementaljs.png?branch=master)](https://travis-ci.org/elementaljs/elementaljs)
[![Dependency Status](https://gemnasium.com/elementaljs/elementaljs.png)](https://gemnasium.com/elementaljs/elementaljs)

## Dependencies

Currenty, elemental.js depends on jQuery, we'll try and refactor these out, but in this early stage you'll need those too. Sorry.

## Rails Gem

In order to use in Rails, a Gem is available which integrates with the asset pipeline.

  gem 'elementaljs-rails'

## Running

Drop the elemental.js file into your project and load the container you want to apply this library too. In most cases you'll want to apply to the whole document.

    $(document).ready(function() {
      Elemental.load(document);
    });

Then in any HTML, you can add a behavior through a data attribute.

    <div data-behavior="MyBehavior"></div>

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

## Jquery plugin

This will create a behavior for each of your jquery plugins.

- Include the file in src/behaviors/jquery_plugin.js
- Add "Elemental.$.#{name_of_plugin}" as a data-behavior to your element_of_choice
- Optionally add a data-options hash with your_configuration

This will call $(element_of_choice).name_of_plugin(your_configuration) so you don't need to create new data-behaviors for every out-of-the-box jquery plugin in your arsenal.

# Why

## What about unobtrusive javascript?

There are four components of unobtrusive javascript

- Usability
- Graceful degradation
- Accessibility
- Separation

While three of the four components don't really affect this project, the forth, seperation of concern between the presentation layer and the Javascript, does.

The [section on seperation of concerns on Wikipedia covers this concern well.](http://en.wikipedia.org/wiki/Unobtrusive_JavaScript#Separation_of_behavior_from_markup) This project is quite clearly encouraging the use of putting behavior into the presentation. What's different this time around?

Using this project or this pattern we are not expressively stating what events to fire upon (e.g. onclick or onchange), we are just defining a behavior that wraps this element. One of the concerns addressed in the seperation of concerns section in the Wikipedia article is ease of development but by defining small behaviors they canbe easily seperated into their own files which are easy to test. This reduces the concern about maintainablilty.

Having the indication about what behaviors are applied to an element can also be useful in discoverability. With the seperation between presentation and behavior it can be difficult finding what code is being executed over a part of the DOM. With the behavior, you can narrow that down to a single file and get to where you need to be all that much quicker.

## What about unobtrusive HTML?

Many Javascript applications will be loaded when the DOM has finished loading and will generally search the entire DOM for elements to attach events to. Using Elemental the element gets passed into the function that contains the behavior. This enables that function to search the DOM locally and reduce the chance of any changes to the DOM affecting the applications javascript.

# Best Practices

See [USAGE](https://github.com/elementaljs/elementaljs/blob/master/USAGE.md) for information on best practices and anti-patterns

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

