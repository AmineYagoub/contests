import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({
    key: 'css',
    prepend: true,
    stylisPlugins: [prefixer, rtlPlugin],
  });
}
