# VoteVerse AI - Your Personal Election Companion

VoteVerse AI is a comprehensive, multi-lingual, and AI-powered web application designed to guide voters through the election process smoothly. From first-time voters to the elderly, the platform ensures that everyone has access to personalized guidance, real-time booth updates, and instant answers to their voting queries.

## Chosen Vertical
**Civic Tech / Election Assistance**
We chose to focus on the democratic process by building an intelligent assistant that lowers the barrier to voting. By providing personalized guidance, removing language barriers, and debunking election rumors, VoteVerse AI empowers citizens to exercise their right to vote with confidence.

## Approach and Logic
Our approach was to build an intelligent wrapper around the chaotic and often confusing election guidelines. The core logic relies on:
1.  **Context-Aware AI:** Utilizing Gemini 2.5 Flash to act as a 24/7 Smart Assistant that can answer specific questions based on user demographics (e.g., first-time voter, elderly).
2.  **Hyper-Localization:** Integrating Google Maps Places Autocomplete to allow users to search for their exact polling booth and get real-time directions.
3.  **Inclusivity & Accessibility:** Implementing a robust multi-language translation engine. We route standard regional languages (Hindi, Telugu, Marathi) through the reliable Google Cloud Translation API, while leveraging Gemini to provide a unique "GenZ Mode" translation to engage younger demographics.

## How the Solution Works
*   **Onboarding Wizard:** Users enter their age group, voting history, and state. This generates a `voterProfile` stored locally.
*   **Smart Assistant:** Users can chat with the AI. The backend injects their `voterProfile` into the system prompt so the AI gives tailored advice (e.g., "Since you are an NRI voter, here is form 6A...").
*   **Booth Locator:** Users can manually search for their polling booth using the Google Maps Places API and view it on an interactive map.
*   **Translation Engine:** A custom React Context (`TranslationContext`) dynamically translates UI elements based on the user's selected language. GenZ slang is mapped via a local static dictionary for instant, zero-latency translation, while other languages use Google Cloud Translate.
*   **Rumor Checker:** Users can paste viral WhatsApp forwards into the Rumor Checker, which uses Gemini AI to analyze the claim and verify its authenticity against standard election rules.

## Assumptions Made
*   **Authentication:** We assume the user prefers a frictionless experience, so we have removed mandatory login requirements. User context (voter profile) is stored in the browser's LocalStorage.
*   **API Availability:** The application assumes the presence of valid Google Maps, Google Cloud Translation, and Gemini API keys in the `.env` files.
*   **Data Accuracy:** The AI is instructed to be objective, but it relies on its training data for general election rules. Users are always prompted to verify final details with official Election Commission portals.

## Running Locally

### Prerequisites
- Node.js (v18+)
- Google Cloud Console Project with Maps JavaScript API, Places API, and Cloud Translation API enabled.
- Gemini API Key

### Setup
1. Clone the repository.
2. Navigate to the `client` directory, run `npm install`, and create a `.env` file with `VITE_GOOGLE_MAPS_API_KEY`.
3. Navigate to the `server` directory, run `npm install`, and create a `.env` file with `GEMINI_API_KEY` and `GOOGLE_TRANSLATE_API_KEY`.
4. Run `npm run dev` in both directories.

---
*Built for the Hackathon with ❤️*