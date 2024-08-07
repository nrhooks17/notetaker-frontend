import React, {useRef, useState} from "react";
import { NotebookProvider } from "@/app/notes/_repositories/NotebookProvider";
import { NotebookCreateProps } from "../_interfaces/NotebookCreateProps";

/**
 * Component to create a new notebook
 *
 * @param setNotebook
 * @param setNotebookCreated
 * @constructor
 */
export default function NotebookCreate ({setNotebook, setNotebookCreated}: NotebookCreateProps): JSX.Element{

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

    // jsx code
    return (
        <form className={'notebook-create'} onSubmit={submitNotebook}>
            <h3>Create Notebook:</h3>
            <input type="text" placeholder="Notebook Name" onChange={handleNotebookInputChange} value={newNotebook}/>
            <input type="submit" value={"Create"}/>
        </form>
    )
}
