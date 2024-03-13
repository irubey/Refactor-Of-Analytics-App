import { CsvPreviewDisplay } from "./CsvPreviewDisplay";
import { UnmatchedAcceptableFields } from "./UnmatchedAcceptableFields";
import { useState,useEffect } from "react";

type TickModelHeadersType = Record<string, boolean>
type FieldMatchingUIProps = {
    csvInfo: { header: string, count: number, percentage: number }[], 
    previewRecords: JSON[],
    setPreviewRecords: React.Dispatch<React.SetStateAction<JSON[]>>}

const tickModelHeaders: TickModelHeadersType = {
        routeName: true,
        date: true,
        routeLength: false,
        grade: false,
        discipline: false,
        attempts: true,
        sends: true,
        ascentStyle: false,
        leadStyle: false,
        dangerGrade: false,
        routeQuality: false,
        notes: false,
        routeCharacteristics: false,
        sessionCharacteristics: false,
        location: true,
        indoorsOrOutdoors: false,
        pitches: false,
}


export function FieldMatchingUI({ csvInfo, previewRecords, setPreviewRecords} : FieldMatchingUIProps ) {
    const [matchedHeaders, setMatchedHeaders] = useState<string[]>([]);
    const [unmatchedHeaders, setUnmatchedHeaders] = useState<string[]>([]);
    const [selectedHeader, setSelectedHeader] = useState<string | null>(null);
    

    useEffect(() => {
        csvInfo.forEach((csvInfo) => {
            handleHeaderMatch(csvInfo.header);
        });
    }, [csvInfo]);


    function handleHeaderMatch(header: string) {
        if (!header) return;
        const lowerHeader = header.trim().toLowerCase()
        if (lowerHeader in tickModelHeaders) {
            setMatchedHeaders(prevMatchedHeaders => {
                if (!prevMatchedHeaders.includes(lowerHeader)) {
                    return [...prevMatchedHeaders, lowerHeader];
                }
                return prevMatchedHeaders;
            });
        } else {
            setUnmatchedHeaders(prevUnmatchedHeaders => {
                if (!prevUnmatchedHeaders.includes(lowerHeader)) {
                    return [...prevUnmatchedHeaders, lowerHeader];
                }
                return prevUnmatchedHeaders;
            });
        }
    }


    return (
        <>

            <UnmatchedAcceptableFields 
            setSelectedHeader={setSelectedHeader}
            selectedHeader={selectedHeader} 
            tickModelHeaders={tickModelHeaders}  
            matchedHeaders={matchedHeaders} 
            unmatchedHeaders={unmatchedHeaders}  />

            <CsvPreviewDisplay 
            csvInfo={csvInfo}
            matchedHeaders={matchedHeaders} 
            unmatchedHeaders={unmatchedHeaders}
            previewRecords={previewRecords}
            setPreviewRecords={setPreviewRecords}
            selectedHeader={selectedHeader}
            />


        </>
    );
}