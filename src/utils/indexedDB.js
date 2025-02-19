import { openDB } from 'idb';

const DB_NAME = "QuizDB";
const STORE_NAME = "QuizHistory";

export async function saveQuizAttempt(attempt) {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        },
    });
    await db.add(STORE_NAME, attempt);
}

export async function getQuizHistory() {
    const db = await openDB(DB_NAME, 1);
    return db.getAll(STORE_NAME);
}
