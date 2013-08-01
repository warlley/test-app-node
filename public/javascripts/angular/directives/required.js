testApp.directive("required", ['$timeout', function ($timeout) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.before('<span class="required-tick">*</span>');

      // listen for pertinent events to trigger input on form element
      // use timeout to ensure val is populated before triggering 'input'
      // ** 'change' event fires for Chrome
      // ** 'DOMAttrModified' fires for Firefox 22.0
      // ** 'keydown' for Safari  6.0.1
      // ** 'propertychang' for IE
      element.on('change.autofill DOMAttrModified.autofill keydown.autofill propertychange.autofill', function (e) {
        $timeout( function () {
          if (element.val() !== '') {
            element.trigger('input');
          }
        }, 0);
      });

    }
  }
}]);