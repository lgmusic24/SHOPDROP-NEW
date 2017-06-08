angular.module("shopDrop", [
  "ui.router",
  "ngResource"


])
.config(['$stateProvider',
   '$locationProvider',
   '$urlRouterProvider',
  RouterFunction

]).factory('ItemFactory', [
  '$resource',
  ItemFactoryFunction

]).factory('WelcomeFactory', [
  '$resource',
  WelcomeFactoryFunction

]).controller('ItemsController', [
  "$state",
  "ItemFactory",
  ItemsControllerFunction
])

.controller("WelcomeController", [
  "$state",
  "$stateParams",
  WelcomeControllerFunction
])


function RouterFunction($stateProvider){
  $stateProvider
  // .state("welcome", {
  //   url: "/",
  //   templateUrl: "/assets/js/ng-views/welcome.html"
  // })

 .state('welcome', {
    url: '/',
    templateUrl: '/assets/js/ng-views/welcome.html',
    controller: "WelcomeController",
    controllerAs:"vm"
 })

  .state('index', {
    url: '/items',
    templateUrl: '/assets/js/ng-views/index.html',
    controller: "ItemsController",
    controllerAs: "vm"
  });
}



  // $urlRouterProvider.otherwise('/')

function ItemFactoryFunction($resource) {
  return $resource('/api/items/name:', {}, {
    update: {method: "PUT"}
  });
}

function WelcomeFactoryFunction($resource) {
  return $resource('/api/welcome/name:', {}, {
    update: {method: "PUT"}
  })
}



 function ItemsControllerFunction($state, $stateParams, ItemFactory) {
   this.item = ItemFactory.get({name: $stateParams.name})
   this.message = "show test"
     console.log("inside the show controller function")
     console.log(this.items)
     this.update = function() {
     this.item.$update({name: $stateParams.name})
     console.log("updating!")
   }
   this.destroy = function () {
     this.item.$delete({name: $stateParams.name}).then(function(){
     $state.go("index")
    })
   }
 }

 function WelcomeControllerFunction($state, Welcome) {
   this.items = ItemFactory.query()
   console.log("inside the index controller function")
   console.log(this.items)
   this.newItem = new ItemFactory()
   this.create = function () {
     console.log('new item')
     this.newItem.$save().then(function(item){
       $state.go("show", {name: item.name})
     })
   }
 }
