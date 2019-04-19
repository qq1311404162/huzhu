module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/admin': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/admin': ''
                // }
            },
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
            '/ms': {
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}