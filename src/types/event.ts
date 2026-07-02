export interface EventRecord {
  id: number | string
  title: string
  description: string
  date: string
  location: string
  latitude?: number | null | undefined
  longitude?: number | null | undefined
  organizerId?: number | undefined
  createdAt?: string | undefined
  updatedAt?: string | undefined
}

export interface CreateEventInput {
  title: string
  description?: string
  date: string
  location: string
}

export interface EventListResponse {
  totalCount?: number
  totalPages?: number
  currentPage?: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  results?: unknown[]
  events?: unknown[]
  items?: unknown[]
  data?: unknown[] | unknown
}
