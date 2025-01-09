import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/endpoints';
import { LoginData } from '@/schemas/loginSchema';
import { store } from '@/app/store';

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
            const { token, isAccountCompleted } = data;
            store.dispatch({
                type: 'auth/setCredentials',
                payload: {
                    token,
                    isAccountCompleted,
                    isLoggedIn: true
                }
            });
            router.push('/home');
        },
        onError: (error) => {
            store.dispatch({
                type: 'auth/setCredentials',
                payload: {
                    token: null,
                    isAccountCompleted: false,
                    isLoggedIn: false
                }
            });
            console.error(error);
        }
    })
}
