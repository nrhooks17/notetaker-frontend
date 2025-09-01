import { BaseSyntheticEvent, FormEvent, ReactElement } from "react";
import { NoteSearchProps } from "@/app/notes/_interfaces/NoteSearchProps";
import styles from './NoteSearch.module.css';

/**
 * Component to search for notes
 * @constructor
 */
export function NoteSearch({setNotesSearchString, setPage}: NoteSearchProps): ReactElement {

    const handleInput = (event: BaseSyntheticEvent): void => {
        setNotesSearchString(event.target.value);
        setPage(1)
    }

    const preventFormSubmission = (event: FormEvent): void => {
        event.preventDefault();
    }

    return (
        <form className={styles.searchForm} role="search" onSubmit={preventFormSubmission}>
            <div className={styles.searchWrapper}>
                <input type="search" id="search" name="search" className={styles.searchInput} onInput={handleInput} placeholder="Search Notes..."/>
            </div>
        </form>
    );
}