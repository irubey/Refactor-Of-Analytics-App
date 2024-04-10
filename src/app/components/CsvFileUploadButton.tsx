"use client"

import { action } from '@actions/parse-user-spreadsheet.server'

// const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`)


type CsvFileUploadButtonProps = {
    setTotalRecords: React.Dispatch<React.SetStateAction<Record<string, any>[]>>
    setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>
};

type FileInfo = {  
    name: string;
    type: string;
}



export function CsvFileUploadButton({setTotalRecords, setFileInfo}: CsvFileUploadButtonProps) {

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await action(formData); 
            if (!response) return;
            const { totalRecords, ...fileInfo } = response;
            setTotalRecords(totalRecords);
            setFileInfo({...file});
        } catch (error) {
            console.error('Error processing the file:', error);
        }
    };

    return (
        <>
            <form action = {()=> {
                console.log('form submitted')
            }}>
                <input 
                type="file"
                id='fileUpload'
                onChange={handleFileUpload}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
            </form>
            
        </>
    );
}

