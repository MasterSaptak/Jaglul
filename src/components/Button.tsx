import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md shadow-sm hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md";
  
  const variants = {
    primary: "bg-army-green text-white hover:bg-army-olive focus:ring-army-olive shadow-army-green/20 hover:shadow-army-green/30",
    secondary: "bg-army-red text-white hover:bg-red-700 focus:ring-army-red shadow-army-red/20 hover:shadow-army-red/30",
    outline: "border-2 border-army-green text-army-green hover:bg-army-green hover:text-white focus:ring-army-green",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 hover:shadow-red-500/30"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};