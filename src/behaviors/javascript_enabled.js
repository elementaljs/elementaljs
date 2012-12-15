/**
* This behavior adds a class of 'js' to the element.
*
* Although simple, this technique is useful when applied to the BODY element in the DOM.
* Stylesheets can then target the page if the page has Javascript enabled (as the new class
* will be applied), or target a Javascript less environment where the class will not be applied.
*/
Elemental.JavascriptEnabled = function(el){
    el.addClass('js');
};
