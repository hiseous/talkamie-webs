
export const sayGreetings = () => {
    const now = new Date();
    const hour = now.getHours();

    let greeting = "Good evening";

    if (hour < 12) {
        greeting = "Good morning";
    }
    else if (hour < 18) {
        greeting = "Good afternoon";
    }
    else if (hour < 21) {
        greeting = "Good evening";
    }

    return {
        greeting,
    };
}