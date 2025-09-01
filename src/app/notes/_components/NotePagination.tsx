import { MouseEventHandler, useState, useEffect, useContext, MouseEvent, ReactElement } from "react";
import { NotePaginationContext } from "@/app/notes/_components/_contexts/NotePaginationContext";
import { NotePaginationContextType } from "@/app/notes/_interfaces/NotePaginationContextType";
import styles from './NotePagination.module.css';
export default function NotePagination(): ReactElement{

    const notePaginationProps: NotePaginationContextType = useContext(NotePaginationContext)
    const { page , totalPages, setPage} = notePaginationProps;
    const [pageButtons, setPageButtons] = useState<any[]>([]);

    const changePage: MouseEventHandler = (event: MouseEvent<HTMLButtonElement>): void => {
        let newPage: number = parseInt(event.currentTarget.value);
        setPage(newPage);
    }

    const createPageButtons = (): void => {
        setPageButtons([]);
        let buttons: any[]  = []
        for (let i: number = 0; i  < totalPages; i++){
            let pageNumber: number = i + 1;
            let pageButton: JSX.Element = <button
                key={i}
                onClick={changePage}
                value={pageNumber}
                className={`${styles.paginationButton} ${ i === (page - 1) ? styles.active : ''}`}
            >{pageNumber}</button>
            buttons.push(pageButton);
        }
        setPageButtons(buttons)
    }

    useEffect(() => {
        createPageButtons();
    }, [totalPages, page])

    return (
        <div className={styles.notePagination}>
            {pageButtons.map((pageButtons, index) => (
                <div key={index} id={"page_button_" + index}>
                    {pageButtons}
                </div>
            ))}
        </div>
    );
}