
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-slate-800 bg-slate-900/30">
          {title && <h3 className="font-bold text-slate-100 font-display">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
