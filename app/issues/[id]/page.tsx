import { prisma } from '@/prisma/client'
import React from 'react'


interface Props {
    params: {id: string}
}

const IssuePageDetail =async ({ params }: Props) => {
   const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })
  return (
    <div>
          <p>{ issue?.title}</p>
          <p>{ issue?.description}</p>
          <p>{ issue?.status}</p>
          <p>{ issue?.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssuePageDetail
