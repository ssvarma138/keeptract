import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps{
    project : Project;
    onSave : (project : Project) => void;
    onCancel : () => void ;
}

function ProjectForm({onCancel, onSave, project : initialProject} : ProjectFormProps) {
   const [project, setProject] = useState(initialProject);
   const [errors, setErrors] = useState({name : '', description : '', budget : ''});

   function validate(project : Project) {
      let errors : any = {name:'', description: '', budget:''};
      if (project.name.length === 0) {
         errors.name = 'Name is required';
      } else if (project.name.length > 0 && project.name.length <3) {
         errors.name = 'Name should be atleast 3 characters';
      }
      if (project.description.length === 0) {
         errors.description = 'Description is required';
      }
      if (project.budget === 0) {
         errors.budget = 'Budget should be more than $0';
      }
      return errors;
   }

   function isValid() {
      return errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0;
   }

    const handleCancelClick = () => {
       onCancel();
    };

    const handleSubmit = (event : SyntheticEvent) => {
       event.preventDefault();
       if (!isValid()) return;
       onSave(project);
    };

    const handleChange = (event : any) => {
        const {type, name, value, checked} = event.target;
        let updatedValue = type === 'checkbox' ? checked : value;
        if (type === 'number') {
         updatedValue = Number(updatedValue);
        }
        const change = {
         [name] : updatedValue
        }
        let updatedProject : Project;
        setProject((p) => {
         updatedProject = new Project({...p, ...change});
         return updatedProject;
        })
        setErrors(() => validate(updatedProject));

    };
     
    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
           <label htmlFor="name">Project Name</label>
           <input 
           type="text" 
           name="name" 
           value={project.name}
           placeholder="enter name"
           onChange={handleChange} 
           />
           <br />
           {errors.name.length > 0 && (<div className="card error">{errors.name}</div>)}
           <label htmlFor="description">Project Description</label>
           <textarea 
           name="description" 
           value={project.description}
           placeholder="enter description" 
           onChange={handleChange}
           />
           <br />
           {errors.description.length > 0 && (<div className="card error">{errors.description}</div>)}
           <label htmlFor="budget">Project Budget</label>
           <input 
           type="number" 
           name = "budget" 
           value={project.budget}
           placeholder="enter budget" 
           onChange={handleChange}
           />
           <br />
           {errors.budget.length > 0 && (<div className="card error">{errors.budget}</div>)}
           <label htmlFor="isActive">Active?</label>
           <input 
           type="checkbox" 
           name="isActive"
           checked={project.isActive}
           onChange={handleChange} 
           />

           <div className="input-group"> 
              <button className="primary bordered medium" type="submit">Save</button>
              <span></span>
              <button type="button" className="bordered medium" onClick={handleCancelClick}>Cancel</button>
           </div>
        </form>
    );
}

export default ProjectForm;