/*
 Copyright 2015-2016 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

function errorLogin(error) {
    alert(error);
    $("#login").foundation('open');
}

function login() {
    var username = $("#loginUsername").val().toLowerCase().trim();
    var password = $("#loginPassword").val();
    $(".status").text("Logging in...");
    $("#login").foundation('close');
    EcRepository.cache = {};
    loginServer.startLogin(username, password);
    loginProcess();
}

function changePassword() {
    var username = $("#currentUsername").val().toLowerCase().trim();
    var oldPassword = $("#currentPassword").val();
    var newPassword = $("#newPassword1").val();
    var newPassword2 = $("#newPassword2").val();
    if (newPassword != newPassword2) {
        error("Passwords do not match.");
        return;
    }
    $(".status").text("Changing password...");
    EcRepository.cache = {};
    if (loginServer.changePassword(username, oldPassword, newPassword))
        loginServer.commit(
            function (p1) {
                $("#changePassword").foundation('close');
                alert("Password change successful.");
            },
            errorLogin
        );
}

function loginProcess() {
    loginServer.fetch(
        function (p1) {
            if (EcIdentityManager.ids.length == 0) {
                if (confirm("Encryption Data not found or an error occurred. Would you like to generate a new key?")) {
                    EcPpk.generateKeyAsync(
                        function (p1) {
                            identity = new EcIdentity();
                            identity.ppk = p1;
                            EcIdentityManager.addIdentity(identity);
                            loginServer.commit(
                                function (p1) {
                                    login();
                                },
                                function (error) {
                                    identity = null;
                                    EcIdentityManager.ids = new Array();
                                    errorLogin(error);
                                }
                            )
                        }
                    );
                }
            } else {
                localStorage["usernameWithSalt"] = loginServer.usernameWithSalt;
                localStorage["passwordWithSalt"] = loginServer.passwordWithSalt;
                localStorage["secretWithSalt"] = loginServer.secretWithSalt;
                if (EcIdentityManager.ids.length > 0)
                    identity = EcIdentityManager.ids[0];
                $("#login").foundation('close');
                $("#loginButton,.loggedOut").hide();
                $(".requiresLogin").show();
                $("#logoutButton,.loggedIn").show();
                frameworkSearch();
                populateContacts();
                $("#identityMenu").css("color","lime");
                if (typeof (afterLogin) == "function")
                    afterLogin();
            }
        },
        function (p1) {
            if (p1.startsWith("User does not exist")) {
                if (confirm("Login failed. " + p1 + "Would you like to attempt to create an account using these credentials?")) {
                    loginServer.create(
                        function (p1) {
                            EcPpk.generateKeyAsync(
                                function (p1) {
                                    identity = new EcIdentity();
                                    identity.ppk = p1;
                                    EcIdentityManager.addIdentity(identity);
                                    loginServer.commit(
                                        function (p1) {
                                            login();
                                        },
                                        function (error) {
                                            identity = null;
                                            EcIdentityManager.ids = new Array();
                                            errorLogin(error);
                                        }
                                    )
                                }
                            );
                        },
                        errorLogin
                    );
                }
            }
            else
            	alert(p1);
        }
    );
}

logout = function () {
    $("#identityMenu").css("color","");
    loginServer.clear();
    delete localStorage["usernameWithSalt"];
    delete localStorage["passwordWithSalt"];
    delete localStorage["secretWithSalt"];
    EcRepository.cache = {};
    identity = null;
    EcIdentityManager.ids = new Array();
    EcIdentityManager.contacts = new Array();
    $("#loginButton,.loggedOut").show();
    $("#logoutButton").hide();
    $(".requiresLogin,.loggedIn").hide();
    if (typeof (frameworkSearch) == "function")
        frameworkSearch();
    if (typeof (oneToOneSearch) == "function")
        oneToOneSearch();
    if (typeof (profileSearch) == "function")
        profileSearch();
    populateContactsActual();
}

$(".requiresLogin").hide();

timeout(function () {
    loginServer.usernameWithSalt = localStorage["usernameWithSalt"];
    loginServer.passwordWithSalt = localStorage["passwordWithSalt"];
    loginServer.secretWithSalt = localStorage["secretWithSalt"];
    if (loginServer.usernameWithSalt != null && loginServer.passwordWithSalt != null && loginServer.secretWithSalt != null) {
        loginServer.configured = true;
        loginProcess();
    }
    else
        frameworkSearch();
});
