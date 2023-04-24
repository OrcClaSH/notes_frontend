export interface IUser {
    id: number;
    username: string;
    email?: string;
    isActivated?: boolean;
}

export interface IAuthResponse {
    error: true;
    access: string;
    refresh: string;
    user: IUser;
};

export interface IUserState {
    user: IUser;
    isAuth: Boolean;
    isLoading: Boolean;
    error: string;
    signStatus: '' | 'signin' | 'signup';
};
