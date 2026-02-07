 import { create } from 'zustand'

const useThemeStore = create((set) => ({
  theme:localStorage.getItem("chattify-theme")||"forest",
  setTheme:(theme)=>{
    localStorage.setItem("chattify-theme",theme);
    document.documentElement.setAttribute("data-theme", theme); 
        set({theme});
  }

}))

export default useThemeStore;
