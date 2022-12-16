// import { NextResponse } from 'next/dist/server/web/spec-extension/response';
//
// function getLocation(href) {
//   var match = href.match(
//     // eslint-disable-next-line no-useless-escape
//     /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
//   );
//   return match && `${match[1]}//${match[2]}`;
// }
// export default function middleware(req) {
//   const url = req.url;
//   const verify = req.cookies.get('loggedin');
//   const routes = req.cookies.get('routes');
//   const host = getLocation(req.url);
//   if (
//     !verify &&
//     !url.includes('/userDetails') &&
//     (routes?.value?.split(',')?.some(item => url.includes(item)) ||
//       url === `${host}/`)
//   ) {
//     return NextResponse.redirect(`${host}/login`);
//   }
//
//   if (verify && (url.includes('/login') || url.includes('/userDetails'))) {
//     return NextResponse.redirect(`${host}/dashboard`);
//   }
// }
