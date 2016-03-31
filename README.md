# web-reverse-proxy
Reverse proxy is a proxy server which retrieve resources on behalf of client from one or more servers. Client end need not to know about all those servers. They request to proxy server on specific URL with over HTTP and proxy server finds out where to look ( in Servers ) to serve that request.

<i>Note: Running app as a non-root user, need to grant low-numbered port access:</i><br>
```sudo setcap 'cap_net_bind_service=+ep' $(readlink -f $(which node))```
