;(function (angular) {
  "use strict";

  var endPoint = "/auth";

  angular.module("auth", []).service("Auth", ["$q", "$http", "Session", "$timeout",

    function ($q, $http, Session, $timeout) {

      var deferredStatus = null;

      this.login = function (credentials) {

        var deferredStatus = $q.defer();;

        firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password).then(function(firebaseUser) {

          deferredStatus.resolve({message: "success"});
        }).catch(function(error) {

          deferredStatus.resolve({code: error.code, message: error.message});
        });
        //return $http.post(endPoint + "/login/", credentials)
        //            .then(function (resp) {

        //  resp = resp.data;

        //  Session.set(resp.result);
        //});
        return deferredStatus.promise;
      };

      this.isAuthorized = function () {

        var session = Session.get();

        return !!(session && session.userId);
      };

      this.logout = function () {

        return firebase.auth().signOut().then(function() {
          Session.unset();
          deferredStatus = null;
        }).catch(function(error) {
          // An error happened.
        });
      };

      this.status = function () {

        //if (deferredStatus) {

        //  return deferredStatus.promise;
        //}

        deferredStatus = $q.defer();

        var user = firebase.auth().currentUser;
        if(user) {
          var data = {userId: user.uid, userName: user.email, email: user.email}
          Session.set(data);
          deferredStatus.resolve(data);
        } else {
          $timeout(function() {
          var user = firebase.auth().currentUser;
          if (user) {

            var data = {userId: user.uid, userName: user.email, email: user.email}
            Session.set(data);
            deferredStatus.resolve(data);
          } else {

            deferredStatus.resolve("fail");
          }
          }, 2000)
        }
        return deferredStatus.promise;
      };
  }]);

}(window.angular));
