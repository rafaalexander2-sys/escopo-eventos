export type Tier = 'basico' | 'parceiro' | 'premium'
export type EventStatus = 'draft' | 'published' | 'closed' | 'cancelled'
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked_in'
export type FieldType = 'text' | 'select' | 'date' | 'cpf' | 'phone' | 'number'

export interface Organization {
  id: string
  name: string
  slug: string
  owner_id: string
  tier: Tier
  fee_pct: number
  created_at: string
}

export interface Event {
  id: string
  organization_id: string
  title: string
  slug: string
  description: string | null
  date: string
  time: string | null
  location: string
  city: string
  state: string
  capacity: number
  status: EventStatus
  banner_url: string | null
  created_at: string
}

export interface EventBatch {
  id: string
  event_id: string
  name: string
  price: number
  capacity: number
  starts_at: string | null
  ends_at: string | null
  created_at: string
}

export interface EventField {
  id: string
  event_id: string
  label: string
  field_type: FieldType
  options: string[] | null
  required: boolean
  position: number
}

export interface Registration {
  id: string
  event_id: string
  batch_id: string | null
  status: RegistrationStatus
  athlete_name: string
  athlete_email: string
  athlete_cpf: string
  athlete_phone: string | null
  athlete_dob: string | null
  custom_fields: Record<string, string>
  checked_in_at: string | null
  created_at: string
}
