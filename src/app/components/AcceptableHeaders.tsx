import React from 'react';
import { DbHeader } from './DbHeader'

import { useState, useEffect } from 'react';

type TickModelHeadersType = {
    name: string,
    description: string,
    exampleData: string[],
    category: string,
    needsValidation: boolean,
    required: boolean
}[]

type UnmatchedAcceptableFieldsProps = {
    setSelectedAcceptableHeader: Function,
    selectedAcceptableHeader: string | null,
    matchedHeaders:  Record<string, string>,
    unmatchedUserHeaders: string[],
    tickModelHeaders: TickModelHeadersType
}


export function AcceptableHeaders({ setSelectedAcceptableHeader,  selectedAcceptableHeader, matchedHeaders, unmatchedUserHeaders, tickModelHeaders }: UnmatchedAcceptableFieldsProps) {
    const [sessionHeaders, setSessionHeaders] = useState<string[]>([]);
    const [routeHeaders, setRouteHeaders] = useState<string[]>([]);
    const [exerciseHeaders, setExerciseHeaders] = useState<string[]>([]);

    useEffect(() => {
        setSessionHeaders(tickModelHeaders
            .filter(header => header.category === "session" && !(header.name in matchedHeaders) && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, matchedHeaders])

    useEffect(() => {
        setRouteHeaders(tickModelHeaders
            .filter(header => header.category === "route" && !(header.name in matchedHeaders) && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, matchedHeaders])

    useEffect(() => {
        setExerciseHeaders(tickModelHeaders
            .filter(header => header.category === "other" && !(header.name in matchedHeaders) && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, matchedHeaders])



    return (
        <div>
            <ul>
                <h2 className='underline'>Session</h2>
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
            <ul>
                <h2 className='underline'>Route</h2>
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
            <ul>
                <h2 className='underline'>Exercise</h2>
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