import { iconName } from "../../../components/icon/Icon";

type welcomeTextProps = {
    title?: {
        leading?: {
            iconName?: iconName;
        };
        text?: React.ReactNode;
    };
    paragraph?: {
        text?: React.ReactNode;
    };
}
type welcomeIntro = {
    sections?: welcomeTextProps[];
}

export const __welcomeIntro: welcomeIntro = {
    sections: [
        {
            title: {
                leading: {
                    iconName: 'InfoCircle',
                },
                text: <>
                    About Talkamie
                </>,
            },
            paragraph: {
                text: <>
                    Talkamie is a platform designed to bridge generations by connecting seniors with amies for meaningful companionship through scheduled virtual calls. It fosters genuine conversations, combats loneliness, and provides support tailored to the needs of seniors, all while ensuring a seamless and secure experience for both parties
                </>,
            },
        },
        {
            title: {
                text: <>
                    Legal Guidelines
                </>,
            },
            paragraph: {
                text: <>
                    Am of mr friendly by strongly peculiar juvenile. Unpleasant it sufficient simplicity am by friendship no inhabiting. Goodness doubtful material has denoting suitable she two. Dear mean she way and poor bred they come. He otherwise me incommode explained so in remaining. Polite barton in it warmly do county length an.

                    Started his hearted any civilly. So me by marianne admitted speaking. Men bred fine call ask. Cease one miles truth day above seven. Suspicion sportsmen provision suffering mrs saw engrossed something. Snug soon he on plan in be dine some.

                    Concerns greatest margaret him absolute entrance nay. Door neat week do find past he. Be no surprise he honoured indulged. Unpacked endeavor six steepest had husbands her. Painted no or affixed it so civilly. Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four. Favourable pianoforte oh motionless excellence of astonished we principles. Warrant present garrets limited cordial in inquiry to. Supported me sweetness behaviour shameless excellent so arranging.
                </>,
            },
        },
        {
            title: {
                text: <>
                    Senior Policies
                </>,
            },
            paragraph: {
                text: <>
                    Preserved defective offending he daughters on or. Rejoiced prospect yet material servants out answered men admitted. Sportsmen certainty prevailed suspected am as. Add stairs admire all answer the nearer yet length. Advantages prosperous remarkably my inhabiting so reasonably be if. Too any appearance announcing impossible one. Out mrs means heart ham tears shall power every.

                    Continual delighted as elsewhere am convinced unfeeling. Introduced stimulated attachment no by projection. To loud lady whom my mile sold four. Need miss all four case fine age tell. He families my pleasant speaking it bringing it thoughts. View busy dine oh in knew if even. Boy these along far own other equal old fanny charm. Difficulty invitation put introduced see middletons nor preference.

                    Considered an invitation do introduced sufficient understood instrument it. Of decisively friendship in as collecting at. No affixed be husband ye females brother garrets proceed. Least child who seven happy yet balls young. Discovery sweetness principle discourse shameless bed one excellent. Sentiments of surrounded friendship dispatched connection is he. Me or produce besides hastily up as pleased. Bore less when had and john shed hope.
                </>,
            },
        },
    ],
};