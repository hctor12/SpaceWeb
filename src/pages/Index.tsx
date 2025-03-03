import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SpaceSection from "@/components/SpaceSection";
import Particles from "@/Backgrounds/Particles/Particles";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import InfiniteMenu from "@/components/InfiniteMenu/InfiniteMenu";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import DecayCard from "@/components/DecayCard/DecayCard";
import SpotlightBorderCard from "@/components/SpotlightBorderCard/SpotlightBorderCard";
import ImageTrail from "@/Animations/ImageTrail/ImageTrail";
import ReactDOM from "react-dom";
import SplitText from "@/TextAnimations/SplitText/SplitText";

const Index = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState("");
  
  // Referencias para las secciones con animación al scroll
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const imageTrailRef = useRef<HTMLDivElement>(null);
  const [isImageTrailVisible, setIsImageTrailVisible] = useState(false);
  const [imageTrailKey, setImageTrailKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    // Crear estrellas dinámicamente
    if (starsRef.current) {
      const starsContainer = starsRef.current;
      const numberOfStars = 150;
      
      starsContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        
        starsContainer.appendChild(star);
      }
    }
    
    // Añadir efectos de meteoro ocasionales
    const createMeteor = () => {
      if (!starsRef.current) return;
      
      const meteor = document.createElement('div');
      const size = Math.random() * 3 + 2;
      const speedFactor = Math.random() * 0.5 + 0.5;
      const duration = (Math.random() * 2 + 3) / speedFactor;
      
      meteor.className = 'absolute bg-space-meteor opacity-70 rounded-full';
      meteor.style.width = `${size}px`;
      meteor.style.height = `${size * 10}px`;
      meteor.style.top = `${Math.random() * 50}%`;
      meteor.style.left = `${Math.random() * 20}%`;
      meteor.style.transform = 'rotate(45deg)';
      meteor.style.boxShadow = '0 0 20px 2px rgba(255, 94, 91, 0.5)';
      meteor.style.animation = `meteor ${duration}s linear`;
      meteor.style.filter = 'blur(1px)';
      
      starsRef.current.appendChild(meteor);
      
      setTimeout(() => {
        if (meteor && meteor.parentNode) {
          meteor.parentNode.removeChild(meteor);
        }
      }, duration * 1000);
    };
    
    const meteorInterval = setInterval(createMeteor, 3000);
    
    // Detectar secciones activas al hacer scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.5;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.id || `section-${index}`;

        if (
          scrollPosition >= sectionTop && 
          scrollPosition < sectionTop + sectionHeight
        ) {
          setCurrentSection(sectionId);
          
          // Actualizar todos los elementos con la clase 'reveal' dentro de esta sección
          const revealElements = section.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
          revealElements.forEach(el => {
            el.classList.add('active');
          });
          
          // Aplicar efecto parallax a los fondos
          const parallaxElements = section.querySelectorAll('.parallax');
          const scrollRatio = (scrollPosition - sectionTop) / sectionHeight;
          
          parallaxElements.forEach((el: Element) => {
            const element = el as HTMLElement;
            const speed = parseFloat(element.dataset.speed || '0.1');
            const yPos = -(scrollRatio * speed * 100);
            element.style.transform = `translateY(${yPos}px)`;
          });
          
        } else if (scrollPosition < sectionTop) {
          // O: ocultar elementos cuando se desplaza hacia arriba
           const revealElements = section.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
           revealElements.forEach(el => {
             el.classList.remove('active');
           });
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar elementos reveal cuando la página carga
    setTimeout(() => {
      handleScroll();
    }, 200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(meteorInterval);
    };
  }, []);
  
  // Referencia a las secciones para las animaciones de scroll
  useEffect(() => {
    // Resetear referencias
    sectionRefs.current = [];
    
    // Seleccionar todos los elementos de sección
    const sections = document.querySelectorAll('section');
    
    // Actualizar referencias
    sections.forEach((section, i) => {
      sectionRefs.current[i] = section;
      
      // Asignar ID si no existe
      if (!section.id) {
        section.id = `section-${i}`;
      }
    });
  }, []);

  useEffect(() => {
    if (!imageTrailRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Limpiar cualquier timeout pendiente
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          if (entry.isIntersecting) {
            // Primero ocultar y resetear
            setIsImageTrailVisible(false);
            setImageTrailKey(prev => prev + 1);
            
            // Pequeño delay antes de mostrar de nuevo
            timeoutRef.current = setTimeout(() => {
              setIsImageTrailVisible(true);
            }, 100);
          } else {
            // Al salir de la vista, ocultar y resetear después de un delay
            setIsImageTrailVisible(false);
            timeoutRef.current = setTimeout(() => {
              setImageTrailKey(prev => prev + 1);
            }, 300); // Delay para asegurar que la animación de fade out termine
          }
        });
      },
      { 
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '100px 0px'
      }
    );

    observer.observe(imageTrailRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsImageTrailVisible(false);
      setImageTrailKey(prev => prev + 1);
    };
  }, []);

  const galleryImages = [
    {
      src: "https://cdn.eso.org/images/screen/eso0905a.jpg",
      title: "Nebulosa Carina",
      description: "Una de las nebulosas más grandes y brillantes del cielo nocturno."
    },
    {
      src: "https://img2.rtve.es/i/?w=1600&i=1522754810418.jpg",
      title: "Vía Láctea",
      description: "Nuestra galaxia espiral, hogar de más de 100 mil millones de estrellas y nuestro Sistema Solar."
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Messier51.jpg/1200px-Messier51.jpg",
      title: "Galaxia del Remolino",
      description: "Una espectacular galaxia espiral interactuando con su galaxia compañera."
    },
    {
      src: "https://cdn.eso.org/images/screen/eso2105a.jpg",
      title: "Agujero Negro",
      description: "Imagen histórica del agujero negro supermasivo en M87."
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/800px-Crab_Nebula.jpg",
      title: "Nebulosa del Cangrejo",
      description: "Remanente de una supernova observada por astrónomos chinos en 1054."
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/13/M57_The_Ring_Nebula.JPG",
      title: "Nebulosa del Anillo",
      description: "Una espectacular nebulosa planetaria captada por el telescopio James Webb."
    },
    {
      src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D``",
      title: "Nebulosa de la Burbuja",
      description: "Una enorme burbuja de gas ionizado soplada por vientos estelares masivos."
    },
    {
      src: "https://cdn.eso.org/images/large/tarantula.jpg",
      title: "Nebulosa de la Tarántula",
      description: "La región de formación estelar más grande del Grupo Local."
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg",
      title: "Galaxia del Sombrero",
      description: "Una galaxia espiral vista de canto con su distintivo bulbo central."
    }
  ];

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
  };

  return (
    <div className="min-h-screen bg-space-dark text-white overflow-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section 
          id="inicio" 
          className={`relative min-h-[100vh] flex items-center overflow-visible ${currentSection === 'inicio' ? 'section-active' : ''}`}
        >
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-[2] py-20">
            <div className="w-full md:w-1/2 pt-20 md:pt-0 reveal-left">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-space-accent/10 text-space-accent rounded-full mb-4">
                DESCUBRE EL UNIVERSO
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Explora los misterios del <span className="text-gradient">espacio</span>
              </h1>
              <div className="text-lg text-white/80 mb-8 max-w-lg reveal delay-200">
                <SplitText
                  text="Sumérgete en una experiencia visual por los confines del espacio, descubriendo galaxias, estrellas y fenómenos cósmicos que desafían nuestra comprensión del universo."
                  tag="p"
                  className="leading-relaxed"
                />
              </div>
              <div className="flex flex-wrap gap-4 reveal delay-300">
                <a 
                  href="#descubrimientos" 
                  className="btn-space"
                  onClick={(e) => handleSmoothScroll(e, 'descubrimientos')}
                >
                  Explorar el universo
                </a>
                <a 
                  href="#galeria" 
                  className="px-6 py-3 rounded-md border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/5"
                  onClick={(e) => handleSmoothScroll(e, 'galeria')}
                >
                  Ver galería
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-12 md:mt-0 perspective reveal-right">
              <div className="relative preserve-3d animate-float parallax overflow-visible" data-speed="0.05">
                <div className="relative overflow-hidden h-[450px] flex items-center justify-center p-8">
                  <TiltedCard
                    imageSrc="https://images.unsplash.com/photo-1540198163009-7afda7da2945?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    altText="Planeta Tierra visto desde el espacio"
                    captionText="La Tierra, nuestro hogar en el cosmos"
                    containerHeight="380px"
                    containerWidth="100%"
                    imageHeight="380px"
                    imageWidth="100%"
                    showMobileWarning={false}
                    showTooltip={false}
                    scaleOnHover={1.02}
                    rotateAmplitude={10}
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-space-accent/20 backdrop-blur-sm animate-pulse-glow"></div>
                <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-space-nebula/30 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator - oculto en móvil */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
            <span className="text-xs text-white/60 mb-2">Desplaza para explorar</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
            </div>
          </div>
          
          {/* Decorative elements - ahora con overflow-visible */}
          <div className="absolute inset-0 overflow-visible z-[1] pointer-events-none">
            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        </section>
        
        {/* Exploración Section */}
        <SpaceSection
          id="descubrimientos"
          title="Explorando el Universo"
          subtitle="DESCUBRIMIENTOS"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Galaxias Distantes",
                description: "Extensas colecciones de estrellas, gas y polvo que se extienden por millones de años luz, formando los bloques fundamentales del universo.",
                icon: "🌌"
              },
              {
                title: "Nebulosas Cósmicas",
                description: "Nubes de gas y polvo donde nacen nuevas estrellas y sistemas planetarios.",
                icon: "✨"
              },
              {
                title: "Agujeros Negros",
                description: "Los objetos más densos y misteriosos que desafían las leyes de la física.",
                icon: "🕳️"
              }
            ].map((item, index) => (
              <SpotlightCard 
                key={index}
                className="reveal glass-card p-6 transition-all duration-300 hover:translate-y-[-5px]"
                spotlightColor="rgba(76, 158, 232, 0.15)"
              >
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-space-accent/20 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </SpaceSection>
        
        {/* Fenómenos Cósmicos Section */}
        <SpaceSection
          id="fenomenos"
          title="Fenómenos Cósmicos"
          subtitle="MARAVILLAS DEL ESPACIO"
          direction="right"
          dark={true}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 reveal-left">
              <div className="relative">
                <DecayCard
                  width={window.innerWidth < 768 ? 350 : 600}
                  height={window.innerWidth < 768 ? 250 : 400}
                  image="https://s1.elespanol.com/2023/03/14/actualidad/748435979_231645189_1280x1280.jpg"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 reveal-right">
              <h3 className="text-2xl font-display font-semibold mb-4 text-white">Supernovas: El Espectáculo Final de una Estrella</h3>
              <p className="text-white/70 mb-6 reveal delay-100">
                Cuando una estrella masiva llega al final de su vida, explota en un evento catastrófico conocido como supernova. 
                Este fenómeno libera más energía en unos segundos que lo que nuestro Sol emitirá en toda su existencia.
              </p>
              <div className="space-y-4">
                {[
                  "Generan elementos pesados del universo",
                  "Pueden brillar más que galaxias enteras",
                  "Aceleran partículas a velocidades cercanas a la luz"
                ].map((fact, index) => (
                  <div key={index} className="flex items-start reveal delay-200" style={{ transitionDelay: `${0.2 + index * 0.1}s` }}>
                    <div className="mr-3 mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-space-accent/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-space-accent"></div>
                    </div>
                    <p className="text-white/80">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpaceSection>
        
        {/* Galería Section */}
        <SpaceSection
          id="galeria"
          title="Galería"
          subtitle="IMÁGENES DEL UNIVERSO"
          className="overflow-hidden"
        >
          <div className="h-[600px] w-full">
            <InfiniteMenu 
              items={galleryImages.map(img => ({
                image: img.src,
                title: img.title,
                description: "",
                link: "#"
              }))}
            />
          </div>
        </SpaceSection>
        
        {/* Tecnología Espacial */}
        <SpaceSection
          id="futuro"
          title="Tecnología Espacial"
          subtitle="EXPLORANDO EL FUTURO"
          direction="right"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpotlightBorderCard className="glass-card">
              <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.theconversation.com/files/438410/original/file-20211220-21-1hk1e85.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C5184%2C2592&q=45&auto=format&w=1356&h=668&fit=crop" 
                  alt="Telescopio espacial"
                  className="w-full h-full object-cover parallax"
                  data-speed="0.08"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-white">Telescopios de Nueva Generación</h3>
              <p className="text-white/70">
                Los nuevos telescopios espaciales nos permiten observar el universo con un detalle sin precedentes, 
                revelando los secretos de galaxias distantes y exoplanetas potencialmente habitables.
              </p>
            </SpotlightBorderCard>
            
            <SpotlightBorderCard className="glass-card">
              <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://technetics.com/wp-content/uploads/2021/04/Mars-Perseverence-Rover1-scaled.jpg" 
                  alt="Nave espacial perseverence"
                  className="w-full h-full object-cover parallax"
                  data-speed="0.12"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-white">Naves de Exploración Interplanetaria</h3>
              <p className="text-white/70">
                Las misiones robóticas actuales exploran nuestro sistema solar, recolectando datos sobre planetas, 
                lunas y asteroides que nos ayudan a comprender mejor nuestros orígenes cósmicos.
              </p>
            </SpotlightBorderCard>
          </div>
        </SpaceSection>
        
        {/* EI Section */}
        <section className="relative overflow-hidden">
          <div className="border-t border-white/5"></div>
          
          {/* Contenido con padding uniforme */}
          <div className="py-20">
            {/* Contenido */}
            <div className="relative z-[2]">
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-space-accent/10 text-space-accent rounded-full mb-4 reveal">
                  EXPERIENCIA INTERACTIVA
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white reveal delay-100">
                  Descubre el <span className="text-gradient">espacio</span> en movimiento
                </h2>
                <p className="text-lg text-white/80 reveal delay-200 max-w-3xl mx-auto px-6">
                  Mueve el cursor para revelar las maravillas del universo en una experiencia visual única.
                </p>
              </div>
            </div>

            {/* ImageTrail capa */}
            <div 
              ref={imageTrailRef}
              className="absolute inset-0 z-[3]"
              style={{ 
                opacity: isImageTrailVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              {isImageTrailVisible && (
                <ImageTrail 
                  key={imageTrailKey}
                  items={[
                    "https://imgs.search.brave.com/-mjH-zuHCCYHixHFvH8BLXglwYwlxOqfmbQNSUnbhD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDYx/MjY5NjU1L2VzL2Zv/dG8vbS0zMS10aGUt/YW5kcm9tZWRhLWdh/bGF4eS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9UnhWZmdF/X3dIalZhMHE3LXJo/LUVoLXpIREFMaUdU/bUZrZ1pmY2wyNjNR/OD0",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/300px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
                    "https://imgs.search.brave.com/sxtvnv66RijaJLKbjkf97gBIH4xQzqFUZelnVx-GcQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMi5h/YmNzdGF0aWNzLmNv/bS9hYmMvd3d3L211/bHRpbWVkaWEvY2ll/bmNpYS8yMDIyLzEw/LzIwL3BpbGFyZXMt/Y3JlYWNpb24tUkF5/OEZ6dm5kZDdMMWNY/U040TjlNVU0tMTI0/MHg3NjhAYWJjLmpw/Zw",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Heic1401a-Abell2744-20140107.jpg/250px-Heic1401a-Abell2744-20140107.jpg",
                    "https://imgs.search.brave.com/s0qpPJDKV4bf6dclhqujsI3HaRtaIf1hdqTH2q5QPQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXV0b3Bpc3RhLmVz/L3VwbG9hZHMvczEv/MTAvMjEvMzIvOTAv/bGEtZ3Jhbi1tYW5j/aGEtcm9qYS1hYmFy/Y2EtdW5hLXJlZ2lv/bi1kZS1sYS1hdG1v/c2ZlcmEtZGUtanVw/aXRlci1kZS1tYXMt/ZGUtMTYtMDAwLWtp/bG9tZXRyb3MuanBl/Zw"
                  ]}
                  variant={1}
                />
              )}
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-space-dark border-t border-white/5 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-display font-bold tracking-tight text-white">
                <span className="text-space-accent">SPACE</span>WEB
              </h2>
              <p className="text-sm text-white/60 mt-2">
                Explorando los confines del universo
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center md:justify-start w-full md:w-auto">
              {[
                { name: "Inicio", href: "#inicio" },
                { name: "Descubrimientos", href: "#descubrimientos" },
                { name: "Fenómenos", href: "#fenomenos" },
                { name: "Galería", href: "#galeria" },
                { name: "Futuro", href: "#futuro" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-space-accent transition-colors duration-300"
                  onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-8 pt-8 text-center">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} SpaceWeb. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
