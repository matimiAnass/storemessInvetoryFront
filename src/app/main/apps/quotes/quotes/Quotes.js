import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import QuotesHeader from './QuotesHeader';
import QuotesTable from './QuotesTable';

function Quotes() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<QuotesHeader />}
      content={<QuotesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('quotesApp', reducer)(Quotes);
