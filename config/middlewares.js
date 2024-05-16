 module.exports = [
    'strapi::errors',
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "connect-src": ["'self'", "https:"],
                    'script-src': ["'self'", "'unsafe-inline'"],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "*.amazonaws.com",
                    ],
                    "media-src": ["'self'", "data:", "blob:"],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    //  'strapi::security',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
