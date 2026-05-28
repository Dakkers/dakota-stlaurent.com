interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={`display-title text-4xl font-bold text-[var(--primary-300)] sm:text-5xl${className ? ` ${className}` : ""}`}
    >
      {children}
    </h1>
  );
}
