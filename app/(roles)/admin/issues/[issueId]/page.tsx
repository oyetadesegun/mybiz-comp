import { getIssueById } from "@/actions/admin/admin.issue.actions"
import IssueDetailView from "@/components/admin/IssueDetailView"

interface Props {
  params: {
    issueId: string
  }
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await getIssueById({ issueId: params.issueId })

  if (!issue) {
    return <div className="p-6 text-center text-red-600">Issue not found.</div>
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Do NOT wrap a fully-resolved server component in <Suspense> unless lazy loading */}
      <IssueDetailView issue={issue} />
    </div>
  )
}
