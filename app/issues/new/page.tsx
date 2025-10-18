'use client';

import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage(){
    return <div className="max-l-xl space-y-3">
        <TextField.Root placeholder="Title">
            <TextField.Slot />
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button>Create New Issue</Button>
    </div>
}