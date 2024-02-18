import {
    ChangeEvent,
    FormEvent,
    KeyboardEventHandler,
    FormEventHandler,
    useState,
} from 'react';
import { NoteInputProps } from "@/app/notes/_interfaces/NoteInputProps";
import { NoteRepository } from "@/app/notes/_repositories/NoteRepository";

export default function NoteInput({onAddNote, handleNoteSubmitted}: NoteInputProps) {

    //this handleSubmit function is the function that runs the onAddNote function when the submit button is pressed.
    const [noteContent, setNoteContent] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(true);

    const submitNoteAction = async (event: FormEvent<HTMLFormElement> | KeyboardEvent) => {
        event.preventDefault();

        let noteRepository: NoteRepository = new NoteRepository();

        /*
         run some ajax code to call the notetaker api.
         then when the api returns, clear the noteContent
         */
        if( noteContent !== undefined && noteContent !== "") {
            onAddNote({text: noteContent});

            try {
                let page: number = 1;
                let notebook: string = "default";

                let response: Response = await noteRepository.post(
                    { "text": noteContent, "page": page, "notebook": notebook}
                );

                 if(response && response.status == 200){
                    let result = await response.json()
                    console.log(result.message);
                }
                else {
                    console.error("Something went wrong with submitting the note: " + noteContent + " to the api.");
                }
            } catch (error) {
                console.error(error);
            }

            handleNoteSubmitted(); //tell the parent that a note has been submitted, so it can reload the notes.
        }

        // reset the textbox with an empty string to clear it out async.
        setNoteContent("");
    };

    //this here basically calls the onAddNote function which adds a new note using the string from noteContent
    const handleEnterPress: KeyboardEventHandler<HTMLFormElement>  = async (event ): Promise<void> => {
        if (event.key == 'Enter') {
            event.preventDefault();
            await submitNoteAction(event);
        }
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        await submitNoteAction(event);
    }

    //this handles setting the value of noteContent when the user is typing.
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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

/**
 * This function is used to get the notes from the api.
 */
async function getNotes(): Promise<Response>{
    const response : Response = await fetch('http://localhost:3000/api/notes');
    return response.json();
}