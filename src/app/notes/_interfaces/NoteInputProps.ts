export interface NoteInputProps {
    page: number,
    notebook: string,
    onAddNote: (newNote: any) => void,
    handleNoteSubmitted: () => void
}