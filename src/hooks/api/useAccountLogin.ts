import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/config/api';
import { LoginData } from '@/schemas/loginSchema';

interface AccountLoginResponse {
  token: string;
  isAccountCompleted: boolean;
}

export const useAccountLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (loginData: LoginData) => {
            const res = await api.endpoints.account.login(loginData);
            if (!res.ok)
                throw new Error('Failed to login');
            const data = await res.json();
            return data as AccountLoginResponse;
        },
        onSuccess: (data) => {
            router.push('/home');
        },
        onError: (error) => {
            console.error(error);
        }
    })
}
