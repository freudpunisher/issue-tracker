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

    return (
        <div className='max-w-xl'>
            {error && 
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }

            <form 
                className=' space-y-5' 
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues');
                    } catch (error) {
                        setError('an unexpected error occurred')
                    } 
                })}
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
                <Button>Submit Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage