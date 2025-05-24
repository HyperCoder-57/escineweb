function LoginForm() {
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }
  export default LoginForm;