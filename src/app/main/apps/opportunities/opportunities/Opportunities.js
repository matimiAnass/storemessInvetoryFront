import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import OpportunitiesHeader from './OpportunitiesHeader';
import OpportunitesTable from './OpportunitiesTable';

function Opportunities() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<OpportunitiesHeader />}
      content={<OpportunitesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('opportunitiesApp', reducer)(Opportunities);
