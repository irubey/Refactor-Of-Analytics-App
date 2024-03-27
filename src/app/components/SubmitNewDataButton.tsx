import { CleanNewSpreadsheets } from './ServerActions/CleanNewSpreadsheets';
import styles from './ImportData.module.css';

type SubmitNewDataButtonProps = {
    matchedHeaders: Record<string, string>;
    totalRecords: Record<string, any>[];
    dateFormat: string;
};

export function SubmitNewDataButton({ matchedHeaders, totalRecords, dateFormat }: SubmitNewDataButtonProps) {
    function handleClick() {
        CleanNewSpreadsheets(matchedHeaders, totalRecords, dateFormat);
        console.log('submitting new data')
    }

    return (
        <button className={styles.submitNewDataButtonGridItem} onClick={handleClick}>Submit New Data</button>
    );
}