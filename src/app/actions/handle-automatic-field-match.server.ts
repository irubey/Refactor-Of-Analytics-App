export async function handleAutomaticFieldMatch(
  totalRecords: Record<string, any>[],
  tickModelHeaders: Record<string, any>[]
) {
  if (!totalRecords || !tickModelHeaders) return
  const matchedHeaders: Record<string, string> = {}
  const needsValidationMatchedHeaders: string[] = []

  totalRecords[0].forEach((header: string) => {
    const lowerCsvHeader = header.trim().toLowerCase()
    const matchedTickModelHeader = tickModelHeaders.find(
      (header: Record<string, any>) => header.name === lowerCsvHeader
    )

    if (matchedTickModelHeader) {
      if (matchedTickModelHeader.needsValidation) {
        needsValidationMatchedHeaders.push(header)
      } else {
        matchedHeaders[matchedTickModelHeader.name] = header
      }
    }
  })

  return { matchedHeaders, needsValidationMatchedHeaders }
}
