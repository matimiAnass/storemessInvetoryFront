import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useFormContext } from 'react-hook-form';

function ContractHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;

  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center justify-between p-8 sm:p-24 sm:px-32 relative">
      <div className="flex shrink items-center sm:w-224">
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => props.onSetSidebarOpen(true)}
            aria-label="open left sidebar"
            size="large"
          >
            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
          </IconButton>
        </Hidden>

        <div className="flex items-center">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
          >
            Details
          </Typography>
        </div>
      </div>

      {/* <div className="flex flex-1 w-full sm:w-auto items-center justify-end space-x-12"> */}
      {/*  <Tooltip title="Toggle Variate Description Size"> */}
      {/*    <IconButton onClick={(ev) => dispatch(toggleVariateDescSize())} size="large"> */}
      {/*      <FuseSvgIcon color={variateDescSize ? 'action' : 'disabled'}> */}
      {/*        heroicons-solid:switch-vertical */}
      {/*      </FuseSvgIcon> */}
      {/*    </IconButton> */}
      {/*  </Tooltip> */}
      {/*  <ContractsSearch /> */}
      {/* </div> */}
    </div>
  );
}

export default ContractHeader;
