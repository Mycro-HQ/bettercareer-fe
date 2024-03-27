import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import BoldIcon from '@labs/icons/misc/text/bold.svg'
import ItalicIcon from '@labs/icons/misc/text/Italic.svg'
import BulletList from '@labs/icons/misc/text/bullet-list.svg'
import ClearIcon from '@labs/icons/misc/text/clear.svg'
import LinkIcon from '@labs/icons/misc/text/link.svg'
import NumberListIcon from '@labs/icons/misc/text/number-list.svg'
import UnderLineIcon from '@labs/icons/misc/text/underline.svg'
import { Flex } from '@labs/components'



const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Flex.Row className='bg-neutral-50 px-5 py-2 space-x-3 tip-tap-menu' >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
      <BoldIcon />
      </button>
     <button onClick={() => editor.chain().focus()}>
        <UnderLineIcon />
      </button>
      <button

        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <ItalicIcon />
      </button>
        <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : 'border-r-2 mr-0 pr-3'}
      >
        <LinkIcon />
        
      </button>
    
    
    
 
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
      <BulletList />
      </button>
     <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <NumberListIcon />
      </button>
  
  
 
   
 
    </Flex.Row>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const placeholder = 'Enter your text here...';
const content = ``

export default () => {
  return (

    <EditorProvider
    slotBefore={<MenuBar />}
    extensions={extensions}
    content={content}
    onUpdate={({ editor }) => {
      // Show placeholder when the editor is empty
      const placeholderEl = document.querySelector('.tip-tap-placeholder');
      if (placeholderEl) {
        placeholderEl.style.display = editor.isEmpty ? 'block' : 'none';
      }
    }}
  >
    <div className='tip-tap-placeholder'>{placeholder}</div>

    <EditorContent className='tip-tap-editor-content' />
  </EditorProvider>
    // <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} ></EditorProvider>
  )
}