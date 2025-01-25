import { useState } from "react";

export const useFetching = <T, P extends unknown[]>(
  callback: (...args: P) => Promise<T>,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetching = async (...args: P): Promise<void> => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
