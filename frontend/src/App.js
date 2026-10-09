import "@/App.css";

function App() {
  return (
    <div
      data-testid="hello-world-page"
      className="min-h-screen flex items-center justify-center bg-neutral-950"
    >
      <h1
        data-testid="hello-world-heading"
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight"
      >
        Hello World
      </h1>
    </div>
  );
}

export default App;
