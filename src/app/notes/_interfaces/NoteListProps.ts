import { Note } from './Note';

export interface NoteListProps {
    notes: Note[],
    handleAddPage: (page: number) => void,
    handleRetrievePage: (page: number) => void,
    page: number
}