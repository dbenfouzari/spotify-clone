import ColorThief from "colorthief";
import { MouseEventHandler } from "react";
import { create } from "zustand";

const colorThief = new ColorThief();

export interface HeaderColorStore {
  color: string;
  activeImageElement: HTMLImageElement | null;
  onImageHover: MouseEventHandler<HTMLImageElement>;
  onImageBlur: VoidFunction;
}

export const useHeaderColor = create<HeaderColorStore>((set) => ({
  color: "rgb(6, 95, 70)",
  activeImageElement: null,
  onImageHover: (event) => {
    const thiefColor = colorThief.getColor(event.currentTarget);
    const rgbColor = `rgb(${thiefColor[0]} ${thiefColor[1]} ${thiefColor[2]})`;

    return set({
      activeImageElement: event.target as HTMLImageElement,
      color: rgbColor,
    });
  },
  onImageBlur: () => set({ color: "rgb(6, 95, 70)", activeImageElement: null }),
}));
