(function(){
	'use strict';	

	angular.module('app')
	.directive('maskeradeDirective', ['$filter', MaskeradeDirective]);

	function MaskeradeDirective ($filter) {
		return {
			restrict: 'EA',
			replace:true,
			scope:{
				dateValue: '=',
				dateMask:'@?',
				dateNgMask:'@?',
				placeholderText:'@?'
			},
			link: link,
			template:[
				'<input type="text" ',
				'class="jqueryDate" ',
				'ng-model="localDateValue" ',
				'placeholder="{{::placeholderText}}">'
			].join('')
		};	

	function link ($scope, $element, $attrs) {

			var filter = $filter('date');

			$scope.localDateValue = filter($scope.dateValue, $scope.dateNgMask);
			console.log($scope.localDateValue);

			// call back function to get value from Maskerade
			function onChange (date) {
				if(angular.isDate(date)){
					$scope.dateValue = date;
				}
			}

			var options = {
				mask:$scope.dateMask,
				change:onChange,
				corrected:onChange,
			}

			$element.maskerade(options);			
	}
}
})();