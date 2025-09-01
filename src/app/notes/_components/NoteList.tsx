import { Note } from "@/app/notes/_interfaces/Note";
import { NoteListProps } from "@/app/notes/_interfaces/NoteListProps";
import NotePagination from "@/app/notes/_components/NotePagination";
import CyberpunkSpinner from "@/app/notes/_components/CyberpunkSpinner";
import { ReactElement } from "react";

export default function NoteList({notes, notesLoading}: NoteListProps): ReactElement {

    function getElement(): ReactElement {
        if (notes && notes.length > 0) {
            return <>
                <ul className={'note-list-text'}>
                    {//need these brackets to write javascript in html
                        notes.map(function (note: Note, index: number) {//this is for type declarations in typescript.
                            return (//need these parenthesis to return JSX.
                                <li key={index}>{note.text}</li>
                            )
                        })
                    }
                </ul>
                <NotePagination></NotePagination>
            </>
        } else {
           return <p>No notes found.</p>
        }
    }

    return(
        <div className={'flow note-list note-list-container'}>
            {notesLoading ?
                <CyberpunkSpinner /> :
                getElement() }
        </div>
    );

}


