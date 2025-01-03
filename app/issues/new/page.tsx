"use client"

import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-5'>
          <TextField.Root   placeholder="Title" />
          <SimpleMDE placeholder='put some description' />
          <Button>Submit Issue</Button>
      
    </div>
  )
}

export default NewIssuePage
