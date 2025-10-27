import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-screen-sm px-4 py-6">
        <div className="mx-auto w-fit">
          <NewItem />
        </div>
      </div>
    </main>
  );
}

