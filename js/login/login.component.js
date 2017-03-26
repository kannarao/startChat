;(function (angular, global) {
  "use strict";

  angular.module("login")
         .component("login", {

           "templateUrl" : "js/login/login.html",
           "controller"  : ["$rootScope", "Auth", "AUTH_EVENTS",

             function ($rootScope, Auth, AUTH_EVENTS) {

              var that = this;

              this.credentials = {

                "username": "",
                "password": ""
              };

              this.errorMsg = "";
              this.loadingText = "Submit";

              this.onSubmit = function (credentials) {


                Auth.login(credentials).then(function (data) {

                  if(data.message == "success") {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                  } else {
                    console.log(data);
                  }
                }, function () {

                  that.errorMsg = "Invalid Credentials";
                });
              };
            }]
        });

}(window.angular, window.BS));
