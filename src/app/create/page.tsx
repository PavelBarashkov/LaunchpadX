"use client";

import * as React from "react";
import { Box, Container } from "@mui/material";
import { BtnBack, Form } from "@/components";

export default function FormPage() {
  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        height: "100%",
      }}
    >
      <BtnBack />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form />
      </Box>
    </Container>
  );
}
