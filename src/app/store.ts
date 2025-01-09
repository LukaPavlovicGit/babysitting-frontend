import { configureStore } from '@reduxjs/toolkit';
import { AuthState } from '@/types/auth';

const authInitialState = {
    auth: {
        token: null,
        isAccountCompleted: false,
        isLoggedIn: false
    } as AuthState
};

export const store = configureStore({
    reducer: {
        auth: (state = authInitialState.auth) => state
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
