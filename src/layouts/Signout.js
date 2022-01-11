import firebase from "firebase";


    const Signout = async () => {
        await firebase.auth().signOut().then(function() {
            console.log('Utilisateur Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    };

    export { Signout };

