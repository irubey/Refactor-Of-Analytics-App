import { useState, useEffect } from "react";
import { FileInfo, TotalRecords, DateFormat } from "@ImportData/types/UITypes";
import trashcan from '@static/trashcan.jpg';
import Image from 'next/image';

type UserHeaderCardProps = {
    selectedCsvHeader: string | null;
    setSelectedCsvHeader: React.Dispatch<React.SetStateAction<string | null>>;
    selectedAcceptableHeader: string | null;
    dateFormat: DateFormat;
    setDateFormat: React.Dispatch<React.SetStateAction<DateFormat>>;
    totalRecords: TotalRecords;
    fileInfo: FileInfo;
    matchedHeaders: Record<string, string>;
    setMatchedHeaders: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    dontIncludeHeaders: string[];
    setDontIncludeHeaders: React.Dispatch<React.SetStateAction<string[]>>;
};

export function UserHeaderCard({
    selectedCsvHeader, 
    setSelectedCsvHeader, 
    selectedAcceptableHeader, 
    dateFormat, 
    setDateFormat, 
    totalRecords, 
    fileInfo, 
    matchedHeaders,
    setMatchedHeaders,
    dontIncludeHeaders,
    setDontIncludeHeaders
}: UserHeaderCardProps) { 
    const [selectedHeaderData, setSelectedHeaderData] = useState<string[]>([]);
    

    // Compute unmatched headers dynamically and reactively
    const unmatchedUserHeaders = Object.keys(totalRecords[0]).filter(header => 
        !Object.values(matchedHeaders).includes(header) && !dontIncludeHeaders.includes(header)
    );

    useEffect(() => {
        if (unmatchedUserHeaders.length && selectedCsvHeader) {
            const newSelectedHeaderData = totalRecords
                .map((record) => record[selectedCsvHeader])
                .filter((value) => value !== null)
                .filter((value, index, self) => self.indexOf(value) === index)
                .slice(0, 12);
            setSelectedHeaderData(newSelectedHeaderData);
        }
    }, [selectedCsvHeader, totalRecords]);

    useEffect(() => {
        if (!unmatchedUserHeaders.length) return;
        if (!selectedCsvHeader) {
            const firstUnmatchedCsvHeader = unmatchedUserHeaders[0];
            if (firstUnmatchedCsvHeader) {
                setSelectedCsvHeader(firstUnmatchedCsvHeader);
            }
        }
    }, [selectedCsvHeader, unmatchedUserHeaders]);



    function handleDontInclude() {
        if (!selectedCsvHeader) return;
        setDontIncludeHeaders(prevHeaders => [...prevHeaders, selectedCsvHeader]);
        setSelectedCsvHeader(unmatchedUserHeaders.length > 1 ? unmatchedUserHeaders[1] : null);
    }

    function validationButton() {
        switch (selectedAcceptableHeader) {
            case null:
                return;
            case "date":
                return (
                    <select
                        onChange={(e) => setDateFormat(e.target.value as DateFormat)}
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
            <h2 className="col-start-2 col-span-3 justify-self-center truncate">
                Your Spreadsheet Field Information - {fileInfo.name}
            </h2>
            {selectedCsvHeader && (
            <div className="col-start-2 col-span-3 grid grid-cols-3 m-4 border-2 border-blue-500">
                <h2 className="col-start-2 h-8 justify-self-center self-center truncate">
                    {`Name of Field: '${selectedCsvHeader}'`}
                </h2>

                {selectedCsvHeader && validationButton() && (
                    <div>
                        {validationButton()}
                    </div>
                )}

                <button 
                    onClick={handleDontInclude}
                    className="row-start-1 col-start-3 justify-self-end self-center cursor-pointer"
                >
                    <Image src={trashcan} alt="trashcan icon" style={{ width:40, height:'auto'}}/>
                </button>

                {selectedHeaderData && (
                    <ul className="col-start-1 row-start-2 col-span-3 grid grid-cols-2 overflow-auto w-full h-40">
                        {selectedHeaderData.map((headerData, index) => (
                            <li className="truncate px-2 py-1" key={`${headerData}-${index}`}>
                                {headerData}
                            </li>
                        ))}
                    </ul>
                )}
            </div>)}
        </>
    );
}
