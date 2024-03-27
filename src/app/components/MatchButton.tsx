import styles from './ImportData.module.css'

type MatchButtonProps = {
    selectedCsvHeader: string| null,
    selectedAcceptableHeader: string | null,
    setMatchedHeaders: Function,
    setSelectedAcceptableHeader: Function,
    setSelectedCsvHeader: Function,
    dateFormat?: string
};

export function MatchButton({ selectedCsvHeader, selectedAcceptableHeader, setMatchedHeaders, setSelectedAcceptableHeader, setSelectedCsvHeader, dateFormat }: MatchButtonProps){
    function handleUserSelectedHeaderMatch() {
        if (!selectedCsvHeader || !selectedAcceptableHeader) return;
        if (selectedAcceptableHeader == 'date' && !dateFormat){
            alert('Please select a date format')
            return;
        }
        setMatchedHeaders((prevMatchedHeaders: Record<string,string>)=> {
            return ({...prevMatchedHeaders, [selectedAcceptableHeader]: selectedCsvHeader});
        })
        setSelectedAcceptableHeader(null)
        setSelectedCsvHeader(null)
        
    }
    return (
        <>
            {selectedCsvHeader && selectedAcceptableHeader && (
            <button 
            className={styles.matchButtonGridItem} 
            onClick={handleUserSelectedHeaderMatch}>
            Match
            </button>
            )}
            {(!selectedCsvHeader || !selectedAcceptableHeader) && (
                <div className={styles.matchButtonGridItem}>
                    Please Select a header from both sides
                </div>
            )}
        </>
    )
}