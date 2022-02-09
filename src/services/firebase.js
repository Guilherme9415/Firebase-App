import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCqLVShCYp4GUliao9KRzcMiC6PGhghJPY",
  authDomain: "tarefas-1302f.firebaseapp.com",
  databaseURL: "https://tarefas-1302f-default-rtdb.firebaseio.com",
  projectId: "tarefas-1302f",
  storageBucket: "tarefas-1302f.appspot.com",
  messagingSenderId: "956399490672",
  appId: "1:956399490672:web:6c72e5409094b6da06c6b5"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
} 

export default firebase;