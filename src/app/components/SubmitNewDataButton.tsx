
import styles from './ImportData.module.css';
type SubmitNewDataButtonProps = {
    matchedHeaders: Record<string, string>;
    totalRecords: Record<string, any>[];
};

export function SubmitNewDataButton({ matchedHeaders, totalRecords }: SubmitNewDataButtonProps) {
    function handleClick() {
        console.log('submitting new data')
    }

    return (
        <button className={styles.submitNewDataButtonGridItem} onClick={handleClick}>Submit New Data</button>
    );
}