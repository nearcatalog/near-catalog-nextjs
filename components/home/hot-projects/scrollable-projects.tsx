"use client";

import ProjectCard from "@/components/ui/project-card";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef, useState, useEffect, useMemo } from "react";
import { ProjectId, ProjectRecord } from "@/lib/types";

interface ScrollableProjectsProps {
  projects: Record<ProjectId, ProjectRecord>;
}

export default function ScrollableProjects({
  projects,
}: ScrollableProjectsProps) {
  const projectKeys = Object.keys(projects).slice(0, 5);
  const [duplicatedProjects, setDuplicatedProjects] = useState<ProjectId[]>([
    ...projectKeys,
    ...projectKeys,
  ]);
  const containerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true, // activate rubber band effect
  });
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

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

  const viewportWidth = window.innerWidth;
  useEffect(() => {
    const scrollElement = containerRef.current;
    let scrollInterval: NodeJS.Timeout;

    // do not start scrolling if the viewport is smaller than the container
    if (viewportWidth > containerRef.current?.scrollWidth / 2) {
      if (duplicatedProjects.length > projectKeys.length) {
        setDuplicatedProjects(projectKeys);
      }
      return;
    }

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        const scrollOffset = 24;
        const padding = 16;
        if (scrollElement) {
          const scrollSpeed = 1;
          if (
            scrollElement.scrollLeft + scrollElement.clientWidth >=
            scrollElement.scrollWidth / 2 + (viewportWidth + padding)
          ) {
            scrollElement.scrollLeft = scrollOffset; // Reset scroll to top when it reaches the bottom
          } else {
            scrollElement.scrollLeft += scrollSpeed;
          }
        }
      }, 15); // Adjust the speed of scrolling here
    };

    if (!isHovered && !isTouched) {
      startScrolling();
    }

    return () => clearInterval(scrollInterval);
  }, [isHovered, isTouched, projectKeys, duplicatedProjects, viewportWidth]);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
        className="no-scrollbar mt-14 flex gap-4 overflow-x-auto px-4"
      >
        {duplicatedProjects.map((pid: any, index) => (
          <ProjectCard project={projects[pid]} key={index} />
        ))}
      </div>
    </div>
  );
}
