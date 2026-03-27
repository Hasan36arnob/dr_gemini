import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import type { Message } from './MessageBubble';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🩺</div>
          <h2 className="empty-state-title">Welcome to Dr. Rahman</h2>
          <p className="empty-state-subtitle">
            Assalamu Alaikum! I am a Muslim doctor and AI medical advisor. Please describe your symptoms or ask a medical question. 
            Remember, I provide educational information, not professional medical diagnosis. True healing comes from Allah (Ash-Shafi).
          </p>
        </div>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="typing-indicator-wrapper">
              <div className="typing-indicator glass-panel">
                <span></span>
                <span></span>
                <span></span>
                <span className="typing-text">Dr. Rahman is analyzing...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} className="scroll-anchor" />
        </div>
      )}

      <style>{`
        .chat-container {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          scroll-behavior: smooth;
        }
        .message-list {
          display: flex;
          flex-direction: column;
          max-width: 48rem;
          margin: 0 auto;
          width: 100%;
        }
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-width: 32rem;
          margin: 0 auto;
          color: var(--text-muted);
          animation: fadeIn 0.6s ease-out;
        }
        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.8;
          animation: float 4s ease-in-out infinite;
        }
        .empty-state-title {
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .empty-state-subtitle {
          line-height: 1.6;
        }
        .scroll-anchor {
          height: 1rem;
        }
        
        .typing-indicator-wrapper {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 1.5rem;
          animation: fadeIn 0.3s ease-in;
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) 0;
          color: var(--text-muted);
        }
        .typing-indicator span:not(.typing-text) {
          width: 0.5rem;
          height: 0.5rem;
          background-color: var(--primary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        .typing-text {
          margin-left: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

