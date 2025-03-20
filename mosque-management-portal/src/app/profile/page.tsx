// 'use client';
//
// // import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
// //
// // export default withPageAuthRequired(function Profile({ user }) {
// //     return <div>Hello {user.name}</div>;
// // });
//
// import { useUser } from '@auth0/nextjs-auth0/client';
// import Link from "next/link";
// import * as React from "react";
//
// export default function Index() {
//     // const {user, error, isLoading} = useUser();
//     const {user} = useUser();
//     // if (isLoading) return <div >Loading...</div >;
//     // if (error) return <div >{error.message}</div >;
//
//     if (user) {
//         return (
//             <div >
//                 Welcome {user.name}! <a href = "/api/auth/logout" >Logout</a >
//             </div >
//         );
//     }
//
//     return <Link href = "/api/auth/login" >
//         Login
//     </Link >
// }