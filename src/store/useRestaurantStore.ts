import { create } from "zustand";
import { getRestaurant } from "../api/restaurants";
import { Restaurant } from "../types/database.types";

interface RestaurantState {
    restaurant: Restaurant | null;
    loading: boolean;
    error: string | null;
    loadRestaurant: (id: string) => Promise<void>;
    setRestaurant: (restaurant: Restaurant | null) => void;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
    restaurant: null,
    loading: false,
    error: null,

    loadRestaurant: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await getRestaurant(id);
            if (error) throw error;
            set({ restaurant: data, loading: false });
        } catch (err: any) {
            console.error("Failed to load restaurant:", err);
            set({ error: err.message, loading: false });
        }
    },

    setRestaurant: (restaurant) => set({ restaurant }),
}));
