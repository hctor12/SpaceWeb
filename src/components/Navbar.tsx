import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Ajustar según el tamaño del header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); // Cerrar menú móvil si está abierto
  };

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Descubrimientos", href: "#descubrimientos" },
    { name: "Fenómenos", href: "#fenomenos" },
    { name: "Galería", href: "#galeria" },
    { name: "Futuro", href: "#futuro" }
  ];

  return (
    <>
      {/* Header principal */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto z-50 transition-all duration-300 rounded-xl border ${
          scrolled
            ? "py-3 bg-space-dark/90 backdrop-blur-md shadow-lg border-white/10"
            : "py-5 bg-space-dark/90 backdrop-blur-md border-white/10"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl md:text-2xl font-display font-bold tracking-tight text-white hover:text-space-accent transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll(e, 'inicio');
            }}
          >
            <span className="text-space-accent">SPACE</span>WEB
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-space-accent transition-colors duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-space-accent after:transition-all after:duration-300 hover:after:w-full"
                onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button 
            className="hidden md:block btn-space"
            onClick={() => {
              const element = document.getElementById('descubrimientos');
              if (element) {
                const offsetTop = element.offsetTop - 100;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Explorar
          </button>

          <button 
            className="block md:hidden text-white"
            onClick={handleMenuClick}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={`fixed top-[calc(5rem+20px)] left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto z-40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="rounded-xl bg-space-dark/90 backdrop-blur-md border border-white/10 shadow-lg py-3">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-space-accent transition-colors duration-300 py-2"
                onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
              >
                {item.name}
              </a>
            ))}
            <button 
              className="btn-space w-full mt-2"
              onClick={() => {
                const element = document.getElementById('descubrimientos');
                if (element) {
                  const offsetTop = element.offsetTop - 100;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
                setIsMenuOpen(false);
              }}
            >
              EXPLORAR
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;