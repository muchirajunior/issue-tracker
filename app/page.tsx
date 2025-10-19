import prisma from "@/prisma/client";
import { Badge, Button, DropdownMenu, Table } from "@radix-ui/themes";
import Link from "next/link";
import { MdBugReport, MdDelete, MdEdit } from "react-icons/md";
import IssueUpdateActions from "./components/issue_update_action";

export default async function Home() {
  const data = await prisma.issue.findMany();
  if(data.length == 0){
    return (
      <div className="item-center content-center text-gray"> No data </div>
    );
  }
  return (
    <div>
      <span className="flex justify-between mb-3">
        <h2 className="font-bold text-lg">Issues</h2>
        <Button className="flex " > <MdBugReport /> <Link className = "" href='/issues/new'>  Create New Issue </Link> </Button>
      </span>
      <Table.Root className="border border-gray-200 rounded-lg">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            data.map((issue)=><Table.Row key={issue.id}>
              <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{issue.description}</Table.RowHeaderCell>
              <Table.RowHeaderCell>
                <Badge 
                color={issue.status == 'CLOSED'? 'green' : issue.status == 'OPEN' ? 'blue' : "orange"}
                >{issue.status.replaceAll('_',' ')}</Badge>
              </Table.RowHeaderCell>
              <Table.RowHeaderCell>{issue.createdAt.toLocaleString()}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{issue.updatedAt.toLocaleString()}</Table.RowHeaderCell>
              <Table.RowHeaderCell className="space-x-3">
                <IssueUpdateActions  issue={issue} />
              </Table.RowHeaderCell>
            </Table.Row>)
          }
        
        </Table.Body>
      </Table.Root>

    </div>
  );
}
