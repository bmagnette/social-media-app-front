export const getLang = () => {
    if (navigator.languages != undefined) return navigator.languages[0];
    return navigator.language;
};

export const getTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getDateFormatter = () => {
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: getTimeZone(),
    });
};

export const formatDate = (date) => {
    return getDateFormatter().format(new Date(date));
};
