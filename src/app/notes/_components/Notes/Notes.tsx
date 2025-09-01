'use client';

import React, { useCallback, ReactElement } from 'react';
import { useEffect, useState, useRef } from "react";
import NoteInput from "@/app/notes/_components/NoteInput/NoteInput";
import NoteList from "@/app/notes/_components/NoteList/NoteList";
import NotebookSelect from "@/app/notes/_components/NotebookSelect/NotebookSelect";
import { Note } from "@/app/notes/_interfaces/Note";
import DaysOfWeek from "@/app/notes/_components/DaysOfWeek/DaysOfWeek";
import CurrentDate from "@/app/notes/_components/CurrentDate";
import NotebookCreate from "@/app/notes/_components/NotebookCreate/NotebookCreate";
import { NoteProvider } from "@/app/notes/_repositories/NoteProvider";
import { NotebookProvider } from "@/app/notes/_repositories/NotebookProvider";
import { NotePaginationContext } from "@/app/notes/_components/_contexts/NotePaginationContext";
import { NotePaginationContextType } from "@/app/notes/_interfaces/NotePaginationContextType";
import {NoteSearch} from "@/app/notes/_components/NoteSearch";
import styles from './Notes.module.css';

/**
 * The Notes component. This is the main component of this application. Where most if not all the logic will be.
 *  I need to move some of this code to other files.
 * @constructor
 */
export default function Notes(): ReactElement {

    //object with all my ajax calls
    let noteRepository: NoteProvider = useRef(new NoteProvider()).current;
    let notebookRepository: NotebookProvider = useRef(new NotebookProvider()).current;

    //state for notes
    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoading, setNotesLoading] = useState<boolean>(false);
    const [noteSearchString, setNotesSearchString] = useState<string>("");

    const [notebooks, setNotebooks] = useState<string[]>([]);
    const [notebooksLoading, setNotebooksLoading] = useState<boolean>(false);

    // Later, I need to add some sort of account functionality that will allow me to set the notebook to the user's default notebook.
    // this needs to be in the parent because it is use by both the NotebookCreate component and the NotebookSelect component.
    const [notebook, setNotebook] = useState<string>("");

    //also needs to be in the parent as it is used when we fetch notes from the backend.
    const [page, setPage ] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [noteSubmitted, setNoteSubmitted] = useState<boolean>(false);
    const [notebookCreated, setNotebookCreated] = useState<boolean>(false);

    // date filters
    const [dateSelected, setDateSelected] = useState<string>("");
    const [lowerDateBound, setLowerDateBound] = useState<string>("");
    const [upperDateBound, setUpperDateBound] = useState<string>("");

    //function that will be called to fetch notes from the backend
    const fetchNotes = useCallback(async (page: number = 1, notebook: string, upperDateBound: string = "", lowerDateBound: string = "", noteSearchString: string = ""): Promise<void> => {
        try {
            setNotesLoading(true)
            let response: Response = await noteRepository.getAll(page, notebook, upperDateBound, lowerDateBound, noteSearchString);
            let notesFromBackend: Note[] = response.notes;
            setNotes([...notesFromBackend])
            // need to have some sort of transformer on the backend
            setTotalPages(response.total_pages)
        } catch(e) {
            console.error('Error fetching notes: ', e);
        } finally {
            setNotesLoading(false)
        }
    }, [page])

    // function that will be called to fetch notebooks from the backend
    const fetchNotebooks = useCallback(async (): Promise<void> => {
        try{
            // fetch notebooks
            setNotebooksLoading(true)
            const response = await notebookRepository.getAll(page, notebook)

            // set notebooks
            setNotebooks(response.notebooks)

        }catch (e){
            console.error('Error fetching notebook data: ', e);
        }finally {
            setNotebooksLoading(false)
        }
    }, [])

    //useEffect that will be run when a note is submitted
    useEffect(() => {
        if (noteSubmitted){
            fetchNotes(page, notebook).finally(() => {
                // need to set both to false as both could cause the fetchNotes function to be called.
                setNoteSubmitted(false)
            })
        }
    }, [noteSubmitted, fetchNotes]);

    // useEffect that will be run when the component is mounted, or when a page, notebook, upperDatebound or lowerDateBound changes.
    useEffect( () => {
        try {
            fetchNotes(page, notebook, upperDateBound, lowerDateBound, noteSearchString)
        } catch (e) {
            console.error('Error fetching notes: ', e)
        }
    }, [page, notebook, upperDateBound, lowerDateBound, noteSearchString])

    //useEffect that will be run when a selected notebook changes.
    useEffect(() => {
        if (notebookCreated) {
            try {
                fetchNotebooks()
            } catch (e) {
                console.error('Error fetching notebooks: ', e)
            } finally {
                setNotebookCreated(false)
            }
        }
    }, [notebook])

   //useEffect that will be rand when the component is mounted.
    useEffect(() => {
        try {
            fetchNotebooks()
        } catch (e) {
            console.error('Error fetching notebooks: ', e)
        }
    }, [])

    /* function that will be passed as a prop to the noteInput component in order to set the setNoteSubmitted value
    when a new note is submitted.*/
    const handleNoteSubmitted = useCallback((): void => {
        setNoteSubmitted(true)
        resetNotebookFilters()
    }, [])

    const handleNotebookChanged = useCallback((notebook: string): void => {
        // everytime a notebook is changed, need to go back to the first page.
        setNotebook(notebook)
        resetNotebookFilters()
    }, [notebook])


    // resets the pages, and date filters
    const resetNotebookFilters  = (): void => {
        setPage(1)
        setDateSelected("")
        setUpperDateBound("")
        setLowerDateBound("")
    }

    const notePaginationProps: NotePaginationContextType = {
        page: page,
        totalPages: totalPages,
        setPage: setPage,
    }

    return (
        <div className={styles.container}>
            <header className={styles.noteHeader}>
                <h1>// Note Taker</h1>
                <span>Active Notebook: {notebook || 'None Selected'}</span>
            </header>

            <aside className={styles.sidebarNav}>
                <DaysOfWeek dateSelected={dateSelected} setDateSelected={setDateSelected}
                            setUpperDateBound={setUpperDateBound} setLowerDateBound={setLowerDateBound}></DaysOfWeek>
            </aside>

            <main className={styles.mainContent}>
                <section className={styles.inputSection}>
                    <NoteInput page={page} notebook={notebook} handleNoteSubmitted={handleNoteSubmitted}></NoteInput>
                </section>
                
                <section className={styles.notesSection}>
                    <NotePaginationContext.Provider value={notePaginationProps}>
                        <NoteList notes={notes} notesLoading={notesLoading}></NoteList>
                    </NotePaginationContext.Provider>
                </section>

                <section className={styles.searchSection}>
                    <NoteSearch setNotesSearchString={setNotesSearchString} setPage={setPage}></NoteSearch>
                </section>
            </main>

            <aside className={styles.rightPanel}>
                <div className={styles.dateDisplay}>
                    <CurrentDate></CurrentDate>
                </div>
                
                <div className={styles.notebookControls}>
                    <NotebookCreate setNotebook={setNotebook} setNotebookCreated={setNotebookCreated} notebooksLoading={notebooksLoading}></NotebookCreate>
                    <NotebookSelect handleNotebookChanged={handleNotebookChanged} notebooks={notebooks}
                                    notebook={notebook} notebooksLoading={notebooksLoading}></NotebookSelect>
                </div>
            </aside>
        </div>
    );
}