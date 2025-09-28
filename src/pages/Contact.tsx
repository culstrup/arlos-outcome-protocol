import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Message submitted. We'll be in touch.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-24 max-w-lg">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <div className="space-y-4 text-lg">
          <p>
            Reach out directly at{" "}
            <a
              href="mailto:christian@gsdat.work"
              className="text-blue-600 hover:underline"
            >
              christian@gsdat.work
            </a>
            .
          </p>
          <p>
            You can also connect with Christian on{" "}
            <a
              href="https://x.com/curious_vii"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              X (Twitter)
            </a>
            .
          </p>
          <p>
            Arlos is incubated with the support of{" "}
            <a
              href="https://gsdat.work"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              GSD at Work
            </a>
            .
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full">Send</Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
