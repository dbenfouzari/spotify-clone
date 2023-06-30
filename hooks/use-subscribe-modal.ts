import { create } from "zustand";

export interface SubscribeModalStore {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

export const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
