import IssueStatusBadge from '@/app/components/issueStatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
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
          <Heading>{issue?.title}</Heading>
          <Flex className='space-x-3' my="2">
              <IssueStatusBadge status={issue?.status || 'OPEN'} />
          
          <Text>{ issue?.createdAt.toDateString()}</Text>
              
          </Flex>
          <Card>{ issue?.description}</Card>
    </div>
  )
}

export default IssuePageDetail
