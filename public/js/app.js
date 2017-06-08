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

// ]).factory('WelcomeFactory', [
//   '$resource',
//   WelcomeFactoryFunction

]).controller('IndexController', [
  "$state",
  "ItemFactory",
  IndexControllerFunction
])

.controller("ShowController", [
  "$state",
  "$stateParams",
  "ItemFactory",
  ShowControllerFunction
])


function RouterFunction($stateProvider){
  $stateProvider
  // .state("welcome", {
  //   url: "/",
    // templateUrl: "/assets/js/ng-views/welcome.html"
  // })

 .state('welcome', {
    url: '/',
    templateUrl: '/assets/js/ng-views/welcome.html',
    // controller: "WelcomeController",
    // controllerAs:"vm"
 })

  .state('index', {
    url: '/items',
    templateUrl: '/assets/js/ng-views/index.html',
    controller: "IndexController",
    controllerAs: "vm"
  })
 .state('show', {
   url: '/items/:name',
   templateUrl: '/assets/js/ng-views/show.html',
   controller: "ShowController",
   controllerAs: "vm"

 })


}



  // $urlRouterProvider.otherwise('/')

function ItemFactoryFunction($resource) {
  return $resource('/items/:name', {}, {
    update: {method: "PUT"}
  });
}

// function IndexFactoryFunction($resource) {
//   return $resource('/welcome/name:', {}, {
//     update: {method: "PUT"}
//   })
// }



 function IndexControllerFunction($state, ItemFactory) {
   this.items = ItemFactory.query()
  //  this.message = "show test"
  //    console.log("inside the show controller function")
  //    console.log(this.items)
 //     this.update = function() {
 //     this.item.$update({name: $stateParams.name})
 //     console.log("updating!")
 //   }
 //   this.destroy = function () {
 //     this.item.$delete({name: $stateParams.name}).then(function(){
 //     $state.go("index")
 //  //   })
 // })
}

 function ShowControllerFunction($state, $stateParams, ItemFactory) {
   this.item = ItemFactory.get({name: $stateParams.name})
 //   console.log("inside the welcome controller function")
 //   console.log(this.items)
  //  this.newItem = new ItemFactory()
  //  this.create = function () {
  //    console.log('new item')
  //    this.newItem.$save().then(function(item){
  //      $state.go("show", {name: item.name})
  //    })
  //  }
 };
