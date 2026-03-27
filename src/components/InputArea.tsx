import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `\${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-container glass-panel">
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your symptoms or medical questions here..."
          disabled={isLoading}
          rows={1}
          className="medical-textarea"
        />
        <button 
          type="submit" 
          disabled={!text.trim() || isLoading}
          className="send-button"
          aria-label="Send message"
        >
          {isLoading ? <Loader2 size={20} className="spinner" /> : <Send size={20} />}
        </button>
      </form>

      <div className="disclaimer">
        ⚠️ Dr. Rahman provides general information and does not replace professional medical advice, diagnosis, or treatment. Please always consult your physician for medical emergencies. Remember, true healing is from Allah (Ash-Shafi).
      </div>

      <style>{`
        .input-container {
          padding: 1.25rem;
          border-top: 1px solid var(--border-color);
          background-color: var(--surface-color);
        }
        .input-form {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          max-width: 48rem;
          margin: 0 auto;
          position: relative;
        }
        .medical-textarea {
          flex: 1;
          resize: none;
          max-height: 150px;
          padding: 1rem 1.25rem;
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          color: var(--text-main);
          font-family: inherit;
          font-size: 1rem;
          line-height: 1.5;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .medical-textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-light);
        }
        .medical-textarea::placeholder {
          color: var(--text-muted);
        }
        .send-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }
        .send-button:hover:not(:disabled) {
          background-color: var(--primary-hover);
          transform: scale(1.05);
        }
        .send-button:disabled {
          background-color: var(--border-color);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.7;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        .disclaimer {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 1rem;
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .input-container {
            padding: 1rem;
          }
          .input-form {
            gap: 0.75rem;
          }
          .medical-textarea {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
          }
          .send-button {
            width: 3rem;
            height: 3rem;
          }
          .disclaimer {
            font-size: 0.7rem;
            margin-top: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

