/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview QueryFilterConfigDirective encapsulates HTML, style and behavior
 *     for widget query filters.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.widget.query.builder.QueryBuilderFilterConfigDirective');

goog.require('p3rf.perfkit.explorer.components.widget.query.picklist.PicklistStates');
goog.require('p3rf.perfkit.explorer.models.perfkit_simple_builder.DateFilter');
goog.require('p3rf.perfkit.explorer.models.perfkit_simple_builder.MetadataFilter');
goog.require('p3rf.perfkit.explorer.models.ChartWidgetModel');


goog.scope(function() {
const explorer = p3rf.perfkit.explorer;
const DateFilter = explorer.models.perfkit_simple_builder.DateFilter;
const MetadataFilter = explorer.models.perfkit_simple_builder.MetadataFilter;
const PicklistStates = explorer.components.widget.query.picklist.PicklistStates;
const PicklistService = explorer.components.widget.query.picklist.PicklistService;
const DashboardService = explorer.components.dashboard.DashboardService;
const ChartWidgetModel = explorer.models.ChartWidgetModel;


/**
 * See module docstring for more information about purpose and usage.
 *
 * @return {Object} Directive definition object.
 */
explorer.components.widget.query.builder.QueryBuilderFilterConfigDirective = function() {
  return {
    restrict: 'E',
    transclude: false,
    scope: {
      // @type {!ChartWidgetModel}
      'ngModel': '='
    },
    templateUrl: '/static/components/widget/query/builder/query-builder-filter-config-directive.html',
    controller: ['$scope', 'picklistService', 'dashboardService', function($scope, picklistService, dashboardService) {
      /** @export {!PicklistService} */
      $scope.picklistSvc = picklistService;
      
      /** @export {!DashboardService} */
      $scope.dashboardSvc = dashboardService;

      /**
       * Adds an end date to the filters.
       * @export
       */
      $scope.addEndDate = function() {
        $scope.ngModel.datasource.config.filters.end_date =
            new DateFilter(new Date().toISOString());
      };

      /**
       * Removes the end date from the filters.
       * @export
       */
      $scope.removeEndDate = function() {
        $scope.ngModel.datasource.config.filters.end_date = null;
      };

      /**
       * Adds an end date to the filters.
       * @export
       */
      $scope.addOfficial = function() {
        $scope.ngModel.datasource.config.filters.official = true;
      };

      /**
       * Removes the official flag from the filters.
       * @export
       */
      $scope.removeOfficial = function() {
        $scope.ngModel.datasource.config.filters.official = null;
      };

      /**
       * Adds a new option to the metadata list.
       * @export
       */
      $scope.addMetadataFilter = function() {
        $scope.ngModel.datasource.config.filters.metadata.push(new MetadataFilter());
      };

      $scope.refreshPicklist = function(picklistName) {
        picklistService.refresh(picklistName, $scope.ngModel.datasource.config.filters);
      }
      
      $scope.isPicklistLoading = function(picklistName) {
        return picklistService.picklists[picklistName].state == PicklistStates.LOADING;
      }
    }]
  };
};

});  // goog.scope
