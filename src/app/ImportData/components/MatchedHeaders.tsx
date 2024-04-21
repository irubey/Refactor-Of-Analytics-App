import chainLink from "@static/chainLink.png"
import brokenChainLink from "@static/brokenChainLink.png"
import Image from "next/image"
import { useState } from "react"

type MatchedHeadersProps = {
  matchedHeaders: Record<string, string>
  setSelectedAcceptableHeader: (header: string) => void
  setSelectedCsvHeader: (header: string) => void
  setMatchedHeaders: (headers: Record<string, string>) => void
}

export function MatchedHeaders({
  matchedHeaders,
  setSelectedAcceptableHeader,
  setSelectedCsvHeader,
  setMatchedHeaders,
}: MatchedHeadersProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleClick = (acceptable: string, csv: string) => {
    if (!csv || !acceptable) return
    setSelectedAcceptableHeader(acceptable)
    setSelectedCsvHeader(csv)
    const newMatchedHeaders = { ...matchedHeaders }
    delete newMatchedHeaders[acceptable]
    setMatchedHeaders(newMatchedHeaders)
  }

  return (
    <div className="grid grid-cols-9">
      <ul className="col-span-5 col-start-3 grid grid-auto-rows">
        {Object.entries(matchedHeaders).map(([acceptable, csv], index) => {
          return (
            <li className="flex justify-center" key={`${acceptable}-${index}`}>
              {csv}
              <button
                onClick={() => handleClick(acceptable, csv)}
                onMouseEnter={() => setHoveredItem(acceptable)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hoveredItem === acceptable ? (
                  <Image
                    src={brokenChainLink}
                    alt="unlink icon"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src={chainLink}
                    alt="link icon"
                    width={40}
                    height={40}
                  />
                )}
              </button>
              {acceptable}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
