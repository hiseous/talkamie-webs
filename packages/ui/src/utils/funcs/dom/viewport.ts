
type getElementVisibleNodesProps = {
    container: Element;
    // nodesClassSelector?: domClassSelector; //nodes to check for;
    querySelector?: string;
}
export const getElementVisibleNodes = (props: getElementVisibleNodesProps) => {
    const querySelector = props.querySelector ?? `:scope > *`; // target children as default;
    // const elements = (
    //     // props.nodesClassSelector ? props.container.querySelectorAll(`.${__classSelectors[props.nodesClassSelector]}`) :
    //     props.querySelector ? props.container.querySelectorAll(props.querySelector) :
    //     undefined
    // );
    const elements = props.container.querySelectorAll(querySelector);

    const containerRect = props.container.getBoundingClientRect();
    const visibleElements: Element[] = [];

    elements?.forEach((element) => {
        const elementRect = element.getBoundingClientRect();  // Get the bounding box of each element

        // Check if the element is within the viewport of the container
        const isVisible = (
            elementRect.top < containerRect.bottom &&
            elementRect.bottom > containerRect.top &&
            elementRect.left < containerRect.right &&
            elementRect.right > containerRect.left
        );

        if (isVisible) {
            visibleElements.push(element);
        }
    });

    return {
        visibleElements,
    };
};
  