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

var ConfirmModal = function(confirmCallback, message, header) {
    EcModal.call(this);
    this.confirmCallback = confirmCallback;
    this.message = message;
    this.header = header;
};
ConfirmModal = stjs.extend(ConfirmModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "tiny";
    prototype.header = null;
    prototype.message = null;
    prototype.confirmCallback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/confirm.html";
    };
}, {confirmCallback: "Callback0"}, {});
