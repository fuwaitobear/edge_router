/**
 * Simple proxy worker
 * Forwards requests to the target host
 */

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const targetHost = env.TARGET_HOST || 'example.com';
      
      // Create new URL with target host
      const targetUrl = new URL(url.pathname + url.search, `https://${targetHost}`);
      
      // Clone the request with new URL
      const modifiedRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'manual',
      });
      
      // Forward the request
      const response = await fetch(modifiedRequest);
      
      return response;
    } catch (error) {
      return new Response(`Proxy Error: ${error.message}`, { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  },
};
