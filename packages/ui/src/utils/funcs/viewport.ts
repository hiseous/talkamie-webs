import { componentPositionProps } from "../../utils/types/global.types";

type domRect = Pick<DOMRect, 'top' | 'left' | 'bottom' | 'right'>
export const elementInViewport = (element: Element, parent?: Element) => {
    const rect = element.getBoundingClientRect();
    const parentRect: domRect = (
        parent ? parent.getBoundingClientRect() :
        {
            top: 0,
            left: 0,
            bottom: (window.innerHeight || document.documentElement.clientHeight),
            right: (window.innerWidth || document.documentElement.clientWidth),
        }
    );
  
    return (
      rect.top >= parentRect.top &&
      rect.left >= parentRect.left &&
      rect.bottom <= parentRect.bottom &&
      rect.right <= parentRect.right
    );
}

export const elementIsCloseToScreenPart = (element: Element, closenessThreshold?: number) => {
    const rect = element.getBoundingClientRect();
    const thresholdX = closenessThreshold ?? (window.innerWidth / 2);
    const thresholdY = closenessThreshold ?? (window.innerHeight / 2);
    
    const closeToX: componentPositionProps['x'] = (
        rect.left <= thresholdX ? 'left' :
        window.innerWidth - rect.right <= thresholdX ? 'right' :
        'center'
    );
    const closeToY: componentPositionProps['y'] = (
        rect.top <= thresholdY ? 'top' :
        window.innerHeight - rect.bottom <= thresholdY ? 'bottom' :
        'center'
    );
    
    return {
        closeTo: {
            x: closeToX,
            y: closeToY,
        },
    };
};