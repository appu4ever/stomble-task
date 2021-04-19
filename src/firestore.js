import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCPvBGyggNtrYSlu2ut67n81ywG58ab1B0',
  authDomain: 'stomble-task.firebaseapp.com',
  projectId: 'stomble-task',
  storageBucket: 'stomble-task.appspot.com',
  messagingSenderId: '1016702450034',
  appId: '1:1016702450034:web:849559afd7a555922ac5eb',
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

const addCollectionAndDocs = async (collectionKey, docsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const document = await collectionRef.doc(docsToAdd.number).get();
  return new Promise((resolve, reject) => {
    if (document.exists) {
      reject('Document already exists');
    } else {
      collectionRef
        .doc(docsToAdd.number)
        .set({
          cardOwnerName: docsToAdd.name,
          expirationMonth: docsToAdd.month,
          expirationYear: docsToAdd.year,
          cardCVV: docsToAdd.cvv,
        })
        .then(
          () => {
            console.log(`Added document to the database`);
            resolve(true);
          },
          (err) => reject(err.message)
        );
    }
  });
};

const getCollectionsAndDocs = (collectionKey) => {
  const collectionRef = firestore.collection(collectionKey);
  let storedCardsArray = [];
  return new Promise((resolve, reject) => {
    collectionRef.get().then(
      (data) => {
        storedCardsArray = data.docs.map((doc) => doc.id);
        resolve(storedCardsArray);
      },
      (error) => reject(error)
    );
  });
};

export { firestore, addCollectionAndDocs, getCollectionsAndDocs };
