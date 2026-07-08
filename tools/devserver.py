# Serveur de développement : comme `python -m http.server` mais avec
# Cache-Control: no-store, pour que le navigateur recharge toujours les
# fichiers modifiés (sinon Chrome applique une fraîcheur heuristique et
# sert des vieux JS/CSS depuis son cache disque).
import functools
import http.server
import sys

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8813
    directory = sys.argv[2] if len(sys.argv) > 2 else "."
    handler = functools.partial(NoCacheHandler, directory=directory)
    http.server.test(HandlerClass=handler, port=port, bind="127.0.0.1")
