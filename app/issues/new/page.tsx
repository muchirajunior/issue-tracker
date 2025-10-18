'use client';

import { Button,Callout,TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewIssuePage(){
    const {register,handleSubmit} = useForm();
    const router = useRouter();
    const [error,setError] = useState('');

    return (
        <div className="max-w-xl">
            { error &&  <Callout.Root  color="red" className="mb-3">
                <Callout.Text >{error}</Callout.Text>
            </Callout.Root>}
            <form 
                className="space-y-3" 
                onSubmit={handleSubmit( async(data)=>{
                    try {
                        await axios.post('/api/issues',data);
                        router.push('/issues');
                    } catch (error) {
                        setError('Some error occured... ')
                    }
                }
                )}>
                    <TextField.Root placeholder="Title" {...register('title')} >
                        <TextField.Slot />
                    </TextField.Root>
                    <TextArea  placeholder="Description" {...register('description')}  />
                    <Button className="w-full">Create New Issue</Button>
                </form>
        </div>
    )
    
}