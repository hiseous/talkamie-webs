
export type ComponentPrimitiveProps = {
    className?: string;
}
export type formObject = {
    [key: string]: string | undefined;
}
export type ssoName = 'apple' | 'google';
export type authType = 'password' | 'sso';
export type valueOf<T> = T[keyof T];
export type lastEvaluatedKey = Record<string, any>;
export type queryPaginationProps = {
    pageSize?: number;
    lastEvaluatedKey?: lastEvaluatedKey;
}
export type componentPositionProps = {
    x?: 'left' | 'right' | 'center';
    y?: 'top' | 'bottom' | 'center';
}
export type componentSize = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type elementOf<items> = items extends (infer U)[] ? U : never;

export type itemId = string | number;
export type itemsMap<itemProps = unknown> = {
    [id in itemId]?: itemProps;
};

export type ExcludeUndefined<T> = Exclude<T, undefined>;