import React from "react";
import { useState } from "react";

import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
    projects : Project[];
}

function ProjectList({projects : initialProjects} : ProjectListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});
    const [projects, setProjects] = useState(initialProjects);


    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    };
    const handleCancel = () => {
        setProjectBeingEdited({});
    };

    const handleSave = (project : Project) => {
        const updatedProjects = projects.map((p) => {
          return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    };

    return (
            <div className="row">
              {projects.map((project) => (
                <div key={project.id} className="cols-sm">
                  {project === projectBeingEdited ? (
                  <ProjectForm onCancel={handleCancel} onSave={handleSave} project={project}/>
                  ) : 
                  <ProjectCard project={project} onEdit={handleEdit}/>}
                </div>
              ))}
            </div>
          );
}

export default ProjectList;

