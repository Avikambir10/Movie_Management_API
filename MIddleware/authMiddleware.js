const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Replace with your own authentication logic
    if (username === 'admin' && password === 'password123') {
        next(); // User is authenticated
    } else {
        return res.sendStatus(403); // Forbidden
    }
};
