/**
 * @param {object} input - a javascript object representing a hierarchical structure  
 * @param {object} values - a list of key-value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    if (typeof input !== 'object' || input === null || typeof values !== 'object' || values === null) {
        throw new Error('InvalidType');
    }

    if (Object.keys(input).length === 0) {
        return '';
    }

    function substituteTokens(str) {
        return str.replace(/\$\{(\w+)\}/g, (match, key) => {
            return key in values ? values[key] : match;
        });
    }

    function renderObject(obj) {
        if (typeof obj === 'string') {
            return substituteTokens(obj);
        }

        if (typeof obj === 'object' && obj !== null) {
            return Object.entries(obj).map(([key, value]) => {
                return `<${key}>${renderObject(value)}</${key}>`;
            }).join('');
        }

        return '';
    }

    return renderObject(input);
}

module.exports = {
    render
};
