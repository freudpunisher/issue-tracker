"use client"

import { Button, Text, TextArea, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Callout } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
// Dynamically import SimpleMDE
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit , formState:{ errors } } = useForm<IssueForm>(
        {
            resolver: zodResolver(createIssueSchema)
        }
    );
    const [error, setError] = useState('')
    const [isSubmitting, setisSubmitting] = useState(false)

    const submit = handleSubmit(async (data) => {
        try {
            setisSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues');
        } catch (error) {
            setisSubmitting(false)
            setError('an unexpected error occurred')
        } 
    })

    return (
        <div className='max-w-xl'>
            {error && 
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }

            <form 
                className=' space-y-5' 
                onSubmit={submit}
            >
                <TextField.Root 
                    placeholder="Title"  
                    {...register('title')} 
                />
                {<ErrorMessage > { errors.title?.message}</ErrorMessage>}
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <SimpleMDE 
                            placeholder='put some description' 
                            {...field} 
                        />
                    )}
                />
                {<ErrorMessage > { errors.description?.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>Submit Issue {isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage