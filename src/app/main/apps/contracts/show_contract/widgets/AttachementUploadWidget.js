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
import { descriptionStore, fileUpload } from '../../store/contractSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


function AttachementUploadWidget(props) {
  const [newImage, setNewImage] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { getValues, formState, control, setValue } = methods;



  function handleSaveFile() {
    let formData = new FormData()
    // formData = {
    //   "file" : getValues().file
    // }
    dispatch(fileUpload(getValues().file ))/*.then(() => {
      // window.location.reload(true);
    });*/
  }


  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
           style={{ backgroundColor: rgb(241, 245, 249) }}>
      <div className='flex items-center justify-between px-8 pt-11'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate pb-11'
          color='text.secondary'
        >
          {'Attachments'}
        </Typography>
      </div>
      <div className='flex justify-center sm:justify-center flex-wrap -mx-16'>
        <Controller
          name='images'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              style={{ backgroundColor: rgb(79, 70, 229) }}
              component='label'
              htmlFor='button-file'
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept='image/png, image/jpeg, image/jpg, application/pdf, application/pdf, application/txt, application/doc'
                className='hidden'
                id='button-file'
                name='file'
                type='file'
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
                          type: 'file',
                        });
                      };

                      reader.onerror = reject;

                      reader.readAsBinaryString(file);

                      setImg(file);
                      setValue('file', file );

                    });
                  }

                  const img_ = await readFileAsync()
                  onChange(img_)
                  handleSaveFile()
                }}
              />
              <FuseSvgIcon size={32} style={{ color: 'white' }}>
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
      </div>
    </Paper>
  );
}

export default AttachementUploadWidget;
