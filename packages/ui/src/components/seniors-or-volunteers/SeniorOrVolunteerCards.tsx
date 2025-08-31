import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import UserCardVar2 from "../user-cards/UserCardVar2";
import { userProps } from "../../utils/types/user";
import EmptyVolunteer from "../loader-skeleton/EmptyVolunteer";
import SeniorOrVolunteerItemWrapper from "./SeniorOrVolunteerItemWrapper";
import SeniorOrVolunteerItemsWrapper from "./SeniorOrVolunteerItemsWrapper";

type SeniorOrVolunteerCardsProps = ComponentPrimitiveProps & {
    items: userProps[];
    loadingMore?: boolean;
    updateItem?: (i: number, userProps?: Partial<userProps>) => void;
};

const SeniorOrVolunteerCards = (props: SeniorOrVolunteerCardsProps) => {
    
    return (
        <SeniorOrVolunteerItemsWrapper
            className={`${props.className || ''}`}
        >
            {
                props.items?.map((item, i) => {
                    return (
                        <SeniorOrVolunteerItemWrapper key={`${i}_${item.id}`} className={`${i > 0 ? '' : ''}`}>
                            <UserCardVar2
                                user={item}
                                className="w-full h-full"
                                updateUser={(userProps) => {
                                    if(props.updateItem) props.updateItem(i, userProps);
                                }}
                            />
                        </SeniorOrVolunteerItemWrapper>
                    )
                })
            }
            {
                props.loadingMore ?
                Array.from({length: 3}).map((unknown, i) => (
                    <EmptyVolunteer
                        key={`${i}_${unknown}`}
                    />
                )) : undefined
            }
        </SeniorOrVolunteerItemsWrapper>
    );
}

export default SeniorOrVolunteerCards;