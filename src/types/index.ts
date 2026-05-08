export type PropertyType = 'ranch' | 'farm' | 'hunting' | 'recreational' | 'agricultural'
export type ListingStatus = 'active' | 'sold' | 'reduced'

export interface Agent {
  id: string
  name: string
  title: string | null
  email: string | null
  phone: string | null
  bio: string | null
  photo_url: string | null
  states_served: string[]
  created_at: string
}

export interface Listing {
  id: string
  title: string
  slug: string
  location_city: string | null
  location_county: string | null
  state: string | null
  acreage: number | null
  price: number | null
  property_type: PropertyType | null
  description: string | null
  features: string[]
  status: ListingStatus
  images: string[]
  auction_date: string | null
  published: boolean
  agent_id: string | null
  agent?: Agent
  created_at: string
  // Extended fields
  auction_method: string | null
  is_featured: boolean
  address: string | null
  zip_code: string | null
  short_description: string | null
  highlights: string | null
  square_footage: number | null
  year_built: number | null
  bedrooms: number | null
  bathrooms: number | null
  auction_end_date: string | null
  auction_location: string | null
  online_bidding_url: string | null
  registration_required: boolean
  auction_terms: string | null
  bidder_requirements: string | null
  video_url: string | null
  virtual_tour_url: string | null
  brochure_url: string | null
  meta_title: string | null
  meta_description: string | null
}

export interface Favorite {
  id: string
  user_id: string
  listing_id: string
  listing?: Listing
  created_at: string
}

export interface Inquiry {
  id: string
  listing_id: string | null
  name: string
  email: string
  phone: string | null
  message: string | null
  created_at: string
}
