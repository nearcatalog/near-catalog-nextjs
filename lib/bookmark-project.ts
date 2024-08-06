import { ProjectId } from "./types";

export function getBookmarkedProjects() {
  const bookmarkedProjects = localStorage.getItem("bookmarkedProjects") || "[]";
  return JSON.parse(bookmarkedProjects);
}

export function isProjectBookmarked(pid: ProjectId): boolean {
  const bookmarkedProjects = getBookmarkedProjects();
  return bookmarkedProjects.includes(pid);
}

export function toggleProjectBookmark(pid: ProjectId): boolean {
  let updatedBookmarkedProjects;
  let updatedBookmarkState;
  const bookmarkedProjects = getBookmarkedProjects();

  if (bookmarkedProjects.includes(pid)) {
    updatedBookmarkedProjects = bookmarkedProjects.filter(
      (p: ProjectId) => p !== pid,
    );
    updatedBookmarkState = false;
  } else {
    updatedBookmarkedProjects = [...bookmarkedProjects, pid];
    updatedBookmarkState = true;
  }

  localStorage.setItem(
    "bookmarkedProjects",
    JSON.stringify(updatedBookmarkedProjects),
  );

  return updatedBookmarkState;
}
