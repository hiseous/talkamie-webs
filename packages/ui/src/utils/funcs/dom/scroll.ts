import { __classSelectors } from "../../constants/querySelectors";

type scrollContainerToProps = {
    smooth?: boolean;
    elementClassName?: string;
    // elementTag?: 'app-body' | 'dashboard-body';
    classSelector?: keyof typeof __classSelectors;
    scrollWindows?: boolean;
    delay?: number; //in seconds;
    to?: 'top' | 'bottom';
}
export const scrollContainerTo = (props?: scrollContainerToProps) => {
    const scrollIt = () => {
        const behavior = props?.smooth ? 'smooth' : 'auto';

        // Helper to get scroll position
        const getScrollPosition = (el: HTMLElement | Window): ScrollToOptions => {
            if (props?.to === 'bottom') {
                const scrollHeight = el instanceof Window
                    ? document.documentElement.scrollHeight
                    : (el as HTMLElement).scrollHeight;

                return {
                    top: scrollHeight,
                    behavior
                };
            }
            return {
                top: 0,
                behavior
            };
        };

        // Scroll a specific class name
        if (props?.elementClassName) {
            const el = document.querySelector(`.${props.elementClassName}`) as HTMLElement;
            if (el) el.scrollTo(getScrollPosition(el));
        }

        // Scroll using classSelector from constants
        if (props?.classSelector) {
            const selector = __classSelectors[props.classSelector];
            const el = document.querySelector(`.${selector}`) as HTMLElement;
            if (el) el.scrollTo(getScrollPosition(el));
        }

        // Scroll window (default)
        if (props?.scrollWindows !== false) {
            window.scrollTo(getScrollPosition(window));
        }
    };

    if (typeof props?.delay === 'number') {
        setTimeout(scrollIt, props.delay * 1000);
    } else {
        scrollIt();
    }
}

type scrollElementIntoViewProps = {
    querySelector?: string;
    delay?: number; //in seconds;
    position?: ScrollLogicalPosition;
}
export const scrollElementIntoView = (props: scrollElementIntoViewProps) => {
    if(props.querySelector){
        const scrollIt = () => {
            const div = document.querySelector(props.querySelector ?? '');
            if(div){
                div.scrollIntoView({
                    behavior: 'smooth',
                    block: props.position || 'start',
                });
            }
        }
        
        if(typeof props.delay === 'number'){
            setTimeout(() => {
                scrollIt();
            }, props.delay * 1000);
        }
        else {
            scrollIt();
        }
    }
}

export type getContainerScrollDistanceReturnProps = {
    from?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
};
export const getContainerScrollDistance = (el?: Element | null): getContainerScrollDistanceReturnProps => {
    const returnProps: getContainerScrollDistanceReturnProps = {};

    if (el) {
        // For scrollable element
        returnProps.from = {
            top: el.scrollTop,
            bottom: el.scrollHeight - el.scrollTop - el.clientHeight,
            left: el.scrollLeft,
            right: el.scrollWidth - el.scrollLeft - el.clientWidth,
        };
    } else {
        // For the window
        returnProps.from = {
            top: window.scrollY,
            bottom: document.documentElement.scrollHeight - (window.scrollY + document.documentElement.clientHeight),
            left: window.scrollX,
            right: document.documentElement.scrollWidth - (window.scrollX + document.documentElement.clientWidth),
        };
    }

    return returnProps;
};

  