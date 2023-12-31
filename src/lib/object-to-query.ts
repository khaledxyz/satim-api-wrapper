export function objectToQuery(obj: Record<string, unknown>): string {
    const queryString = Object.keys(obj)
        .map(key => {
            const value = obj[key];
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            } else if (typeof value === 'object' && value !== null) {
                return `${encodeURIComponent(key)}=${JSON.stringify(value)}`;
            }

            return `${encodeURIComponent(key)}`;
        })
        .join('&');
    return queryString;
}
