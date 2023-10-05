'use client';
import { useState } from 'react';
import { Message, useChat } from 'ai/react';

export default function Chat({ poemText }) {
    const { messages, input, handleInputChange, handleSubmit} = useChat({ api: '../api/LLMService', initialMessages: generatePromptForSection(poemText) });
    const displayMessages = messages?.slice(1)

  function generatePromptForSection(sectionText: string) {
    const prompt = `I am creating an interactive art piece on a website that uses chatGPT. 

    You will write as if you are an art curator at a museum in the distant future. In this future, humans and AI have merged. AI became more human-like as it became embodied in mechanical bodies and humans implanted more digital components becoming more AI-like until they were indistinguishable - a new singular species. The museum is dedicated to human art about AI. I will give you one poem at a time, and you will come up with an approximately 100 word story and critique in the style of museum art curators about the poems given this hypothetical history. The user may ask questions, and you will response if prompted. 
    
    Here is the first poem.
    
    POEM: ${sectionText}
    
    
    YOU MUST STAY IN CHARACTER AT ALL TIMES and respond to all further prompts as the curator unless the prompt is preceded by POEM: STICK TO approximately 100 word responses`
    const initialMessage : Message[] = [{ id: 'something', role: 'user', content: prompt}]
    return initialMessage;
  }


return (
    <main className="max-w-2xl mx-auto p-8 flex-col bg-stone-100 rounded-lg shadow-lg">
        <section className="h-[30vh] overflow-y-scroll mb-4 p-4 bg-white rounded-lg shadow-inner">
            {displayMessages.map(m => (
                <div className="mb-4" key={m.id}>
                    <span className={m.role === 'user' ? 'text-red-500' : 'text-amber-700'}>
                        {m.role === 'user' ? 'You: ' : 'Curator: '}
                    </span>
                    {m.content}
                </div>
            ))}
        </section>
        <form className="flex space-x-4 mt-4" onSubmit={handleSubmit}>
            <input
                className="flex-grow rounded-md p-2 text-black border-2 border-stone-300"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask the Curator About this piece"
            />
            <button
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                type="submit"
            >
                Chat
            </button>
        </form>
    </main>
);
}

