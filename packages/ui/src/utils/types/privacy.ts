import { userProps } from "./user";

export type privacyOption = {
    type?: userProps['visibility'];
    title?: string;
    subtitle?: string;
}