"use client"

import { UploadUserSpreadsheetButton } from "@ImportData/components/UploadUserSpreadsheetButton";
import Link from 'next/link';
import { useState } from 'react';
import { FieldMatchingUI } from "./components/FieldMatchingUI"
import { TickModelHeaders, FileInfo, TotalRecords } from "@ImportData/types/UITypes";
import { UploadInstructions } from "./components/UploadInstructions";

const tickModelHeaders:TickModelHeaders = [
  { name: "route name",
  description: "The name of the route, usually applies for outdoor routes",
  exampleData: ["The Nose", "Playing Hooky", "The Naked Edge", "High Exposure"],
  category: "route",
  needsValidation: false,
  required: true
  },

  { name: "date",
  description: "The date the climb was completed",
  exampleData: ["2021-03-15", "03/15/2021", "15/03/2021"],
  category: "session",
  needsValidation: true,
  required: true
  },

  { name: "route length",
  description: "The full length of the route or boulder problem",
  exampleData: ["50ft", "50m", "50"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "difficulty grade",
  description: "The difficulty grade of the route or boulder problem",
  exampleData: ["5.10b", "V4", "6a", "yellow v6"],
  category: "route",
  needsValidation: false,
  required: true
  },

  { name: "discipline",
  description: "The type of climbing discipline",
  exampleData: ["Sport", "Top Rope", "Boulder", "Traditional"],
  category: "session",
  needsValidation: false,
  required: true
  },

  { name: "attempts",
  description: "The number of attempts WITHOUT a send on a climb",
  exampleData: ["1", "2", "3"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "sends",
  description: "The number of successful sends on a climb",
  exampleData: ["1", "2", "3"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "ascent style",
  description: "The style of ascent as it relates to the number of attempts",
  exampleData: [ "Flash", "Send", "Redpoint"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "danger grade",
  description: "The danger rating of the climb",
  exampleData: ["R", "PG13", "X"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "multipitch",
  description: "Whether the route is a multipitch climb",
  exampleData: ["True", "Yes", "1"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "general route quality",
  description: "The quality of the route",
  exampleData: [".4", "4", "44"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "your route quality",
  description: "Your personal opinion of the route",
  exampleData: ["5", "7", "10"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "notes",
  description: "Any notes or beta you have on the climb",
  exampleData: ["Beta: Use the left hand crimp", "Killer route dudeeeeeee", "felt hard today"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "route characteristics",
  description: "Any characteristics of the route that you have tracked",
  exampleData: ["Endurance", "Power", "Technical", "Slabby", "Crimpy"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "session characteristics",
  description: "Any characteristics of the session that you have tracked",
  exampleData: ["Good Conditions", "Tired", "Fresh", "Injured", "Sick"],
  category: "session",
  needsValidation: false,
  required: false
  },

  { name: "location",
  description: "Name of the gym or crag this climb is located at",
  exampleData: ["Third Flatiron", "El Capitan", "Generic Gym - Your Town"],
  category: "session",
  needsValidation: false,
  required: false
  },

  { name: "indoors or outdoors",
  description: "Gym or crag",
  exampleData: ["Gym", "Crag", "Home Wall"],
  category: "session",
  needsValidation: false,
  required: false
  },

  { name: "pitches",
  description: "Generic number of pitches on this route that were climbed or the number of pitches in a multipitch",
  exampleData: ["1", "2p", "32"],
  category: "route",
  needsValidation: false,
  required: false
  },

  { name: "exercise type",
  description: "The type of exercise",
  exampleData: ["Running", "Yoga", "Lifting", "Hiking"],
  category: "other",
  needsValidation: false,
  required: false
  },

  { name: "exercise intensity",
  description: "The intensity of the exercise",
  exampleData: ["Low", "Medium", "High"],
  category: "other",
  needsValidation: false,
  required: false
  },

  { name: "exercise duration",
  description: "The duration of the exercise",
  exampleData: ["1 hour", "30 minutes", "2 hours"],
  category: "other",
  needsValidation: false,
  required: false
  },
]


export default function ImportDataPage() {
  const [needsValidationMatchedHeaders, setNeedsValidationMatchedHeaders] = useState<string[]>([]);
  const [totalRecords, setTotalRecords] = useState<TotalRecords>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo>({ name: '', type: '' });
  const [matchedHeaders, setMatchedHeaders] = useState<Record<string,string>>({});

  const totalNumberRecords = Object.keys(totalRecords).length;
  const hasRecords = totalNumberRecords > 0;
  


    return (
        <>
          {!hasRecords &&
            <div className="flex flex-col h-screen justify-center items-center">
              <UploadUserSpreadsheetButton 
              setTotalRecords={setTotalRecords}
              setFileInfo={setFileInfo}
              tickModelHeaders={tickModelHeaders}
              setMatchedHeaders={setMatchedHeaders}
              setNeedsValidationMatchedHeaders={setNeedsValidationMatchedHeaders}
              />
              <br />
              <UploadInstructions />
            </div>
          }

            { hasRecords && 
              <FieldMatchingUI 
              totalRecords = {totalRecords}
              fileInfo = {fileInfo}
              needsValidationMatchedHeaders = {needsValidationMatchedHeaders}
              matchedHeaders={matchedHeaders}
              setMatchedHeaders={setMatchedHeaders}
              tickModelHeaders={tickModelHeaders}
              />
            }
        </>
    );
}
