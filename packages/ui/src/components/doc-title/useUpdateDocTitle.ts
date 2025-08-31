'use client';

import { useEffect } from 'react';
import { updateDocTitle, updateDocTitleProps } from '../../utils/funcs/dom/doc-title';

export type useUpdateDocumentTitleProps = updateDocTitleProps;
export const useUpdateDocumentTitle = (props: useUpdateDocumentTitleProps) => {
    
    useEffect(() => {
        updateDocTitle(props);
    }, [props.title, props.preTitle, props.description]);
}