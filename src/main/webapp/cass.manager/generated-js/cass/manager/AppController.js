/*-
 * --BEGIN_LICENSE--
 * Competency and Skills System
 * -----
 * Copyright (C) 2015 - 2017 Eduworks Corporation and other contributing parties.
 * -----
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * --END_LICENSE--
 */

/**
 *  Main entry point of the application. Figures out the settings and
 *  starts the EC UI Framework at the appropriate screen.
 *  
 *  @module cass.manager
 *  @class AppController
 *  @static
 *  
 *  @author devlin.junker@eduworks.com
 */
var AppController = function() {};
AppController = stjs.extend(AppController, null, [], function(constructor, prototype) {
    constructor.topBarContainerId = "#menuContainer";
    /**
     *  Manages the server connection by storing and configuring 
     *  the CASS instance endpoint for the rest of the application
     *  and managing the interfaces to it.  
     *  
     *  @property serverController
     *  @static
     *  @type ServerController
     */
    constructor.serverController = null;
    /**
     *  Manages the current user's identities and contacts through the
     *  KBAC libraries. 
     *  
     *  @property identityController
     *  @static
     *  @type IdentityController
     */
    constructor.identityController = null;
    /**
     *  Handles the login/logout and admin communications with the server.
     *  
     *  @property loginController
     *  @static
     *  @type LoginController
     */
    constructor.loginController = null;
    /**
     *  Handles the browser storage
     *  
     *  @property sessionController
     *  @static
     *  @type SessionController
     */
    constructor.storageController = null;
    /**
     *  Entry point of the application
     *  
     *  @param {String[]} args
     *  			Not used at all...
     */
    constructor.main = function(args) {
        AppController.identityController = new IdentityController();
        AppController.storageController = new StorageController();
        AppController.loginController = new LoginController(AppController.storageController);
        AppController.serverController = new ServerController(AppController.storageController, AppSettings.defaultServerUrl, AppSettings.defaultServerName);
        AppSettings.loadSettings();
        AppController.loginController.identity = AppController.identityController;
        ScreenManager.setDefaultScreen(new WelcomeScreen());
        $(window.document).ready(function(arg0, arg1) {
            ViewManager.showView(new AppMenu(), AppController.topBarContainerId, function() {
                ($(window.document)).foundation();
                var menu = ViewManager.getView(AppController.topBarContainerId);
                menu.showRepoMenu(AppSettings.showRepoMenu);
                menu.showExamplesMenu(AppSettings.showExamplesMenu);
            });
            var server = URLParams.get("server");
            if (server != null && server != undefined) {
                for (var name in AppController.serverController.serverList) {
                    if (AppController.serverController.serverList[name].startsWith(server)) {
                        AppController.serverController.selectServer(name, null, null);
                        return true;
                    }
                }
                ModalManager.showModal(new AddServerModal(null, server), null);
            }
            return true;
        });
    };
}, {serverController: "ServerController", identityController: "IdentityController", loginController: "LoginController", storageController: "StorageController"}, {});
if (!stjs.mainCallDisabled) 
    AppController.main();
