import { getAllIssues } from "@/actions/admin/admin.issue.actions";
import { QuestionsTable } from "@/components/DataTable/QuestionTable";
import LoadingIconLarge from "@/components/global/Loading";
import { Suspense } from "react"


export default async function IssueListPage() {
  const issues = await getAllIssues();
  return (
        <Suspense fallback={<LoadingIconLarge />}>
        <QuestionsTable questions={issues} />
    </Suspense>
  );
}