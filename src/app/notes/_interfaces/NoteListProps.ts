import { Note } from './Note';

export interface NoteListProps {
    notes: Note[],
    notesLoading: boolean,
}