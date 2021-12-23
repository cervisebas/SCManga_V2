type gender = {
    title: string,
    url: string
};
type chapter = {
    chapter: string,
    url: string
};
type optionChapter = {
    url: string,
    server: string
};
type Info = {
    title: string,
    date: string,
    type: string,
    synopsis: string,
    image: string,
    url: string,
    genders: gender[],
    chapters: chapter[]
};

export type {
    Info,
    gender,
    chapter,
    optionChapter
};