import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "./service/firebaseConfig";  // Correct import
import Hero from "./components/custom/Hero";

const App = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.error("User is NOT authenticated. Cannot write to Firestore.");
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // If user does not exist, add to Firestore
          await addDoc(usersRef, {
            name: user.displayName || "Gunjan",
            email: user.email,
            createdAt: new Date(),
            userId: user.uid,
          });

          console.log("User data stored in Firestore!");
        } else {
          console.log("User already exists in Firestore.");
        }
      } catch (error) {
        console.error("Error adding document:", error.code, error.message);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />
    </>
  );
};

export default App;
