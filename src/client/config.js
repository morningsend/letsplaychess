export const config = {
    baseUrl: 'http://localhost:3000',
    path: '/realtime',
    chatSocket: {
        namespace: '/chat',
    },
    gameSocket: {
        namespace: '/game',
    },
    apiUrl: 'http://localhost:3000/api',
}

export default config;