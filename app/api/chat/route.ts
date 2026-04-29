import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { personas, PersonaId } from '@/lib/personas';

export const maxDuration = 30;

const huggingface = createOpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_API_KEY,
});

function cleanMessages(messages: UIMessage[]): UIMessage[] {
  return messages
    .filter((m) => m.id !== 'welcome')
    .map((m) => ({
      ...m,
      parts: m.parts?.map((p) => {
        if (p.type === 'text') {
          return { type: 'text' as const, text: p.text };
        }
        return p;
      }),
    }));
}

export async function POST(req: Request) {
  try {
    const { messages, personaId } = await req.json();

    if (!personaId || !personas[personaId as PersonaId]) {
      return new Response('Invalid persona selected.', { status: 400 });
    }

    const selectedPersona = personas[personaId as PersonaId];

    const cleaned = cleanMessages(messages as UIMessage[]);
    const modelMessages = await convertToModelMessages(cleaned);

    const result = streamText({
      model: huggingface('meta-llama/Llama-3.1-8B-Instruct'),
      system: selectedPersona.systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('API Chat Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate a response. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
