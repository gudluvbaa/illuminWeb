(function () {

    function repairProvider ($http) {
		this.getRepairs = function (callback) {
             $http.get(originname + '/repair/building/1')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };
    };

    illuminApp.service("repairProvider", repairProvider);

})();
