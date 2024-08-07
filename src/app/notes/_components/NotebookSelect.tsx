import { FormEvent } from "react"
import { NotebookSelectProps } from "@/app/notes/_interfaces/NotebookSelectProps";

export default function NotebookSelect({handleNotebookChanged, notebooks, notebook}: NotebookSelectProps): JSX.Element {

    // if the notebook changed, then take the new value and set it to the notebook state.
    const onNotebookSelect = (event: FormEvent<HTMLSelectElement>) => {
        let notebook: string = event.currentTarget.value;
        handleNotebookChanged(notebook)
    }

    return (
        <>
            <div className={"notebook-select"}>
                <h3 className={"notebook-select-title"}>Select Notebook:</h3>
                <select className={"notebook-select-element"} value={notebook} onChange={onNotebookSelect}>
                    {notebooks.map((notebook, index) => (
                        <option key={index} value={notebook}>
                            {notebook}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}