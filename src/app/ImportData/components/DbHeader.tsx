





export function DbHeader( { header, setSelectedAcceptableHeader, tickModelHeaders }: DbHeaderProps) {
    const handleDbHeaderClick = () => {
        setSelectedAcceptableHeader(header);
    }
    
    const matchingHeader = tickModelHeaders.find(tickModelHeader => tickModelHeader.name === header);
    const required = matchingHeader?.required;

    return (
        <div onClick={handleDbHeaderClick} className={`${required ? 'border border-red-400 text-red-400 `' : ''}`}>
            <b>{header}</b>
        </div>
    )

}