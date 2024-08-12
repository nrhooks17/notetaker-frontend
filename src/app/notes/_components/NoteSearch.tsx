import { BaseSyntheticEvent, FormEvent, ReactElement } from "react";
import { NoteSearchProps } from "@/app/notes/_interfaces/NoteSearchProps";

/**
 * Component to search for notes
 * @constructor
 */
export function NoteSearch({setNotesSearchString, setPage}: NoteSearchProps): ReactElement {

    // not sure of the type of event. I wish there was an InputEvent I could use. Maybe I should make one?
    const handleInput = (event: BaseSyntheticEvent): void => {
        setNotesSearchString(event.target.value);
        setPage(1)
    }

    // prevents the form from submitting when enter is pressed or the user clicks the submit button.
    const preventFormSubmission = (event: FormEvent): void => {
        event.preventDefault();
    }

    return (
        <form className="search-form" role="search" onSubmit={preventFormSubmission}>
            <div className="search-wrapper">
                <input type="search" id="search" name="search" className="search-input" onInput={handleInput} placeholder="Search Notes..."/>
            </div>
        </form>
    );


}