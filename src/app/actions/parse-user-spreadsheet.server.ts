import { parse } from "csv-parse/sync"
import xlsx from "node-xlsx"

type RecordObject = Record<string, any>
type FileInfo = {
  name: string
  type: string
}

const excelDateToJSDate = (serial: number) => {
  const utc_days = Math.floor(serial - 25569)
  const date = new Date(utc_days * 86400 * 1000)
  return date.toLocaleDateString("en-US")
}

async function validateFile(file: File | null): Promise<boolean> {
  if (!(file instanceof File)) {
    console.log("No file uploaded or the file is not a valid instance")
    return false
  }

  if (file.size > 1000000) {
    console.log("File too large")
    return false
  }

  const buffer = await file.slice(0, 4).arrayBuffer()
  const header = new Uint8Array(buffer)

  if (header[0] === 0x50 && header[1] === 0x4b) {
    return true
  }

  if (file.type === "text/csv" || file.type === "application/vnd.ms-excel") {
    return true
  }

  console.log("Unknown or unsupported file type")
  return false
}

async function parseXLSX(file: File): Promise<RecordObject[]> {
  const buffer = await file.arrayBuffer()
  const parsedData = xlsx.parse(Buffer.from(buffer))
  const [headers, ...rows] = parsedData[0].data

  return rows.map((row) => {
    const obj: RecordObject = {}
    headers.forEach((header, index) => {
      let value = row[index]
      if (header.trim().toLowerCase() === "date" && typeof value === "number") {
        value = excelDateToJSDate(value)
      }
      obj[header] = value
    })
    return obj
  })
}

async function parseCSV(file: File): Promise<RecordObject[]> {
  const text = await file.text()
  return parse(text, { columns: true })
}

export async function action(formData: FormData) {
  if (!formData) return
  const fileEntry = formData.get("file")

  if (!(fileEntry instanceof File)) {
    console.log("No file uploaded or the file is not a valid instance")
    return
  }

  if (!(await validateFile(fileEntry))) return

  let totalRecords

  switch (fileEntry.type) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      console.log("xlsx file")
      totalRecords = await parseXLSX(fileEntry)
      break

    case "application/vnd.ms-excel":
    case "text/csv":
      console.log("CSV file")
      totalRecords = await parseCSV(fileEntry)
      break

    default:
      console.log("Unknown file type")
      return
  }

  console.log("totalRecords", totalRecords.slice(0, 1))

  const fileInfo: {
    name: string
    type: string
  } = {
    name: fileEntry.name,
    type: fileEntry.type,
  }

  return { totalRecords, fileInfo }
}
