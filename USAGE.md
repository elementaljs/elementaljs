# History

Elemental was created to solve the problem of bootstrapping Javascript on a page. We wanted a solution that:

1. Didn't force us to bootstrap everything in `$.ready()`
2. Allowed us to quickly find the DOM section that a javascript component was responsible for

We found that Elemental behaviors work well when they are soley responsible for a specific and small component on a page. We realize that Elemental is not a fully fledged framework with strong opinions.

## Best Practices

#### 1. Behaviors should only interact with DOM they encapsulate

The following example is brittle. It is susceptible to DOM refactorings. This problem is magnified the further out the behavior reaches.
```html
<div class="container">
   <input data-behavior="Widget1" />
   <div class="content"></div>
</div>
```

```javascript
function Widget1(element) {
    element.change(function() {
        element.next(".content").text(element.val());
    });
}
```

Instead wrap the behavior around the DOM elements it should control.

```html
<div class="container" data-behavior="Widget1">
   <input class="my-text" />
   <div class="content"></div>
</div>
```

```javascript
function Widget1(element) {
    var myText = element.find(".my-text");
    myText.change(function() {
        element.find(".content").text(myText.val());
    });
}
```

#### 2. Inter behavior communication can be achieved via custom events on `document`

```html
<input data-behavior="Widget1" />
<div data-behavior="Widget2"></div>
```

```javascript
function Widget1(element) {
    element.change(function() {
        $(document).trigger('widget1-event');
    });
}
function Widget2(element) {
    $(document).bind('widget1-event', function() {
        alert('Widget 1 said something!');
    });
}
```


## Anti Patterns

* Multiple behaviors on one element. This makes the combination of behaviors difficult to test. Generally we would favor a larger behavior that encompased the functionality of all behaviors

## What if I need to go against the grain?

We would encourage you evaluate whether Elemental is the best solution for your problem. Like any tool it can only be stretched so far.

