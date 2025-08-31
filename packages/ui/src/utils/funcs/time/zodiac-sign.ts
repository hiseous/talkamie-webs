
export const fromDobToZodiac = (dob?: string) => {
    let zodiacSign;
    
    if(dob){
        const date = new Date(dob);
        const month = date.getMonth() + 1;  // months are 0-based, so add 1
        const day = date.getDate();
    
        // Define the date ranges for each zodiac sign
        const zodiacSigns = [
            { sign: "capricorn", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
            { sign: "aquarius", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
            { sign: "pisces", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
            { sign: "aries", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
            { sign: "taurus", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
            { sign: "gemini", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
            { sign: "cancer", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
            { sign: "leo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
            { sign: "virgo", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
            { sign: "libra", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
            { sign: "scorpio", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
            { sign: "sagittarius", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } }
        ];
    
        // Loop through each zodiac sign to check if the given date matches
        for (const zodiac of zodiacSigns) {
            const { start, end } = zodiac;
            if (
                (month === start.month && day >= start.day) ||
                (month === end.month && day <= end.day) ||
                (month > start.month && month < end.month) ||
                (month === 12 && start.month === 1 && day >= start.day)
            ) {
                zodiacSign = zodiac;
                break;
            }
        }
    }
  
    return zodiacSign;
}