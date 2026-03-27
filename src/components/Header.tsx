import React from 'react';
import { Stethoscope, Eraser, Activity } from 'lucide-react';

interface HeaderProps {
  onClearChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClearChat }) => {
  return (
    <header className="header glass-panel">
      <div className="header-brand">
        <div className="icon-container">
          <Stethoscope size={24} color="var(--primary)" />
        </div>
        <div>
          <h1 className="title">Dr. Rahman</h1>
          <div className="status">
            <Activity size={12} className="status-icon" color="#10b981" />
            <span>Muslim Doctor & Medical AI</span>
          </div>
        </div>
      </div>
      <button className="clear-button" onClick={onClearChat} title="Clear Conversation">
        <Eraser size={18} />
        <span>Clear</span>
      </button>

      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          z-index: 10;
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon-container {
          background: var(--primary-light);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-main);
          margin: 0;
          line-height: 1.2;
        }
        .status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.125rem;
        }
        .status-icon {
          animation: pulse 2s infinite;
        }
        .clear-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .clear-button:hover {
          background: var(--bg-color);
          color: var(--text-main);
          border-color: var(--text-muted);
        }
      `}</style>
    </header>
  );
};

