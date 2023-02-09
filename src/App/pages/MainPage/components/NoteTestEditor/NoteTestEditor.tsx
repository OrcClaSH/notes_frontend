import React, { useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import st from './NoteTestEditor.module.scss';

interface Props {
  initialContent: string;
  language: string;
}

const NoteTestEditor: React.FC<Props> = ({ initialContent, language }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(initialContent)
    )
  );
  const [isEditing, setIsEditing] = useState(false);

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
  };


  const content = editorState.getCurrentContent();
  const rawContent = convertToRaw(content);
  const plainText = rawContent.blocks
  .map((block) => block.text)
  .join("\n");

  console.log('rawContent', rawContent)
  console.log('plainText', plainText)

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    // onEditorStateChange()
  };

  const toolbarOptions = {
    options: [
      'inline',
      'blockType',
    ],
    blockType: {
      inDropdown: false,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    }
  };

  return (
    <>
      {isEditing ? (
        <div className={st.editor}>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={toolbarOptions}
            wrapperClassName={st.editor}
            editorClassName={st.editor}
            toolbarClassName={st.editor}
          />
        </div>
      ) : (
        <div className={st.editor}>
          {rawContent.entityMap ? (
            <SyntaxHighlighter
              language={language}
              style={tomorrow}
              customStyle={{
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#f2f2f2",
              }}
            >
              {plainText}
            </SyntaxHighlighter>
          ) : (
            plainText
          )}
        </div>
      )}
      <button onClick={toggleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </>
  );
};

export default NoteTestEditor;


// =====================
// import React from 'react';
// import Brilliant from 'brilliant-editor';
// import 'brilliant-editor/dist/index.css';

// const NoteTestEditor = () => {
//   return (
//     <div>
//       <Brilliant language='en' readOnly={false}/>
//     </div>
//   )
// }

// export default NoteTestEditor;


// ==================

// import React, { useState } from "react";
// import {
//   EditorState,
//   ContentState,
//   convertToRaw,
//   Modifier,
//   getDefaultKeyBinding,
//   KeyBindingUtil,
//   RichUtils
// } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// interface Props {
//   initialContent?: string;
//   language?: string;
// }

// const CodeEditor: React.FC<Props> = ({ initialContent = "", language = "javascript" }) => {
//   const [editorState, setEditorState] = useState(
//     EditorState.createWithContent(
//       ContentState.createFromText(initialContent)
//     )
//   );

//   const handleKeyCommand = (command: string, editorState: EditorState) => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       setEditorState(newState);
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const handleReturn = (e: React.KeyboardEvent, editorState: EditorState) => {
//     const contentState = editorState.getCurrentContent();
//     const selection = editorState.getSelection();
//     const block = contentState.getBlockForKey(selection.getStartKey());
//     if (block.getType() === "code-block") {
//       setEditorState(RichUtils.insertSoftNewline(editorState));
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const customKeyBindingFn = (e: React.KeyboardEvent) => {
//     if (KeyBindingUtil.hasCommandModifier(e)) {
//       if (e.key === "`") {
//         return "add-code-block";
//       }
//     }
//     return getDefaultKeyBinding(e);
//   };

//   const onTab = (e: React.KeyboardEvent) => {
//     const maxDepth = 4;
//     setEditorState(RichUtils.onTab(e, editorState, maxDepth));
//   };

//   const onChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);
//   };

//   const onAddCodeBlock = () => {
//     const contentState = editorState.getCurrentContent();
//     const selection = editorState.getSelection();
//     const blockKey = selection.getStartKey();
//     const block = contentState.getBlockForKey(blockKey);
//     const currentType = block.getType();
//     const blockMap = contentState.getBlockMap();
//     const newBlocks = blockMap.toSeq().map(block => {
//       if (block.getKey() === blockKey) {
//         return block.setIn(["type"], currentType === "code-block" ? "unstyled" : "code-block");
//       }
//       return block;
//     });

//     const newContentState = contentState.mergeWith((prev, next) => prev.merge(next), {
//       blockMap: newBlocks,
//       selectionBefore: selection,
//       selectionAfter: selection
//     });

//     const newEditorState = EditorState.push(
//       editorState,
//       newContentState,
//       "change-block-type"
//     );

//     setEditorState(EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter()));
//   };

//   return (

//     <div className="code-editor">
//       <Editor
//         editorState={editorState}
//         handleKeyCommand={handleKeyCommand}
//         handleReturn={handleReturn}
//         keyBindingFn={customKeyBindingFn}
//         onTab={onTab}
//         onChange={onChange}
//         placeholder="Enter your code..."
//       />
//       <button onClick={onAddCodeBlock}>Toggle Code Block</button>
//       <SyntaxHighlighter language={language} style={tomorrow}>
//         {editorState && JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
//       </SyntaxHighlighter>
//     </div>
//   );
// };
// export default CodeEditor;