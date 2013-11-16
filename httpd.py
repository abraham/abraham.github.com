#!/usr/bin/env python
import SimpleHTTPServer
import SocketServer


class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)


print 'running on port 8080'


server = SocketServer.TCPServer(('0.0.0.0', 8080), Handler)
server.serve_forever()
