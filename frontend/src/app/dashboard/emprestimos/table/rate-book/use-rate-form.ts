import {
    RatingBookFormSchema,
    RatingBookType
} from "@/models/zod-schemas/rate-book-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useRateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RatingBookType>({
    resolver: zodResolver(RatingBookFormSchema)
  });

  return {
    register,
    handleSubmit,
    errors
  };
}
