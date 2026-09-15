import { useState } from 'react';
import { useFetch } from './useFetch';
import './App.css';

const API = 'https://jsonplaceholder.typicode.com';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = useFetch(`${API}/users`);
  const posts = useFetch(selectedUserId ? `${API}/posts?userId=${selectedUserId}` : null);

  const filteredUsers = (users.data ?? []).filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="app">
      <h1>Directorio de usuarios</h1>

      <div className="layout">
        <section className="panel">
          <input
            className="search"
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {users.loading && <p className="loading">Cargando usuarios...</p>}
          {users.error && (
            <p className="error">No se pudieron cargar los usuarios. Intenta de nuevo.</p>
          )}

          {users.data && (
            <ul className="user-list">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className={`user ${user.id === selectedUserId ? 'selected' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </li>
              ))}
              {filteredUsers.length === 0 && <p className="hint">Sin resultados.</p>}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Posts</h2>

          {!selectedUserId && (
            <p className="hint">Selecciona un usuario para ver sus posts.</p>
          )}
          {posts.loading && <p className="loading">Cargando posts...</p>}
          {posts.error && <p className="error">No se pudieron cargar los posts.</p>}

          {!posts.loading &&
            posts.data?.map((post) => (
              <article key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </article>
            ))}
        </section>
      </div>
    </div>
  );
}
