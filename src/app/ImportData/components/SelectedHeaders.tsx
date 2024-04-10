import { UserHeaderCard } from './UserHeaderCard';
import { LinkButton } from './LinkButton';
import { DbHeaderCard } from './DbHeaderCard';

type SelectedHeadersProps = {
    selectedCsvHeader: string | null,
    selectedAcceptableHeader: string | null,
    dateFormat?: ''| 'ymd' | 'mdy' | 'dmy',
    totalRecords: Record<string, any>[],
    setDateFormat: Function,
    setSelectedCsvHeader: Function,
    setSelectedAcceptableHeader: Function,
    setMatchedHeaders: Function,
    unmatchedUserHeaders: string[],
    tickModelHeaders: {
        name: string,
        description: string,
        exampleData: string[],
        category: string,
        needsValidation: boolean,
        required: boolean
    }[]
    
};

export function SelectedHeaders({ selectedCsvHeader, selectedAcceptableHeader, dateFormat, totalRecords, setDateFormat, setSelectedCsvHeader, setSelectedAcceptableHeader, setMatchedHeaders, unmatchedUserHeaders, tickModelHeaders }: SelectedHeadersProps) {
    return (
        <div className="col-span-9 grid grid-cols-3 border border-blue-500"> 
            <UserHeaderCard
            selectedCsvHeader={selectedCsvHeader}
            setSelectedCsvHeader={setSelectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            unmatchedUserHeaders={unmatchedUserHeaders}
            dateFormat={dateFormat}
            setDateFormat={setDateFormat}
            totalRecords={totalRecords}
            />

            <LinkButton
            selectedCsvHeader={selectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            setMatchedHeaders={setMatchedHeaders}
            setSelectedCsvHeader={setSelectedCsvHeader}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            dateFormat={dateFormat}
            />

            <DbHeaderCard
            selectedAcceptableHeader={selectedAcceptableHeader}
            setAcceptableHeader={setSelectedAcceptableHeader}
            tickModelHeaders={tickModelHeaders}
            />
        </div>
    )
}
