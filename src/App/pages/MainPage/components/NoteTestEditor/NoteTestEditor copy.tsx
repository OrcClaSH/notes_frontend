// import React, { useState } from "react";
// import { EditorState, ContentState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// import st from './NoteTestEditor.module.scss';

// interface Props {
//   initialContent: string;
//   language: string;
// }

// const NoteTestEditor: React.FC<Props> = ({ initialContent, language }) => {
//   const [editorState, setEditorState] = useState(
//     EditorState.createWithContent(
//       ContentState.createFromText(initialContent)
//     )
//   );
//   const [isEditing, setIsEditing] = useState(false);

//   const onEditorStateChange = (state: EditorState) => {
//     setEditorState(state);
//   };


//   const content = editorState.getCurrentContent();
//   const rawContent = convertToRaw(content);
//   const plainText = rawContent.blocks
//   .map((block) => block.text)
//   .join("\n");

//   console.log('rawContent', rawContent)
//   console.log('plainText', plainText)

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//     // onEditorStateChange()
//   };

//   const toolbarOptions = {
//     options: [
//       'inline',
//       'blockType',
//     ],
//     blockType: {
//       inDropdown: false,
//       options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
//       className: undefined,
//       component: undefined,
//       dropdownClassName: undefined,
//     }
//   };

//   return (
//     <>
//       {isEditing ? (
//         <div className={st.editor}>
//           <Editor
//             editorState={editorState}
//             onEditorStateChange={onEditorStateChange}
//             toolbar={toolbarOptions}
//             wrapperClassName={st.editor}
//             editorClassName={st.editor}
//             toolbarClassName={st.editor}
//           />
//         </div>
//       ) : (
//         <div className={st.editor}>
//           {rawContent.entityMap ? (
//             <SyntaxHighlighter
//               language={language}
//               style={tomorrow}
//               customStyle={{
//                 borderRadius: "5px",
//                 padding: "10px",
//                 backgroundColor: "#f2f2f2",
//               }}
//             >
//               {plainText}
//             </SyntaxHighlighter>
//           ) : (
//             plainText
//           )}
//         </div>
//       )}
//       <button onClick={toggleEdit}>
//         {isEditing ? "Save" : "Edit"}
//       </button>
//     </>
//   );
// };

// export default NoteTestEditor;




// ========================================================

import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

import st from './NoteTestEditor.module.scss';

interface Props {
  initialContent?: string;
  language?: string;
 }

const NoteTestEditor: React.FC<Props> = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleKeyCommand = (command: string) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onToggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onCodeClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'));
  }

  const saveNote = () => {
    // Save the editor state to the backend or local storage.
    const content = convertToRaw(editorState.getCurrentContent());
    console.log(JSON.stringify(content));
  };

  return (
    <div className={st.editor}>
      <div className={st.editor__buttons}>
        <button onClick={onToggleReadOnly}>
          {isReadOnly ? 'to Edit' : 'to Read'}
        </button>
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onBoldClick}>B</button>
        <button onClick={onItalicClick}>I</button>
        <button onClick={onCodeClick}>Code</button>
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        readOnly={isReadOnly}
        onChange={(state) => setEditorState(state)}
      />
      {!isReadOnly && <button onClick={saveNote}>Save</button>}
    </div>
  );
};

export default NoteTestEditor;
