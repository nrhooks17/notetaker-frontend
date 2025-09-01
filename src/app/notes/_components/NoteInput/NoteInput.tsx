import {
    ChangeEvent,
    FormEvent,
    useState,
} from 'react';
import { NoteInputProps } from "@/app/notes/_interfaces/NoteInputProps";
import { NoteProvider } from "@/app/notes/_repositories/NoteProvider";
import { ReactElement } from "react";
import styles from './NoteInput.module.css';

export default function NoteInput({page, notebook, handleNoteSubmitted}: NoteInputProps): ReactElement {
    const [noteContent, setNoteContent] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const submitNoteAction = async (event: FormEvent<HTMLFormElement> | KeyboardEvent): Promise<void> => {
        event.preventDefault();

        let noteRepository: NoteProvider = new NoteProvider();

        if( noteContent != undefined && noteContent !== "") {
            try {
                setLoading(true);
                await noteRepository.post({ "text": noteContent, "page": page, "notebook": notebook});
                handleNoteSubmitted();
                setNoteContent("");
            } catch (error) {
                console.error("Something went wrong with submitting the note: " + noteContent + " to the api.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEnterPress = async (event): Promise<void> => {
        if (event.key == 'Enter') {
            event.preventDefault();
            await submitNoteAction(event);
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        await submitNoteAction(event);
    }

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setNoteContent(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit} onKeyDown={handleEnterPress} className={`flow ${styles.noteInput}`}>
          <textarea 
            id="notes" 
            className={`flow ${styles.textarea}`} 
            value={noteContent} 
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Enter your note here..."
          />
          <button className={`flow ${styles.submitButton}`} disabled={isLoading}>
            {isLoading ? 'SUBMITTING...' : 'Submit Note'}
          </button>
        </form>
    );
}