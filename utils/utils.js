
export function SentanceCase(text){
    const textArray = text.trim().split(/[ -]/);
    // console.log(textArray);

   const arrayMap =  textArray.map((word)=>{
        const firstCharacterUpper = word.charAt(0).toUpperCase();
        const restCharacter = word.slice(1).toLowerCase();
        return firstCharacterUpper + restCharacter
    })

    // const textString = arrayMap.toString().replace(/,/g, " ");
    const textString = arrayMap.join(" ")

    // console.log(textString);
    return textString;
    
}

// SentanceCase("middle-rain-down")