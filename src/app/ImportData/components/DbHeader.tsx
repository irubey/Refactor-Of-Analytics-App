import { TickModelHeaders } from "@ImportData/types/UITypes"

type DbHeaderProps = {
  header: string
  setSelectedAcceptableHeader: React.Dispatch<
    React.SetStateAction<string | null>
  >
  tickModelHeaders: TickModelHeaders
}

export function DbHeader({
  header,
  setSelectedAcceptableHeader,
  tickModelHeaders,
}: DbHeaderProps) {
  const handleDbHeaderClick = () => {
    setSelectedAcceptableHeader(header)
  }

  const matchingHeader = tickModelHeaders.find(
    (tickModelHeader) => tickModelHeader.name === header
  )
  const required = matchingHeader?.required

  return (
    <div
      onClick={handleDbHeaderClick}
      className={`${
        required
          ? "border border-red-400 border-dashed text-red-400"
          : "text-green-300"
      }`}
    >
      <b>{header}</b>
    </div>
  )
}
