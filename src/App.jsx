import './App.css';

/*
  PRUEBA TÉCNICA — Directorio de usuarios (60 min)

  API: https://jsonplaceholder.typicode.com

  PARTE 1 — Cargar usuarios
  - Al montar el componente, obtén los usuarios de /users
  - Muestra nombre y email de cada uno en la lista
  - Muestra un mensaje mientras carga y otro si ocurre un error

  PARTE 2 — Filtro
  - Haz que el input filtre la lista por nombre mientras se escribe

  PARTE 3 — Posts del usuario
  - Al hacer clic en un usuario, obtén sus posts de /posts?userId={id}
  - Muéstralos en el panel derecho (título y cuerpo)
  - Maneja también carga y error en este panel

  BONUS
  - Cancela la petición anterior si se cambia de usuario rápido
  - Extrae la lógica de peticiones a un custom hook

  Puedes consultar documentación y Google. Explica tus decisiones en voz alta.
*/

export default function App() {
  // TODO: tu código aquí

  return (
    <div className="app">
      <h1>Directorio de usuarios</h1>

      <div className="layout">
        <section className="panel">
          <input
            className="search"
            type="text"
            placeholder="Buscar por nombre"
          />

          <ul className="user-list">
            {/* TODO: renderizar usuarios. Ejemplo de un elemento:
            <li className="user">
              <strong>Nombre</strong>
              <span>email@ejemplo.com</span>
            </li>
            */}
          </ul>
        </section>

        <section className="panel">
          <h2>Posts</h2>
          <p className="hint">Selecciona un usuario para ver sus posts.</p>
          {/* TODO: renderizar posts. Ejemplo:
          <article className="post">
            <h3>Título</h3>
            <p>Cuerpo del post</p>
          </article>
          */}
        </section>
      </div>
    </div>
  );
}
