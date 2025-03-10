export default function convertBlobToFile(blob, fileName) {
    return new File([blob], fileName, { type: blob.type });
}
