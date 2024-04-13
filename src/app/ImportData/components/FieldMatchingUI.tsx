import { SelectedHeaders } from "./SelectedHeaders";
import { SubmitNewDataButton } from "./SubmitNewDataButton";
import { AcceptableHeaders } from "./AcceptableHeaders";
import { useState} from "react";
import { MatchedHeaders } from "./MatchedHeaders";
import { FileInfo, TotalRecords, TickModelHeaders } from "@ImportData/types/UITypes";




type FieldMatchingUIProps = {
    totalRecords: TotalRecords,
    fileInfo: FileInfo,
    needsValidationMatchedHeaders: string[],
    matchedHeaders: Record<string, string>,
    setMatchedHeaders: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    tickModelHeaders: TickModelHeaders
}



export function FieldMatchingUI({ totalRecords, fileInfo, needsValidationMatchedHeaders, matchedHeaders, setMatchedHeaders, tickModelHeaders } : FieldMatchingUIProps ) {   
    const [selectedAcceptableHeader, setSelectedAcceptableHeader] = useState<string | null>(null);
    const [selectedCsvHeader, setSelectedCsvHeader] = useState<string | null>(null);
    const [dateFormat, setDateFormat] = useState<''| 'ymd' | 'mdy' | 'dmy'>('');
    const [userHeaders, setUserHeaders] = useState<string[]>([]);


    return (
        <div className="grid gap-1 grid-cols-9 align-middle">
            <MatchedHeaders 
            matchedHeaders={matchedHeaders}
            needsValidationMatchedHeaders={needsValidationMatchedHeaders}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            setSelectedCsvHeader={setSelectedCsvHeader}
            setMatchedHeaders={setMatchedHeaders}
            />

            <SelectedHeaders
            selectedCsvHeader={selectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            dateFormat={dateFormat}
            totalRecords={totalRecords}
            setDateFormat={setDateFormat}
            setSelectedCsvHeader={setSelectedCsvHeader}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            setMatchedHeaders={setMatchedHeaders}
            tickModelHeaders={tickModelHeaders}
            fileInfo={fileInfo}
            matchedHeaders={matchedHeaders}
            />

            <AcceptableHeaders 
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}   
            matchedHeaders={matchedHeaders} 
            tickModelHeaders={tickModelHeaders} 
            />

            <SubmitNewDataButton 
            matchedHeaders={matchedHeaders} 
            totalRecords={totalRecords} 
            dateFormat={dateFormat}
            fileInfo={fileInfo}
            />




        </div>
    )}
