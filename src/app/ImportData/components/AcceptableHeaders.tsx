import React from 'react';
import { DbHeader } from './DbHeader'
import { useState, useEffect } from 'react'
import { TickModelHeaders} from '@ImportData/types/UITypes'

type AcceptableHeadersProps = {
    setSelectedAcceptableHeader: React.Dispatch<React.SetStateAction<string | null>>,
    selectedAcceptableHeader: string | null,
    matchedHeaders: Record<string, string>,
    tickModelHeaders: TickModelHeaders
}






export function AcceptableHeaders({ setSelectedAcceptableHeader,  selectedAcceptableHeader, matchedHeaders, tickModelHeaders }: AcceptableHeadersProps) {
    const [sessionHeaders, setSessionHeaders] = useState<string[]>([]);
    const [routeHeaders, setRouteHeaders] = useState<string[]>([]);
    const [exerciseHeaders, setExerciseHeaders] = useState<string[]>([]);

    useEffect(() => {
        setSessionHeaders(tickModelHeaders
            .filter(header => header.category === "session" && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, matchedHeaders])

    useEffect(() => {
        setRouteHeaders(tickModelHeaders
            .filter(header => header.category === "route" && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, matchedHeaders])

    useEffect(() => {
        setExerciseHeaders(tickModelHeaders
            .filter(header => header.category === "other" && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, matchedHeaders])



    return (
        <div className='col-span-3 col-start-4 flex justify-between'>
            <ul className='p-2'>
                <h2 className='underline'>Session Info</h2>
                {sessionHeaders.map((header, index) => (
                    <li key={index}>
                        <DbHeader
                        header={header}
                        setSelectedAcceptableHeader={setSelectedAcceptableHeader}
                        tickModelHeaders={tickModelHeaders}
                        />
                    </li>
                ))}
            </ul>
            <ul className='p-2'>
                <h2 className='underline'>Route Info</h2>
                {routeHeaders.map((header, index) => (
                    <li key={index}>
                    <DbHeader
                    header={header}
                    setSelectedAcceptableHeader={setSelectedAcceptableHeader}
                    tickModelHeaders={tickModelHeaders}
                    />
                </li>
                ))}
            </ul>
            <ul className='p-2'>
                <h2 className='underline'>Non-Sport Specific</h2>
                {exerciseHeaders.map((header, index) => (
                    <li key={index}>
                    <DbHeader
                    header={header}
                    setSelectedAcceptableHeader={setSelectedAcceptableHeader}
                    tickModelHeaders={tickModelHeaders}
                    />
                </li>
                ))}
            </ul>
        </div>
    );
}