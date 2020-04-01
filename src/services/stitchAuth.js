const {
  Stitch,
  AnonymousCredential,
  UserPasswordCredential,
  UserPasswordAuthProviderClient
} = require('mongodb-stitch-browser-sdk');

const APP_ID = 'todos-ipuar';

const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

// const db = app
//   .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
//   .db('todosdb');

export function registerUser({ username, password }) {
  const emailPasswordClient = app.auth.getProviderClient(
    UserPasswordAuthProviderClient.factory
  );

  return emailPasswordClient.registerWithEmail(username, password);
}

export function loginUserPasswordCredential({ username, password }) {
  const credential = new UserPasswordCredential(username, password);
  return app.auth.loginWithCredential(credential);
}

export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential();
  return app.auth.loginWithCredential(credential);
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user (if there is one)
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user (if there is one)
  const user = getCurrentUser();
  if (user) {
    return app.auth.logoutUserWithId(user.id);
  }
}

// In this example, a custom StitchAuthListener is defined and registered:
// const stitchClient = Stitch.defaultAppClient;

// Define the listener
// const myAuthListener = {
//   onUserAdded: (auth, addedUser) => {
//     console.log(auth);
//     console.log('onUserAdded:', addedUser.profile);
//   },
//   onUserLoggedIn: (auth, loggedInUser) => {
//     console.log(auth);
//     console.log('onUserLoggedIn:', loggedInUser.profile);
//   },
//   onActiveUserChanged: (auth, currentActiveUser, previousActiveUser) => {
//     console.log(auth);
//     console.log(
//       'onActiveUserChanged:',
//       currentActiveUser,
//       previousActiveUser
//     );
//   },
//   onUserLoggedOut: (auth, loggedOutUser) => {
//     console.log(auth);
//     console.log('onUserLoggedOut:', loggedOutUser.profile);
//   },
//   onUserRemoved: (auth, removedUser) => {
//     console.log(auth);
//     console.log('onUserRemoved:', removedUser.profile);
//   },
//   onUserLinked: (auth, linkedUser) => {
//     console.log(auth);
//     console.log('onUserLinked:', linkedUser.profile);
//   },
//   onListenerRegistered: auth => {
//     console.log(auth);
//     console.log('onListenerRegistered');
//   }
// };

// Register the listener
// const { auth } = stitchClient;
// auth.addAuthListener(myAuthListener);

// Console:
//   onListenerRegistered

// const user = await auth.loginWithCredential(
//   new UserPasswordCredential('user', 'password')
// );

// Console:
//   onUserAdded
//   onUserLoggedIn
//   onActiveUserChanged

// await auth.logout();

// Console:
//   onUserLoggedOut
//   onActiveUserChanged

// await auth.removeUserWithId(user.id);

// Console:
//   onUserRemoved
