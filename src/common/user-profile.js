import {reactLocalStorage} from 'reactjs-localstorage';

var UserProfile = (function() {
  var getUser = function() {
    return reactLocalStorage.getObject('userProfile').username;
  }

  var logIn = function (username, id) {
    logOut();
    reactLocalStorage.setObject('userProfile', {
      username: username,
      id: id
    });
    window.location.reload(false);
  }

  var isLoggedIn = function() {
    return reactLocalStorage.getObject('userProfile').id && reactLocalStorage.getObject('userProfile').username;
  }

  var logOut = function() {
    reactLocalStorage.remove('userProfile');
    window.location.reload(false); 
  }

  return {
    getUser: getUser,
    logIn: logIn,
    isLoggedIn: isLoggedIn,
    logOut: logOut
  }

})();

export default UserProfile;