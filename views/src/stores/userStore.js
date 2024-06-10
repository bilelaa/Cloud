import { create } from 'zustand'
 import { persist,createJSONStorage  } from 'zustand/middleware'





export const useUserStore = create(
    persist(
    (set, get) => ({
        user: null,
        setUser: (obj) => set({ user: obj })
    }),
          {
            name: 'userStore', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
          }
))