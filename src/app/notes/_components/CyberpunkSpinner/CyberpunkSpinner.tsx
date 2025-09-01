import { ReactElement } from "react";
import styles from './CyberpunkSpinner.module.css';

export default function CyberpunkSpinner(): ReactElement {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.text}>LOADING...</div>
            </div>
        </div>
    );
}