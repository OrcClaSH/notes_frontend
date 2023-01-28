export interface ITheme {
    id: number;
    slug: string;
    title: string;
};

export interface IThemesState {
    themes: ITheme[];
    activeTheme: ITheme;
    isLoading: Boolean;
    error: string;
};

