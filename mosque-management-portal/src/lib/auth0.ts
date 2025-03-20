// import { SessionStore, SessionStorePayload, initAuth0 } from '@auth0/nextjs-auth0';

// class Store implements SessionStore {
//     private store: KeyValueStoreLikeRedis<SessionStorePayload>;
//     constructor() {
//         // If you set the expiry accross the whole store use the session config,
//         // for example `min(config.session.rollingDuration, config.session.absoluteDuration)`
//         // the default is 24 hrs
//         this.store = new KeyValueStoreLikeRedis();
//     }
//     async get(id) {
//         const val = await this.store.get(id);
//         return val;
//     }
//     async set(id, val) {
//         // To set the expiry per item, use `val.header.exp` (in secs)
//         const expiryMs = val.header.exp * 1000;
//         // Example for Redis: redis.set(id, val, { pxat: expiryMs });
//         await this.store.set(id, val);
//     }
//     async delete(id) {
//         await this.store.delete(id);
//     }
// }

const auth0 = initAuth0({
    clientID: 'EmDjO7rweyHE1VokgvUBHb1g6UBlYiof',
    clientSecret: 'C3s_ZVVXqneCx5x-lgtoVCjyMzPjXtyVCaUPtHVHfaXQiGwdWhTAqQSzy22uJ90Y',
    secret: '2ace3de45ef535228be9850922fbc7245ec54bef3c8cabb6e2279519f940c3bf',
    issuerBaseURL: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/',
    baseURL: 'http://localhost:3000',
    // clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    // clientSecret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
    // secret: process.env.REACT_APP_AUTH0_SECRET,
    // issuerBaseURL: process.env.REACT_APP_AUTH0_ISSUER_BASE_URL,
    // baseURL: process.env.REACT_APP_AUTH0_BASE_URL,
    // session: {
    //     store: new Store()
    // },
    // backchannelLogout: true
});

export default auth0;