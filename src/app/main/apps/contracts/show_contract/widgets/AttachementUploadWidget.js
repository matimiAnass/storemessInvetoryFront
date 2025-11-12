import { lighten } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { rgb } from 'polished';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MailAttachment from '../../../mailbox/MailAttachment';
import { getFilesAttachement, fileUpload, selectContract } from '../../store/contractSlice';

function AttachementUploadWidget(props) {
  const [newImage, setNewImage] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const methods = useFormContext();
  const routeParams = useParams();
  const { getValues, formState, control, setValue } = methods;
  const data = useSelector(selectContract);

  useEffect(() => {
    // get the files contracts
    dispatch(getFilesAttachement(routeParams.contractId));
  }, [dispatch, routeParams]);

  function handleSaveFile() {
    const val = getValues().Attachements;
    // e.preventDefault();
    const data = new FormData();
    if (getValues().file) {
      // console.log(getValues().file);
      data.append('file', getValues()?.file);
    }
    for (const value of data.values()) {
      console.log(value);
    }
    dispatch(fileUpload(data)).then(() => {
      window.location.reload(true);
    });
  }

  return (
    <Paper
      className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden"
      style={{ backgroundColor: rgb(241, 245, 249) }}
    >
      <div className="flex items-center justify-between px-8 pt-11">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate pb-11"
          color="text.secondary"
        >
          Attachments
        </Typography>
      </div>
      {/* <form onSubmit={handleSaveFile} encType="multipart/form-data"> */}
      <div className="flex justify-center sm:justify-center flex-wrap -mx-16">
        <Controller
          name="file"
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
              component="label"
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-80 h-80 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/png, image/jpeg, image/jpg, application/pdf, application/pdf, application/txt, application/doc,"
                className="hidden"
                id="button-file"
                name="file"
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
                          type: 'file',
                        });
                      };

                      reader.onerror = reject;

                      reader.readAsBinaryString(file);
                    });
                  }

                  const img_ = await readFileAsync();
                  onChange(img_);
                  setValue('file', e.target.files[0]);
                  handleSaveFile();
                }}
              />
              <FuseSvgIcon size={32} style={{ color: 'white' }}>
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
      </div>
      <div className="pt-8">
        {data.filesAttachement?.files.files.map((m) => {
          return <MailAttachment key={m.id} fileName={m.files} size="12 kb" />;
        })}
      </div>
    </Paper>
  );
}

export default AttachementUploadWidget;
