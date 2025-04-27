import { RoleEnum } from '@/types'

export interface Account {
  id: string
  email: string
  firstName: string
  lastName: string
  role: RoleEnum
  isAccountCompleted: boolean
  verificationScore: number
}
