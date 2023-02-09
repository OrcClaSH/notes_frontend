export interface ITheme {
    id: number;
    slug: string;
    title: string;
};

export interface IThemesState {
    themes: ITheme[];
    activeTheme: ITheme;
    redactionTheme: ITheme;
    isLoading: Boolean;
    isRedaction: Boolean;
    error: string;
};

