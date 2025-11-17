import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../../store';
import BrandsHeader from './BrandsHeader';
import BrandsTable from './BrandsTable';

function Brands() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<BrandsHeader />}
      content={<BrandsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('constantsApp', reducer)(Brands);
