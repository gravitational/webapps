import { spawn } from 'child_process';

export default function startTshProcess() {
  const daemon = spawn(
    '/home/alexey/go/src/github.com/gravitational/teleport/e/build/tsh',
    ['--insecure', 'daemon', 'start', '--debug'],
    {
      stdio: 'inherit',
      env: {
        TELEPORT_HOME: '/tmp/mama',
      },
    }
  );

  daemon.on('error', error => {
    console.error(error);
  });

  daemon.once('exit', code => {
    console.log('tshd existed with code: ', code);
  });

  return daemon;
}
