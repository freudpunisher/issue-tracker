import React from 'react'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

interface Props {
    status: Status
}

const statusMap: Record<Status, { label: string, color: 'red' | 'blue' | 'green' }> = {
        [Status.OPEN]: { label: 'Open', color: 'red' },
        [Status.IN_PROGRESS]: { label: 'In Progress', color: 'blue' },
        [Status.CLOSED]: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: Props) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge
