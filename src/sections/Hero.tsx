export default function Home() {
  return (
    <section
      id="home"
      className="flex flex-row pt-12 pb-12 px-24 items-center justify-center bg-background text-text font-body"
    >
      <div className="w-1/3">
        <h1>Test</h1>
      </div>
      <div className="w-2/3 text-left">
        <h1 className="text-5xl font-normal text-text">
          Sean Richardson Hardjanto
        </h1>
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Aspiring Web Developer
        </h2>
        <p className="text-xl font-normal text-text mb-6">
          A digital portfolio that showcases my projects, writing, and creative work.
        </p>
      </div>
    </section>
  );
}
