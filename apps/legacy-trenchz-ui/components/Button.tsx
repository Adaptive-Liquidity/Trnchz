import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  size = 'md',
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
    secondary: "bg-violet-600 hover:bg-violet-500 text-white",
    danger: "bg-rose-500 hover:bg-rose-400 text-white",
    ghost: "bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700"
  };

  const glowStyles = glow ? "shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]" : "";

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};