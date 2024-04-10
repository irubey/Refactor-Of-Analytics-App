'use server'

export async function CleanNewSpreadsheets(matchedHeaders: Record<string, string>, totalRecords: Record<string, any>[], dateFormat: string) {
    console.log(matchedHeaders)
    let userRecordCopy = totalRecords.map(record => {
        let newRecord = {...record}
        for (let [key, value] of Object.entries(record)) {
            let matchedKey = Object.keys(matchedHeaders).find(k => matchedHeaders[k] === key);
            if (matchedKey) {
                newRecord[matchedKey] = value;
                delete newRecord[key];
            }
        }
        return newRecord;
    });

    const cleaningFunctions = {
        'date': cleanDate,

    }

    function cleanDate(date: string, dateFormat:string): Date | null {
        let year, month, day;
        switch (dateFormat) {
            case 'ymd':
                [year, month, day] = date.split(/\D/);
                break;
    
            case 'mdy':
                [month, day, year] = date.split(/\D/);
                break;
    
            case 'dmy':
                [day, month, year] = date.split(/\D/);
                break;
    
            default:
                return null;
        }
    
        // Validate year, month, and day
        if (!year || !month || !day || year.length !== 4 || month.length > 2 || day.length > 2) {
            return null;
        }
    
        // Return a new Date object
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
}
