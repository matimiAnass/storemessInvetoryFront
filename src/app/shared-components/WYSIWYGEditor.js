import { forwardRef, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';
import ContentState from 'draft-js/lib/ContentState';
import { useFormContext } from 'react-hook-form';
import { getDropdownList } from '../main/apps/contracts/store/contractSlice';
import { useDispatch } from 'react-redux';

const Root = styled('div')({
  '& .rdw-dropdown-selectedtext': {
    color: 'inherit',
  },
  '& .rdw-editor-toolbar': {
    borderWidth: '0 0 1px 0!important',
    margin: '0!important',
  },
  '& .rdw-editor-main': {
    padding: '8px 12px',
    height: `${256}px!important`,
  },
});

const WYSIWYGEditor = forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const methods = useFormContext();
  const { getValues, formState, control ,setValue } = methods;
  const _contentState = ContentState.createFromText(formState.defaultValues.description);
  const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const [content, setContent] = useState(raw); // ContentState JSON
  const dispatch = useDispatch();

  useEffect(()=>{
    setValue("description", contentState.blocks[0].text)
  },[contentState])


  function onEditorStateChange(_editorState) {
    setEditorState(_editorState);

    return props.onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
  }


  // console.log(getValues());

  return (
    <Root className={clsx('rounded-4 border-1 overflow-hidden w-full', props.className)} ref={ref}>
      <Editor defaultContentState={contentState} onContentStateChange={setContentState} />
    </Root>
  );
});

export default WYSIWYGEditor;
