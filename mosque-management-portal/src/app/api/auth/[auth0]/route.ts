import auth0 from "@/lib/auth0";

// export const GET = auth0.handleAuth();
// export async function GET({ params }) {
//     const {auth0: auth0Param} = await params;
//     const handler = auth0.handleAuth();
//     return handler
// }

const loginHandler = auth0.handleLogin({
    authorizationParams: {
        audience: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/',
        scope: 'openid profile',
    },
});

export async function GET(req) {
    return loginHandler(req);
}
// const handler = auth0.handleAuth({
//     signup: auth0.handleLogin({
//         authorizationParams: {
//             screen_hint: 'signup'
//         } }),
//     login: auth0.handleLogin({
//         authorizationParams: {
//             audience: 'https://dev-kcm0rrkdks1wi726.us.auth0.com/api/v2/', // or AUTH0_AUDIENCE
//             // Add the `offline_access` scope to also get a Refresh Token
//             scope: 'openid profile email read:products' // or AUTH0_SCOPE
//         }
//     })
// });
//
// export { handler as GET, handler as POST };