
var admin = require("firebase-admin");
var uid = process.argv[2];

var serviceAccount = require("./angular-ionic-pawwow-firebase-adminsdk-oj2l8-50ad06bcb6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://angular-ionic-pawwow.firebaseio.com"
});

admin.auth().setCustomUserClaims(uid, { admin: true})
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit();
  })
  .catch(error => {
    console.log('error', error);
    process.exit(1);
  });