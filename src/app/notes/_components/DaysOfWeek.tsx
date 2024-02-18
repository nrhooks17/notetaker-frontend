import  { format }  from 'date-fns';
import { useState, useEffect } from 'react';

export default function DaysOfWeek(): JSX.Element  {
    //need days just for this component. If this is used in others, then move to a constants file.
    // let weekdays : string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [previousSevenDays, setPreviousSevenDays] = useState<Array<string>>([]);

    useEffect(() => {

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let currentDate: Date = new Date();
        //temporary variable to hold the previous 7 days. Actual data will be reversed.
        let tempPreviousSevenDays: Array = [];

        //grab the previous 7 days.
        for(let i: number = 7 ; i > 0; i--){
            let previousDay: Date = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
            let formattedDateString: string  = format(previousDay, 'yyyy-MM-dd');
            tempPreviousSevenDays.push(weekdays[previousDay.getDay()] + ', ' + formattedDateString);

            setPreviousSevenDays(tempPreviousSevenDays.reverse());
        }
    }, [])


    //reverse the previousSevenDays array so that the days are in the correct order.

    return (
        <div>
            <h3 className={"days-of-week-header"}>Previous 7 Days</h3>
            <div className={"days-of-week-panel"}>
                {previousSevenDays.map((day: string, item: number) => ( <button key={item} className={"panel-button"}>{day}</button>) )}
            </div>
        </div>
    );
}