import React, { useState } from 'react';

export function UploadInstructions() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <h1 className="underline cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                Upload Instructions
            </h1>
            {showDetails && ( 
                <ul>
                    <li>Acceptable file types include .csv, .xls, .xlsx</li>
                    <li>File must contain headers</li>
                    <li>Headers must be in the first row</li>
                </ul>
            )}
        </>
    );
}
