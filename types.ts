
export interface RestaurantProfile {
  id: string;
  name: string;
  location: string;
  type: string;
  phone?: string;
  email?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isPopular?: boolean;
  dietary?: string[]; // e.g., 'GF', 'V', 'VG', 'JAIN'
  inStock?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  restaurantId: string;
  tableId: string;
  items: CartItem[];
  status: OrderStatus;
  timestamp: number;
  total: number;
  notes?: string;
}

export type ServiceType = 'WATER' | 'BILL' | 'SERVER' | 'CLEAN';

export interface ServiceRequest {
  id: string;
  restaurantId: string;
  tableId: string;
  type: ServiceType;
  status: 'PENDING' | 'COMPLETED';
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CustomerProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'admin' | 'staff' | 'customer';
  current_restaurant_id?: string;
}

export type AuthMode = 'LOGIN' | 'SIGNUP' | 'PHONE';

export type AuthStage = 'INIT' | 'OTP_SENT' | 'VERIFIED';