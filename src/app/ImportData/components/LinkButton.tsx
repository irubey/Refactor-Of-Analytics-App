import {DateFormat} from '@ImportData/types/UITypes';

type LinkButtonProps = {
    selectedCsvHeader: string | null,
    selectedAcceptableHeader: string | null,
    setMatchedHeaders: Function,
    setSelectedCsvHeader: Function,
    setSelectedAcceptableHeader: Function
    dateFormat?: DateFormat
}

export function LinkButton({ selectedCsvHeader, selectedAcceptableHeader, setMatchedHeaders, setSelectedCsvHeader, setSelectedAcceptableHeader, dateFormat}: LinkButtonProps) {
    function handleUserSelectedHeaderMatch() {
        if (!selectedCsvHeader || !selectedAcceptableHeader) return;
        if (selectedAcceptableHeader == 'date' && !dateFormat){
            alert('Please select a date format')
            return;
        }
        setMatchedHeaders((prevMatchedHeaders: Record<string,string>)=> {
            return ({...prevMatchedHeaders, [selectedAcceptableHeader]: selectedCsvHeader});
        })
        setSelectedAcceptableHeader(null)
        setSelectedCsvHeader(null)
        
    }
    return (
        <>
            {selectedCsvHeader && selectedAcceptableHeader && (
            <button 
            onClick={handleUserSelectedHeaderMatch}>
            Link
            </button>
            )}
            {(!selectedCsvHeader || !selectedAcceptableHeader) && (
                <div className='border'>
                    Please Select a header from both sides
                </div>
            )}
        </>
    )
}

