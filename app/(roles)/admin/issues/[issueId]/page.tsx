import { getIssueById } from "@/actions/admin/admin.issue.actions";
import IssueDetailView from "@/components/admin/IssueDetailView";
import LoadingIconLarge from "@/components/global/Loading";
import { Suspense } from "react";

interface Props {
  params: {
    issueId: string;
  };
}

export default async function IssueDetailPage({ params }: Props) {
  const issue = await getIssueById({ issueId: params.issueId });

  if (!issue) {
    return <div className="p-6 text-center text-red-600">Issue not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Suspense fallback={<LoadingIconLarge />}>
        <IssueDetailView issue={issue} />
      </Suspense>
    </div>
  );
}
