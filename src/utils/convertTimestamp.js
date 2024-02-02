export default function convertTimestamp(inputTimestamp) {
    // Convert input string to Date object
    const dateObject = new Date(inputTimestamp);

    // Format the Date object to the desired output format
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const outputTimestamp = dateObject.toLocaleDateString('en-US', options);

    return outputTimestamp;
}