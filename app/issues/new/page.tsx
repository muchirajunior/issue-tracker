'use client';

import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button,Callout,Spinner,Text,TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type IssueForm = z.infer<typeof issueSchema>;

export default function NewIssuePage(){
    const {register,handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)
    });
    const router = useRouter();
    const [error,setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onSubmit = handleSubmit( async(data)=>{
        try {
            setLoading(true);
            await axios.post('/api/issues',data);
            router.push('/issues');
        } catch (error) {
            setError('Some error occured... ')
            setLoading(false);
        }
    }
    );

    return (
        <div className="max-w-xl">
            { error &&  <Callout.Root  color="red" className="mb-3">
                <Callout.Text >{error}</Callout.Text>
            </Callout.Root>}
            <form 
                className="space-y-3" 
                onSubmit={onSubmit}>
                    <TextField.Root placeholder="Title" {...register('title')} >
                        <TextField.Slot />
                    </TextField.Root>
                    {errors.title && <Text color="red" as ='p' >{errors.title.message}</Text>  }
                    <TextArea  placeholder="Description" {...register('description')}  />
                     {errors.description && <Text color="red" as ='p' >{errors.description.message}</Text>  }
                    <Button className="w-full" disabled={isLoading} >Create New Issue{ isLoading && <Spinner />} </Button>
                </form>
        </div>
    )
    
}