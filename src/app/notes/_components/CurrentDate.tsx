import {useEffect, useState} from "react";

export default function CurrentDate(): JSX.Element {

    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        let date: Date = new Date();
        let formattedDate: string = date.toLocaleString();
        setCurrentDate(formattedDate);
    }, []);

    try {
        return (
            <h1 className={"date-header"}>{ currentDate }</h1>
        );
    }
    catch (error) {
        console.log(error);
    }
}