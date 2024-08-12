import  { format }  from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ReactElement, useState, useEffect, MouseEventHandler, MouseEvent } from 'react';
import { DaysOfWeekProps } from "@/app/notes/_interfaces/DaysOfWeekProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function DaysOfWeek({ dateSelected, setDateSelected, setUpperDateBound, setLowerDateBound }: DaysOfWeekProps): ReactElement  {
    //need days just for this component. If this is used in others, then move to a constants file.
    const [previousSevenDays, setPreviousSevenDays] = useState<Array<Object>>([]);
    const dateFormat: string = 'yyyy-MM-dd HH:mm:ss'

    // grabs notes based off of the date selected.
    const handleDateSelected: MouseEventHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        //set the date that is being selected
        setDateSelected(event.currentTarget.value);

        let formattedSelectedDate: string = "";
        let formattedNextDate: string = "";

        if(event.currentTarget.value !== ""){
            let selectedDate: Date = new Date(event.currentTarget.value.replace(/-/g, '\/').replace(/T.+/, ''))
            let nextDate: Date = new Date((selectedDate.getTime() + (24 * 60 * 60 * 1000)));

            formattedSelectedDate = formatInTimeZone(selectedDate, 'UTC', dateFormat);
            formattedNextDate = formatInTimeZone(nextDate, 'UTC', dateFormat);
        }

        //set date bounds
        setUpperDateBound(formattedNextDate);
        setLowerDateBound(formattedSelectedDate);
    }

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

    function getDaysOfWeek() {
        return previousSevenDays < 2 ?
            <FontAwesomeIcon icon={ faSpinner } spin={true}></FontAwesomeIcon> :
            <div className={"days-of-week-panel"}>
            <p>Current Date Selected: {dateSelected}</p>
            {previousSevenDays.map((day: object, item: number) => (
                <button key={item} value={day.date} className={"panel-button"}
                        onClick={handleDateSelected}>{day.dateString}</button>))}
            <button key={7} value={""} className={"reset-filter-button"}
                    onClick={handleDateSelected}>Reset Date Filters
            </button>
        </div>;
    }

//reverse the previousSevenDays array so that the days are in the correct order.
    return (
        <div>
            <h3 className={"days-of-week-header"}>Filter: Previous 7 Days</h3>
            {getDaysOfWeek()}
        </div>
    );
}