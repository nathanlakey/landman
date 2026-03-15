-- =============================================
-- Landman — Craig Meier Land Auctions
-- Supabase Schema (Phase 1 + Future Infra)
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- INQUIRIES (ACTIVE — Phase 1 core table)
-- Consultation requests from the contact form
-- =============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  property_type text,             -- farm | ranch | estate | development | recreational | other
  acreage text,                   -- rough estimate as free text
  message text,
  listing_id uuid,                -- nullable — reserved for future listing-linked inquiries
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);

-- RLS: insert publicly, admin reads all via service role
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- =============================================
-- LISTINGS (FUTURE INFRASTRUCTURE — hidden)
-- Not linked publicly in Phase 1. Activate in Phase 2.
-- =============================================
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  location_city text,
  location_county text,
  state text DEFAULT 'TX',
  acreage numeric,
  price numeric,                  -- starting bid or reserve (auction context)
  auction_date date,              -- scheduled auction date
  property_type text CHECK (property_type IN ('ranch', 'farm', 'estate', 'development', 'recreational')),
  description text,
  features text[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'upcoming', 'active', 'sold', 'withdrawn')),
  images text[] DEFAULT '{}',
  published boolean DEFAULT false, -- must be true AND status='active' to show publicly
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS listings_slug_idx ON listings(slug);
CREATE INDEX IF NOT EXISTS listings_status_idx ON listings(status);
CREATE INDEX IF NOT EXISTS listings_published_idx ON listings(published);

-- RLS: only published+active listings are public (not yet activated)
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published active listings are publicly readable" ON listings
  FOR SELECT USING (published = true AND status = 'active');

-- =============================================
-- STORAGE BUCKET (run in Supabase Dashboard > Storage)
-- =============================================
-- Create a bucket named "listing-images" with public access for Phase 2


-- =============================================
-- AGENTS
-- =============================================
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  title text,
  email text,
  phone text,
  bio text,
  photo_url text,
  states_served text[] DEFAULT '{"TX"}',
  created_at timestamptz DEFAULT now()
);

-- =============================================
-- LISTINGS
-- =============================================
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  location_city text,
  location_county text,
  state text DEFAULT 'TX',
  acreage numeric,
  price numeric,
  property_type text CHECK (property_type IN ('ranch', 'farm', 'hunting', 'recreational', 'agricultural')),
  description text,
  features text[] DEFAULT '{}',
  status text DEFAULT 'active' CHECK (status IN ('active', 'sold', 'reduced')),
  images text[] DEFAULT '{}',
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS listings_slug_idx ON listings(slug);
CREATE INDEX IF NOT EXISTS listings_status_idx ON listings(status);
CREATE INDEX IF NOT EXISTS listings_property_type_idx ON listings(property_type);

-- =============================================
-- FAVORITES
-- =============================================
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id text NOT NULL,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

CREATE INDEX IF NOT EXISTS favorites_user_idx ON favorites(user_id);

-- =============================================
-- INQUIRIES
-- =============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_listing_idx ON inquiries(listing_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Listings: public read
CREATE POLICY "Listings are publicly readable" ON listings
  FOR SELECT USING (true);

-- Agents: public read
CREATE POLICY "Agents are publicly readable" ON agents
  FOR SELECT USING (true);

-- Favorites: users can manage their own
CREATE POLICY "Users can read own favorites" ON favorites
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (true);

-- Inquiries: insert only publicly, service role reads all
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- =============================================
-- AUCTION ALERTS (Phase 2 — email capture)
-- Subscribers who want to be notified of new listings
-- =============================================
CREATE TABLE IF NOT EXISTS auction_alerts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE auction_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert auction_alerts" ON auction_alerts
  FOR INSERT WITH CHECK (true);

-- =============================================
-- STORAGE BUCKET
-- =============================================
-- Run this in Supabase Dashboard > Storage:
-- Create a bucket named "listing-images" with public access
