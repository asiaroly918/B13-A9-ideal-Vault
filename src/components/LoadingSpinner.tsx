interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingSpinner({ fullPage = false, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  };

  if (fullPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">💡</span>
          </div>
        </div>
        {text && <p className="text-base-content/60 text-sm font-medium animate-pulse">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <span className={`loading loading-spinner ${sizeClasses[size]} text-violet-600`}></span>
      {text && <p className="text-sm text-base-content/60">{text}</p>}
    </div>
  );
}
