import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import FuseLoading from '@fuse/core/FuseLoading';
import reducer from '../store';
import AttachementWidget from './widgets/AttachementWidget';
import CommentWidget from './widgets/CommentWidget';
import NoteWidget from './widgets/NotesWidget';
import DetailContractWidget from './widgets/DetailContractWidget';
import DescriptionContractWidget from './widgets/DescriptionContractWidget';
import AttachementUploadWidget from './widgets/AttachementUploadWidget';
import CommentFieldWidget from './widgets/CommentFieldWidget';
import NoteFieldWidget from './widgets/NoteFieldWidget';
import { getContract } from '../store/contractSlice';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {},
  '& .FusePageCarded-sidebar': {},
  '& .FusePageCarded-leftSidebar': {},
}));

function ContractShowApp(props) {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const methods = useFormContext();
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const routeParams = useParams();
  const [contract, setContract] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    dispatch(getContract(routeParams.contractId)).then((action) => {
      setContract(action.payload);
      setCheck(true);
    });
  }, [dispatch]);

  if (!contract) {
    return <FuseLoading />;
  }
  return (
    <div className="flex flex-col w-full items-center pr-24 pl-24 pb-7 pt-7">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-24 w-full min-w-0 pr-24 pl-24 pb-24"
        initial="hidden"
        animate="show"
      >
        <motion.div>
          <AttachementWidget />
        </motion.div>
        <motion.div>
          <CommentWidget />
        </motion.div>
        <motion.div>
          <NoteWidget />
        </motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0  pb-24 pl-24 pr-24"
        initial="hidden"
        animate="show"
      >
        <motion.div>
          <DetailContractWidget />
        </motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0  pb-24 pl-24 pr-24"
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0"
          initial="hidden"
          animate="show"
        >
          <DescriptionContractWidget />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0"
          initial="hidden"
          id="attachement"
          animate="show"
        >
          <AttachementUploadWidget />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0"
          initial="hidden"
          id="comment"
          animate="show"
        >
          <CommentFieldWidget />
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-24 w-full min-w-0"
          initial="hidden"
          id="note"
          animate="show"
        >
          <NoteFieldWidget />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default withReducer('ContractApp', reducer)(ContractShowApp);
