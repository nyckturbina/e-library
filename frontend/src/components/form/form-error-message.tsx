import { FieldError } from "react-hook-form";

interface FormErrorMessageProps {
  error?: FieldError;
  className?: string;
}

export default function FormErrorMessage({
  error,
  className
}: FormErrorMessageProps) {
  if (!error) return null;
  
  return <p className={`text-red-500 mb-2 ${className}`}>{error.message}</p>;
}
