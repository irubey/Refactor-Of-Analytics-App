import styles from './ImportData.module.css';
import { Header } from './Header';
import React, { useState, useEffect } from 'react';


type CsvHeadersProps = {
    setSelectedCsvHeader : Function,
    selectedCsvHeader : string | null,
    matchedHeaders : Record<string, string>,
    unmatchedHeaders : string[],
    csvInfo : { header: string, count: number, percentage: number }[],
    totalRecords: Record<string, any>[],
    dateFormat: string,
    setDateFormat: Function
};

export function CsvHeaders({ setSelectedCsvHeader, selectedCsvHeader, matchedHeaders, unmatchedHeaders, csvInfo, totalRecords, dateFormat, setDateFormat} : CsvHeadersProps) {
    const sortedCsvHeaders = csvInfo.map(({ header }) => header).sort((a, b) => {
        if (a === selectedCsvHeader) {
            return -1;
        } else if (b === selectedCsvHeader) {
            return 1;
        } else {
            return 0;
        }
    })



    function renderContent() {
        switch (selectedCsvHeader) {
            case null:
                return (
                    <div className={styles.selectedHeader}>
                        hello
                    </div>
                );
            case "Date":
                return (
                    <div>
                        <h2>Selected csv</h2>
                        <select
                            onChange={(e) => setDateFormat(e.target.value)}
                            value={dateFormat}
                            >
                            <option value="" disabled>Please select a date format</option>
                            <option value="ymd">Year Month Day</option>
                            <option value="mdy">Month Day Year</option>
                            <option value="dmy">Day Month Year</option>
                        </select>
                        <ul>
                            <Header key={selectedCsvHeader} setSelectedCsvHeader={setSelectedCsvHeader} selectedCsvHeader={selectedCsvHeader} header={selectedCsvHeader} totalRecords={totalRecords} type="selected" source="csv"/>
                        </ul>
                    </div>
                );
            default:
                return (
                    <div>
                        <h2>Selected csv</h2>
                        <ul>
                            <Header key={selectedCsvHeader} setSelectedCsvHeader={setSelectedCsvHeader} selectedCsvHeader={selectedCsvHeader} header={selectedCsvHeader} totalRecords={totalRecords} type="selected" source="csv"/>
                        </ul>
                    </div>
                );
        }
    }
    
    return (
        <>
            <div className={styles.selectedCsvHeaderGridItem}>
                {renderContent()}
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