import { UserHeaderCard } from "./UserHeaderCard"
import { LinkButton } from "./LinkButton"
import { DbHeaderCard } from "./DbHeaderCard"
import {
  TickModelHeaders,
  TotalRecords,
  DateFormat,
  FileInfo,
} from "@ImportData/types/UITypes"
import { SubmitNewDataButton } from "./SubmitNewDataButton" // Ensure this is used if imported
import { useState } from "react"
import { DataValidationButton } from "./DataValidationButton"

type SelectedHeadersProps = {
  selectedCsvHeader: string | null
  selectedAcceptableHeader: string | null
  dateFormat: DateFormat
  totalRecords: TotalRecords
  setDateFormat: React.Dispatch<React.SetStateAction<DateFormat>>
  setSelectedCsvHeader: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedAcceptableHeader: React.Dispatch<
    React.SetStateAction<string | null>
  >
  setMatchedHeaders: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >
  tickModelHeaders: TickModelHeaders
  fileInfo: FileInfo
  matchedHeaders: Record<string, string>
  dontIncludeHeaders: string[]
  setDontIncludeHeaders: React.Dispatch<React.SetStateAction<string[]>>
  needsValidationMatchedHeaders: string[]
}

export function SelectedHeaders({
  selectedCsvHeader,
  selectedAcceptableHeader,
  dateFormat,
  totalRecords,
  setDateFormat,
  setSelectedCsvHeader,
  setSelectedAcceptableHeader,
  setMatchedHeaders,
  tickModelHeaders,
  fileInfo,
  matchedHeaders,
  dontIncludeHeaders,
  setDontIncludeHeaders,
  needsValidationMatchedHeaders,
}: SelectedHeadersProps) {
  const isHeaderNeedsValidation = selectedAcceptableHeader
    ? needsValidationMatchedHeaders.includes(
        selectedAcceptableHeader.toLowerCase()
      )
    : false

  console.log(selectedAcceptableHeader, needsValidationMatchedHeaders)

  return (
    <>
      <div className="col-span-5 col-start-3 grid grid-cols-9 border border-blue-500">
        <UserHeaderCard
          selectedCsvHeader={selectedCsvHeader}
          setSelectedCsvHeader={setSelectedCsvHeader}
          selectedAcceptableHeader={selectedAcceptableHeader}
          dateFormat={dateFormat}
          setDateFormat={setDateFormat}
          totalRecords={totalRecords}
          fileInfo={fileInfo}
          matchedHeaders={matchedHeaders}
          setMatchedHeaders={setMatchedHeaders}
          dontIncludeHeaders={dontIncludeHeaders}
          setDontIncludeHeaders={setDontIncludeHeaders}
        />
        <div className="flex flex-col justify-evenly justify-items-center items-center">
          {isHeaderNeedsValidation && (
            <DataValidationButton
              dateFormat={dateFormat}
              setDateFormat={setDateFormat}
              selectedAcceptableHeader={selectedAcceptableHeader}
              selectedCsvHeader={selectedCsvHeader}
            />
          )}

          <LinkButton
            selectedCsvHeader={selectedCsvHeader}
            selectedAcceptableHeader={selectedAcceptableHeader}
            setMatchedHeaders={setMatchedHeaders}
            setSelectedCsvHeader={setSelectedCsvHeader}
            setSelectedAcceptableHeader={setSelectedAcceptableHeader}
            dateFormat={dateFormat}
            isHeaderNeedsValidation={isHeaderNeedsValidation}
          />
        </div>

        <DbHeaderCard
          selectedAcceptableHeader={selectedAcceptableHeader}
          setAcceptableHeader={setSelectedAcceptableHeader}
          tickModelHeaders={tickModelHeaders}
        />
      </div>
    </>
  )
}
