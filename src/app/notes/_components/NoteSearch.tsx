import {FormEvent} from "react";

export function NoteSearch() {

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
    }

    return (
        <form className="search-form" role="search" onSubmit={handleSubmit}>
            <label htmlFor="search" className="visually-hidden">Search</label>
            <div className="search-wrapper">
                <input type="search" id="search" name="search" className="search-input" placeholder="Search..."/>
                <button type="submit" className="search-button" aria-label="Submit search">
                    <svg className="arrow-icon" viewBox="0 0 24 24">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                    </svg>
                </button>
            </div>
        </form>)
        ;


}