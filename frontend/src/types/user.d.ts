export interface User {
    id: string
    email: string
    password: string
    role: string
    last_name: string
    first_name: string
    phone: string
    birth_date: string
    address: string
    is_active: boolean
    verify_token: string
    is_verified: boolean
    created_at: string
  }