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
          <div className='flex flex-col w-full items-center p-24'>
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24'
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
              <motion.div>
                <DetailContractWidget/>
              </motion.div>
            </motion.div>
            <Box
              className='rounded-16 border p-12 flex flex-col items-center'
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
            >
            </Box>

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
