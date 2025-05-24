function MovieList() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Película Ejemplo</h3>
          <p className="text-sm">Sinopsis...</p>
        </div>
      </div>
    );
  }
  export default MovieList;