import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Project } from "@/types";

type NewProject = Omit<Project, "id">;

const getDataFilePath = () =>
  path.join(process.cwd(), "src/app/api/db/projects.json");

export async function GET() {
  const filePath = getDataFilePath();
  const data: Project[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const newProject: NewProject = await request.json();

    if (!newProject || !newProject.title || !newProject.description) {
      return new Response(JSON.stringify({ error: "Invalid project data" }), {
        status: 400,
      });
    }

    const filePath = getDataFilePath();
    const data: Project[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const newId = data.length
      ? Math.max(...data.map((p) => Number(p.id))) + 1
      : 1;
    const updatedData: Project[] = [
      ...data,
      { id: String(newId), ...newProject },
    ];

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

    return new Response(JSON.stringify({ id: newId, ...newProject }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
    });
  }
}
