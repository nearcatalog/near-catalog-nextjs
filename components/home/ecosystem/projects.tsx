import { useState, useEffect, useRef } from "react";
import Project from "./project";

interface EcosystemProjectsProps {
  projects: string[];
}

export default function EcosystemProjects({
  projects,
}: EcosystemProjectsProps) {
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // For drag functionality
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize shadows on mount
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.pageX - container!.offsetLeft;
      scrollLeftRef.current = container!.scrollLeft;
      container!.classList.add("no-select");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container!.offsetLeft;
      const walk = (x - startXRef.current) * 2; // Adjust scrolling speed
      container!.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container!.classList.remove("no-select");
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        container!.classList.remove("no-select");
      }
    };

    if (container) {
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isDragging]);

  return (
    <div className="relative mb-24 w-full rounded-b-lg bg-black/80 px-6 py-10 backdrop-blur-sm">
      <div
        className={`scroll-shadow left ${showLeftShadow ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`scroll-shadow right ${showRightShadow ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className="no-scrollbar relative flex cursor-grab items-stretch gap-6 overflow-x-auto"
        ref={scrollContainerRef}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {projects.map((project) => (
          <Project key={project} project={project} />
        ))}
      </div>
    </div>
  );
}
