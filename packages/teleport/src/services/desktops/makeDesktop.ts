import type { Desktop, WindowsDesktopService } from './types';

export function makeDesktop(json): Desktop {
  const { os, name, addr } = json;

  const labels = json.labels || [];

  return {
    os,
    name,
    addr,
    labels,
  };
}

export function makeDesktopService(json): WindowsDesktopService {
  const { hostname, addr } = json;

  const labels = json.labels || [];

  return {
    hostname,
    addr,
    labels,
  };
}
