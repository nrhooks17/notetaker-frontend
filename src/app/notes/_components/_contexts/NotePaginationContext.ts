import React, {createContext} from 'react';
import {NotePaginationContextType} from "@/app/notes/_interfaces/NotePaginationContextType";

export const NotePaginationContext: React.Context<NotePaginationContextType> = createContext<NotePaginationContextType>({
    page: 1,
    totalPages: 1
});