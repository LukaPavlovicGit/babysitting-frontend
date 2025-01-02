import { useRouter } from 'next/navigation'; // Use next/navigation
import { useMutation } from '@tanstack/react-query';
import { api } from '@/config/api';


interface GetAccountByEmailResponse {
    firstName: string;
    email: string;
  }
  
  export const useGetAccountByEmail = () => {

    const router = useRouter();

    return useMutation({
      mutationFn: async (email: string) => {
        const res = await fetch(`${api.endpoints.account.getByEmail(email)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        if (!res.ok) throw new Error('Failed to check email');
        return res.json() as Promise<GetAccountByEmailResponse>;
      },
      onSuccess: (data) => {
        router.replace('/');
      },
      onError: (error) => {
        
      }
    });
  };