import { create } from "zustand";

// Der Zustand wird als Custom Hook "useAppStore" erstellt
const useAppStore = create((set) => ({
  // Initialzustand
  language: "EN", // Standardsprache Englisch
  isLoggedIn: false, // Standardmäßig nicht eingeloggt

  // Aktion zum Ändern der Sprache
  setLanguage: (lang) => set({ language: lang }),

  // Aktion zum Ändern des Login-Status
  setLoginStatus: (status) => set({ isLoggedIn: status }),
}));

export default useAppStore;
