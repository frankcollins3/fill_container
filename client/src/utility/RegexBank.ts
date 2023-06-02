export default function RegexBank (str:string, regex:string) {    
    const regexobject = {
        stringAfterPeriod: /^.*\.(.*)$/,
        returnLettersAthruZ: /[a\-z]/g,
        returnNumbers: /[0\-9]/g
    }
    let regobj = regexobject
    
    if (regex === "stringAfterPeriod") {
        return regobj.stringAfterPeriod        
    }
    if (regex === "returnNumbers") {
        return regobj.returnNumbers
    }
}

// const regexobject = {
//     stringAfterPeriod: str.replace(/^.*\.(.*)$/, '$1'),
//     returnLettersAthruZ: str.replace(/[a\-z]/g, ''),
//     returnNumbers: str.replace(/[0\-9]/g, '')
// }
