testApp.controller('UsersCtrl', function UsersCtrl($scope, $location, User){
  var users = $scope.users = User.query();

  $scope.newUser = { name: '',  login: '', password: '', birthdate: '', phone: ''};

  $scope.createUser = function(){
    if (!isValidUser($scope.newUser)) {
      return;
    }

    User.save({ user: $scope.newUser }, function(user){
      if (user)
        users.push(user);
    });

    $scope.newUser   = { name: '',  login: '', password: '', birthdate: '', phone: ''};
    $scope.submitted = false;
  };

  // $scope.destroyTask = function(task) {
  //   task.$delete(function(){
  //     tasks.splice(tasks.indexOf(task), 1);
  //   });
  // };

  $scope.parseDate = function(jsonDate){
    var rg   = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/;
    var date = Date.parse(rg.exec(jsonDate)[0]);

    return date.toString('dd/MM/yyyy');
  };

  function isValidUser(user) {
    if( !user.name.length       ||
        !user.login.length      ||
        !user.password.length   ||
        !user.birthdate.length  ||
        !user.phone.length      ||
        !user.birthdate.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/))
      return false;
    else
      return true;
  }

});