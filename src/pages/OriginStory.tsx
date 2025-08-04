import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OriginStory = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container mx-auto px-6 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Origin Story & Inspiration</h1>
      <p className="mb-4 text-muted-foreground">
        ARLOS emerged from a desire to coordinate work through clear outcomes rather than traditional hierarchies.
        By combining prediction markets with aligned incentives, the framework offers a new model for collaborative execution.
      </p>
      <p className="mb-4 text-muted-foreground">
        The concept was first explored in 2024 and has since evolved through community feedback and real-world experiments.
        Hosting the story here ensures anyone can learn about the motivation behind ARLOS without needing a social media account.
      </p>
      <p className="mb-4 text-muted-foreground">
        Curious about the original spark?{' '}
        <a
          href="https://x.com/curious_vii/status/1952434140411748727"
          target="_blank"
          rel="noopener noreferrer"
          className="text-arlos-blue underline"
        >
          Read the founding tweet on X
        </a>
        .
      </p>
    </main>
    <Footer />
  </div>
);

export default OriginStory;
