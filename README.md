# Persona-Based AI Chatbot | Scaler Academy

This project is a Next.js web application that implements three distinct AI personas (Abhimanyu Saxena, Anshuman Singh, Kshitij Mishra) using the Vercel AI SDK and Google Gemini.

## Features
- **Persona Switcher:** Seamlessly switch between three different industry leaders.
- **Dynamic System Prompts:** Each persona has a unique, deeply researched system prompt with few-shot examples and Chain-of-Thought (CoT) instructions.
- **Suggestion Chips:** Quick-start questions tailored to each persona.
- **Responsive UI:** Clean, mobile-friendly interface built with Tailwind CSS.
- **Secure Backend API:** The Gemini API key is securely stored and accessed via a Next.js API route.

## Setup Instructions

1. **Clone the repository:**
   \`\`\`bash
   git clone <YOUR_REPO_URL>
   cd genai-project
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Variables:**
   Rename \`.env.example\` to \`.env.local\` and add your Google Gemini API Key:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Update `.env.local`:
   \`\`\`env
   GOOGLE_GENERATIVE_AI_API_KEY="your_actual_api_key_here"
   \`\`\`

4. **Run the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
This project is configured to be easily deployed on Vercel. 
1. Push your code to GitHub.
2. Go to Vercel and import your repository.
3. Add the `GOOGLE_GENERATIVE_AI_API_KEY` to the Vercel Environment Variables.
4. Deploy!

## Live Demo
*Replace this with your live deployed link after deploying to Vercel/Netlify.*
[Live Project Link](https://your-deployment-link.vercel.app)

## Documentation Files
- \`prompts.md\`: Contains the annotated system prompts and product reasoning.
- \`reflection.md\`: A reflection on what worked, the GIGO principle, and future improvements.
- \`lib/personas.ts\`: The actual code implementation of the personas.
