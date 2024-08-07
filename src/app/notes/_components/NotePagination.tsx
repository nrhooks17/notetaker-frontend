import {MouseEventHandler, useState, useEffect, useContext, MouseEvent} from "react";
import {NotePaginationContext} from "@/app/notes/_components/_contexts/NotePaginationContext";
import {NotePaginationContextType} from "@/app/notes/_interfaces/NotePaginationContextType";
export default function NotePagination(){

    const notePaginationProps: NotePaginationContextType = useContext(NotePaginationContext)
    const { page , totalPages, setPage} = notePaginationProps;
    const [pageButtons, setPageButtons] = useState<any[]>([]);

    const changePage: MouseEventHandler = (event: MouseEvent<HTMLButtonElement>) => {
        let newPage: number = parseInt(event.currentTarget.value);
        setPage(newPage);
    }

    const createPageButtons = () => {
        setPageButtons([]);
        console.log(totalPages)
        let buttons: any[]  = []
        for (let i: number = 0; i  < totalPages; i++){
            let pageNumber: number = i + 1;
            let pageButton: JSX.Element = <button className={"page-button"} key={i} onClick={changePage} value={pageNumber}>{pageNumber}</button>
            buttons.push(pageButton);
        }
        setPageButtons(buttons)
    }

    useEffect(() => {
        createPageButtons();
    }, [totalPages])

    return (
        <div className={'note-pagination'}>
            {pageButtons.map((pageButtons, index) => (
                <div key={index} id={"page_button_" + index}>
                    {pageButtons}
                </div>
            ))}
        </div>
    );
}