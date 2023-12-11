import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5uaUCvEDvqZca7ciLs9Bb6YSlKefu5mY",
  authDomain: "fanime-f0aa0.firebaseapp.com",
  projectId: "fanime-f0aa0",
  storageBucket: "fanime-f0aa0.appspot.com",
  messagingSenderId: "465604049446",
  appId: "1:465604049446:web:6db1f95708ecedb9e784e7",
  measurementId: "G-E4Q3XJ8XQB",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
