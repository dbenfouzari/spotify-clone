import { create } from "zustand";

export interface AuthModalStore {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
