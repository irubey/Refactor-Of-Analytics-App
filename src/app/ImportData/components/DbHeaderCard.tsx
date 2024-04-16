import React, { useEffect, useState } from 'react'


type DbHeaderCardProps = {
    selectedAcceptableHeader: string | null,
    setAcceptableHeader: Function,
    tickModelHeaders: {
        name: string,
        description: string,
        exampleData: string[],
        category: string,
        needsValidation: boolean,
        required: boolean
    }[]
}


export function DbHeaderCard({ selectedAcceptableHeader, setAcceptableHeader, tickModelHeaders }: DbHeaderCardProps) {
    const [cardExampleData, setCardExampleData] = useState<string[]>([]);
    const [cardDescription, setCardDescription] = useState<string>('');


    useEffect(() => {
        if (!selectedAcceptableHeader) return
        if (selectedAcceptableHeader) {
            const selectedHeader = tickModelHeaders.find(header => header.name === selectedAcceptableHeader);
            if (selectedHeader) {
                setCardExampleData(selectedHeader.exampleData);
                setCardDescription(selectedHeader.description);
            }
        }
    }, [selectedAcceptableHeader, tickModelHeaders])
    
    return (
        <>
        <h2 className="col-start-6 col-span-3 row-start-1 justify-self-center truncate">
            Acceptable Database Fields
        </h2>
        {selectedAcceptableHeader && (
            <div className="col-start-6 col-span-3 grid m-4 border-2 border-blue-500">
                <h1 className="h-8 justify-self-center self-center">{`Name of Field: '${selectedAcceptableHeader}'`}</h1>
                <h2 className="truncate">{cardDescription}</h2>
                <ul>
                    {cardExampleData.map((example, index) => (
                        <li className='border' key={index}>{example}</li>
                    ))}
                </ul>
            </div>
        )}
        </>
    )
}
