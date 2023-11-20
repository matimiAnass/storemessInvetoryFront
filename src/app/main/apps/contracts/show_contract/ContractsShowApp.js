import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { lighten, styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import ContractsHeader from './ContractsHeader';
import reducer from '../store';
import { motion } from 'framer-motion';
import AttachementWidget from './widgets/AttachementWidget';
import CommentWidget from './widgets/CommentWidget';
import NoteWidget from './widgets/NotesWidget';
import DetailContractWidget from './widgets/DetailContractWidget';
import DescriptionContractWidget from './widgets/DescriptionContractWidget';
import AttachementUploadWidget from './widgets/AttachementUploadWidget';
import CommentFieldWidget from './widgets/CommentFieldWidget';
import NoteFieldWidget from './widgets/NoteFieldWidget';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { getContract, getDropdownList, newContract } from '../store/contractSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDeepCompareEffect } from '@fuse/hooks';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-sidebar': {},
  '& .FusePageCarded-leftSidebar': {},
}));

function ContractsShowApp(props) {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const [contracts, setContracts] = useState({});
  const [clients, setClients] = useState({});
  const routeParams = useParams();
  const [contract, setContract] = useState({});

  useEffect(()=>{
    // dispatch(getContract(routeParams.roleId)).then((action)=>{
    //   setContract(action.payload)
    // })
    function updateContractState() {
      dispatch(getContract(routeParams.roleId))
    }
    updateContractState();
  },[dispatch])

  useEffect(() => {

  }, [dispatch, routeParams]);

  console.log(methods);

    if (!contract){
      return <FuseLoading />;
  }
  return (
    <>
      <FormProvider {...methods}>
        <FusePageCarded
        header={<ContractsHeader />}
        content={
          <div className='flex flex-col w-full items-center pr-24 pl-24 pb-12 pt-24'>
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-24 w-full min-w-0 pr-24 pl-24 pb-24'
              initial='hidden'
              animate='show'
            >
              <motion.div>
                <AttachementWidget/>
              </motion.div>
              <motion.div>
                <CommentWidget/>
              </motion.div>
              <motion.div>
                <NoteWidget/>
              </motion.div>
            </motion.div>
              <motion.div
                className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0  pb-24 pl-24 pr-24'
                initial='hidden'
                animate='show'
              >
                <motion.div>
                  <DetailContractWidget handleData = {contract} />
                </motion.div>
              </motion.div>
              <motion.div
                className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0  pb-24 pl-24 pr-24'
                initial='hidden'
                animate='show'
              >
                <motion.div
                  className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0'
                  initial='hidden'
                  animate='show'>
                  <DescriptionContractWidget handleData = {contract} />
                </motion.div>
                <motion.div
                  className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0'
                  initial='hidden'
                  id={'attachement'}
                  animate='show'>
                  <AttachementUploadWidget />
                </motion.div>
                <motion.div
                  className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0'
                  initial='hidden'
                  id={'comment'}
                  animate='show'>
                  <CommentFieldWidget />
                </motion.div>
                <motion.div
                  className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0'
                  initial='hidden'
                  id={'note'}
                  animate='show'>
                  <NoteFieldWidget />
                </motion.div>
              </motion.div>
          </div>
        }
        />
      </FormProvider>
    </>
  );
}

export default withReducer('ContractApp', reducer)(ContractsShowApp);
