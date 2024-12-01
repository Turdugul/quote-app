import { useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firestore instance
import { seedQuotes } from "../data/seedquotes";


const SeedQuotes: React.FC = () => {
  useEffect(() => {
    const addSeedQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quotes"));
        if (querySnapshot.empty) {
          seedQuotes.forEach(async (quoteData) => {
            await addDoc(collection(db, "quotes"), quoteData);
          });
          console.log("Seed quotes added.");
        }
      } catch (e) {
        console.error("Error seeding quotes: ", e);
      }
    };

    addSeedQuotes();
  }, []);

  return null; 
};

export default SeedQuotes;
