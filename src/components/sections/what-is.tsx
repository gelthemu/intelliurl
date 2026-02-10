import { cn } from "@/lib/utils";

export default function WhatIs() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="mb-3">
          What is intelli<span className="text-teal text-shadow">URL</span>?
        </h2>
        <p className="text-dark/80">
          intelliURL is a lightweight tool that does two things well: it
          shortens long URLs via TinyURL into clean, shareable links and
          transforms article headlines into SEO-friendly slugs client-side.
          <br /> No accounts, no tracking — just paste, generate, and go.
        </p>
      </div>
      <div>
        <h3 className="mb-3">Before &amp; After</h3>
        <div className="space-y-3">
          {[
            {
              task: "i7duuhcfdwm9xusze",
              input:
                "Why I'm Deleting My Facebook, Instagram, and WhatsApp Accounts",
              output:
                "why-im-deleting-my-facebook-instagram-and-whatsapp-accounts",
              type: "url",
            },
            {
              task: "iqdv7xx6knrra5gwi",
              input:
                "https://geltaverse.vercel.app/bookmarks/why-deleting-facebook-instagram-whatsapp-privacy-echo-chambers",
              output: "https://tinyurl.com/3k7empvu",
              type: "slug",
            },
          ].map((task) => (
            <table
              key={task.task}
              className="w-full border-separate text-left p-4 rounded-sm border border-dark/20 bg-sand/10"
            >
              <tbody>
                <tr className="bg-transparent">
                  <td
                    className={cn(
                      "inline-flex px-1.5 py-0.5 rounded-sm mb-1.5",
                      task.type === "url" ? "bg-teal" : "bg-sand",
                    )}
                    colSpan={2}
                  >
                    <span className="text-dark text-[12px] font-semibold uppercase tracking-wider">
                      {task.type === "url" ? "URL" : "Slug"}
                    </span>
                  </td>
                </tr>
                <tr className="bg-transparent">
                  <td className="w-16 px-1.5 font-medium align-top whitespace-nowrap">
                    Before:
                  </td>
                  <td className="px-1.5 align-top break-all line-through decoration-red-500/80">
                    {task.input}
                  </td>
                </tr>
                <tr className="bg-transparent">
                  <td className="w-16 px-1.5 font-medium align-top whitespace-nowrap">
                    After:
                  </td>
                  <td className="px-1.5 align-top break-all font-mono text-teal font-semibold">
                    {task.output}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3">Perfect for</h3>
        <ul className="list-inside list-disc grid grid-cols-2 sm:grid-cols-3">
          {["Social media", "Marketers", "Developers"].map((uc, i) => (
            <li key={i} className="px-3 py-1.5 text-dark/80">
              {uc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
