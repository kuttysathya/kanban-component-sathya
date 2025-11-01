import React from "react";

interface AvatarProps {
  name?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, className }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className={`w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold ${className}`}>
      {initials}
    </div>
  );
};
