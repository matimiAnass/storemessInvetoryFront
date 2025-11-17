import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../../store';
import TypesHeader from './TypesHeader';
import TypesTable from './TypesTable';

function Types() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<TypesHeader />}
      content={<TypesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('constantsApp', reducer)(Types);
