import { Project } from "@/types";
import { Box } from "@mui/material";
import React, { FC } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";

interface ProjectCardListProps {
  projects: Project[];
}

export const ProjectCardList: FC<ProjectCardListProps> = ({ projects }) => (
  <Box
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      },
    }}
  >
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </Box>
);
