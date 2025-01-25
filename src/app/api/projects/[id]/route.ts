import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Project } from "@/types";

const getDataFilePath = () =>
  path.join(process.cwd(), "src/app/api/db/projects.json");

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  try {
    const filePath = getDataFilePath();
    const data: Project[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const project = data.find(
      (project: Project) => parseInt(project.id) === parseInt(id!),
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error retrieving project:", error);
    return NextResponse.json(
      { error: "Failed to retrieve project" },
      { status: 500 },
    );
  }
}
