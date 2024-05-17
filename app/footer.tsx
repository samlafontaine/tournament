import { Mail, LinkedinIcon, Twitter, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <section className="w-full mt-auto items-start md:w-6/12 space-y-2">
      <Separator orientation="horizontal" />
      <footer>
        <div className="flex flex-row items-center justify-between">
          <div className="flex h-5 items-center space-x-2 text-sm">
            <p className="text-xs text-black/60 pl-1">2024</p>
            <Separator orientation="vertical" />
            <p className="text-xs text-black/60">
              Built in Montréal by{" "}
              <a
                href="https://www.samlafontaine.com"
                className="font-medium underline underline-offset-2 cursor-pointer hover:decoration-2"
              >
                Sam Lafontaine
              </a>
              .
            </p>
          </div>
          <div className="flex flex-row items-center">
            <a
              className="text-sm text-neutral-600 dark:text-white p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="mailto:sam@samlafontaine.com"
            >
              <Mail strokeWidth={1.25} className="h-4 w-4" />
            </a>
            <a
              className="text-sm text-neutral-600 dark:text-white p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="https://www.linkedin.com/in/samlafontaine/"
            >
              <Twitter strokeWidth={1.25} className="h-4 w-4" />
            </a>
            <a
              className="text-sm text-neutral-600 dark:text-white p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href="https://github.com/samlafontaine"
            >
              <Github strokeWidth={1.25} className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
