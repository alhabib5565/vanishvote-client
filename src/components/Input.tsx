import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-12 w-full rounded-md border  bg-transparent px-3 py-1 shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50 text-[1rem] ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
