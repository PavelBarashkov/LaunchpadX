"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const BtnBack = () => {
  const router = useRouter();
  return (
    <Button
      sx={{ marginTop: 2 }}
      variant="contained"
      onClick={() => router.push("/")}
    >
      Назад
    </Button>
  );
};
