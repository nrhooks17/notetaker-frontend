import {
    ChangeEvent,
    FormEvent,
    useState,
} from 'react';
import { NoteInputProps } from "@/app/notes/_interfaces/NoteInputProps";
import { NoteProvider } from "@/app/notes/_repositories/NoteProvider";
import { ReactElement } from "react";

export default function NoteInput({page, notebook, handleNoteSubmitted}: NoteInputProps): ReactElement {

    //this handleSubmit function is the function that runs the onAddNote function when the submit button is pressed.
    const [noteContent, setNoteContent] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(true);

const submitNoteAction = async (event: FormEvent<HTMLFormElement> | KeyboardEvent): Promise<void> => {
        event.preventDefault();

        let noteRepository: NoteProvider = new NoteProvider();

        /*
         run some ajax code to call the notetaker api.
         then when the api returns, clear the noteContent
         */
        if( noteContent != undefined && noteContent !== "") {
            try {
                 await noteRepository.post({ "text": noteContent, "page": page, "notebook": notebook});
            } catch (error) {
                console.error("Something went wrong with submitting the note: " + noteContent + " to the api.");
                console.error(error);
            }

            handleNoteSubmitted(); //tell the parent that a note has been submitted, so it can reload the notes.
        }

        // reset the textbox with an empty string to clear it out async.
        setNoteContent("");
    };

    //this here basically calls the onAddNote function which adds a new note using the string from noteContent
    const handleEnterPress = async (event): Promise<void> => {
        if (event.key == 'Enter') {
            event.preventDefault();
            await submitNoteAction(event);
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        await submitNoteAction(event);
    }

    //this handles setting the value of noteContent when the user is typing.
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setNoteContent(event.target.value);
    }

    //binds all the js variables to their attributes and returns the React component in JSX.
    return (
        <form onSubmit={handleSubmit} onKeyDown={handleEnterPress} className={'flow note-input'}>
          <textarea id="notes" className={'flow styled-textarea'} value={noteContent} onChange={handleInputChange}/>
          <button className={'flow submit-button'}>Submit Note</button>
        </form>
    );
}