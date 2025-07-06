import { getAllIssues } from "@/actions/admin/admin.issue.actions";
import { getAllUsers } from "@/actions/admin/admin.user.actions";
import { getUserByEmail } from "@/actions/user/user.actions";
import QuestionsTable  from "@/components/DataTable/QuestionTable";
import LoadingIconLarge from "@/components/global/Loading";
import { Suspense } from "react"


export default async function IssueListPage() {
  const {allIssues} = await getAllIssues();
  const usersList = await getAllUsers();
  return (
        <Suspense fallback={<LoadingIconLarge />}>
        <QuestionsTable questions={allIssues} users={usersList}/>
    </Suspense>
  );
}