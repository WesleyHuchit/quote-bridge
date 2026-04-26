import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-10 text-foreground">
      <section className="w-full max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
          Quote Bridge
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          Monte seus fields para cotacoes
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          Crie campos reutilizaveis para padronizar as informacoes que entram
          em cada cotacao.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/fields/create">Criar fields</Link>
        </Button>
      </section>
    </main>
  )
}
