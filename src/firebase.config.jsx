import { initializeApp } from "firebase/app";
import { 
  collection, 
  getFirestore,
  query,
  getDocs,
  where,
  addDoc,
  doc,
  setDoc
} from "firebase/firestore"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInAnonymously,
} from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA944CMfMqiWfaR0ghLCEB2tSgzOW7XyQs",
  authDomain: "oasis-mens-group.firebaseapp.com",
  projectId: "oasis-mens-group",
  storageBucket: "oasis-mens-group.appspot.com",
  messagingSenderId: "787385569777",
  appId: "1:787385569777:web:5ea04de80b38d386ce3450"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export const checkInCollection = collection(db, "checkIn")
export const usersCollection = collection(db, "users")

//global variable for date
const date = new Date()
const LocalTime = new Date(date.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"}))
const day = LocalTime.getDate()
const month = LocalTime.getMonth() + 1
const year = LocalTime.getFullYear()

export const currentDate = `${year}-${month}-${day}`

//Sign in with Username and Password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

//registering a user
const registerUser = async (firstName, lastName, email, phone, password) => {
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await setDoc(doc(usersCollection, user.uid),{
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
      phone,
      role: "RequestingAccess",
    })
    signOut(auth)
    alert("You have requested Access")
  } catch(err) {
    console.error(err)
    alert(err.message)
  }
}

//Send password reset link to an email address
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail (auth, email)
    alert("Password reset link sent!")
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

//logout user
const logout = () => {
  signOut(auth)
  console.log("logout performed")
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithEmailAndPassword,
  registerUser,
  signInAnonymously,

}