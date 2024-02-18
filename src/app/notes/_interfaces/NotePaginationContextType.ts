export interface NotePaginationContextType {
    handleAddPage: (page: number) => void,
    handleRetrievePage: (page: number) => void,
    page: number
    totalPages: number
}
