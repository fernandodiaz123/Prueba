// Versión sin custom hook: lo mínimo esperado en las partes 1 a 3
import { useEffect, useState } from 'react';
import './App.css';

const API = 'https://jsonplaceholder.typicode.com';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/users`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    const load = async () => {
      setPostsLoading(true);
      setPostsError(null);
      try {
        const res = await fetch(`${API}/posts?userId=${selectedUserId}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setPosts(await res.json());
      } catch (err) {
        setPostsError(err.message);
      } finally {
        setPostsLoading(false);
      }
    };
    load();
  }, [selectedUserId]);

  const filteredUsers = users.filter((user) =>
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

          {loading && <p className="loading">Cargando usuarios...</p>}
          {error && <p className="error">No se pudieron cargar los usuarios. Intenta de nuevo.</p>}

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
          </ul>
        </section>

        <section className="panel">
          <h2>Posts</h2>

          {!selectedUserId && <p className="hint">Selecciona un usuario para ver sus posts.</p>}
          {postsLoading && <p className="loading">Cargando posts...</p>}
          {postsError && <p className="error">No se pudieron cargar los posts.</p>}

          {!postsLoading &&
            posts.map((post) => (
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
