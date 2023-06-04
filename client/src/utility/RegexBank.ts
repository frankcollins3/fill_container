export default function RegexBank () {    
    const regexobject = {
        stringAfterPeriod: /^.*\.(.*)$/,
        returnLettersAthruZ: /[a\-z]/g,
        returnNumbers: /[0\-9]/g,

        hasCaps: /[A-Z]/g,
        hasNums: /[A-Z]/g,
    }
    return regexobject
    // let regobj = regexobject

    // if (regex === "stringAfterPeriod") {
    //     return regobj.stringAfterPeriod        
    // }
    // if (regex === "returnNumbers") {
    //     return regobj.returnNumbers
    // }
}

// const regexobject = {
//     stringAfterPeriod: str.replace(/^.*\.(.*)$/, '$1'),
//     returnLettersAthruZ: str.replace(/[a\-z]/g, ''),
//     returnNumbers: str.replace(/[0\-9]/g, '')
// }
