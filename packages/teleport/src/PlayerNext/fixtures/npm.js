import ttyStream from 'raw-loader!./npm.tty.stream';

import ttyEvents from './npm.tty.events.json';
import auditEvents from './npm.audit.events.json';

export default { ttyEvents, ttyStream, auditEvents };
