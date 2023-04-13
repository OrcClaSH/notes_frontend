import { createSelector } from "@reduxjs/toolkit";

import {TRootState} from '@/store/store';
import { ITheme } from "./slices/themes/types";

const selectNotes = (state: TRootState) => state.notes.notes
export const selectorNotesWithActiveTheme = (activeTheme: ITheme) => createSelector(
    [selectNotes],
    notes => notes.filter(note => note.theme === activeTheme?.title?.toLowerCase())
);

// const selectActiveTheme = (state: TRootState) => state.themes.activeTheme
// export const selectorActiveTheme = () => createSelector(
//     [selectActiveTheme],
//     activeTheme => activeTheme
// )
