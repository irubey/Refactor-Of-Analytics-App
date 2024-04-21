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
            <div className="col-start-6 col-span-3 grid grid-cols-3  m-4 border-2 border-blue-500">
                <h2 className="col-start-1 col-span-3 h-8 justify-self-center self-center">
                    {`Name of Field: '${selectedAcceptableHeader}'`}
                </h2>
                {/* <h2 className="truncate">{cardDescription}</h2> */}
                <ul className='col-start-1 row-start-2 col-span-3 grid grid-cols-1 overflow-auto w-full h-40'>
                    {cardExampleData.map((example, index) => (
                        <li className='truncate px-2 py-1' key={index}>{example}</li>
                    ))}
                </ul>
            </div>
        )}
        </>
    )
}
