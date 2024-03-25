import styles from './ImportData.module.css'
import { useState, useEffect, useRef } from 'react';

type HeaderProps = {
    setSelectedAcceptableHeader?: Function,
    selectedAcceptableHeader?: string | null,
    setSelectedCsvHeader?: Function,
    selectedCsvHeader?: string | null,
    header: string,
    type: string,
    source: string,
    totalRecords?: Record<string, any>[]
}

const acceptableHeadersExample: Record<string,string[]> = {
    routeName: ["Name of Route", "The Nose","Biographie", "Freeway"],
    date: ["Date of Record", "01/01/2021","2021-01-01"],
    routeLength: ["Route Length","55","55m","55ft"],
    grade: ["Difficulty Grade", "V3","5.10a", "5.10-", "5.10a/b", "6b+", "6b/+"],
    discipline: ["What Kind of Climbing","Boulder", "Lead", "Sport", "Trad", "Solo"],
    attempts: ["Attempts that were not clean","0","1"],
    sends: ["Clean Ascents","0","1"],
    ascentStyle: ["Style of Ascent","Flash","Onsight","Redpoint", "Send"],
    dangerGrade: ["Danger Rating","PG13","R","X"],
    routeQuality: ["Your Opinion of the Route",".75","5","10"],
    notes: ["Beta or Notes on Climb"],
    routeCharacteristics: ["Characteristics of the Route","Endurance", "Power", "Overhanging", "Crimpy", "Slabby", "Pumpy"],
    sessionCharacteristics: ["Characteristics of the Session","Good Conditions", "Bad Conditions", "Tired", "Fresh", "Injured", "Sick"],
    location: ["Location", "Clear Creek Canyon", "Boulder Canyon", "The Gunks", "The Red", "The New", "The Creek"],
    indoorsOrOutdoors: ["Gym or Crag","Gym", "Crag"],
    pitches: ["Pitches Climbed","1","2","3","4","5","6","7","8","9","10"],
    leadStyle: ["Style of Lead","Onsight","Flash","Redpoint", "Send"]
}



export function Header(props: HeaderProps) {

    const {source} = props

    let setSelectedAcceptableHeader: Function | undefined,
    selectedAcceptableHeader: string | null | undefined,
    header: string,
    type: string,
    setSelectedCsvHeader: Function | undefined,
    selectedCsvHeader: string | null | undefined,
    totalRecords: Record<string, any>[] | undefined

    if (source === "acceptable") {
        ({ setSelectedAcceptableHeader, selectedAcceptableHeader, header, type } = props)}
    else if (source === "csv"){
        ({ setSelectedCsvHeader, selectedCsvHeader, header, type, totalRecords } = props)}
    else {return null}

    const [showAcceptableInfo, setShowAcceptableInfo] = useState(false)
    const [showCsvInfo, setShowCsvInfo] = useState(false)
    const acceptableHeaderRef = useRef<HTMLDivElement>(null);
    const csvHeaderRef = useRef<HTMLDivElement>(null);

    const typeStyles: Record<string,string> = {
        matched: styles.matchedHeader,
        unmatched: styles.unmatchedHeader,
        selected: styles.selectedHeader
    }

    useEffect(() => {
        if (selectedAcceptableHeader === header) {
            setShowAcceptableInfo(true);
        } else {
            setShowAcceptableInfo(false);
        }
    }, [selectedAcceptableHeader]);

    useEffect(() => {
        if (selectedCsvHeader === header) {
            setShowCsvInfo(true)
        } else {
            setShowCsvInfo(false);
        }
    }, [selectedCsvHeader]);


    function handleSelectAcceptableHeader() {
        const header = acceptableHeaderRef.current?.textContent;
        if (header === selectedAcceptableHeader) {
            if (setSelectedAcceptableHeader) {
                setSelectedAcceptableHeader(null);
            }
        } else {
            if (setSelectedAcceptableHeader) {
                setSelectedAcceptableHeader(header);
            }
        }
    }

    function handleSelectCsvHeader() {
        const header = csvHeaderRef.current?.textContent;
        console.log(header)
        console.log(totalRecords)
        if (header === selectedCsvHeader) {
            if (setSelectedCsvHeader) {
                setSelectedCsvHeader(null);
            }
        } else {
            if (setSelectedCsvHeader) {
                setSelectedCsvHeader(header);
            }
        }
    }

    function handleInfoBoxClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }

    function getFirstFiveValues() {
        if (!totalRecords) console.log('No records')
        if (!totalRecords) return
        const values = totalRecords.map(record => record[header]);
        const nonNullValues = values.filter(value => value !== null);
        const uniqueValues = nonNullValues.filter((value, index, self) => self.indexOf(value) === index);
        const firstFiveValues = uniqueValues.slice(0, 5);
    
        return firstFiveValues;
    }

    return (
        <li className={typeStyles[type]}>
            {(source === "acceptable") &&
                <div onClick={handleSelectAcceptableHeader}>
                    <div ref={acceptableHeaderRef}>{header}</div>
                    {showAcceptableInfo && acceptableHeadersExample[header] && (
                        <div onClick={handleInfoBoxClick} className={styles.infoBox}>
                            {acceptableHeadersExample[header].map((example, index) => (
                                <p key={index}>{example}</p>
                            ))}
                        </div>
                    )}
                </div>
            }
            {(source === "csv") &&
                <div onClick={handleSelectCsvHeader}>
                    <div ref={csvHeaderRef}>{header}</div>
                    {showCsvInfo && totalRecords && (
                        <div onClick={handleInfoBoxClick} className={styles.infoBox}>
                            {
                                getFirstFiveValues()?.map((value, index) => (
                                    <p key={index}>{value}</p>
                                ))
                            }
                        </div>
                    )}
                </div>
            }
        </li>
    );
}
