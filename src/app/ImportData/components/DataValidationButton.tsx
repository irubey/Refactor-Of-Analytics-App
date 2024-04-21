import { DateFormat } from "@ImportData/types/UITypes"

type DataValidationButtonProps = {
  dateFormat: DateFormat
  setDateFormat: React.Dispatch<React.SetStateAction<DateFormat>>
  selectedAcceptableHeader: string | null
  selectedCsvHeader: string | null
}

export function DataValidationButton({
  dateFormat,
  setDateFormat,
  selectedAcceptableHeader,
  selectedCsvHeader,
}: DataValidationButtonProps) {
  function validationButton() {
    switch (selectedAcceptableHeader) {
      case null:
        return
      case "Date":
        return (
          <select
            onChange={(e) => setDateFormat(e.target.value as DateFormat)}
            value={dateFormat}
            required
          >
            <option value="" disabled>
              Select Format
            </option>
            <option value="ymd">Year Month Day</option>
            <option value="mdy">Month Day Year</option>
            <option value="dmy">Day Month Year</option>
          </select>
        )
      default:
        return null
    }
  }

  const buttonElement = validationButton()

  return <>{selectedCsvHeader && buttonElement && <div>{buttonElement}</div>}</>
}
