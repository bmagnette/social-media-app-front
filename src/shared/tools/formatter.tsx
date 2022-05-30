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
    const newDate = typeof date === 'string' ? new Date(date) : date;
    return getDateFormatter().format(newDate);
};

export const formatPythonDate = (date) => {
    return getDateFormatter().format(new Date(date * 1000));
};
