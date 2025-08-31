import { Metadata } from "next";

export type updateDocTitleProps = {
    title?: string;
    preTitle?: string;
    description?: string;
}
export const getDocTitle = (preTitle?: string, title?: string) => {
    const docTitle = (
        title ? title :
        `${preTitle ? `${preTitle} | ` : ''}Talkamie`
    );
    return docTitle;
};
export const updateDocTitle = (props: updateDocTitleProps) => {
    const docTitle = getDocTitle(props.preTitle, props.title);
    const description = props.description ?? '';

    document.title = docTitle;


    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", description);
    }
    else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
    }

    return {
        title: docTitle,
    };
}

type getMetadataProps = {
    title?: string;
    preTitle?: string;
    description?: string;
    images?: string[];
}
export const getMetadata = (props?: getMetadataProps) => {
    const metadata: Metadata = {
      title: getDocTitle(props?.preTitle, props?.title),
      description: props?.description || "Talkamie",
      openGraph: {
        images: [
          ...props?.images?.length ? props.images : ['/icon.png'],
        ],
      },
    };

    return metadata;
};