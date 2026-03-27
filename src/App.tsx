import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { InputArea } from './components/InputArea';
import type { Message } from './components/MessageBubble';
import { getGeminiChatSession } from './lib/gemini';
import { ChatSession } from '@google/generative-ai';
import { Activity } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Keep the chat session instance in a ref so it persists across renders
  const chatSessionRef = useRef<ChatSession | null>(null);

  useEffect(() => {
    // Initialize chat session on mount
    chatSessionRef.current = getGeminiChatSession();
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      if (!chatSessionRef.current) {
        throw new Error("Chat session not initialized");
      }

      const result = await chatSessionRef.current.sendMessage(content);
      const responseText = result.response.text();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Error calling Gemini API:', err);
      setError(err.message || 'Failed to connect to Dr. Rahman. Please check your connection and API key.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `**System Network Error**: Unfortunately, I am currently unable to access my medical database. \\n\\n*Details:* \${err.message || 'Unknown error. Please check your API key in .env.local'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    chatSessionRef.current = getGeminiChatSession();
    setError(null);
  };

  return (
    <div className="app-layout">
      {/* Background medical gradient pattern */}
      <div className="bg-pattern" />
      
      <main className="main-content">
        <Header onClearChat={handleClearChat} />
        
        {error && (
          <div className="error-banner">
            <Activity size={16} />
            <span>{error}</span>
          </div>
        )}

        <ChatContainer messages={messages} isLoading={isLoading} />
        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>

      <style>{`
        .app-layout {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          overflow: hidden;
          position: relative;
          background-color: var(--bg-color);
        }
        .bg-pattern {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at top right, rgba(13, 148, 136, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.1) 0%, transparent 40%);
          z-index: 0;
          pointer-events: none;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1200px;
          height: 100%;
          position: relative;
          z-index: 1;
          background: var(--surface-color);
          box-shadow: var(--shadow-2xl);
        }
        .error-banner {
          background-color: #7f1d1d;
          color: #fecaca;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-bottom: 1px solid #991b1b;
        }
        @media (min-width: 1200px) {
          .main-content {
            border-left: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
          }
        }
        @media (prefers-color-scheme: light) {
          .bg-pattern {
            background: radial-gradient(circle at top right, var(--primary-light) 0%, transparent 40%),
                        radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.1) 0%, transparent 40%);
          }
          .error-banner {
            background-color: #fee2e2;
            color: #b91c1c;
            border-bottom-color: #fca5a5;
          }
        }
        @media (max-width: 768px) {
          .main-content {
            max-width: 100%;
          }
          .bg-pattern {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export default App;

