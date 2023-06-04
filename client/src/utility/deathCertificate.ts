export default function deathCertificate (key:string, value:string, minutes:number) {
        const item = {
            value: value,
            expirationDate: minutes
        }
        localStorage.setItem(key, JSON.stringify(item))
}