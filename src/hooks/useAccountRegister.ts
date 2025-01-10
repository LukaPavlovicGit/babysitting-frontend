import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/endpoints';
import { SignupData } from '@/schemas/signupSchema';

interface AccountRegisterResponse {
  firstName: string;
  email: string;
}
  
export const useAccountRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (signupData: SignupData) => {
      const res = await api.endpoints.account.register(signupData);

      if (!res.ok)
        throw new Error('Failed to check email');
      
      const data = await res.json();
      return data as AccountRegisterResponse;
    },
    onSuccess: (data) => {
      router.push(`/login?email=${data.email}&firstName=${data.firstName}`);
    },
    onError: (error) => {
      router.push('/signup');
    }
  });
};