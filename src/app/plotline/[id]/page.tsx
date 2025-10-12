import PlotlineEditor from "./PlotlineEditor";

export default function PlotlinePage({ params }: { params: { id: string } }) {
    console.log('we lost the plot')
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <PlotlineEditor id={params.id} />
    </main>
  );
}