import React, { createContext, useContext, ReactNode, useState } from "react";

type RegexContextType = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp;
    RdotAtEscape: RegExp;
    RnoWhiteSpace: RegExp;
    RnoBackslash: RegExp;
    MsplitAtDot: RegExp;
    McharAfterComma: RegExp;
    McharBeforeAt: RegExp;
    MprePng: RegExp;
    APIsplit: string;
    MimgSrc: RegExp;
  }
  
  type RegexDefaults = {
    RstringAfterPeriod: RegExp;
    RreturnLettersAthruZ: RegExp;
    RreturnNumbers: RegExp;
    RhasCaps: RegExp;
    RhasNums: RegExp
    RdotAtEscape: RegExp;
    RnoWhiteSpace: RegExp;
    RnoBackslash: RegExp;
    MsplitAtDot: RegExp;
    McharAfterComma: RegExp;
    McharBeforeAt: RegExp;
    MprePng: RegExp
    APIsplit: string;
    MimgSrc: RegExp;
  }
  
  const regexDefaults: RegexDefaults = {
    RstringAfterPeriod: /^.*\.(.*)$/,
    RreturnLettersAthruZ: /[a\-z]/g,
    RreturnNumbers: /[0\-9]/g,
    RhasCaps: /[A-Z]/g,
    RhasNums: /[0-9]/g,
    RdotAtEscape: /[\@\.]/g,
    RnoWhiteSpace: /\s/g,
    RnoBackslash: /\//g,
    MsplitAtDot: /@([^.]*)\./,        
    McharAfterComma: /,(.*)/,
    McharBeforeAt: /^(.*?)@/,
    MprePng: /(.+)\.png/,
    APIsplit:  "***",
    MimgSrc: /\/water_img\/(.+)/
  };

      const RegexContext = createContext<RegexContextType>(regexDefaults)
      
    export function useRegex() {
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
        const [RhasNums, setHasNums] = useState<RegExp>(/[0-9]/g)                                    // replace
        const [RdotAtEscape, setRDotAtEscape] = useState<RegExp>(/[\@\.]/g)      // match          if (splitEmail !== null) {       const matchedValue = splitEmail[0];      }
        const [RnoWhiteSpace, setNoWhiteSpace] = useState<RegExp>(/\s/g)                             // replace
        const [RnoBackslash, setRNoBackslash] = useState<RegExp>(/\//g)                             // replace
        const [MsplitAtDot, setSplitAtDot] = useState<RegExp>(/@([^.]*)\./)      // match
        const [McharAfterComma, setMCharAfterComma] = useState<RegExp>(/,(.*)/)      // match          if (splitEmail !== null) {       const matchedValue = splitEmail[0];      }
        const [McharBeforeAt, setMCharBeforeAt] = useState<RegExp>(/^(.*?)@/)
        const [MprePng, setMPrePng] = useState<RegExp>(/(.+)\.png/)
        const [APIsplit, setAPISplit] = useState<string>("***")
        const [MimgSrc, setMImgSrc] = useState<RegExp>(/\/water_img\/(.+)/)         // this matches the characters including "/water_img" and the folliwing characters which would be the image path.
                            
        const value = {
            RstringAfterPeriod,
            RreturnLettersAthruZ,
            RreturnNumbers,
            RhasCaps,
            RhasNums,
            RdotAtEscape,
            RnoWhiteSpace,
            RnoBackslash,
            MsplitAtDot,       
            McharAfterComma,
            McharBeforeAt,
            MprePng,
            APIsplit,
            MimgSrc
        };

        return (
            <RegexContext.Provider value={value}>
                {children}
            </RegexContext.Provider>
        )
    }
