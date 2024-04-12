export type TickModelHeaders = {
  name: string
  description: string
  exampleData: string[]
  category: string
  needsValidation: boolean
  required: boolean
}[]

export type FileInfo = {
  name: string
  type: string
}

export type TotalRecords = Record<string, any>[]

export type DateFormat = "" | "ymd" | "mdy" | "dmy"
