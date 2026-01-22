import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.97]";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-primary/20 focus:ring-primary",
    secondary:
      "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:ring-neutral-500",
    success: "bg-success text-white hover:opacity-90 focus:ring-success",
    danger: "bg-danger text-white hover:opacity-90 focus:ring-danger",
    outline:
      "border-2 border-primary text-primary hover:bg-primary-light focus:ring-primary",
    ghost: "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
