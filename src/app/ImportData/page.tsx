"use client"

import { CsvFileUploadButton } from "@ImportData/components/CsvFileUploadButton";
import Link from 'next/link';
import { useState } from 'react';
import { FieldMatchingUI } from "./components/FieldMatchingUI"



export default function ImportDataPage() {
  type FileInfo = {
    name: string;
    type: string;
  }

  const [totalRecords, setTotalRecords] = useState<Record<string, any>[]>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo>({ name: '', type: '' });
  const totalNumberRecords = Object.keys(totalRecords).length;


  const hasRecords = totalNumberRecords > 0;


    return (
        <>
          {!hasRecords &&
            <>
              <CsvFileUploadButton 
              setTotalRecords={setTotalRecords}
              setFileInfo={setFileInfo}/>
              <b>File must end in .csv</b>
              <br />
              <Link href='/UploadInstructions'>Upload Instructions</Link>
            </>
          }

            { hasRecords && 
              <FieldMatchingUI 
              totalRecords = {totalRecords}
              fileInfo = {fileInfo}/>
            }
        </>
    );
}
