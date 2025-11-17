import { lazy } from 'react';
import Quote from './quote/quote';

const Quotes = lazy(() => import('./quotes/Quotes'));

const QuotesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/quotes',
      element: <Quotes />,
    },
    {
      path: 'apps/quotes/:quoteId/*',
      element: <Quote />,
    },
  ],
};
export default QuotesAppConfig;
