'use client';

import { Issue, Status } from "@prisma/client";
import { AlertDialog, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import updateIssue, { deleteIssue } from "../actions/actions";

export default function IssueUpdateActions({ issue }: { issue: Issue }) {
    return( <DropdownMenu.Root>
        <DropdownMenu.Trigger>
        <Button variant="soft">
            Options
            <DropdownMenu.TriggerIcon />
        </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="" onClick={() =>updateIssue({...issue, status: Status.OPEN})}>Open</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="" onClick={() =>updateIssue({...issue, status: Status.IN_PROGRESS})}>In Progress</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="" onClick={() =>updateIssue({...issue, status: Status.CLOSED})}>Closed</DropdownMenu.Item>
        <DropdownMenu.Separator />
       
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button  color="red" >Delete</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This will completely delete the issue and action is not reversible.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action >
                        <Button variant="solid" color="red" onClick={()=>deleteIssue(issue.id)} >
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        </DropdownMenu.Content>
    </DropdownMenu.Root>);
}