"use client"

import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'
import { useForm, Controller} from 'react-hook-form';

interface IssueForm{

    title: string,
    description: string
}






const NewIssuePage = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form className='max-w-xl space-y-5' onSubmit={handleSubmit(() => console.log("submit"))}>
          <TextField.Root placeholder="Title"  {...register('title')} />
          <Controller
              name="description"
              control={control}
              render={({field}) => <SimpleMDE placeholder='put some description' {...field} /> }
          />
          <Button>Submit Issue</Button>
      
    </form>
  )
}

export default NewIssuePage
