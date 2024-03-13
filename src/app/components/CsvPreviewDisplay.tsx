import styles from './ImportData.module.css';
import { SubmitNewDataButton } from './SubmitNewDataButton';
import React, { useState } from 'react';


type DataPreviewProps = {
    csvInfo: { header: string, count: number, percentage: number }[],
    matchedHeaders: string[],
    unmatchedHeaders: string[],
    previewRecords: JSON[],
    setPreviewRecords: React.Dispatch<React.SetStateAction<JSON[]>>,
    selectedHeader: string | null
};

export function CsvPreviewDisplay({ csvInfo, matchedHeaders, unmatchedHeaders, previewRecords, setPreviewRecords, selectedHeader }: DataPreviewProps) {
    const [userMatchedHeaders, setUserMatchedHeaders] = useState<{[key: string]: string}>({});

    const totalMatched: number = matchedHeaders.length + Object.keys(userMatchedHeaders).length;
    const percentComplete = totalMatched && totalMatched / csvInfo.length * 100;

    const sortedCsvInfo = [...csvInfo].sort(({ header: headerA }, { header: headerB }) => {
        const headerALower = headerA.trim().toLowerCase();
        const headerBLower = headerB.trim().toLowerCase();
        const userMatchedHeadersValuesLower = Object.values(userMatchedHeaders).map(value => value.toLowerCase());
        const isHeaderAMatched = matchedHeaders.includes(headerALower) || userMatchedHeadersValuesLower.includes(headerALower);
        const isHeaderBMatched = matchedHeaders.includes(headerBLower) || userMatchedHeadersValuesLower.includes(headerBLower);
    
        if (isHeaderAMatched && !isHeaderBMatched) {
            return 1;
        } else if (!isHeaderAMatched && isHeaderBMatched) {
            return -1;
        } else {
            return 0;
        }
    });

    

    function handleHeaderClick(header: string) {
        if (!selectedHeader) return
        setUserMatchedHeaders(prevUserMatchedHeaders => ({
            ...prevUserMatchedHeaders,
            [selectedHeader]: header
        }));
        console.log(userMatchedHeaders)
    }

    return (
        <>
            <h1>{percentComplete} % matched</h1>
            <table>
                <thead>
                    <tr>
                    {sortedCsvInfo.map(({ header }, index) => {
                        const headerLower = header.trim().toLowerCase();
                        const isHeaderMatched = matchedHeaders.includes(headerLower) || Object.values(userMatchedHeaders).map(value => value.toLowerCase()).includes(headerLower);
                        return (
                            <th 
                                key={`${header}-${index}`} 
                                className={`${isHeaderMatched ? styles['matched-csv-header'] : styles['unmatched-csv-header']} ${styles.tableCell}`}
                                onClick={() => {handleHeaderClick(header)}}
                            >  
                                {header}
                            </th>
                        );
                    })}
                    </tr>
                </thead>
                <tbody>
                    {previewRecords.map((record, index) => (
                        <tr key={index}>
                            {sortedCsvInfo.map(({ header }) => (
                                <td key={header} className={styles.tableCell}>                                 
                                    {(record as { [key: string]: any })[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <SubmitNewDataButton />
        </>
    );
}