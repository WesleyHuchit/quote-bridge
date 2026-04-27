"use client"

import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FieldType, FilledBy } from "@/types/field"

type CreatedField = {
  id: number
  name: string
  type: FieldType
  lineId: number
  filledBy: FilledBy
}

type CreatedLine = {
  id: number
  name: string
}

type CreatedItem = {
  id: number
  data: string
  fieldId: number
  lineId: number
}

const fieldTypeLabels: Record<FieldType, string> = {
  STRING: "Texto",
  NUMBER: "Numero",
  DATE: "Data",
}

const filledByLabels: Record<FilledBy, string> = {
  BUYER: "Comprador",
  SUPPLIER: "Fornecedor",
}

const filledByOptions: FilledBy[] = ["BUYER", "SUPPLIER"]

function isFilledBy(value: FormDataEntryValue | null): value is FilledBy {
  return filledByOptions.includes(value as FilledBy)
}

export default function CreateFieldPage() {
  const [lines, setLines] = useState<CreatedLine[]>([])
  const [fields, setFields] = useState<CreatedField[]>([])
  const [items, setItems] = useState<CreatedItem[]>([])

  function handleLineSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()

    if (!name) {
      return
    }

    setLines((currentLines) => [
      ...currentLines,
      {
        id: Date.now(),
        name,
      },
    ])

    form.reset()
  }

  function handleFieldSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const type = formData.get("type") as FieldType | null
    const filledBy = formData.get("filledBy")
    const lineId = Number(formData.get("lineId"))

    if (
      !name ||
      !type ||
      !isFilledBy(filledBy) ||
      !lines.some((line) => line.id === lineId)
    ) {
      return
    }

    setFields((currentFields) => [
      ...currentFields,
      {
        id: Date.now(),
        name,
        type,
        lineId,
        filledBy,
      },
    ])

    form.reset()
  }

  function handleItemSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = String(formData.get("data") ?? "").trim()
    const fieldId = Number(formData.get("fieldId"))
    const field = fields.find((currentField) => currentField.id === fieldId)

    if (!data || !field) {
      return
    }

    setItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        data,
        fieldId,
        lineId: field.lineId,
      },
    ])

    form.reset()
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            Quote Bridge
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Criar lines, fields e items
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Cadastre a line, associe os fields e depois adicione os items
                usados para montar cotacoes com dados padronizados.
              </p>
            </div>
            <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              {lines.length} line{lines.length === 1 ? "" : "s"} e{" "}
              {fields.length} field{fields.length === 1 ? "" : "s"} e{" "}
              {items.length} item{items.length === 1 ? "" : "s"} nesta sessao
            </div>
          </div>
        </header>

        <section className="">
          <Card className="flex flex-row shadow-sm w-full">
            <div className="w-full">
              <form onSubmit={handleLineSubmit}>
                <CardHeader className="gap-2 px-6">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    Primeiro setor
                  </p>
                  <CardTitle className="text-xl">Criar line</CardTitle>
                  <CardDescription>
                    Informe o nome da line que vai agrupar os fields relacionados.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-5 px-6">
                  <label className="grid gap-2 text-sm font-medium">
                    Nome da line
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Ex: Dados do segurado"
                      className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="submit" size="lg" className="sm:w-fit">
                      Criar line
                    </Button>
                    <Button
                      type="reset"
                      size="lg"
                      variant="outline"
                      className="sm:w-fit"
                    >
                      Limpar
                    </Button>
                  </div>
                </CardContent>
              </form>
            </div>

            <CardContent className="w-full">
              <h3 className="text-sm font-semibold">Lines criadas</h3>
              <div className="mt-4 flex flex-col gap-3">
                {lines.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhuma line criada ainda.
                  </div>
                ) : (
                  lines.map((line) => {
                    const lineFieldsCount = fields.filter(
                      (field) => field.lineId === line.id
                    ).length

                    return (
                      <Card key={line.id} size="sm">
                        <CardContent>
                          <h4 className="font-medium">{line.name}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {lineFieldsCount} field
                            {lineFieldsCount === 1 ? "" : "s"}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-sm">
            <form onSubmit={handleFieldSubmit}>
              <CardHeader className="gap-2 px-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Segundo setor
                </p>
                <CardTitle className="text-xl">Criar field</CardTitle>
                <CardDescription>
                  Informe um nome claro, o tipo de dado esperado e a line desse
                  field.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-5 px-6">
                <label className="grid gap-2 text-sm font-medium">
                  Line
                  <Select
                    name="lineId"
                    required
                    defaultValue=""
                    disabled={lines.length === 0}
                  >
                    <SelectTrigger className="h-10 w-full bg-background">
                      <SelectValue
                        placeholder={
                          lines.length === 0
                            ? "Crie uma line primeiro"
                            : "Selecione uma line"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {lines.map((line) => (
                        <SelectItem key={line.id} value={String(line.id)}>
                          {line.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Nome do field
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Ex: Valor da franquia"
                    disabled={lines.length === 0}
                    className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Tipo
                  <Select
                    name="type"
                    required
                    defaultValue=""
                    disabled={lines.length === 0}
                  >
                    <SelectTrigger className="h-10 w-full bg-background">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STRING">Texto</SelectItem>
                      <SelectItem value="NUMBER">Numero</SelectItem>
                      <SelectItem value="DATE">Data</SelectItem>
                    </SelectContent>
                  </Select>
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Preenchido por
                  <Select
                    name="filledBy"
                    required
                    defaultValue=""
                    disabled={lines.length === 0}
                  >
                    <SelectTrigger className="h-10 w-full bg-background">
                      <SelectValue placeholder="Selecione quem preenche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUYER">Comprador</SelectItem>
                      <SelectItem value="SUPPLIER">Fornecedor</SelectItem>
                    </SelectContent>
                  </Select>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    className="sm:w-fit"
                    disabled={lines.length === 0}
                  >
                    Criar field
                  </Button>
                  <Button
                    type="reset"
                    size="lg"
                    variant="outline"
                    className="sm:w-fit"
                    disabled={lines.length === 0}
                  >
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </form>

            <CardContent className="border-t border-border px-6 pt-6">
              <h3 className="text-sm font-semibold">Fields criados</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A lista abaixo mostra os fields adicionados nesta tela.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {fields.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhum field criado ainda.
                  </div>
                ) : (
                  fields.map((field) => (
                    <Card key={field.id} size="sm">
                      <CardContent>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-medium">{field.name}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {fieldTypeLabels[field.type]}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Preenchido por {filledByLabels[field.filledBy]}
                            </p>
                          </div>
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            {
                              lines.find((line) => line.id === field.lineId)
                                ?.name
                            }
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-sm">
            <form onSubmit={handleItemSubmit}>
              <CardHeader className="gap-2 px-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Terceiro setor
                </p>
                <CardTitle className="text-xl">Criar item</CardTitle>
                <CardDescription>
                  Selecione um field e informe o dado que sera associado a ele.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-5 px-6">
                <label className="grid gap-2 text-sm font-medium">
                  Field
                  <Select
                    name="fieldId"
                    required
                    defaultValue=""
                    disabled={fields.length === 0}
                  >
                    <SelectTrigger className="h-10 w-full bg-background">
                      <SelectValue
                        placeholder={
                          fields.length === 0
                            ? "Crie um field primeiro"
                            : "Selecione um field"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => {
                        const line = lines.find(
                          (currentLine) => currentLine.id === field.lineId
                        )

                        return (
                          <SelectItem key={field.id} value={String(field.id)}>
                            {field.name}
                            {line ? ` - ${line.name}` : ""}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Dado do item
                  <input
                    name="data"
                    type="text"
                    required
                    placeholder="Ex: Joao da Silva"
                    disabled={fields.length === 0}
                    className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    className="sm:w-fit"
                    disabled={fields.length === 0}
                  >
                    Criar item
                  </Button>
                  <Button
                    type="reset"
                    size="lg"
                    variant="outline"
                    className="sm:w-fit"
                    disabled={fields.length === 0}
                  >
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </form>

            <CardContent className="border-t border-border px-6 pt-6">
              <h3 className="text-sm font-semibold">Items criados</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A lista abaixo mostra os items adicionados nesta tela.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhum item criado ainda.
                  </div>
                ) : (
                  items.map((item) => {
                    const field = fields.find(
                      (currentField) => currentField.id === item.fieldId
                    )
                    const line = lines.find(
                      (currentLine) => currentLine.id === item.lineId
                    )

                    return (
                      <Card key={item.id} size="sm">
                        <CardContent>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-medium">{item.data}</h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {field?.name ?? "Field removido"}
                              </p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              {line?.name ?? "Line removida"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
