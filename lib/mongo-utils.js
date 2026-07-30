export function leanSanitize(data) {
    if (!data) return;

    if (Array.isArray(data) && data.length > 0) {
        return data.map(item => leanSanitize(item));
    }

    if (typeof data === "object" && data !== null) {

        if (data.constructor?.name === "ObjectId" || data._bsontype === "ObjectID") {
            return data.toString();
        }

        const sanitized = { ...data };

        if (sanitized._id) {
            sanitized.id = sanitized._id.toString();
            delete sanitized._id;
        }
        delete sanitized.__v;

        for (const key in sanitized) {
            if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
                if (!(sanitized[key] instanceof Date)) {
                    sanitized[key] = leanSanitize(sanitized[key]);
                }
            }
        }
        return sanitized;
    }
    return data;
}