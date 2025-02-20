const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDatabase", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("quizResults")) {
          const objectStore = db.createObjectStore("quizResults", { keyPath: "id", autoIncrement: true });
          objectStore.createIndex("date", "date", { unique: false });
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject("Error opening database: " + event.target.error);
      };
    });
  };
  
  export const saveQuizResult = async (quizResult) => {
    try {
      const db = await openDB();
      const transaction = db.transaction("quizResults", "readwrite");
      const store = transaction.objectStore("quizResults");
  
      quizResult.date = new Date().toISOString();
  
      const request = store.add(quizResult);
  
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve("Quiz result saved successfully.");
        request.onerror = () => reject("Error saving quiz result.");
      });
    } catch (error) {
      console.error("IndexedDB error:", error);
    }
  };
  
  export const getQuizHistory = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction("quizResults", "readonly");
      const store = transaction.objectStore("quizResults");
  
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error retrieving quiz history.");
      });
    } catch (error) {
      console.error("IndexedDB error:", error);
    }
  };
  