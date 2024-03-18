// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
    },

    meme: {
      root: `${ROOTS.DASHBOARD}/memes`,
    },
    ads: {
      root: `${ROOTS.DASHBOARD}/ads`,
      new: `${ROOTS.DASHBOARD}/ads/new`,
    },
    verification: {
      root: `${ROOTS.DASHBOARD}/verification`,
    },
  },
};
