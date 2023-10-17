// This file was automatically added by edgio deploy.
// You should commit this file to source control.
import { nextRoutes } from '@edgio/next'
import { Router } from '@edgio/core/router'

export default new Router()
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes)
  .match('/(.*)', async({ compute, cache, proxy }) => {
    cache({ edge: false, browser: false })

    compute(async(request, response) => {
      const resp = await fetch(domain);
  let html = await resp.text();

  // update relative links
  const regex = /\b(href|src)\s*=\s*["']((?!https?:\/\/)[^"']+)/gi;
  html = html.replace(regex, `$1="${domain}$2"`);

  const marquee =
    '<marquee>This paragraph was injected by an edge function.</marquee>';
  html = html.replace(/(<center[^>]*>)/i, `$1${marquee}`);

  return new Response(html, resp);
	    
      return proxy('origin')
    })
  })
  .match('/edgio-api/:path*', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-api/:path*',
          syntax: 'path-to-regexp',
          destination: '/:path*',
        },
      ],
    },
    origin: { set_origin: 'api' },
  })
  .match('/edgio-opt', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-opt:optionalSlash(\\/?)?:optionalQuery(\\?.*)?',
          syntax: 'path-to-regexp',
          destination: '/:optionalSlash:optionalQuery',
        },
      ],
    },
    origin: { set_origin: 'image' },
  })
