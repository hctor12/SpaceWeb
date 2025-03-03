import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from 'react';
import gsap from 'gsap';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    const links = document.querySelectorAll("a, button");
    let initCursor = false;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        cursor?.classList.add("custom-cursor--link");
      });
      link.addEventListener("mouseout", () => {
        cursor?.classList.remove("custom-cursor--link");
      });
    });

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!initCursor) {
        gsap.to(cursor, {
          duration: 0.3,
          opacity: 1
        });
        initCursor = true;
        // Inicializar posición
        cursorX = mouseX;
        cursorY = mouseY;
      }
    });

    // Función de animación
    const animate = () => {
      if (initCursor) {
        cursorX += (mouseX - cursorX) * 0.08;
        cursorY += (mouseY - cursorY) * 0.08;

        gsap.set(cursor, {
          top: cursorY + "px",
          left: cursorX + "px",
          ease: "power2.out"
        });
      }
      requestAnimationFrame(animate);
    };

    animate(); // Iniciar loop de animación

    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) {
        gsap.to(cursor, {
          duration: 0.3,
          opacity: 0
        });
        initCursor = false;
      }
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseover", () => {});
        link.removeEventListener("mouseout", () => {});
      });
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mouseout", () => {});
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="custom-cursor"></div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
