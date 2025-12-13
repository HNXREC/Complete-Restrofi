import { supabase } from "../lib/supabaseClient";
import { ServiceType } from "../../types";

export interface ServiceRequest {
    id: string;
    restaurant_id: string;
    table_id: string;
    type: string;
    status: string;
    created_at: string;
}

export async function getServiceRequests(restaurantId: string) {
    return await supabase
        .from("service_requests")
        .select(`
        *,
        tables!inner(table_number)
    `)
        .eq("restaurant_id", restaurantId)
        .neq("status", "COMPLETED");
}

export async function createServiceRequest(data: Partial<ServiceRequest>) {
    return await supabase.from("service_requests").insert(data).select().single();
}

export async function updateServiceRequestStatus(id: string, status: string) {
    return await supabase.from("service_requests").update({ status }).eq("id", id);
}
