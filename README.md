# Quiz Platform


## Objective

Develop a **quiz platform** where users can attempt quizzes, get instant feedback, and track their progress


## Directory Structure

```
quiz-app/
│── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Instructions.js
│   │   ├── Question.js
│   │   ├── Quiz.js
│   │   ├── Scoreboard.js
│   ├── data/
│   │   ├── questions.js
│   ├── utils/
│   │   ├── indexedDB.js
│   ├── App.js
│   ├── index.js
│── public/
│── package.json
│── README.md
│── .gitignore
```


## Installation & Setup

1️⃣ Clone the Repository

`- git clone https://github.com/asupriya23/quiz-app.git`
`- cd quiz-app`

2️⃣ Install Dependencies

`- npm install`

3️⃣ Run the Project

`- npm start`

The app will run on http://localhost:3000.


## Live Preview

- Deployed App : https://quiz-app-anshika.vercel.app/

- Demo Video : https://drive.google.com/file/d/1pQLeJYvIgPEltlgL5831z2TDcrUPJrx0/view?usp=sharing


## Tech Stack

- **Frontend**: React.js, Bootstrap
- **Database**: IndexedDB (for storing attempt history)
- **Deployment**: Vercel / Netlify


## Features

1. Quiz Creation & Management

- Displays a list of questions from a predefined quiz.
- Allows multiple attempts.
- Saves and shows attempt history.

2. User Interaction

- Users can select answers and receive instant feedback.
- Includes timer-based quizzes (30 seconds per question).

3.  Progress Tracking

- Displays a scoreboard at the end of each quiz.

4. Bonus Features

- Saves quiz history using IndexedDB for offline storage.


## File Explanations

**📂 src/components/ (User Interface Components)**

- These files manage user interactions (e.g., displaying questions, handling answers, showing scores).

**Button.js**

- A reusable button component with styles.
- Props: children (button text), onClick (function), disabled (boolean).
- Used throughout the app for consistency.

**Instructions.js**

- Displays quiz instructions before the user starts.
- Has a start button (onStartQuiz function is triggered).

**Question.js**

- Displays each quiz question and answer choices.
- Uses conditional styling:
- Green for correct answers.
- Red for incorrect answers.

**Quiz.js**

- Core quiz logic (questions, answers, timer, skipping, score).

**Features:**

- Tracks the current question (currentQuestion state).
- Handles answer selection (handleAnswerClick).
- Implements a timer (30 seconds per question).
- Allows skipping questions (handleSkip).
- Shows feedback on whether the answer was correct.
- Saves attempts in IndexedDB.

**Scoreboard.js**

- Displays past quiz attempts from IndexedDB.
- Fetches history using getQuizHistory() from indexedDB.js.

**📂 src/data/ (Quiz Questions Data)**

**questions.js**

- Contains an array of questions and correct answers.
- Some are multiple-choice (options array), while others are integer input (only correctAnswer).

**📂 src/utils/ (Utility Functions)**

**indexedDB.js**

- Uses IndexedDB to store and retrieve quiz history.
- **Functions:**
- saveQuizAttempt(attempt): Saves a user's attempt.
- getQuizHistory(): Retrieves past attempts.
