"use client"

import {parse} from 'csv-parse/sync'
import styles from './ImportData.module.css'


type CsvFileUploadButtonProps = {
    setCsvInfo: React.Dispatch<React.SetStateAction<{ header: string, count: number, percentage: number }[]>>,
    setTotalRecords: React.Dispatch<React.SetStateAction<Record<string, any>[]>>
};

type CsvRecord = {
    [key: string]: any
}

function readFile(file: File): Promise<CsvRecord[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const contents = e.target.result as string;
                const records = parse(contents, {
                    columns: true,
                    skipEmptyLines: true,
                })
                resolve(records);
            }
        }
        reader.onerror = (e) => {
            reject(new Error("Failed to read file"));
        }
        reader.readAsText(file)
    });
}



function getHeaderInfo(records: any[]) {
    const totalRecords = records.length;
    const csvHeaders = Object.keys(records[0]);
    const fieldInfo = csvHeaders.map((header) => ({
        header,
        count: records.filter((record: { [key: string]: any }) => record[header]).length,
        percentage: (records.filter((record: { [key: string]: any }) => record[header]).length / totalRecords) * 100,
    }));
    return {fieldInfo}
}



export function CsvFileUploadButton({setCsvInfo, setTotalRecords}: CsvFileUploadButtonProps) {
    
    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const records = await readFile(file)
        const {fieldInfo} = getHeaderInfo(records);
        
        setCsvInfo(fieldInfo);
        setTotalRecords(records);
    }

    return (
        <>
            <form>
                <input type="file"
                id='fileUpload'
                accept=".csv" 
                onChange={handleFileUpload}
                style={{display: 'none'}}/>
            <label htmlFor="fileUpload" className={styles['custom-file-upload']}>
                Upload CSV
            </label>
            </form>
            
        </>
    );
}

