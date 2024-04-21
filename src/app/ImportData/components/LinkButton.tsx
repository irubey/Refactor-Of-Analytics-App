import { DateFormat } from "@ImportData/types/UITypes"
import Image from "next/image"
import chainLink from "@static/chainLink.png"
import brokenChainLink from "@static/brokenChainLink.png"

type LinkButtonProps = {
  selectedCsvHeader: string | null
  selectedAcceptableHeader: string | null
  setMatchedHeaders: Function
  setSelectedCsvHeader: Function
  setSelectedAcceptableHeader: Function
  isHeaderNeedsValidation: boolean
  dateFormat?: DateFormat
}

export function LinkButton({
  selectedCsvHeader,
  selectedAcceptableHeader,
  setMatchedHeaders,
  setSelectedCsvHeader,
  setSelectedAcceptableHeader,
  isHeaderNeedsValidation,
  dateFormat,
}: LinkButtonProps) {
  function handleUserSelectedHeaderMatch() {
    if (!selectedCsvHeader || !selectedAcceptableHeader) return
    if (selectedAcceptableHeader === "date" && !dateFormat) {
      alert("Please select a date format")
      return
    }
    setMatchedHeaders((prevMatchedHeaders: Record<string, string>) => ({
      ...prevMatchedHeaders,
      [selectedAcceptableHeader]: selectedCsvHeader,
    }))
    setSelectedAcceptableHeader(null)
    setSelectedCsvHeader(null)
  }

  return (
    <div className="flex justify-center">
      {selectedCsvHeader && selectedAcceptableHeader && (
        <button
          disabled={isHeaderNeedsValidation}
          onClick={handleUserSelectedHeaderMatch}
        >
          <Image
            src={isHeaderNeedsValidation ? brokenChainLink : chainLink}
            alt={isHeaderNeedsValidation ? "broken chain link" : "linked icon"}
            style={{ width: "auto", height: "auto" }}
          />
        </button>
      )}
    </div>
  )
}
