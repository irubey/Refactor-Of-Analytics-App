import { SelectedHeaders } from "./SelectedHeaders"
import { SubmitNewDataButton } from "./SubmitNewDataButton"
import { AcceptableHeaders } from "./AcceptableHeaders"
import { useEffect, useState } from "react"
import { MatchedHeaders } from "./MatchedHeaders"
import { CompletionBar } from "@ImportData/components/CompletionBar"
import {
  FileInfo,
  TotalRecords,
  TickModelHeaders,
} from "@ImportData/types/UITypes"

type FieldMatchingUIProps = {
  totalRecords: TotalRecords
  fileInfo: FileInfo
  needsValidationMatchedHeaders: string[]
  matchedHeaders: Record<string, string>
  setMatchedHeaders: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >
  tickModelHeaders: TickModelHeaders
}

export function FieldMatchingUI({
  totalRecords,
  fileInfo,
  needsValidationMatchedHeaders,
  matchedHeaders,
  setMatchedHeaders,
  tickModelHeaders,
}: FieldMatchingUIProps) {
  const [selectedAcceptableHeader, setSelectedAcceptableHeader] = useState<
    string | null
  >(null)
  const [selectedCsvHeader, setSelectedCsvHeader] = useState<string | null>(
    null
  )
  const [dateFormat, setDateFormat] = useState<"" | "ymd" | "mdy" | "dmy">("")
  const [dontIncludeHeaders, setDontIncludeHeaders] = useState<string[]>([])

  let percentComplete =
    ((Object.keys(matchedHeaders).length + dontIncludeHeaders.length) /
      Object.keys(totalRecords[0]).length) *
    100

  return (
    <div className="">
      <CompletionBar hasRecords={true} percentComplete={percentComplete} />

      <MatchedHeaders
        matchedHeaders={matchedHeaders}
        setSelectedAcceptableHeader={setSelectedAcceptableHeader}
        setSelectedCsvHeader={setSelectedCsvHeader}
        setMatchedHeaders={setMatchedHeaders}
      />

      {percentComplete < 100 && (
        <div className="grid grid-cols-9">
          <SelectedHeaders
            selectedCsvHeader={selectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            dateFormat={dateFormat}
            totalRecords={totalRecords}
            setDateFormat={setDateFormat}
            setSelectedCsvHeader={setSelectedCsvHeader}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            setMatchedHeaders={setMatchedHeaders}
            tickModelHeaders={tickModelHeaders}
            fileInfo={fileInfo}
            matchedHeaders={matchedHeaders}
            dontIncludeHeaders={dontIncludeHeaders}
            setDontIncludeHeaders={setDontIncludeHeaders}
            needsValidationMatchedHeaders={needsValidationMatchedHeaders}
          />

          <AcceptableHeaders
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            matchedHeaders={matchedHeaders}
            tickModelHeaders={tickModelHeaders}
          />
        </div>
      )}

      {percentComplete === 100 && (
        <div className="grid grid-cols-9">
          <SubmitNewDataButton
            matchedHeaders={matchedHeaders}
            totalRecords={totalRecords}
            dateFormat={dateFormat}
            fileInfo={fileInfo}
          />
        </div>
      )}
    </div>
  )
}
