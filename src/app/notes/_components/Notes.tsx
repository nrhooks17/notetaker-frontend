'use client';

import {useEffect, useState, useRef, useContext, createContext} from "react";
import NoteInput from "@/app/notes/_components/NoteInput";
import NoteList from "@/app/notes/_components/NoteList";
import {Note} from "@/app/notes/_interfaces/Note";
import DaysOfWeek from "@/app/notes/_components/DaysOfWeek";
import CurrentDate from "@/app/notes/_components/CurrentDate";
import { NoteRepository } from "@/app/notes/_repositories/NoteRepository";

const NotePaginationContext = createContext({});

export default function Notes(){
    let noteRepository: NoteRepository = useRef(new NoteRepository()).current;

    const [notes, setNotes] = useState<Note[]>([]);
    const [page , setPage] = useState<number>(1);
    const [noteSubmitted, setNoteSubmitted] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageButtonClicked, setNewPageSubmitted] = useState<boolean>(false);

    const fetchNotes = async (): Promise<void> => {

        let notesFromBackend = await noteRepository.getAll(page);

        // @ts-ignore
        setNotes([...notesFromBackend])
    };

    const fetchTotalPages = async (): Promise<void> => {
        let totalPages = await noteRepository.getTotalPages()

        setTotalPages(parseInt(totalPages))
    }

    useEffect(() => {

        if(noteSubmitted) {
            fetchNotes();
            fetchTotalPages();
        }

        setNoteSubmitted(false);
    }, [noteRepository, noteSubmitted, page, fetchNotes, fetchTotalPages]);

    /* function that will be passed as a prop to the noteInput component in order to set the setNoteSubmitted value
    when a new note is submitted.*/
    const handleNoteSubmitted = (): void => {
        setNoteSubmitted(true)
    }

    // Adds a note to the list after it has been submitted.
    const addNote = (newNote: Note) => {
        setNotes([...notes, newNote]);
    }

    // Function to handle adding a new page to the note list
    const handleAddPage = (numPages: number): void => {
        console.log(numPages)
        setPage(numPages++)
    }

    //
    const handleRetrievePage = (page: number): void => {

    }

    const notePaginationProps = {
        handleAddPage: handleAddPage,
        handleRetrievePage: handleRetrievePage,
        page: page,
        totalPages: totalPages,
    }


    return (
        <div className={'container'}>
            <h1 className={'flow note-header'}>Note Taker</h1>
            <NoteInput onAddNote={addNote} handleNoteSubmitted={handleNoteSubmitted}></NoteInput>

            <NotePaginationContext.Provider value={notePaginationProps}>
                <NoteList notes={notes} handleAddPage={handleAddPage} handleRetrievePage={handleRetrievePage} page={page}></NoteList>
            </NotePaginationContext.Provider>

            <CurrentDate></CurrentDate>
            <DaysOfWeek></DaysOfWeek>
        </div>
    );
}