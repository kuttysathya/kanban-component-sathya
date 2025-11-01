import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-3 py-2 rounded-lg text-sm font-medium transition-all focus:ring-2 focus:ring-blue-500",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
