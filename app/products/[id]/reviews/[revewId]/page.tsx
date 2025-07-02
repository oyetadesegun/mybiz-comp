export default async function ProductReviewDetailsPage({params}: {params:{id:string, revewId:string}}){
return <h1>Review {params.revewId} for {params.id} product</h1>
}