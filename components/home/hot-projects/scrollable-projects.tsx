"use client";

import Project from "../../project";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef, useState, useEffect } from "react";

interface ScrollableProjectsProps {
  projects: any;
}

export default function ScrollableProjects({
  projects,
}: ScrollableProjectsProps) {
  const projectKeys = Object.keys(projects);
  const containerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true, // activate rubber band effect
  });
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = containerRef.current;
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
    <div className="relative max-w-full">
      <div
        className={`scroll-shadow left ${showLeftShadow ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`scroll-shadow right ${showRightShadow ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={containerRef}
        {...events}
        className="no-scrollbar mt-14 flex gap-4 overflow-x-auto px-4"
      >
        {projectKeys.map((project) => (
          <Project project={projects[project]} key={project} />
        ))}
      </div>
    </div>
  );
}
