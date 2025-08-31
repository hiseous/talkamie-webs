
export const getNamesFromFullName = (fullName: string = '') => {
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] ?? '';

    return {
        firstName,
    };
}

type fromUserNameOptionsProps = {
    initialsLength?: number;
}
export const fromUserName = (userName?: string, options?: fromUserNameOptionsProps) => {
    const initialsList: string[] = [];
    let initials: string | undefined = undefined;
    const names = userName?.split(' ');
    names?.map((name) => {
        if(name){
            const initial = name.substring(0, 1);
            if(
                initial &&
                (
                    options?.initialsLength === undefined ||
                    (options?.initialsLength !== undefined && initialsList.length < options.initialsLength)
                )
            ){
                const capitalizedInitial = initial.toUpperCase();
                initials = `${initials ? `${initials}` : ``}${capitalizedInitial}`;
                // initials = `${initials ? `${initials} ` : ``}${capitalizedInitial}`;
                initialsList.push(capitalizedInitial);
            }
        }
    })

    return {
        initialsList,
        initials,
        names,
    };
}