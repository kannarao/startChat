;(function (angular, global) {
  "use strict";

  angular.module("signin")
         .component("signin", {

           "templateUrl" : "js/signup/signin.html",
           "controller"  : ["$rootScope", "Auth", "AUTH_EVENTS", "$state",

             function ($rootScope, Auth, AUTH_EVENTS, $state) {

              var that = this;

              this.credentials = {

                "username": "",
                "password": ""
              };

              this.errorMsg = "";
              this.loadingText = "Submit";

              /*function writeUserData() {
                var user = firebase.auth().currentUser;
                var myRef = firebase.database().ref("users/");
                var data = {};
                data[user.uid] = {id: user.uid,User_Id: user.uid,Username: user.email}
                myRef.push(data);
              }*/

function writeUserData() {
  var user = firebase.auth().currentUser;
  var data = {};
  data[user.uid] = {id: user.uid,User_Id: user.uid,Username: user.email};
  firebase.database().ref('users/' + user.uid).set(data);
}

              this.onSubmit = function (credentials) {

                this.loadingText = "Verifying...";
                this.viewSubmit = "disabled";

                if (credentials.username.length < 4) {
                  alert('Please enter an email address.');
                  return;
                }
                if (credentials.password.length < 4) {
                  alert('Please enter a password.');
                  return;
                }
                // Sign in with email and pass.
                // [START createwithemail]
                firebase.auth().createUserWithEmailAndPassword(credentials.username, credentials.password).then(function(firebaseUser) {

                  writeUserData();
                  $state.go("login");
                }).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // [START_EXCLUDE]
                  if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                  } else {
                    alert(errorMessage);
                  }
                  console.log(error);
                  // [END_EXCLUDE]
                });

              };
            }]
        });

}(window.angular, window.BS));
