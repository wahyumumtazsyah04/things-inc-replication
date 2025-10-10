import React from "react";

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div
            className={`rounded-lg border bg-[color:var(--background)] p-6 shadow-sm transition-[transform,box-shadow] duration-300 transform-gpu hover:-translate-y-0.5 hover:shadow-md [perspective:800px] ${className}`}
        >
            <div className="[transform-style:preserve-3d] group-hover:[transform:rotateX(4deg)_rotateY(-2deg)]">
                {children}
            </div>
        </div>
    );
}
