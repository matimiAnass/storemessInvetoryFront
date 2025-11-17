import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../store';
import ContractTypesHeader from './ContractTypesHeader';
import ContractTypesTable from './ContractTypesTable';

function ContractTypes() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ContractTypesHeader />}
      content={<ContractTypesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('constantsApp', reducer)(ContractTypes);
