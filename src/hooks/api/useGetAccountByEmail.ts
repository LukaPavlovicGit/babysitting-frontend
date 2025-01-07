import { useRouter } from 'next/navigation';
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

      if (!res.ok)
        throw new Error('Failed to check email');
      
      const data = await res.json();
      return data as GetAccountByEmailResponse;
    },
    onSuccess: (data) => {
      router.push(`/login?email=${data.email}&firstName=${data.firstName}`);
    },
    onError: (error) => {
      router.push('/signup');
    }
  });
};