// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Address } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

const mockUser: User = {
  id: "user1",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  phone: "+1 (212) 555-0100",
  avatar: "/images/testimonials/51.jpg",
  addresses: [
    {
      id: "addr1",
      label: "Home",
      firstName: "Jane",
      lastName: "Doe",
      street: "123 Rose Garden Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (212) 555-0100",
      isDefault: true,
    },
    {
      id: "addr2",
      label: "Work",
      firstName: "Jane",
      lastName: "Doe",
      street: "456 Business Park Blvd",
      city: "New York",
      state: "NY",
      zipCode: "10016",
      country: "United States",
      phone: "+1 (212) 555-0200",
      isDefault: false,
    },
  ],
  createdAt: "2023-06-15T10:00:00Z",
  preferences: {
    newsletter: true,
    smsNotifications: false,
    orderUpdates: true,
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email === "jane.doe@example.com" && password === "password123") {
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      register: async (data) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const newUser: User = {
          id: `user-${Date.now()}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          addresses: [],
          createdAt: new Date().toISOString(),
          preferences: {
            newsletter: true,
            smsNotifications: false,
            orderUpdates: true,
          },
        };

        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`,
        };
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: [...state.user.addresses, newAddress],
              }
            : null,
        }));
      },

      updateAddress: (id, data) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map((addr) =>
                  addr.id === id ? { ...addr, ...data } : addr
                ),
              }
            : null,
        })),

      removeAddress: (id) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.filter(
                  (addr) => addr.id !== id
                ),
              }
            : null,
        })),

      setDefaultAddress: (id) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                addresses: state.user.addresses.map((addr) => ({
                  ...addr,
                  isDefault: addr.id === id,
                })),
              }
            : null,
        })),
    }),
    {
      name: "flora-grace-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);