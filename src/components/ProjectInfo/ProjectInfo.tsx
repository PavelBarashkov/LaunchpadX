import React, { FC } from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import { Project } from "@/types";

interface ProjectInfoProps {
  project: Project;
}

export const ProjectInfo: FC<ProjectInfoProps> = ({ project }) => (
  <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: "auto" }}>
    <Typography
      variant="h5"
      component="h2"
      sx={{ marginBottom: 1, fontWeight: "bold" }}
    >
      {project.title}
    </Typography>
    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
      {project.description}
    </Typography>

    <Divider sx={{ marginBottom: 2 }} />

    <Box
      sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}
    >
      <Typography variant="body1">Goal:</Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {project.goal} {project.currency}
      </Typography>
    </Box>
  </Paper>
);
