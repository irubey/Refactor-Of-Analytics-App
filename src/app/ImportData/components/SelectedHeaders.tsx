import { UserHeaderCard } from './UserHeaderCard';
import { LinkButton } from './LinkButton';
import { DbHeaderCard } from './DbHeaderCard';
import { TickModelHeaders, TotalRecords, DateFormat, FileInfo } from '@ImportData/types/UITypes';

type SelectedHeadersProps = {
    selectedCsvHeader: string | null,
    selectedAcceptableHeader: string | null,
    dateFormat: DateFormat,
    totalRecords: TotalRecords,
    setDateFormat: React.Dispatch<React.SetStateAction<DateFormat>>,
    setSelectedCsvHeader: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedAcceptableHeader: React.Dispatch<React.SetStateAction<string | null>>,
    setMatchedHeaders: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    tickModelHeaders: TickModelHeaders,
    fileInfo: FileInfo,
    matchedHeaders: Record<string, string>
};

export function SelectedHeaders({ selectedCsvHeader, selectedAcceptableHeader, dateFormat, totalRecords, setDateFormat, setSelectedCsvHeader, setSelectedAcceptableHeader, setMatchedHeaders, tickModelHeaders, fileInfo, matchedHeaders }: SelectedHeadersProps) {
    return (
        <div className="col-span-9 grid grid-cols-9 border border-blue-500"> 
            <UserHeaderCard
            selectedCsvHeader={selectedCsvHeader}
            setSelectedCsvHeader={setSelectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            dateFormat={dateFormat}
            setDateFormat={setDateFormat}
            totalRecords={totalRecords}
            fileInfo={fileInfo}
            matchedHeaders={matchedHeaders}
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
