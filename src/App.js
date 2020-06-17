import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App () {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository () {
    const response = await api.post('repositories', {
      title: 'My Test',
      url: 'https://github.com/wilsonmjunior/conceitos-reactjs',
      techs: ['ReactJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository (id) {
    await api.delete(`repositories/${id}`);

    const repositoriesFiltered = repositories.filter(repo => repo.id !== id);

    setRepositories(repositoriesFiltered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories?.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>
      {/* <input type="text" placeholder="Title" onChange={(e) => setRepository({ title: e.target.value })} /> */}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
