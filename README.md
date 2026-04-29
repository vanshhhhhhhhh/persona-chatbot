# Persona-Based AI Chatbot | Scaler Academy

This project is a Next.js web application that implements three distinct AI personas (Abhimanyu Saxena, Anshuman Singh, Kshitij Mishra) using the Vercel AI SDK and Hugging Face Inference API.

## Features
- **Persona Switcher:** Seamlessly switch between three different industry leaders.
- **Dynamic System Prompts:** Each persona has a unique, deeply researched system prompt with few-shot examples and Chain-of-Thought (CoT) instructions.
- **Suggestion Chips:** Quick-start questions tailored to each persona.
- **Responsive UI:** Clean, mobile-friendly interface built with Tailwind CSS.
- **Secure Backend API:** The API key is securely stored in environment variables and accessed via a Next.js API route.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vanshhhhhhhhh/persona-chatbot.git
   cd persona-chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Rename `.env.example` to `.env` and add your Hugging Face Access Token:
   ```bash
   cp .env.example .env
   ```
   Update `.env`:
   ```env
   HF_API_KEY="your_huggingface_access_token_here"
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
This project is configured to be easily deployed on Vercel.
1. Push your code to GitHub.
2. Go to Vercel and import your repository.
3. Add the `HF_API_KEY` to the Vercel Environment Variables.
4. Deploy!

## Live Demo
*Replace this with your live deployed link after deploying to Vercel/Netlify.*
[Live Project Link](https://your-deployment-link.vercel.app)

## Documentation Files
- `prompts.md`: Contains the annotated system prompts and product reasoning.
- `reflection.md`: A reflection on what worked, the GIGO principle, and future improvements.
- `lib/personas.ts`: The actual code implementation of the personas.
