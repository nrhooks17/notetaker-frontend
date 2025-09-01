import React, { useRef, useState, ReactElement } from "react";
import { NotebookProvider } from "@/app/notes/_repositories/NotebookProvider";
import { NotebookCreateProps } from "../_interfaces/NotebookCreateProps";
import CyberpunkSpinner from "@/app/notes/_components/CyberpunkSpinner/CyberpunkSpinner";
import styles from './NotebookCreate.module.css';

/**
 * Component to create a new notebook
 *
 * @param setNotebook
 * @param setNotebookCreated
 * @param notebooksLoading
 * @constructor
 */
export default function NotebookCreate ({setNotebook, setNotebookCreated, notebooksLoading}: NotebookCreateProps): ReactElement {

    // state for component
    const [newNotebook, setNewNotebook] = useState<string>("")

    // object with my notebook ajax calls
    const notebookRepository: NotebookProvider = useRef(new NotebookProvider()).current

    // function to submit a new notebook
    const submitNotebook = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        try {
             await notebookRepository.post({"notebook": newNotebook})
             setNotebook(newNotebook)
             setNotebookCreated(true)
        } catch (e) {
            console.error('Error submitting notebook: ', e)
        } finally {
            setNewNotebook("")
        }
    }

    // sets the new notebook state variable when the value in the input textbox changes.
    const handleNotebookInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewNotebook(e.target.value)
    }

    function getNotebookCreateForm() {
        return notebooksLoading ?
            <CyberpunkSpinner /> :
            <>
              <input type="text" placeholder="Notebook Name" onChange={handleNotebookInputChange} value={newNotebook} className={styles.input}/>
              <input type="submit" value={"Create"} className={styles.button}/>
            </>;
    }

    return (
        <form className={styles.notebookCreate} onSubmit={submitNotebook}>
            <h3 className={styles.sectionTitle}>Create Notebook:</h3>
            {getNotebookCreateForm()}
        </form>
    )
}
