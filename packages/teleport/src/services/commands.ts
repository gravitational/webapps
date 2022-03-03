import { formatDistanceStrict } from 'date-fns';
import { BashCommand, NodeToken } from 'teleport/services/nodes';
import cfg from 'teleport/config';

export function createAppBashCommand(
  token: NodeToken,
  appName = '',
  appUri = ''
): BashCommand {
  const expires = formatDistanceStrict(new Date(), token.expiry);

  // encode uri so it can be passed around as URL query parameter
  const encoded = encodeURIComponent(appUri)
    // encode single quotes so they do not break the curl parameters
    .replace(/'/g, '%27');

  const bashUrl =
    cfg.baseUrl +
    cfg.api.appNodeScriptPath
      .replace(':token', token.id)
      .replace(':name', appName)
      .replace(':uri', encoded);

  const text = `sudo bash -c "$(curl -fsSL '${bashUrl}')"`;

  return {
    text,
    expires,
  };
}

export function createNodeBashCommand(node: NodeToken): BashCommand {
  const { expiry, id } = node;

  const expires = formatDistanceStrict(new Date(), new Date(expiry));
  const text = `sudo bash -c "$(curl -fsSL ${cfg.getNodeScriptUrl(id)})"`;

  return {
    text,
    expires,
  };
}
