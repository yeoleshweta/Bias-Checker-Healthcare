interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative w-6 h-6">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
