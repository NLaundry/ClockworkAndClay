// pages/api/openai.ts
import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { messages } = req.body;

  try {
    const chatCompletion = {
      model: "gpt-4",
      messages: messages,
    };

    const response = await openai.createChatCompletion(chatCompletion);

    return res.status(200).json(response.data.choices[0]?.message?.content);

  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    return res.status(500).send(error.toString());
  }
}

