import { supabase } from "../lib/supabaseClient";
import { Order } from "../types/database.types";

export async function getOrders(restaurantId: string) {
    return await supabase
        .from("orders")
        .select(`
        *,
        tables (table_number),
        order_items (
            *,
            menu_items (*)
        )
    `)
        .eq("restaurant_id", restaurantId)
        .order("created_at", { ascending: false });
}

export async function getActiveOrders(restaurantId: string, page: number = 0, pageSize: number = 20) {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    return await supabase
        .from("orders")
        .select(`
        *,
        tables (table_number),
        order_items (
            *,
            menu_items (*)
        )
    `)
        .eq("restaurant_id", restaurantId)
        .in("status", ["PENDING", "PREPARING", "READY", "SERVED", "PAID"])
        .order("created_at", { ascending: false })
        .range(from, to);
}

export async function getOrderById(id: string) {
    return await supabase
        .from("orders")
        .select(`
        *,
        tables (table_number),
        order_items (
            *,
            menu_items (*)
        )
    `)
        .eq("id", id)
        .single();
}

export async function createOrder(data: Partial<Order>) {
    return await supabase.from("orders").insert(data).select().single();
}

export async function updateOrderStatus(id: string, status: string) {
    return await supabase
        .from("orders")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
}

export async function createOrderItems(items: Array<{ order_id: string; menu_item_id: string; quantity: number; price: number }>) {
    return await supabase.from("order_items").insert(items).select();
}
export async function getTodayStats(restaurantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today (Local/Server time)
    // Note: ideally handling timezones properly, but sticking to simple ISO check for now
    const todayISO = today.toISOString();

    // Fetch all orders from today to calculate total revenue
    // We select only 'total_amount' and 'status' to keep it lightweight
    return await supabase
        .from("orders")
        .select("total_amount, status")
        .eq("restaurant_id", restaurantId)
        .neq("status", "CANCELLED")
        .gte("created_at", todayISO);
}
