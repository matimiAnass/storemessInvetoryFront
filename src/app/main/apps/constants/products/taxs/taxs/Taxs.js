import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../../store';
import TaxsHeader from './TaxsHeader';
import TaxsTable from './TaxsTable';

function Taxs() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<TaxsHeader />}
      content={<TaxsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('constantsApp', reducer)(Taxs);
