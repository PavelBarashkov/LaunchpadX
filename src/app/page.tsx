"use client";

import { Project } from "@/types";
import { useEffect, useState } from "react";
import { Loading, ProjectCardList } from "../components";
import { useFetching } from "@/hooks/useFetching";
import { Box, Button, Container } from "@mui/material";
import { LinkCustom } from "@/UI";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [fetchProject, loading, error] = useFetching(async () => {
    const response = await fetch("/api/projects");
    const data = await response.json();
    setProjects(data);
  });

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <h1>Проекты</h1>
        <LinkCustom href={"/create"}>
          <Button variant="contained">Создать</Button>
        </LinkCustom>
      </Box>
      <ProjectCardList projects={projects} />
    </Container>
  );
}
