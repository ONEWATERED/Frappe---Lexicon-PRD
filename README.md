# ORAKLES - The Water Industry Knowledge Platform

ORAKLES is a comprehensive, modern web application designed to be an all-encompassing educational and professional networking platform for the water industry. It features a rich, interactive user experience built with React, TypeScript, and Tailwind CSS, and leverages the Google Gemini API for intelligent, AI-powered features.

![ORAKLES Lexicon Page](https://storage.googleapis.com/project-screenshots/orakles-screenshot.png)

## ✨ Features

The platform is organized into several interconnected hubs, each serving a distinct purpose:

*   **📚 Lexicon:** A dynamic dictionary of water industry terms with plain language and technical definitions, related media, and community discussions. AI is used to generate simplified explanations and real-world examples.
*   **📺 Droobi TV:** A video streaming hub (akin to Netflix) for educational content, masterclasses, and panel discussions from industry experts.
*   **🎓 Academy:** An interactive Learning Management System (LMS) featuring flashcard decks, gamified progress tracking (streaks, challenges), and structured learning pathways to earn badges and credentials. Includes an "AI Coach" for personalized learning assistance.
*   **👥 Community Hub:** A central place for professionals to connect, discuss topics in dedicated channels, find and attend events, and exchange direct messages. It also includes "ORAKLES Labs" for feature suggestions and voting.
*   **📂 Manuals Library:** A repository of interactive Operation & Maintenance (O&M) manuals for critical infrastructure assets.
*   **🌐 Ecosystem Directory:** A directory of partners, including vendors, consultants, government agencies, and academic institutions, with detailed profile pages and micro-sites.
*   **👤 Professional Profiles:** In-depth user profiles showcasing credentials, career pathways, project portfolios, skills, achievements, and a unique "Personal Knowledge Capture" system for field notes.
*   **🧠 AI Co-pilots:** A dedicated section to interact with AI agents, including a "Knowledge Avatar" for voice and text chat, and an "AI Interview Coach".
*   **🔬 Research & Innovation Hub:** A space to connect industry challenges with academic experts, featuring researcher profiles, open research opportunities, and a "Community Voice" section for suggesting content topics.
*   **✍️ Insights (Blog):** A collaborative thought leadership platform where industry experts can publish articles.
*   **📜 Public Information Protocol (PIP):** A mission-driven initiative to create an open repository of 100,000 vital water industry documents, with leaderboards to encourage contributions.
*   **💼 Job Board:** A premium job board featuring exclusive career opportunities from partner organizations.

## 🚀 Tech Stack

*   **Frontend:** [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **AI:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
*   **Video Streaming:** [HLS.js](https://hls-js.com/) for adaptive bitrate streaming.
*   **Icons:** A custom set of SVG icons.
*   **Environment:** The application is built as a modern, single-page application using ES modules and `importmap` directly in `index.html`, requiring no build step for development.

## 📁 Project Structure

The codebase is organized into a logical and scalable structure:

```
/
├── components/       # Reusable UI components (Header, VideoPlayer, Icons, etc.)
├── context/          # React Context for global state (AuthContext.tsx)
├── data.ts           # Mock data source for the entire application.
├── pages/            # Top-level components for each route/page.
│   ├── Academy/
│   ├── AIAgents/
│   ├── Community/
│   ├── DroobiTV/
│   ├── Ecosystem/
│   ├── ...and more
├── services/         # Modules for external services (geminiService.ts)
├── types.ts          # Centralized TypeScript type definitions.
├── App.tsx           # Main application component with all routing logic.
├── index.html        # The single HTML entry point.
├── index.tsx         # React application root.
├── metadata.json     # Application metadata and permissions.
└── README.md         # This file.
```

## ⚙️ Getting Started

This project is designed to run in a modern browser without a complex build setup.

### Prerequisites

1.  A modern web browser (e.g., Chrome, Firefox, Edge).
2.  A local web server to serve the files. The popular `serve` package is a good choice.
3.  A **Google Gemini API Key**.

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Set up the API Key:**
    The application is hard-coded to look for the Gemini API key in `process.env.API_KEY`. Since this is a client-side application without a build process, you need to ensure this variable is available in the browser's context when the application runs. A simple way to do this for local development is to create a new file `env.js` at the root of the project:
    
    **`env.js`**
    ```javascript
    window.process = {
      env: {
        API_KEY: 'YOUR_GEMINI_API_KEY_HERE'
      }
    };
    ```

    Then, include this script in `index.html` **before** the main application script:
    
    **`index.html`**
    ```html
    <body>
      <div id="root"></div>
      <script src="/env.js"></script> <!-- Add this line -->
      <script type="module" src="/index.tsx"></script>
    </body>
    ```
    **Note:** Do not commit your `env.js` file to version control.

3.  **Serve the project:**
    If you don't have a local server, you can use `serve`:
    ```bash
    # Install serve globally if you haven't already
    npm install -g serve

    # Run the server from the project root
    serve .
    ```

4.  **Open the application:**
    Open your browser and navigate to the local address provided by the server (e.g., `http://localhost:3000`).

## 🤖 AI Integration with Gemini

The Google Gemini API is a core part of the ORAKLES platform, enhancing the user experience with intelligent features.

*   **`services/geminiService.ts`**: This file is the central hub for all Gemini API calls.
*   **Key AI Functions:**
    *   `explainTermSimply`: Takes a technical term and its definition and asks Gemini to provide a simple, easy-to-understand explanation suitable for a beginner.
    *   `generateRealWorldExample`: Provides a practical, story-based example of a technical term in a real-world utility scenario.
    *   `getAICoachResponse`: Powers the "AI Coach" in the Academy. It answers student's follow-up questions about a specific flashcard, providing context-aware help.
    *   `getHardeepVoiceResponse`: Powers the "Hardeep" knowledge avatar, providing conversational, voice-friendly answers to user queries on utility management.

