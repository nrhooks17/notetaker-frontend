import React, {createContext} from 'react';
import {NotePaginationContextType} from "@/app/notes/_interfaces/NotePaginationContextType";

export const NotePaginationContext: React.Context<NotePaginationContextType> = createContext<NotePaginationContextType>({
    handleAddPage: (page: number) => {},
    handleRetrievePage: (page: number) => {},
    page: 1,
    totalPages: 1
});