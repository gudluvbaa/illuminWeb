var originname = "http://218.161.115.218:8080/HouseManager";
var illuminApp = angular.module("illuminWebApp", [ "ui.bootstrap", 'ngAnimate']);

function filterSingleDate(date) {
    var actualDate = new Date();
	return actualDate < date.processDate;
}
function filterPastDate(date) {
    var actualDate = new Date();
	//console.log(date.processDate);
	return actualDate > date.processDate;
}

/*illuminApp.config(function ($routeProvider) {
    $routeProvider
        .when("/home",  { controller: "ToDoListController", templateUrl: "./app/partials/home.html" })
        .when("/",  { redirectTo: "/home" })
        .otherwise({ redirectTo: "/404_page" });
});*/

illuminApp.filter('validDate', [function () {
  return function (dateList) {
    return dateList.filter(filterSingleDate);
  };
}]);
illuminApp.filter('validDatePast', [function () {
  return function (dateList) {
    return dateList.filter(filterPastDate);
  };
}]);

illuminApp.directive('fileInput',['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope,elm,attrs){
			elm.bind('change', function () {
				$parse(attrs.fileInput).assign(scope,elm[0].files)
				scope.$apply()
			})
		}
	}
}]);