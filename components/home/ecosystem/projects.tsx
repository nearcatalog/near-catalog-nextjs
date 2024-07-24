"use client";

import { useState, useEffect, useRef } from "react";
import Project from "./project";
import { useDraggable } from "react-use-draggable-scroll";

interface EcosystemProjectsProps {
  projects: string[];
}

export default function EcosystemProjects({
  projects,
}: EcosystemProjectsProps) {
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const scrollContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(scrollContainerRef, {
    applyRubberBandEffect: true, // activate rubber band effect
  });

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

  return (
    <div className="relative mb-36 w-full rounded-b-lg bg-black/80 px-6 py-10 backdrop-blur-sm md:mb-48">
      <div
        className={`scroll-shadow left ${showLeftShadow ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`scroll-shadow right ${showRightShadow ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className="no-scrollbar relative flex cursor-grab items-stretch gap-6 overflow-x-auto"
        ref={scrollContainerRef}
        {...events}
      >
        {projects.map((project) => (
          <Project key={project} project={project} />
        ))}
      </div>
    </div>
  );
}
