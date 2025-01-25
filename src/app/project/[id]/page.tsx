"use client";

import { BtnBack, Loading, ProjectInfo } from "@/components";
import { useFetching } from "@/hooks/useFetching";
import { Project } from "@/types";
import { Box, Container } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectInfoPage() {
  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams();

  const [fetchProject, loading, error] = useFetching(async () => {
    const response = await fetch(`/api/projects/${id}`);
    const data = await response.json();
    setProject(data);
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading || project === null) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <BtnBack />
      <Box>
        <ProjectInfo project={project} />
      </Box>
    </Container>
  );
}
