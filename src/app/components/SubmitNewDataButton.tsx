

export function SubmitNewDataButton() {
    function handleClick() {
        console.log('submitting new data')
    }

    return (
        <button onClick={handleClick}>Submit New Data</button>
    );
}