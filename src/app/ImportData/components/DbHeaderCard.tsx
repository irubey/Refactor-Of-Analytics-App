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
    const [cardCategory, setCardCategory] = useState<string>('');


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
        <div className="col-start-6 col-span-2 first-line:border m-4 border-green-300">
            {selectedAcceptableHeader && (
                <>
                    <h1 className="text-blue-300 font-bold underline">{selectedAcceptableHeader}</h1>
                    <h2 className="truncate">{cardDescription}</h2>
                    <ul>
                        {cardExampleData.map((example, index) => (
                            <li className='border' key={index}>{example}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
