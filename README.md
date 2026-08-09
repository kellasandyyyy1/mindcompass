# Mind Compass

Mind Compass is an educational psychology reference tool and study companion built for psychology students and educators. The application helps translate everyday human behaviors into formal clinical concepts, analyze their multi-factor origins, and test clinical knowledge through interactive quizzes.

## Core Features

### Clinical Behavior Reference Tool
* **Behavior Search**: Translates raw, everyday behavior descriptions (e.g., "washes hands continuously", "won't leave the house") into formal DSM-5 clinical concepts.
* **Tri-Origin Dissection**: Explores behavioral roots across three core dimensions:
  * **Body & Biology**: Physiological, neurochemical, and hereditary factors.
  * **Mind & Cognition**: Emotional coping styles, defense armor, and safety loops.
  * **World & Environment**: Developmental triggers, childhood circumstances, and systemic stressors.
* **Match Meter**: Illustrates diagnostic overlaps with related conditions.
* **Interpersonal Dialogue Simulation**: Models relationship communication dynamics, contrasting outer speech with internal unspoken thoughts.
* **PDF Export**: Generates structured, professional clinical analysis reports for study and citation.

### Infinite Practice Quizzes
* **Interactive Quizzes**: Generates dynamic, multi-format multiple-choice questions across different difficulty levels (Beginner, Intermediate, Advanced).
* **Diverse Question Types**: Includes scenario assessments, clinical myths vs. facts, and empathetic response selection.

### AI Chat Companion
* **Interactive Exploration**: Provides an educational chat interface to discuss cognitive patterns, wellness strategies, and reflect on psychological frameworks.

---

## Technical Stack

* **Frontend**: React, TypeScript, Vite, Tailwind CSS v4, Motion (framer-motion)
* **Backend**: Node.js, Express
* **AI Engine**: Google Gemini API (gemini-3.5-flash) for dynamic behavior categorization, chat responses, and quiz generation

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* A Google Gemini API Key

### Installation

1. Clone the repository and navigate to the project root:
   ```bash
   cd mindcompass
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=api_key_here
   ```

4. Start the development server (runs both frontend and backend):
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Educational Disclaimer

Mind Compass is an academic study companion intended for educational purposes only. It is not a diagnostic tool, does not provide medical advice or psychiatric evaluations, and does not replace professional mental health treatment or clinical consultations.
