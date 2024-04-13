"use client"

import { action } from '@actions/parse-user-spreadsheet.server'
import { handleAutomaticFieldMatch } from '@actions/handle-automatic-field-match.server';
import {TotalRecords, TickModelHeaders, FileInfo} from '@ImportData/types/UITypes'

// const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`)

type UploadUserSpreadsheetButtonProps = {
    setTotalRecords: React.Dispatch<React.SetStateAction<TotalRecords>>,
    setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>,
    tickModelHeaders: TickModelHeaders,
    setMatchedHeaders: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setNeedsValidationMatchedHeaders: React.Dispatch<React.SetStateAction<string[]>>
}


export function UploadUserSpreadsheetButton({setTotalRecords, setFileInfo, tickModelHeaders, setMatchedHeaders, setNeedsValidationMatchedHeaders}: UploadUserSpreadsheetButtonProps) {

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await action(formData); 
            if (!response) return;
            const { totalRecords, fileInfo } = response;
            setTotalRecords(totalRecords);
            setFileInfo(fileInfo);
            
            try {
                const matchingResponse = await handleAutomaticFieldMatch(totalRecords, tickModelHeaders);
                if (!matchingResponse) return;
                const { matchedHeaders, needsValidationMatchedHeaders } = matchingResponse;
                setMatchedHeaders(matchedHeaders);
                setNeedsValidationMatchedHeaders(needsValidationMatchedHeaders);
            }
            catch (error) {
                console.error('Error auto-matching file', error);
            }
        } 

        catch (error) {
            console.error('Error processing the file:', error);
        }
    };

    return (
        <>
            <form>
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

