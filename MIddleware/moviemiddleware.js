const isValidUrl = (urlString) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
        'localhost|' + // localhost
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
        '\\[?[a-f\\d]*:[a-f\\d:]+\\])' + // IPv6
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(urlString);
};

const validateMovie = (req, res, next) => {
    const { title, director, rating, posterUrl } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string.' });
    }
    if (!director || typeof director !== 'string') {
        return res.status(400).json({ error: 'Director is required and must be a string.' });
    }
    if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 10)) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 10.' });
    }
    if (posterUrl && !isValidUrl(posterUrl)) {
        return res.status(400).json({ error: 'Poster URL must be a valid URL format.' });
    }

    next();
};

module.exports = { validateMovie };
