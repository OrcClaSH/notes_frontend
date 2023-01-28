import { AxiosResponse } from 'axios';

import $api from "../http";
import { IAuthResponse } from '@/store/slices/user/types';
import { ITheme } from '@/store/slices/themes/types';
import { INote } from '@/store/slices/notes/types';

export default class AuthService {

    static async registration(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/users', { username, password });
    };

    static async login(username: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/jwt/create', { username, password });
    };

    static async logout(): Promise<void> {
        return $api.post('./logout');
    };

    static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
        return $api.get<IAuthResponse>('/jwt/refresh', { withCredentials: true });
    }

    static async fetchThemes(): Promise<AxiosResponse<ITheme[]>> {
        return $api.get<ITheme[]>('/themes', { withCredentials: true });
    }

    static async fetchNotes(): Promise<AxiosResponse<INote[]>> {
        return $api.get<INote[]>('/notes', { withCredentials: true });
    }

};
