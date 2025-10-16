import CharacterEditor from "./CharacterEditor";

export default function CharacterPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <CharacterEditor id={params.id} />
    </main>
  );
}
