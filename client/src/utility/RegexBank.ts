export default function RegexBank (str:string, regex:string) {
    const regexobject = {
        stringAfterPeriod: str.replace(/^.*\.(.*)$/, '$1'),
        returnLettersAthruZ: str.replace(/[a\-z]/g, ''),
        returnNumbers: str.replace(/[0\-9]/g, '')
    }
}