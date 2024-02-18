import {Note} from "@/app/notes/_interfaces/Note";
import { NoteListProps } from "@/app/notes/_interfaces/NoteListProps";
import NotePagination from "@/app/notes/_components/NotePagination";
export default function NoteList({notes, handleAddPage, handleRetrievePage, page}: NoteListProps){
    return (
        <div className={'flow note-list note-list-container'}>
            {/*<NotePagination handleAddPage={handleAddPage} handleRetrievePage={handleRetrievePage} page={page}></NotePagination>*/}
            <ul className={'note-list-text'}>
                {//need these brackets to write javascript in html
                    notes.map(function(note: Note, index: number){//this is for type declarations in typescript.
                        return (//need these parenthesis to return JSX.
                            <li key={index}>{note.text}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}


