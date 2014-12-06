/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

App.KerberosWizardStep6Controller = App.KerberosProgressPageController.extend({
  name: 'kerberosWizardStep6Controller',
  clusterDeployState: 'KERBEROS_DEPLOY',
  commands: ['stopServices','startServices'],

  stopServices: function () {
    App.ajax.send({
      name: 'common.services.update',
      data: {
        context: "Stop services",
        "ServiceInfo": {
          "state": "INSTALLED"
        }
      },
      sender: this,
      success: 'startPolling',
      error: 'onTaskError'
    });
  },

  startServices: function () {
    App.ajax.send({
      name: 'common.services.update',
      sender: this,
      data: {
        "context": "Start services",
        "ServiceInfo": {
          "state": "STARTED"
        },
        urlParams: "params/run_smoke_test=true"
      },
      success: 'startPolling',
      error: 'onTaskError'
    });
  }
});


