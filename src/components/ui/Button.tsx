import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-black"
      : "border border-gray-300 hover:bg-gray-50";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
