export interface NotePaginationProps {
    handleAddPage: (page: number) => void,
    handleRetrievePage: (page: number) => void,
    page: number
}