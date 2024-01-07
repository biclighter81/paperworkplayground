import StoryOverview from "@/components/story/StoryOverview"

export default async function Home() {
  const stories = await (await fetch(`http://localhost:3000/api/story`)).json() as { id: string, name: string, description: string, file: string }[]
  return (
    <>
      <h1 className="text-4xl font-black uppercase mb-4">My Story Library</h1>
      <StoryOverview storyData={stories} /></>
  )
}
export const dynamic = 'force-dynamic'