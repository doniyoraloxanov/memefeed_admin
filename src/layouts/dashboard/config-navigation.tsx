import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'MemeProf',
        items: [{ title: 'Statistics', path: paths.dashboard.root, icon: ICONS.dashboard }],
      },

      {
        subheader: 'management',
        items: [
          {
            title: 'user',
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [{ title: 'List', path: paths.dashboard.user.root }],
          },
          {
            title: 'Memes',
            path: paths.dashboard.meme.root,
            icon: ICONS.user,
            children: [{ title: 'List', path: paths.dashboard.meme.root }],
          },
          {
            title: 'Ads',
            icon: ICONS.booking,
            path: paths.dashboard.ads.root,
            children: [
              { title: 'List', path: paths.dashboard.ads.root },
              { title: 'create', path: paths.dashboard.ads.new },
            ],
          },
          {
            title: 'Verification',
            icon: ICONS.booking,
            path: paths.dashboard.verification.root,
            children: [{ title: 'List', path: paths.dashboard.verification.root }],
          },

          // {
          //   title: 'chat',
          //   icon: ICONS.chat,
          //   path: paths.dashboard.chat.chat,
          // },
        ],
      },
    ],
    []
  );

  return data;
}
