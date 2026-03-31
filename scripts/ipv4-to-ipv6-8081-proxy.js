/**
 * Metro/Expo on Windows can sometimes bind only to IPv6 loopback (::1).
 * `adb reverse tcp:8081 tcp:8081` forwards Android -> host IPv4 127.0.0.1:8081,
 * which will fail if nothing is listening on IPv4.
 *
 * This script provides a small TCP bridge:
 *   listens on 127.0.0.1:8081
 *   forwards to  [::1]:8081
 *
 * It operates at the TCP level so it works for HTTP + WebSocket.
 */

const net = require('net');

const LISTEN_HOST = '127.0.0.1';
const LISTEN_PORT = 8081;

const TARGET_HOST = '::1';
const TARGET_PORT = 8081;

const server = net.createServer((client) => {
  const target = net.connect({ host: TARGET_HOST, port: TARGET_PORT }, () => {
    client.pipe(target);
    target.pipe(client);
  });

  const closeBoth = () => {
    client.destroy();
    target.destroy();
  };

  client.on('error', closeBoth);
  target.on('error', closeBoth);
  client.on('close', closeBoth);
  target.on('close', closeBoth);
});

server.on('error', (err) => {
  console.error('[proxy] server error:', err);
  process.exit(1);
});

server.listen(LISTEN_PORT, LISTEN_HOST, () => {
  console.log(`[proxy] listening on ${LISTEN_HOST}:${LISTEN_PORT} -> forwarding to [${TARGET_HOST}]:${TARGET_PORT}`);
});
