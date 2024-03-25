import { CsvHeaders } from "./CsvHeaders";
import { SubmitNewDataButton } from "./SubmitNewDataButton";
import { AcceptableHeaders } from "./AcceptableHeaders";
import { useState, useEffect} from "react";
import { MatchedHeaders } from "./MatchedHeaders";
import { MatchButton } from "./MatchButton";
import { StylingElements } from "./StylingElements";

type TickModelHeadersType = Record<string, boolean>
type FieldMatchingUIProps = {
    csvInfo: { header: string, count: number, percentage: number }[],
    totalRecords: Record<string, any>[]
}

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

const requiredHeaders = Object.keys(tickModelHeaders).filter(header => tickModelHeaders[header as keyof typeof tickModelHeaders])

export function FieldMatchingUI({ csvInfo, totalRecords } : FieldMatchingUIProps ) {
    const [matchedHeaders, setMatchedHeaders] = useState<Record<string,string>>({});
    const [unmatchedHeaders, setUnmatchedHeaders] = useState<string[]>([]);
    const [selectedAcceptableHeader, setSelectedAcceptableHeader] = useState<string | null>(null);
    const [selectedCsvHeader, setSelectedCsvHeader] = useState<string | null>(null);
    
    const totalMatched: number = matchedHeaders ? Object.keys(matchedHeaders).length : 0;
    const percentComplete = totalMatched ? totalMatched / csvInfo.length * 100 : 0;

    useEffect(() => {
        csvInfo.forEach((record) => {
            handleInitialHeaderMatch(record.header);
        });
    }, [csvInfo]);

    useEffect(() => {
        if (!selectedCsvHeader) {
            const firstUnmatchedCsvHeader = csvInfo.find(({ header }) => !Object.keys(matchedHeaders).includes(header));
            if (firstUnmatchedCsvHeader) {
                setSelectedCsvHeader(firstUnmatchedCsvHeader.header);
            }
        }
        if (!selectedAcceptableHeader) {
            const firstUnmatchedAcceptableHeader = Object.keys(tickModelHeaders).find(header => !(header in matchedHeaders));
            if (firstUnmatchedAcceptableHeader) {
                setSelectedAcceptableHeader(firstUnmatchedAcceptableHeader);
            }
        }
    },[])

    function handleInitialHeaderMatch(csvHeader: string):void {
        if (!csvHeader) return;
        const lowerCsvHeader = csvHeader.trim().toLowerCase();
        const matchedTickModelHeader = Object.keys(tickModelHeaders).find(header => header.toLowerCase() === lowerCsvHeader);
    
        if (matchedTickModelHeader) {
            setMatchedHeaders(prevMatchedHeaders => {
                return { ...prevMatchedHeaders, [matchedTickModelHeader]: csvHeader };
            });
        } else {
            setUnmatchedHeaders(prevUnmatchedHeaders => {
                return [ ...prevUnmatchedHeaders, csvHeader ];
            });
        }
    }


    return (
        <>
            <MatchedHeaders 
            matchedHeaders={matchedHeaders}
            requiredHeaders={requiredHeaders}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            setSelectedCsvHeader={setSelectedCsvHeader}
            setMatchedHeaders={setMatchedHeaders}  
            />

            <AcceptableHeaders 
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}   
            matchedHeaders={matchedHeaders} 
            unmatchedHeaders={unmatchedHeaders} 
            tickModelHeaders={tickModelHeaders} 
            />

            <MatchButton selectedCsvHeader={selectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            setMatchedHeaders={setMatchedHeaders}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            setSelectedCsvHeader={setSelectedCsvHeader}
            />

            <CsvHeaders 
            setSelectedCsvHeader={setSelectedCsvHeader}
            selectedCsvHeader={selectedCsvHeader}
            matchedHeaders={matchedHeaders} 
            unmatchedHeaders={unmatchedHeaders}
            csvInfo={csvInfo}
            totalRecords={totalRecords}
            />

            <StylingElements />

            {/* <h1>{percentComplete} % matched</h1> */}


            <SubmitNewDataButton matchedHeaders={matchedHeaders} totalRecords={totalRecords}/>
        </>
    );
}