(function(){
	'use strict';	

	angular.module('app')
	.directive('wipMaskeradeDirective', ['$filter', WipMaskeradeDirective]);	

    function WipMaskeradeDirective($filter) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                wipNgMask: '@?', // used by angualr to display the date propperly when the page loads
                wipMaskeradeMask: '@?', // used by Maskerade when the user inputs a new date
                wipPlaceholder: '@?', //place holder text
                wipClass: '@?', //css classes
                wipId: '@?', // id attribute value
                wipName: '@', // name attribute value used to set $validity on the form
                wipValue: '=', // the model on the parent scope, filtered with the wipNgMask and loaded as $scope.localValue
                wipRequired: '@?' // weather it's required or not, sets ng-required
            },
            link: link,
            template: [
                    '<input autocomplete="off" ',
                            'placeholder="{{::wipPlaceholder}}" ',
                            'class="{{::wipClass}}" ',
                            'id="{{::wipId}}" ',
                            'name="{{::wipName}}" ',
                            'ng-model="localValue" ',
                            'type="text"',
                            'ng-required="{{::wipRequired}}"',
                            ' />'
            ].join(''),
            require: ['^?form'],
        };

        function link($scope, $element, $attrs, $controls) {

            var form = $controls[0];

            var filter = $filter('date');
            $scope.localValue = filter($scope.wipValue, $scope.wipNgMask);
            
            angular.element($element[0]).maskerade({
                mask: $scope.wipMaskeradeMask,
                change: onChange,
                correct: onChange,
                corrected: onChange,
            });

            function onChange(date) {
            	if(form){
	                form[$scope.wipName].$setValidity('invalidDate', !isNaN(date.getTime()));
	            }
				if(!isNaN(date.getTime())){
                	$scope.wipValue = date;
	            }else{
	            	$scope.wipValue = 'Invalid Date';
	            }
	            $scope.$apply();
            }
        }
    }
})();
