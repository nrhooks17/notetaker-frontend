export interface NotebookSelectProps {
    handleNotebookChanged: (notebook: string) => void,
    notebooks: string[],
    notebook: string,
}