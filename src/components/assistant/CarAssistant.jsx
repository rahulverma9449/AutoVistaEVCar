import { useEffect, useRef, useState } from "react";
import { Bot, CarFront, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { assistantAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";

const suggestions = [
  "Best electric car under $60,000",
  "Show me affordable SUVs",
  "Which cars are featured?"
];

export default function CarAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I’m AutoVista Assist. Ask me to find or compare vehicles from our live catalog." }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;
    setMessages((current) => [...current, { role: "user", text: cleanQuestion }]);
    setInput("");
    setLoading(true);
    try {
      const response = await assistantAPI.ask(cleanQuestion);
      setMessages((current) => [...current, { role: "assistant", text: response.answer, cars: response.cars }]);
    } catch (error) {
      setMessages((current) => [...current, {
        role: "assistant",
        text: error.response?.data?.message || "I couldn’t reach the vehicle assistant. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event) {
    event.preventDefault();
    ask(input);
  }

  return <>
    {open && <section className="fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950" aria-label="AutoVista vehicle assistant">
      <header className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15"><Sparkles className="h-5 w-5" /></span>
          <div><h2 className="font-semibold">AutoVista Assist</h2><p className="text-xs text-blue-100">Answers grounded in our live inventory</p></div>
        </div>
        <button onClick={() => setOpen(false)} className="rounded-full p-2 text-white hover:bg-white/15" aria-label="Close assistant"><X className="h-5 w-5" /></button>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-900">
        {messages.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-sm ${message.role === "user" ? "rounded-br-md bg-blue-700 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"}`}>
            <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
            {message.cars?.length > 0 && <div className="mt-3 space-y-2">
              {message.cars.map((car) => <Link key={car.id} to={`/cars/${car.id}`} onClick={() => setOpen(false)} className="flex items-center justify-between gap-3 rounded-xl bg-slate-100 p-3 text-slate-900 transition hover:bg-blue-50 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
                <span className="flex min-w-0 items-center gap-2"><CarFront className="h-4 w-4 shrink-0 text-blue-600" /><span className="truncate font-medium">{car.year} {car.make} {car.model}</span></span>
                <span className="shrink-0 font-semibold text-blue-700 dark:text-blue-300">${car.price.toLocaleString()}</span>
              </Link>)}
            </div>}
          </div>
        </div>)}
        {loading && <div className="flex justify-start"><div className="flex items-center gap-2 rounded-2xl rounded-bl-md border bg-white px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800"><Loader2 className="h-4 w-4 animate-spin" />Checking the catalog…</div></div>}
        {messages.length === 1 && <div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">{suggestion}</button>)}</div>}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
        <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask about cars, budget, or fuel type…" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700" />
        <Button type="submit" size="icon" disabled={loading || !input.trim()} className="h-11 w-11 rounded-xl bg-blue-700 hover:bg-blue-800"><Send className="h-4 w-4" /></Button>
      </form>
    </section>}
    <button onClick={() => setOpen((current) => !current)} className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 px-5 text-white shadow-xl transition hover:scale-105 hover:shadow-2xl" aria-label={open ? "Close vehicle assistant" : "Open vehicle assistant"}>
      {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}<span className="hidden font-semibold sm:inline">Ask AI</span>
    </button>
  </>;
}
