import { TotalRecords, TickModelHeaders } from "@ImportData/types/UITypes"

export async function handleAutomaticFieldMatch(
  totalRecords: TotalRecords,
  tickModelHeaders: TickModelHeaders
) {
  if (!totalRecords || !tickModelHeaders) return
  const matchedHeaders: Record<string, string> = {}
  const needsValidationMatchedHeaders: string[] = []

  const headers = Object.keys(totalRecords[0])
  headers.forEach((header: string) => {
    const lowerCsvHeader = header.trim().toLowerCase()
    const matchedTickModelHeader = tickModelHeaders.find(
      (header: Record<string, any>) =>
        header.name.toLowerCase() === lowerCsvHeader
    )

    if (matchedTickModelHeader) {
      if (matchedTickModelHeader.needsValidation) {
        needsValidationMatchedHeaders.push(header.toLowerCase())
      } else {
        matchedHeaders[matchedTickModelHeader.name] = header
      }
    }
  })

  return { matchedHeaders, needsValidationMatchedHeaders }
}
