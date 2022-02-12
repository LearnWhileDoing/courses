const convertRemToPixels = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

// noinspection JSUnusedGlobalSymbols
export default convertRemToPixels;
