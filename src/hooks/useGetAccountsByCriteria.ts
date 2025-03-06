import { api } from '@/endpoints'
import { useQuery } from '@tanstack/react-query'

export type GetAccountsByCriteriaProps = {
  role: string
  isAccountCompleted: boolean
  firstName: string
  lastName: string
  email: string
}

type Account = {
  id: string
  firstName: string
  lastName: string
  email: string
  isAccountCompleted: boolean
}

type GetAccountsByCriteriaResponse = {
  accounts: Account[]
}

export const useGetAccountsByCriteria = (props: GetAccountsByCriteriaProps) => {
  const { role, isAccountCompleted, firstName, lastName, email } = props

  const accounts = useQuery({
    queryKey: ['accounts', role, isAccountCompleted, firstName, lastName, email],
    queryFn: async () => {
      const response = await api.endpoints.account.getByCriteria(props)
      if (!response.ok) throw new Error('Failed to get accounts by criteria')
      const data = (await response.json()) as GetAccountsByCriteriaResponse
      return data.accounts
    },
  })

  return accounts.data?.data.accounts
}
