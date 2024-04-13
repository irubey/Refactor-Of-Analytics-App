import {DateFormat} from '@ImportData/types/UITypes';
import Image from 'next/image';
import chainLink from '@static/chainLink.png';

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
        <div className='flex justify-center'>
            {selectedCsvHeader && selectedAcceptableHeader && (
            <button 
            onClick={handleUserSelectedHeaderMatch}>
                <Image src={chainLink} alt="linked icon" style={{ width:'auto', height:'auto'}}/>
            </button>
            )}
        </div>
    )
}

