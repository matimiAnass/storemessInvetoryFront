import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { rgb } from 'polished';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


function AttachementUploadWidget(props) {
  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
           style={{backgroundColor:rgb(241,245,249)}}>
      <div className='flex items-center justify-between px-8 pt-11'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate pb-11'
          color='text.secondary'
        >
          {'Attachments'}
        </Typography>
      </div>
      <div className="flex justify-center sm:justify-center flex-wrap -mx-16">
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              style={{backgroundColor:rgb(79,70,229)}}
              component="label"
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={async (e) => {
                  function readFileAsync() {
                    return new Promise((resolve, reject) => {
                      const file = e.target.files[0];
                      if (!file) {
                        return;
                      }
                      const reader = new FileReader();

                      reader.onload = () => {
                        resolve({
                          id: FuseUtils.generateGUID(),
                          url: `data:${file.type};base64,${btoa(reader.result)}`,
                          type: 'image',
                        });
                      };

                      reader.onerror = reject;

                      reader.readAsBinaryString(file);
                    });
                  }

                  const newImage = await readFileAsync();

                  onChange([newImage, ...value]);
                }}
              />
              <FuseSvgIcon size={32} color="inherit" >
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
      </div>
    </Paper>
  );
}

export default AttachementUploadWidget;
