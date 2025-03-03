import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-space-accent mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
          Página no encontrada
        </h2>
        <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto">
          La página que estás buscando parece haberse perdido en el espacio profundo.
        </p>
        <Link 
          to="/" 
          className="btn-space inline-flex items-center"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
