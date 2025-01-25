import { Container, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Container>
  );
};
