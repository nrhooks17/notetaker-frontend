import {MouseEventHandler, useState, useEffect, useMemo, useContext, Context} from "react";
import {NotePaginationContext} from "@/app/notes/_components/_contexts/NotePaginationContext";
import {NotePaginationContextType} from "@/app/notes/_interfaces/NotePaginationContextType";
export default function NotePagination(){

    const notePaginationProps: NotePaginationContextType = useContext(NotePaginationContext)
    const { handleAddPage, handleRetrievePage, page , totalPages } = notePaginationProps;
    const [pageButtons, setPageButtons] = useState<any[]>([]);

    const tempPageButtons: any[] = useMemo(() => {
         const handleAddPageButtonClicked = async (event: MouseEventHandler<HTMLButtonElement>): Promise<void> => {
             //grab the number of pages from the page buttons
             let numPages = pageButtons.length
             handleAddPage(numPages);
         }

         const buttons: any[] = [];
         for (let i: number= 0; i <= page; i++ ) {
             buttons.push(<button id={"page_button_" + i} onClick={handleAddPageButtonClicked} className={'note-pagination-buttons'}>{i}</button>)
         }

         return buttons;
    }, [pageButtons, handleAddPage, page]);

    useEffect(() => {
        setPageButtons(tempPageButtons);
    },[tempPageButtons])

    return (
        <div>
            <button onClick={handleAddPage} className={'note-list-pagination'}>Add Page</button>
            {pageButtons.map((pageButtons, index) => (
                <div key={index} id={"page_button_div_" + index}>
                    {pageButtons}
                </div>
            ))}
        </div>
    );
}