/**
 * Created by linchunhui on 2018/10/02
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.organization.controller", ["module.common.tip.growl-tip"])
            .controller("OrganizationCtrl", ["$scope", "$rootScope", "$state", "NLTables", "GrowlTip", "StringUtils", "DateUtils", "$translate",
                "OrganizationResource",
                function ($scope, $rootScope, $state, NLTables, GrowlTip, StringUtils, DateUtils, $translate,
                          OrganizationResource) {

                    $scope.selected = function(row) {
                        $scope.selectedRow = row;
                    };
                    $scope.toEdit = function() {
                        $scope.organization = $scope.selectedRow;
                    };
                    $scope.toAddOrg = function() {
                        $scope.organization = {
                            parentOrgId: $scope.selectedRow.orgId
                        };
                    };
                    $scope.cancelEdit =function() {
                        $scope.organization = undefined;
                    };
                    $scope.initOrganizationList = function() {
                        OrganizationResource.list({}, function (dataList) {
                            $scope.organizationList = sortDataList(dataList, undefined, "orgId", "parentOrgId");
                        }, GrowlTip.errorResponseFunction);
                    };

                    function sortDataList(list, parentId, keyId, parentIdKey) {
                        var targetList = [];
                        for (var i = 0; i < list.length; i++) {
                            var object = list[i];
                            if (object[parentIdKey] == parentId) {
                                var sonList = sortDataList(list, object[keyId], keyId, parentIdKey);
                                if (sonList.length > 0) {
                                    object.data = sonList;
                                }
                                targetList.push(object);
                            }
                        }
                        return targetList;
                    }

                    $scope.saveOrganization = function () {
                        var org = $scope.organization;
                        if (org.orgName == undefined || org.length < 1) {
                            $("#orgName").focus();
                            return;
                        }

                        OrganizationResource.save({orgId: org.orgId}, org, function () {
                            $scope.initOrganizationList();
                        }, GrowlTip.errorResponseFunction);
                    };
            }
        ]);

    });
