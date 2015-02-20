(function () {
	angular.module('app')
	.controller('mainController', MainController);
	
	function MainController () {
		var main = this;

		log('log jQuery()');
		log($());
		log('verify jQuery version matches angular.element');

		logLineBreak();

		log('log angular.element()');
		log(angular.element());
		log('verify angular.element version matches jQuery');

		logLineBreak(2);

		log('log jQuery().maskerade');
		log($().maskerade);
		log('verify jQuery version matches angular.element');

		logLineBreak();

		log('log angular.element().maskerade');
		log(angular.element().maskerade);
		log('verify angular.element version matches jQuery');

		main.jQueryDateEntered = new Date();
		main.dateNgChangeEntered = new Date();
		main.directiveDateEntered = new Date();

		main.ngDateChange = function () {
			//get value from the element that calls ngDateChange
			main.dateNgChangeEntered = angular.element(this).value();
		}
	}

	// I get tired of typing console.log()
	function log (obj) {
		console.log(obj);
	}

	//cheesy line break
	function logLineBreak (times) {
		var repeat = times ? times : 1;
		for(var i = 0; i < repeat; i ++){
			log('-----------------------------------------');
			log('');
		}
	}	
})();