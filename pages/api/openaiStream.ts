// pages/api/openaiStream.ts
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const config = {
    api: {
      bodyParser: false
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const messages = JSON.parse(req.query.messages as string);
  const payload = {
    model: "gpt-3.5-turbo-0613",
    messages: messages,
    temperature: 0.7, // Adjust these hyperparameters as needed
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150, // Adjust as needed
    stream: true,
    n: 1
  };

  const stream = await OpenAIStream(payload);

  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');

  const reader = stream.getReader();
  while (true) {
      const { value, done } = await reader.read();
      if (done) {
          res.write('data: [DONE]\n\n');
        //   res.end();
          break;
      }
      res.write(`data: ${value}\n\n`);
  }
  
}

async function OpenAIStream(payload) {
  const encoder = new TextEncoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            console.log("Done")
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      const decoder = new TextDecoder();
      for await (const chunk of res.body) {
          const stringChunk = decoder.decode(chunk);
          parser.feed(stringChunk);
      }
      
    },
  });

  return stream;
}
