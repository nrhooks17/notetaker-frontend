import { FormEvent, ReactElement } from "react"
import { NotebookSelectProps } from "@/app/notes/_interfaces/NotebookSelectProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function NotebookSelect({handleNotebookChanged, notebooks, notebook, notebooksLoading}: NotebookSelectProps): ReactElement {

    // if the notebook changed, then take the new value and set it to the notebook state.
    const onNotebookSelect = (event: FormEvent<HTMLSelectElement>): void => {
        let notebook: string = event.currentTarget.value;
        handleNotebookChanged(notebook)
    }

    function getNotebookSelect() {
        return notebooksLoading ?
            <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> :
            <select className={"notebook-dropdown"} value={notebook} onChange={onNotebookSelect}>
            {notebooks.map((notebook, index) => (
                <option key={index} value={notebook}>
                    {notebook}
                </option>
            ))}
        </select>;
    }

    return (
        <>
            <div className={"notebook-select"}>
                <h3 className={"notebook-select-title"}>Select Notebook:</h3>
                {getNotebookSelect()}
            </div>
        </>
    );
}