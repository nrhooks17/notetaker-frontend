import  { format }  from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import moment from 'moment-timezone';
import { useState, useEffect, MouseEventHandler, MouseEvent } from 'react';
import { NoteProvider } from "@/app/notes/_repositories/NoteProvider";
import { DaysOfWeekProps } from "@/app/notes/_interfaces/DaysOfWeekProps";

export default function DaysOfWeek({setNotes, setTotalPages, notebook}: DaysOfWeekProps): JSX.Element  {
    //need days just for this component. If this is used in others, then move to a constants file.
    const [previousSevenDays, setPreviousSevenDays] = useState<Array<Object>>([]);
    const dateFormat = 'yyyy-MM-dd HH:mm:ss'

    // class that holds all the ajax calls for notes.
    const noteRepository: NoteProvider = new NoteProvider();

    // grabs notes based off of the date selected.
    const handleDateSelected: MouseEventHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        let selectedDate: Date = new Date(event.currentTarget.value.replace(/-/g, '\/').replace(/T.+/, ''))
        let nextDate: Date = new Date((selectedDate.getTime() + (24 * 60 * 60 * 1000)));

        let formattedSelectedDate: string = formatInTimeZone(selectedDate, 'UTC', dateFormat);
        let formattedNextDate: string = formatInTimeZone(nextDate, 'UTC', dateFormat);

        let response: Response = await noteRepository.getAll(1, notebook, formattedNextDate, formattedSelectedDate);

        setNotes(response.notes);
        setTotalPages(response.total_pages);
    }

    // tries and guesses the client's timezone.
    const retrieveClientTimeZone = (): string => moment.tz.guess();

    // function to format the date string to yyyy-MM-dd and the day of the week.
    const formatDate = (day: Date, weekdays: string[]): { date: string, dateString: string } => {
        let formattedDate: string = format(day, 'yyyy-MM-dd');
        let formattedDateString: string = weekdays[day.getDay()] + ', ' + formattedDate
        return { date: formattedDate, dateString: formattedDateString };
    }

    useEffect((): void => {
        const weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        //temporary variable to hold the current day and the previous 7 days. Actual data will be reversed.
        let tempPreviousSevenDays: object[] = [];

        let currentDate: Date = new Date();

        // first grab the previous 6 days.
        for(let i: number = 6 ; i > 0; i--){
            let previousDay: Date = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
            let dateStrings: {date: string, dateString: string} = formatDate(previousDay, weekdays);
            tempPreviousSevenDays.push(dateStrings);
            setPreviousSevenDays(tempPreviousSevenDays);
        }

        // then format the current date.
        let formattedDateObject: { date: string, dateString: string } = formatDate(currentDate, weekdays);
        tempPreviousSevenDays.push(formattedDateObject);
        setPreviousSevenDays(tempPreviousSevenDays);
    }, [])

    //reverse the previousSevenDays array so that the days are in the correct order.
    return (
        <div>
            <h3 className={"days-of-week-header"}>Previous 7 Days</h3>
            <div className={"days-of-week-panel"}>
                {previousSevenDays.map((day: object, item: number) => ( <button key={item} value={day.date} className={"panel-button"} onClick={handleDateSelected}>{day.dateString}</button>) )}
            </div>
        </div>
    );
}