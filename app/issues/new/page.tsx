"use client"

import { Button, TextArea, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Callout } from '@radix-ui/themes';

// Dynamically import SimpleMDE
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>();
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
                <Button>Submit Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage