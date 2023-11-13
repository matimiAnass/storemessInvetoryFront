import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import ContractsHeader from './ContractsHeader';
import ContractsTable from './ContractsTable';

function Contracts() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ContractsHeader />}
      content={<ContractsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('contractsApp', reducer)(Contracts);
