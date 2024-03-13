"use client"

import { CsvFileUploadButton } from "@/app/components/CsvFileUploadButton";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FieldMatchingUI } from "../components/FieldMatchingUI"



export default function ImportDataPage() {
  const [csvInfo, setCsvInfo] = useState<{ header: string, count: number, percentage: number }[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [csvSuccess, setCsvSuccess] = useState<boolean>(false);
  const [previewRecords, setPreviewRecords] = useState<JSON[]>([]);


  useEffect(() => {
    if (csvInfo.length != 0) {
      setCsvSuccess(true);}
    else setCsvSuccess(false)
    },[csvInfo])


    return (
        <>
          {csvSuccess === false &&
            <>
              <CsvFileUploadButton 
              setCsvInfo={setCsvInfo} 
              setTotalRecords={setTotalRecords}
              setPreviewRecords={setPreviewRecords}/>
              <b>File must end in .csv</b>
              <br />
              <Link href='/UploadInstructions'>Upload Instructions</Link>
            </>
          }

            {csvSuccess && 
            <>
              <h3>CSV Headers</h3>
              <p>Total Records - {totalRecords}</p>
              <FieldMatchingUI csvInfo={csvInfo} previewRecords={previewRecords} setPreviewRecords={setPreviewRecords}/>
            </>}

        </>
    );
}
