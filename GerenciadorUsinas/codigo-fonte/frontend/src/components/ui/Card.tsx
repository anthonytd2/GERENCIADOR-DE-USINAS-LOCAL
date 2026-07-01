import type { ReactNode } from "react";

interface CardProps {
  title: string;
  icon?: ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
  className?: string;
  children: ReactNode;
}

export function Card({
  title,
  icon,
  iconBgColor = "bg-indigo-50",
  iconTextColor = "text-indigo-600",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        {icon && (
          <div className={`p-3 rounded-2xl ${iconBgColor} ${iconTextColor}`}>
            {icon}
          </div>
        )}
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
