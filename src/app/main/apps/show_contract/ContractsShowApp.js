import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { lighten, styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import LabelsDialog from './dialogs/labels/LabelsDialog';
import ContractDialog from './dialogs/note/ContractDialog';
import ContractsHeader from './ContractsHeader';
import ContractsSidebarContent from './ContractsSidebarContent';
import reducer from './store';
import { getLabels } from './store/labelsSlice';
import { getNotes } from './store/contractsShowSlice';
import { motion } from 'framer-motion';
import AttachementWidget from './widgets/AttachementWidget';
import CommentWidget from './widgets/CommentWidget';
import NoteWidget from './widgets/NotesWidget';
import DetailContractWidget from './widgets/DetailContractWidget';
import DescriptionContractWidget from './widgets/DescriptionContractWidget';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-sidebar': {},
  '& .FusePageCarded-leftSidebar': {},
}));

function ContractsShowApp(props) {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const routeParams = useParams();



  useEffect(() => {
    dispatch(getNotes(routeParams));
    dispatch(getLabels());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<ContractsHeader onSetSidebarOpen={setLeftSidebarOpen} />}
        content={
          <div className='flex flex-col w-full items-center pr-24 pl-24 pb-12 pt-24'>
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-24 w-full min-w-0 pr-24 pl-24 pb-24'
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
                  <DetailContractWidget/>
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
                  <DescriptionContractWidget />
                </motion.div>
              </motion.div>
            <ContractDialog />
            <LabelsDialog />
          </div>
        }
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarOnClose={() => {
          setLeftSidebarOpen(false);
        }}
        leftSidebarContent={<ContractsSidebarContent />}
        scroll={isMobile ? 'normal' : 'content'}
      />
    </>
  );
}

export default withReducer('ContractsShowApp', reducer)(ContractsShowApp);
