import React from 'react';
import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import Hello from './Hello';

function App() {
  return (
    <div className="container">
      <ProjectsPage />
      {/* <Hello name = "somu" enthusiasmLevel = {2}/> */}
    </div>
  );
}

export default App;
