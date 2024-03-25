import styles from './ImportData.module.css'

type MatchedHeadersProps = {
    matchedHeaders: Record<string, string>,
    requiredHeaders: string[],
    setSelectedAcceptableHeader: (header: string) => void,
    setSelectedCsvHeader: (header: string) => void,
    setMatchedHeaders: (headers: Record<string, string>) => void
};

export function MatchedHeaders({matchedHeaders, requiredHeaders, setSelectedAcceptableHeader, setSelectedCsvHeader, setMatchedHeaders}: MatchedHeadersProps) {
    
    const handleClick = (acceptable: string, csv: string) => {
        if (!csv || !acceptable) return;
        setSelectedAcceptableHeader(acceptable);
        setSelectedCsvHeader(csv);
        const newMatchedHeaders = { ...matchedHeaders };
        delete newMatchedHeaders[acceptable];
        setMatchedHeaders(newMatchedHeaders);
        }
    

    return (
        <div className={styles.matchedHeadersGridItem}>
            <h1>
                Matched Headers
            </h1>
            <ul>
                {Object.entries(matchedHeaders).map(([acceptable, csv], index) => {
                    return (
                        <li className={styles.matchedHeader} 
                            key={`${acceptable}-${index}`}
                            onClick={() => handleClick(acceptable, csv)}
                            >
                            {csv} : {acceptable} 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}