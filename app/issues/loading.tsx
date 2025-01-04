import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../components/issueStatusBadge'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from './issueAction'
const LoadingPageIssue = () => {
  const issues = [1,2,3]
  return (

    <div>
      <IssueActions/>
    <Table.Root variant='surface'>
    <Table.Header>
      <Table.Row>

       <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
       <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
       <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {issues.map(issue => (
        <Table.Row key={issue}>
          <Skeleton/>
          <Table.Cell className='hidden md:table-cell'>
          <Skeleton/>
           
           
          </Table.Cell>
          <Skeleton/>

        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
    </div>
  )
}

export default LoadingPageIssue
