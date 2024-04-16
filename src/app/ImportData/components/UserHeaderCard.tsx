import { useState, useEffect } from "react"
import { FileInfo, TotalRecords, DateFormat } from "@ImportData/types/UITypes"
import trashcan from '@static/trashcan.jpg';
import Image from 'next/image';

type UserHeaderCardProps = {
    selectedCsvHeader: string | null,
    setSelectedCsvHeader: React.Dispatch<React.SetStateAction<string | null>>,
    selectedAcceptableHeader: string | null,
    dateFormat: DateFormat,
    setDateFormat: React.Dispatch<React.SetStateAction<DateFormat>>,
    totalRecords: TotalRecords,
    fileInfo: FileInfo,
    matchedHeaders: Record<string, string>
}

export function UserHeaderCard({ selectedCsvHeader, setSelectedCsvHeader, selectedAcceptableHeader, dateFormat, setDateFormat, totalRecords, fileInfo, matchedHeaders}: UserHeaderCardProps) { 

    const [selectedHeaderData, setSelectedHeaderData] = useState<string[]>([])
    const [dontIncludeHeaders, setDontIncludeHeaders] = useState<string[]>([])
    const unmatchedUserHeaders = Object.keys(totalRecords[0]).filter((header) => !Object.values(matchedHeaders).includes(header))

    useEffect(() => {
        if (unmatchedUserHeaders.length && selectedCsvHeader) {
            const newSelectedHeaderData = totalRecords
                .map((record) => record[selectedCsvHeader])
                .filter((value) => value !== null)
                .filter((value, index, self) => self.indexOf(value) === index)
                .slice(0, 6);
            setSelectedHeaderData(newSelectedHeaderData);
        }
    }, [selectedCsvHeader]);

    useEffect(() => {
        if (!unmatchedUserHeaders.length) return;
        if (!selectedCsvHeader) {
            const firstUnmatchedCsvHeader = unmatchedUserHeaders[0];
            if (firstUnmatchedCsvHeader) {
                setSelectedCsvHeader(firstUnmatchedCsvHeader);
            }
        }
    }, [selectedCsvHeader, unmatchedUserHeaders, setSelectedCsvHeader])


    function handleDontInclude(event: React.MouseEvent<HTMLButtonElement>) {
        if (!selectedCsvHeader) return;
        setDontIncludeHeaders([...dontIncludeHeaders, selectedCsvHeader])
        const newMatchedHeaders = { ...matchedHeaders };
        delete newMatchedHeaders[selectedCsvHeader];
        setSelectedCsvHeader(null);
        setMatchedHeaders(newMatchedHeaders);
    }
    
    function validationButton() {
        switch (selectedAcceptableHeader) {
            case null:
                return
            case "date":
                return (
                    <select
                        onChange={(e) => setDateFormat(e.target.value)}
                        value={dateFormat}
                        required
                        >
                        <option value="" disabled>Select Format</option>
                        <option value="ymd">Year Month Day</option>
                        <option value="mdy">Month Day Year</option>
                        <option value="dmy">Day Month Year</option>
                    </select>
                );
            default:
                return null;
        }
    }
    


    return (
        <>
        <h1 className="col-start-2 col-span-3 justify-self-center truncate">
            Your Spreadsheet Field Information - {fileInfo.name}
        </h1>
        <div className="col-start-2 col-span-3 grid grid-cols-3 m-4 border-2 border-blue-500">
            <div className="col-start-1 col-span-3 flex justify-between items-end">
                <h2 className="underline capitalize">
                    {selectedCsvHeader}
                </h2>
    
                <div className="flex items-end">
                    {selectedCsvHeader && validationButton() && (
                        <div>
                            {validationButton()}
                        </div>
                    )}

                    <button 
                    onClick={handleDontInclude} 
                    className="ml-4 truncate bg-red-200"
                    >
                        <Image src={trashcan} alt="trashcan icon" style={{ width:40, height:'auto'}}/>
                    </button>
                </div>
            </div>
    

            {selectedHeaderData && (
                <>
                <ul className="col-start-1 row-start-3 col-span-3">
                    {selectedHeaderData.map((headerData, index) => (
                        <li className="truncate" key={`${headerData}-${index}`}>
                            {headerData}
                        </li>
                    ))}
                </ul>
                </>
            )}
        </div>
        </>
    );
    
    
}