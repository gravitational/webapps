import * as Icons from 'design/Icon';
import AppManage from './../../Apps/AppManage';

export default class FeatureTrustedClusters {
  route = {
    title: 'AIP',
    path: '/web/settings/iap/',
    component: AppManage,
  };

  navItem = {
    title: 'Identity Aware Proxy',
    Icon: Icons.LanAlt,
    to: '/web/settings/iap/',
  };
}
