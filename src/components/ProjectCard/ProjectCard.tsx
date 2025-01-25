import { LinkCustom } from "@/UI";
import { Project } from "@/types";
import { Paper } from "@mui/material";
import { FC } from "react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Paper elevation={3} key={project.id} sx={{ p: 2 }}>
      <LinkCustom href={`/project/${project.id}`}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </LinkCustom>
    </Paper>
  );
};

export default ProjectCard;
