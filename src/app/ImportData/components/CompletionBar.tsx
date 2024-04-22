import uploadIcon from "@static/upload-icon.png"
import chainLink from "@static/chainLink.png"
import graphIcon from "@static/graph-icon.png"
import Image from "next/image"

type CompletionBarProps = {
  hasRecords: boolean
  percentComplete?: number
}

export function CompletionBar({
  hasRecords,
  percentComplete = 0,
}: CompletionBarProps) {
  if (!hasRecords) return null

  return (
    <div className="relative flex flex-col items-center justify-around w-full">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-around w-full z-10">
        <Image src={uploadIcon} alt="Upload Icon" width="100" height="100" />
        <Image src={chainLink} alt="Chain Link Icon" width="100" height="100" />
        <Image src={graphIcon} alt="Graph Icon" width="100" height="100" />
      </div>
    </div>
  )
}
