
import chainLink from '@static/chainLink.png';
import Image from 'next/image';




type MatchedHeadersProps = {
    matchedHeaders: Record<string, string>,
    requiredHeaders: string[],
    setSelectedAcceptableHeader: (header: string) => void,
    setSelectedCsvHeader: (header: string) => void,
    setMatchedHeaders: (headers: Record<string, string>) => void
};

export function MatchedHeaders({matchedHeaders, requiredHeaders, setSelectedAcceptableHeader, setSelectedCsvHeader, setMatchedHeaders}: MatchedHeadersProps) {
    
    const handleClick = (acceptable: string, csv: string) => {
        if (!csv || !acceptable) return;
        setSelectedAcceptableHeader(acceptable);
        setSelectedCsvHeader(csv);
        const newMatchedHeaders = { ...matchedHeaders };
        delete newMatchedHeaders[acceptable];
        setMatchedHeaders(newMatchedHeaders);
        }
    

    return (
        <div>
            <h1>
                Matched Headers
            </h1>
            <ul>
                {Object.entries(matchedHeaders).map(([acceptable, csv], index) => {
                    return (
                        <li  key={`${acceptable}-${index}`}>
                            {csv}
                            <button onClick={() => handleClick(acceptable, csv)}>
                                <Image src={chainLink} alt="linked icon" style={{ width:40, height:'auto'}}/>
                            </button>
                            {acceptable} 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}