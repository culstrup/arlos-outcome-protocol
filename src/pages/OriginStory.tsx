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
      <p className="mb-6 text-muted-foreground">
        The first public sketch of the protocol lives in an X (Twitter) post that set the tone for what ARLOS could become.
        You can read that opening thought here:
        {" "}
        <a
          href="https://x.com/curious_vii/status/1952434140411748727?s=46"
          target="_blank"
          rel="noopener noreferrer"
          className="text-arlos-blue underline underline-offset-4"
        >
          Origin tweet by @curious_vii
        </a>
        .
      </p>
      <p className="mb-4 text-muted-foreground">
        Everything since has been an exploration of how to turn that spark into a resilient, crypto-native coordination protocol.
        This space will continue to document the evolution so it remains accessible without needing a social media account.
      </p>
    </main>
    <Footer />
  </div>
);

export default OriginStory;
