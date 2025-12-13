import { supabase } from "../lib/supabaseClient";
import { MenuItem } from "../types/database.types";

export async function getMenu(restaurantId: string) {
    return await supabase
        .from("menu_items")
        .select("*")
        .eq("restaurant_id", restaurantId);
}

export async function createMenuItem(data: Partial<MenuItem>) {
    return await supabase.from("menu_items").insert(data).select().single();
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>) {
    return await supabase.from("menu_items").update(data).eq("id", id).select().single();
}

export async function deleteMenuItem(id: string) {
    return await supabase.from("menu_items").delete().eq("id", id);
}

export async function createMenuItems(data: Partial<MenuItem>[]) {
    return await supabase.from("menu_items").insert(data).select();
}

export async function deleteMenuByRestaurant(restaurantId: string) {
    return await supabase.from("menu_items").delete().eq("restaurant_id", restaurantId);
}
