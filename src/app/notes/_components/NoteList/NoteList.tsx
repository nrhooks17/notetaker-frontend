import { Note } from "@/app/notes/_interfaces/Note";
import { NoteListProps } from "@/app/notes/_interfaces/NoteListProps";
import NotePagination from "@/app/notes/_components/NotePagination";
import CyberpunkSpinner from "@/app/notes/_components/CyberpunkSpinner/CyberpunkSpinner";
import { ReactElement } from "react";
import styles from './NoteList.module.css';

export default function NoteList({notes, notesLoading}: NoteListProps): ReactElement {

    function getElement(): ReactElement {
        if (notes && notes.length > 0) {
            return <>
                <ul className={styles.noteListText}>
                    {notes.map(function (note: Note, index: number) {
                        return (
                            <li key={index}>{note.text}</li>
                        )
                    })}
                </ul>
                <NotePagination></NotePagination>
            </>
        } else {
           return <p>No notes found.</p>
        }
    }

    return(
        <div className={`flow ${styles.noteListContainer}`}>
            {notesLoading ?
                <CyberpunkSpinner /> :
                getElement() }
        </div>
    );
}