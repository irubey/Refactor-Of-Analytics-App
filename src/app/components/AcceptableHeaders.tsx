import React from 'react';
import { Header } from './Header'
import styles from './ImportData.module.css';

type UnmatchedAcceptableFieldsProps = {
    setSelectedAcceptableHeader: Function,
    selectedAcceptableHeader: string | null,
    matchedHeaders:  Record<string, string>,
    unmatchedHeaders: string[],
    tickModelHeaders: Record<string, boolean>
}

const dayInfo = ["date","location","sessionCharacteristics", "indoorsOrOutdoors", "typeOfWorkout"]

const routeInfo = ["routeName", "routeLength", "difficultyGrade", "discipline", "attempts", "sends", "ascentStyle", "leadStyle", "dangerGrade", "routeQuality", "notes", "routeCharacteristics", "pitches"]


export function AcceptableHeaders({ setSelectedAcceptableHeader,  selectedAcceptableHeader, matchedHeaders, unmatchedHeaders, tickModelHeaders }: UnmatchedAcceptableFieldsProps) {

    const sortedHeaders = Object.keys(tickModelHeaders).sort((a, b) => {
        if (a === selectedAcceptableHeader) {
            return -1;
        } else if (b === selectedAcceptableHeader) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <>
            <div className={styles.selectedAcceptableHeaderGridItem}>
                {!selectedAcceptableHeader && (
                    <div className={styles.selectedHeader}>
                        hello
                    </div>)}
                {selectedAcceptableHeader && (
                    <div>
                        <h2>Selected acceptable</h2>
                        <div>
                            <ul>
                                <Header key={selectedAcceptableHeader} setSelectedAcceptableHeader={setSelectedAcceptableHeader} selectedAcceptableHeader={selectedAcceptableHeader} header={selectedAcceptableHeader} type="selected" source="acceptable" />
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.unmatchedAcceptableHeadersGridItem}>
                <ul>
                    {sortedHeaders.map((header, index) => {
                        if (!(header in matchedHeaders) && header !== selectedAcceptableHeader && dayInfo.includes(header)) {
                            return (
                                <Header key={`${header}-${index}`} setSelectedAcceptableHeader={setSelectedAcceptableHeader} selectedAcceptableHeader={selectedAcceptableHeader} header={header} type="unmatched" source="acceptable" />
                            )
                        }
                    })}
                </ul>
                <ul>
                    {sortedHeaders.map((header, index) => {
                        if (!(header in matchedHeaders) && header !== selectedAcceptableHeader && routeInfo.includes(header)) {
                            return (
                                <Header key={`${header}-${index}`} setSelectedAcceptableHeader={setSelectedAcceptableHeader} selectedAcceptableHeader={selectedAcceptableHeader} header={header} type="unmatched" source="acceptable" />
                            )
                        }
                    })}
                </ul>
            </div>
        </>
    );
}