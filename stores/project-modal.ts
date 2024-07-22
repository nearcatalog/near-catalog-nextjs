import { create } from 'zustand'

interface ProjectModalState {
  isOpen: boolean
  projectId: string;
  setIsOpen: (isOpen: boolean) => void
  setProjectId: (projectId: string) => void;
}

const useProjectModalStore = create<ProjectModalState>()((set) => ({
  isOpen: false,
  projectId: '',
  setIsOpen: (isOpen) => set({ isOpen }),
  setProjectId: (projectId) => set({ projectId }),
}))

export default useProjectModalStore