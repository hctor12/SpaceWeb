import { ReactNode } from "react";

interface SpaceSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  dark?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  id?: string;
}

const SpaceSection = ({
  title,
  subtitle,
  children,
  className = "",
  direction = "left",
  dark = false,
  onEnter,
  onLeave,
  id,
}: SpaceSectionProps) => {
  return (
    <section
      id={id}
      className={`relative py-20 scroll-mt-28 ${
        dark ? "bg-space-dark" : "bg-space-dark"
      } ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="section-highlight"></div>
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col ${
            direction === "right" ? "items-end text-right" : "items-start"
          } mb-12`}
        >
          {subtitle && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-space-accent/10 text-space-accent rounded-full mb-3 reveal">
              {subtitle}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white reveal">
            {title}
          </h2>
          <div className="w-20 h-1 bg-space-accent rounded-full reveal delay-100"></div>
        </div>
        <div
          className={`animate-${
            direction === "right" ? "fade-in-left" : "fade-in-right"
          }`}
        >
          {children}
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-space-accent/10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: `blur(${Math.random() * 50 + 30}px)`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SpaceSection;
