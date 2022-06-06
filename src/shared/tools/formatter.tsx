import numeral from 'numeral';

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

export const shortFormatter = () => {
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
};

export const formatDate = (date) => {
    const newDate = typeof date === 'string' ? new Date(date) : date;
    return getDateFormatter().format(newDate);
};

export const shortFormatDate = (date) => {
    const newDate = typeof date === 'string' ? new Date(date) : date;
    return shortFormatter().format(newDate);
};

export const formatPythonDate = (date) => {
    return getDateFormatter().format(new Date(date * 1000));
};

export const formatStripePrice = (price) => {
    return numeral(price / 100).format('0.00');
};

export const deviseMapper = (devise) => {
    if (devise === 'eur') {
        return '€';
    } else {
        return '€';
    }
};

export const firstLetterCapitalize = (s) => {
  return s.replace(/./, c => c.toUpperCase())
};
