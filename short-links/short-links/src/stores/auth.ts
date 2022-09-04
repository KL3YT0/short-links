
import type { BodyLogInLoginPost } from '@/api/api';
import { defineStore } from 'pinia';
import { api } from '@/api'

interface AuthStore {
  user: {
    token_type: string;
    access_token: string
  } | null;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthStore => ({
    user: null,
  }),
  actions: {
    async makeAuth(email: string, password: string): Promise<any> {
      try {
        const response = await api.logInLoginPost(
          {
            username: email, password
          }
        );

        this.user = response.data;

        localStorage.setItem('token_type', response.data.token_type);
        localStorage.setItem('access_token', response.data.access_token);

        return response;

      } catch (err: any) {
        return err;
      }
    }
  }
});
