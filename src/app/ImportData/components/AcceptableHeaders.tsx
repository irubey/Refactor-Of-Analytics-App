import React, { useState, useEffect } from 'react';
import { DbHeader } from './DbHeader';
import { TickModelHeaders } from '@ImportData/types/UITypes';

type AcceptableHeadersProps = {
    setSelectedAcceptableHeader: React.Dispatch<React.SetStateAction<string | null>>,
    selectedAcceptableHeader: string | null,
    matchedHeaders: Record<string, string>,
    tickModelHeaders: TickModelHeaders
}

export function AcceptableHeaders({
    setSelectedAcceptableHeader, 
    selectedAcceptableHeader, 
    matchedHeaders, 
    tickModelHeaders
}: AcceptableHeadersProps) {
    const [sessionHeaders, setSessionHeaders] = useState<string[]>([]);
    const [routeHeaders, setRouteHeaders] = useState<string[]>([]);
    const [exerciseHeaders, setExerciseHeaders] = useState<string[]>([]);
    const [tooltip, setTooltip] = useState<{ x: number, y: number, name: string, description: string } | null>(null);

    useEffect(() => {
        setSessionHeaders(tickModelHeaders
            .filter(header => header.category === "session" && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
        setRouteHeaders(tickModelHeaders
            .filter(header => header.category === "route" && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
        setExerciseHeaders(tickModelHeaders
            .filter(header => header.category === "other" && selectedAcceptableHeader !== header.name)
            .map(header => header.name));
    }, [selectedAcceptableHeader, tickModelHeaders]);

    const handleMouseEnter = (header: string, event: React.MouseEvent) => {
        const description = tickModelHeaders.find(tickHeader => tickHeader.name === header)?.description || 'No description available.';
        setTooltip({
            x: event.clientX,
            y: event.clientY,
            name: header,
            description
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <div className='col-span-3 col-start-4 flex justify-between relative'>
            {tooltip && (
                <div 
                    className="tooltip fixed bg-white p-2 border rounded shadow-lg text-sm pointer-events-none z-50"
                    style={{ 
                        left: `${tooltip.x}px`, 
                        top: `${tooltip.y}px`, 
                        transform: 'translate(-50%, -60px)'
                    }}>
                    <h1 className='font-bold text-center'>{`${tooltip.name}`}</h1>
                    {`${tooltip.description}`}
                </div>
            )}
            <ul className='p-2'>
                <h2 className='underline'>Session Info</h2>
                {sessionHeaders.map((header, index) => (
                    <li 
                        key={index} 
                        onMouseEnter={(e) => handleMouseEnter(header, e)} 
                        onMouseLeave={handleMouseLeave}
                        className="hover:bg-gray-100 cursor-pointer">
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
                    <li 
                        key={index} 
                        onMouseEnter={(e) => handleMouseEnter(header, e)} 
                        onMouseLeave={handleMouseLeave}
                        className="hover:bg-gray-100 cursor-pointer">
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
                    <li 
                        key={index} 
                        onMouseEnter={(e) => handleMouseEnter(header, e)} 
                        onMouseLeave={handleMouseLeave}
                        className="hover:bg-gray-100 cursor-pointer">
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
