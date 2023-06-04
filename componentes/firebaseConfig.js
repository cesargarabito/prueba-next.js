import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDywRPoZ4ApArpBrhx4HrIQ6hI_WX8Ethg",
  authDomain: "usuariosim-db.firebaseapp.com",
  projectId: "usuariosim-db",
  storageBucket: "usuariosim-db.appspot.com",
  messagingSenderId: "629208328937",
  appId: "1:629208328937:web:c6c192ec08b3fa91d0de78",
};

// Inicializa la conexión con Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

// Get a list of cities from your database
export async function getUsers() {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return userList;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, displayLastname, phone, birthDate, email, isAdmin } =
      userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        displayLastname,
        phone,
        birthDate,
        isAdmin,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error, "error catching user");
    }
  }
  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const deleteUser = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

export const updateUserDB = async (
  id,
  displayName,
  displayLastname,
  email,
  phone,
  birthDate,
  isAdmin,
  comment
) => {
  await updateDoc(doc(db, "users", id), {
    displayName,
    displayLastname,
    email,
    phone,
    birthDate,
    isAdmin,
    comment
  });
};

export const saveUserDB = (
  displayName,
  displayLastname,
  phone,
  birthDate,
  isAdmin,
  email
) => {
  addDoc(collection(db, "users"), {
    displayName,
    displayLastname,
    phone,
    birthDate,
    isAdmin,
    email,
  });
};

export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);

    if (userSnapShot.exists()) {
      const userData = userSnapShot.data();
      
      if (userData.isAdmin === "on") {
        return true;
      }
      return userData.isAdmin;
      
    } else {
      
      console.log("El usuario no existe");
    }
  } catch (error) {
    
    console.log("Error al obtener los datos del usuario:", error);
  }
};


