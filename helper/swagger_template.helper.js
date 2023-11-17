const swaggerDefinition = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Testing FGA Issue',
            version: '1.0.0',
            description: 'Your API description',
        },
        servers: [
            {
                url: 'https://challenge6-production-95ae.up.railway.app/'
            },
            {
                url: 'http://localhost:8080',
            },
            {
                url: 'http://localhost:3000',
            },

        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'https',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [
        './routes/user.route.js',
        './routes/bank.account.route.js',
        './routes/transaction.route.js',
        './routes/auth.route.js'
    ],

}

module.exports = swaggerDefinition