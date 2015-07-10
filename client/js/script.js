var appTasks = angular.module('ngAppTasks', []);

appTasks.controller('main_controller', ['$scope', '$http', function ($scope, $http) {
        $scope.TaskNew = {};
        $scope.TasksEdit = {};
        $scope.Tabs = {};

        $scope.TaskNew.send = function () {
            $http({method: 'POST', url: '/task', params: {
                    name: $scope.TaskNew.name,
                    time_exec: $scope.TaskNew.time_exec,
                    executive: $scope.TaskNew.executive
                }}).success(function (response) {

            });
        };

        $scope.Tabs.addTask = function () {
            $scope.switchMainWindow = null;
            $scope.Tabs.TabsList = [{title: 'Добавить задачу', class: 'active', handler: $scope.Tabs.addTask},
                {title: 'Редактировать задачу', handler: $scope.Tabs.editTask},
                {title: 'Список задач', handler: $scope.Tabs.showTask},
                {title: 'Удалить задачу', handler: $scope.Tabs.deleteTask}];
        };

        $scope.Tabs.editTask = function () {
            $scope.switchMainWindow = 'editWindow';
            
            $http({method: 'PUT', url: '/task'}).success(function (response) {
                $scope.TasksEdit.cells = response;
                for (var i = 0; i < response.length; i++) {
                    $scope.TasksEdit.cells[i].number = i;
                }
            });

            $scope.Tabs.TabsList = [{title: 'Добавить задачу', class: undefined, handler: $scope.Tabs.addTask},
                {title: 'Редактировать задачу', class: 'active', handler: $scope.Tabs.editTask},
                {title: 'Список задач', handler: $scope.Tabs.showTask},
                {title: 'Удалить задачу', handler: $scope.Tabs.deleteTask}];


        };
        
        $scope.Tabs.showTask = function() {
            $scope.switchMainWindow = 'showWindow';
        };
        
        $scope.Tabs.TabsList = [{title: 'Добавить задачу', class: 'active', handler: $scope.Tabs.addTask},
            {title: 'Редактировать задачу', handler: $scope.Tabs.editTask},
            {title: 'Список задач', handler: $scope.Tabs.showTask},
            {title: 'Удалить задачу', handler: $scope.Tabs.deleteTask}];
    }]);
