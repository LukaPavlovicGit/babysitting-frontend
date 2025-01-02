'use client'

import { useRouter } from 'next/navigation'; // Use next/navigation
import { useMutation } from '@tanstack/react-query';
import { api } from '@/config/api';


interface GetAccountByEmailResponse {
  firstName: string;
  email: string;
  userId: string;
  lastName: string;
}
  
export const useGetAccountByEmail = () => {

  const router = useRouter();

  return useMutation({
    mutationFn: async (email: string) => {
      const res = await api.endpoints.account.getByEmail(email);
      console.log(res)
      if (!res.ok) throw new Error('Failed to check email');
      const data = await res.json();
      return data as GetAccountByEmailResponse;
    },
    onSuccess: (data) => {
      console.log("data: " + data.firstName)
    },
    onError: (error) => {
      console.log("error: " + error)
    }
  });
};