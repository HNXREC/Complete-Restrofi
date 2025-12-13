-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurants table
CREATE TABLE restaurants (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    slug text UNIQUE,
    location text,
    type text,
    phone text,
    email text,
    created_at timestamp DEFAULT now()
);

-- Tables inside restaurants
CREATE TABLE tables (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    table_number text NOT NULL,  -- Store as text for flexibility (5, A1, etc.)
    created_at timestamp DEFAULT now(),
    UNIQUE(restaurant_id, table_number)
);

-- Menu items
CREATE TABLE menu_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    category text NOT NULL,
    image text,
    dietary jsonb DEFAULT '[]',
    in_stock boolean DEFAULT true,
    created_at timestamp DEFAULT now()
);

-- Orders
CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    table_id uuid NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'PENDING',
    total_amount numeric(10, 2) DEFAULT 0,
    created_at timestamp DEFAULT now()
);

-- Order items (normalized)
CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id uuid NOT NULL REFERENCES menu_items(id),
    quantity integer NOT NULL DEFAULT 1,
    price numeric(10, 2) NOT NULL,
    created_at timestamp DEFAULT now()
);


-- Service requests
CREATE TABLE service_requests (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    table_id uuid NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
    type text NOT NULL,
    status text DEFAULT 'PENDING',
    created_at timestamp DEFAULT now()
);

-- Profiles for Auth
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  phone text,
  role text DEFAULT 'customer', -- 'admin', 'staff', 'customer'
  current_restaurant_id uuid REFERENCES restaurants(id),
  created_at timestamp DEFAULT now()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.phone);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
