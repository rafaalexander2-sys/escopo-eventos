export type EventStatus = 'draft' | 'published' | 'cancelled' | 'finished'
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface MockEvent {
  id: string
  title: string
  start_at: string
  location: string
  status: EventStatus
  capacity: number | null
  registrations: number
  revenue: number
}

export interface MockRegistration {
  id: string
  attendee_name: string
  attendee_email: string
  event_title: string
  status: RegistrationStatus
  created_at: string
  amount: number
}

export const mockEvents: MockEvent[] = [
  {
    id: '1',
    title: 'Workshop de UX Research',
    start_at: '2026-05-28T09:00:00',
    location: 'São Paulo, SP',
    status: 'published',
    capacity: 60,
    registrations: 45,
    revenue: 6750,
  },
  {
    id: '2',
    title: 'Congresso Brasileiro de Cardiologia',
    start_at: '2026-06-15T08:00:00',
    location: 'Rio de Janeiro, RJ',
    status: 'published',
    capacity: 300,
    registrations: 230,
    revenue: 115000,
  },
  {
    id: '3',
    title: 'Hackathon Fintech 2026',
    start_at: '2026-06-20T09:00:00',
    location: 'Belo Horizonte, MG',
    status: 'published',
    capacity: 100,
    registrations: 89,
    revenue: 0,
  },
  {
    id: '4',
    title: 'Semana Acadêmica de Medicina',
    start_at: '2026-07-10T08:00:00',
    location: 'Curitiba, PR',
    status: 'draft',
    capacity: 200,
    registrations: 0,
    revenue: 0,
  },
  {
    id: '5',
    title: 'Retiro de Liderança Empresarial',
    start_at: '2026-05-10T18:00:00',
    location: 'Campinas, SP',
    status: 'finished',
    capacity: 80,
    registrations: 76,
    revenue: 45600,
  },
]

export const mockRegistrations: MockRegistration[] = [
  {
    id: '1',
    attendee_name: 'Mariana Oliveira',
    attendee_email: 'mariana@email.com',
    event_title: 'Workshop de UX Research',
    status: 'confirmed',
    created_at: '2026-05-14T14:32:00',
    amount: 150,
  },
  {
    id: '2',
    attendee_name: 'Carlos Mendes',
    attendee_email: 'carlos.m@empresa.com.br',
    event_title: 'Congresso Brasileiro de Cardiologia',
    status: 'confirmed',
    created_at: '2026-05-14T11:15:00',
    amount: 500,
  },
  {
    id: '3',
    attendee_name: 'Ana Beatriz Costa',
    attendee_email: 'anabeatriz@gmail.com',
    event_title: 'Hackathon Fintech 2026',
    status: 'pending',
    created_at: '2026-05-14T09:47:00',
    amount: 0,
  },
  {
    id: '4',
    attendee_name: 'Rafael Souza',
    attendee_email: 'rafael.s@startup.io',
    event_title: 'Workshop de UX Research',
    status: 'confirmed',
    created_at: '2026-05-13T16:20:00',
    amount: 150,
  },
  {
    id: '5',
    attendee_name: 'Fernanda Lima',
    attendee_email: 'flima@medicina.edu.br',
    event_title: 'Congresso Brasileiro de Cardiologia',
    status: 'pending',
    created_at: '2026-05-13T10:05:00',
    amount: 500,
  },
]

export const mockStats = {
  totalRegistrations: 440,
  totalRevenue: 167350,
  activeEvents: 3,
  conversionRate: 68,
}
