import { useState } from "react";

export const useSubmitComment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitComment = async (comment: string) => {
    setIsLoading(true);
    try {
      console.log("Submitting comment:", comment);

      await new Promise((resolve) => setTimeout(resolve, 500));

      return { success: true, message: "Comment logged successfully" };
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmitComment, isLoading };
};
