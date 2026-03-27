import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, ShieldPlus } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

function ErrorFallback({ error }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return (
    <div role="alert" style={{ color: 'red', fontSize: '0.8rem' }}>
      <p>Error rendering message part:</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'user-wrapper' : 'model-wrapper'} animate-fade-in`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'model-bubble glass-panel'}`}>
        {!isUser && (
          <div className="avatar model-avatar">
            <ShieldPlus size={18} />
          </div>
        )}
        
        <div className="message-content">
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <div className="markdown-prose">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </ErrorBoundary>
          )}
        </div>

        {isUser && (
          <div className="avatar user-avatar">
            <User size={18} />
          </div>
        )}
      </div>

      <style>{`
        .message-wrapper {
          display: flex;
          width: 100%;
          margin-bottom: 1.5rem;
        }
        .user-wrapper {
          justify-content: flex-end;
        }
        .model-wrapper {
          justify-content: flex-start;
        }
        .message-bubble {
          display: flex;
          max-width: 80%;
          gap: 1rem;
          padding: 1.25rem;
        }
        .user-bubble {
          background-color: var(--primary);
          color: white;
          border-radius: var(--radius-xl) var(--radius-xl) 0 var(--radius-xl);
          box-shadow: var(--shadow-md);
        }
        .model-bubble {
          color: var(--text-main);
          border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) 0;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .user-avatar {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
        .model-avatar {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        .message-content {
          flex: 1;
          word-break: break-word;
          line-height: 1.6;
        }
        .markdown-prose p { margin-bottom: 1rem; }
        .markdown-prose p:last-child { margin-bottom: 0; }
        .markdown-prose strong { font-weight: 600; color: var(--text-main); }
        .markdown-prose ul { padding-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-prose li { margin-bottom: 0.25rem; }
        .markdown-prose h3 { margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.125rem; }
        .markdown-prose code {
          background-color: var(--bg-color);
          padding: 0.2rem 0.4rem;
          border-radius: var(--radius-sm);
          font-family: monospace;
          font-size: 0.875em;
        }
      `}</style>
    </div>
  );
};

