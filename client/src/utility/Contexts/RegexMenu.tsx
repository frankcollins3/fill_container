import React, { createContext, useContext, ReactNode, useState } from "react";

type RegexContextType = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp;
    RdotAtEscape: RegExp;
    RnoWhiteSpace: RegExp;
    MsplitAtDot: RegExp;
    McharAfterComma: RegExp;
  }
  
  type RegexDefaults = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp
    RdotAtEscape: RegExp;
    RnoWhiteSpace: RegExp;
    MsplitAtDot: RegExp;
    McharAfterComma: RegExp
  }
  
  const regexDefaults: RegexDefaults = {
    RstringAfterPeriod: /^.*\.(.*)$/,
    RreturnLettersAthruZ: /[a\-z]/g,
    RreturnNumbers: /[0\-9]/g,
    RhasCaps: /[A-Z]/g,
    RhasNums: /[A-Z]/g,
    RdotAtEscape: /[\@\.]/g,
    RnoWhiteSpace: /\s/g,
    MsplitAtDot: /@([^.]*)\./,        
    McharAfterComma: /,(.*)/,
  };

      const RegexContext = createContext<RegexContextType>(regexDefaults)
      
    export  default function useRegex() {
        return useContext(RegexContext)
    }

    interface Props {
        children: ReactNode
    };

    export function RegexProvider( { children } : Props ) {
        const [RstringAfterPeriod, setStringAfterPeriod] = useState<RegExp>(/^.*\.(.*)$/)            // replace      
        const [RreturnLettersAthruZ, setReturnLetterseAthruZ] = useState<RegExp>(/[a\-z]/g)          // replace
        const [RreturnNumbers, setReturnNumbers] = useState<RegExp>(/[0\-9]/g)                       // replace
        const [RhasCaps, setHasCaps] = useState<RegExp>(/[A-Z]/g)                                    // replace
        const [RhasNums, setHasNums] = useState<RegExp>(/[A-Z]/g)                                    // replace
        const [RdotAtEscape, setRDotAtEscape] = useState<RegExp>(/[\@\.]/g)      // match          if (splitEmail !== null) {       const matchedValue = splitEmail[0];      }
        const [RnoWhiteSpace, setNoWhiteSpace] = useState<RegExp>(/\s/g)                             // replace
        const [MsplitAtDot, setSplitAtDot] = useState<RegExp>(/@([^.]*)\./)      // match
        const [McharAfterComma, setMCharAfterComma] = useState<RegExp>(/,(.*)/)      // match          if (splitEmail !== null) {       const matchedValue = splitEmail[0];      }
                            
        const value = {
            RstringAfterPeriod,
            RreturnLettersAthruZ,
            RreturnNumbers,
            RhasCaps,
            RhasNums,
            RdotAtEscape,
            RnoWhiteSpace,
            MsplitAtDot,       
            McharAfterComma,
        };

        return (
            <RegexContext.Provider value={value}>
                {children}
            </RegexContext.Provider>
        )
    }
