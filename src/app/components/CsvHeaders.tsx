import styles from './ImportData.module.css';
import { Header } from './Header';
import React, { useState, useEffect } from 'react';


type CsvHeadersProps = {
    setSelectedCsvHeader : Function,
    selectedCsvHeader : string | null,
    matchedHeaders : Record<string, string>,
    unmatchedHeaders : string[],
    csvInfo : { header: string, count: number, percentage: number }[],
    totalRecords: Record<string, any>[]
};

export function CsvHeaders({ setSelectedCsvHeader, selectedCsvHeader, matchedHeaders, unmatchedHeaders, csvInfo, totalRecords} : CsvHeadersProps) {
    const sortedCsvHeaders = csvInfo.map(({ header }) => header).sort((a, b) => {
        if (a === selectedCsvHeader) {
            return -1;
        } else if (b === selectedCsvHeader) {
            return 1;
        } else {
            return 0;
        }
    })



    return (
        <>
            <div className={styles.selectedCsvHeaderGridItem}>
                {!selectedCsvHeader && (
                    <div className={styles.selectedHeader}>
                        hello
                    </div>)}
                
                {selectedCsvHeader && (
                    <div>
                        <h2>Selected csv</h2>
                        <ul>
                            <Header key={selectedCsvHeader} setSelectedCsvHeader={setSelectedCsvHeader} selectedCsvHeader={selectedCsvHeader} header={selectedCsvHeader} totalRecords={totalRecords} type="selected" source="csv"/>
                        </ul>
                    </div>
                    )}
            </div>
            
            <div className={styles.unmatchedCsvHeadersGridItem}>
                <ul>
                    {sortedCsvHeaders.map((header, index) => {
                        if (!Object.values(matchedHeaders).includes(header) && header !== selectedCsvHeader) {
                            return (
                                <Header key={`${header}-${index}`} setSelectedCsvHeader={setSelectedCsvHeader} selectedCsvHeader={selectedCsvHeader} header={header} totalRecords={totalRecords} type="unmatched" source="csv"/>
                            )
                        }
                    })}
                </ul>
            </div>
        </>
    );
}