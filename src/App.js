import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css';
import photoImage from './assets/photo.jpeg';

import Header from './components/Header'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    });
  }, []);
  // Dois parametros
  // 1. Função a executar
  // 2. Variável que, quando alterada, executará a função em 1 (array de dependencias)

  async function handleAddProject() {
    const response = await api.post('projects',{
      title: `Proj do Lipe ${Date.now()}`,
      owner: "Lipe"
      });

    const NewProject = response.data;

    setProjects([...projects, NewProject])
  }

  return (
    <>
      <Header title="Projects"/>

      <img width={500} src={photoImage}/>

      <ul>
        {projects.map(project => {
          return <li key={project.id}>{project.title}</li>
        })}
      </ul>

      <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}


export default App;