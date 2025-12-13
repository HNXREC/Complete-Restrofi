import { supabase } from "../lib/supabaseClient";
import { Profile } from "../types/database.types";

export async function getProfile(userId: string) {
    return await supabase.from("profiles").select("*").eq("id", userId).single();
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
    return await supabase.from("profiles").update(data).eq("id", userId).select().single();
}

export async function setCurrentRestaurant(userId: string, restaurantId: string) {
    return await supabase
        .from("profiles")
        .update({ current_restaurant_id: restaurantId })
        .eq("id", userId)
        .select()
        .single();
}
