import { useEffect, useState, ReactElement } from "react";
import styles from './CurrentDate.module.css';

export default function CurrentDate(): ReactElement {

    const [currentDate, setCurrentDate] = useState<string>("");

    useEffect(() => {
        let date: Date = new Date();
        let formattedDate: string = date.toLocaleString();
        setCurrentDate(formattedDate);
    }, []);

    try {
        return (
            <h1 className={styles.dateHeader}>{ currentDate }</h1>
        );
    }
    catch (error) {
        console.log(error);
    }
}