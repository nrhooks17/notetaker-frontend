import { FormEvent, ReactElement } from "react"
import { NotebookSelectProps } from "@/app/notes/_interfaces/NotebookSelectProps";
import CyberpunkSpinner from "@/app/notes/_components/CyberpunkSpinner/CyberpunkSpinner";
import styles from './NotebookSelect.module.css';

export default function NotebookSelect({handleNotebookChanged, notebooks, notebook, notebooksLoading}: NotebookSelectProps): ReactElement {

    // if the notebook changed, then take the new value and set it to the notebook state.
    const onNotebookSelect = (event: FormEvent<HTMLSelectElement>): void => {
        let notebook: string = event.currentTarget.value;
        handleNotebookChanged(notebook)
    }

    function getNotebookSelect() {
        return notebooksLoading ?
            <CyberpunkSpinner /> :
            <select className={styles.dropdown} value={notebook} onChange={onNotebookSelect}>
            {notebooks.map((notebook, index) => (
                <option key={index} value={notebook}>
                    {notebook}
                </option>
            ))}
        </select>;
    }

    return (
        <>
            <div className={styles.notebookSelect}>
                <h3 className={styles.sectionTitle}>Select Notebook:</h3>
                {getNotebookSelect()}
            </div>
        </>
    );
}