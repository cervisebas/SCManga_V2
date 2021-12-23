type newMangas = {
    title: string,
    url: string,
    chapter: string,
    image: string
};
type popular = {
    title: string,
    image: string,
    url: string,
    type: string
};
type resolveRecents = {
    newMangas: newMangas[],
    popular: popular[]
};

export type {
    newMangas,
    popular,
    resolveRecents
};