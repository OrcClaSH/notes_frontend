export interface INote {
    id: number;
    author: string;
    theme: string;
    title: string;
    text: string;
    pub_date: string;
    is_public: boolean;
    hash_link: string;
}

export interface INotesState {
    notes: INote[];
    activeNote: INote;
    isLoading: Boolean;
    status: 'redaction' | 'creating' | 'read';
    error: string;
};
