import React from 'react';
import styles from './ImportData.module.css'

type UnmatchedAcceptableFieldsProps = {
    setSelectedHeader: Function,
    selectedHeader: string | null,
    tickModelHeaders: Record<string, boolean>,
    matchedHeaders: string[],
    unmatchedHeaders: string[]
}


export function UnmatchedAcceptableFields({ setSelectedHeader,  selectedHeader, tickModelHeaders,matchedHeaders, unmatchedHeaders }: UnmatchedAcceptableFieldsProps) {
    
    function handleSelectHeader(event: React.MouseEvent<HTMLButtonElement>) {
        const header = event.currentTarget.textContent;
        setSelectedHeader(header);
    }

    
    return (
    <div>
        <ul>
            {Object.keys(tickModelHeaders).filter(header => !matchedHeaders.includes(header)).map((header, index) => {
                const buttonClass = header === selectedHeader ? styles['selected-header'] : styles['unmatched-acceptable-fields'];
                return (
                    <button onClick={handleSelectHeader} className={buttonClass} key={`${header}-${index}`}>{header}</button>
                );
            })}
        </ul>
        <h1>Which Column Matches - {selectedHeader}</h1>
    </div>
    );
}