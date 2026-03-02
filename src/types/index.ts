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
  state: string
  acreage: number | null
  price: number | null
  property_type: PropertyType | null
  description: string | null
  features: string[]
  status: ListingStatus
  images: string[]
  agent_id: string | null
  agent?: Agent
  created_at: string
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
