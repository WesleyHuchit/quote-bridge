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

/** Agrupa field definitions — corresponde ao uso de `lineId` no domínio. */
type LineGroup = {
  id: string
  name: string
}

/** Espelha `FieldDefinition` (sem persistência). */
type FieldDefinitionRow = {
  id: string
  name: string
  type: FieldType
  lineId: string
  filledBy: FilledBy
}

/** Espelha `EntityDefinition`. */
type EntityDefinitionRow = {
  id: string
  name: string
  fieldDefinitionIds: string[]
}

/** Espelha `Item`. */
type ItemRow = {
  id: string
  data: string
  fieldId: string
  lineId: string
}

/** Espelha `DynamicEntity` com itens aninhados. */
type DynamicEntityRow = {
  id: string
  entityDefinitionId: string
  items: ItemRow[]
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

function newId() {
  return crypto.randomUUID()
}

export default function CreateFieldPage() {
  const [lines, setLines] = useState<LineGroup[]>([])
  const [fieldDefinitions, setFieldDefinitions] = useState<FieldDefinitionRow[]>(
    [],
  )
  const [entityDefinitions, setEntityDefinitions] = useState<
    EntityDefinitionRow[]
  >([])
  const [dynamicEntities, setDynamicEntities] = useState<DynamicEntityRow[]>(
    [],
  )

  function handleLineSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()

    if (!name) {
      return
    }

    setLines((current) => [
      ...current,
      {
        id: newId(),
        name,
      },
    ])

    form.reset()
  }

  function handleFieldDefinitionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const type = formData.get("type") as FieldType | null
    const filledBy = formData.get("filledBy")
    const lineId = String(formData.get("lineId") ?? "")

    if (
      !name ||
      !type ||
      !isFilledBy(filledBy) ||
      !lines.some((line) => line.id === lineId)
    ) {
      return
    }

    setFieldDefinitions((current) => [
      ...current,
      {
        id: newId(),
        name,
        type,
        lineId,
        filledBy,
      },
    ])

    form.reset()
  }

  function handleEntityDefinitionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const selected = formData.getAll("fieldDefinitionIds") as string[]

    const fieldDefinitionIds = selected.filter((id) =>
      fieldDefinitions.some((f) => f.id === id),
    )

    if (!name || fieldDefinitionIds.length === 0) {
      return
    }

    setEntityDefinitions((current) => [
      ...current,
      {
        id: newId(),
        name,
        fieldDefinitionIds,
      },
    ])

    form.reset()
  }

  function handleDynamicEntitySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const entityDefinitionId = String(formData.get("entityDefinitionId") ?? "")

    if (!entityDefinitions.some((e) => e.id === entityDefinitionId)) {
      return
    }

    setDynamicEntities((current) => [
      ...current,
      {
        id: newId(),
        entityDefinitionId,
        items: [],
      },
    ])

    form.reset()
  }

  function handleItemSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = String(formData.get("data") ?? "").trim()
    const fieldId = String(formData.get("fieldId") ?? "")
    const dynamicEntityId = String(formData.get("dynamicEntityId") ?? "")

    const dynamicEntity = dynamicEntities.find((d) => d.id === dynamicEntityId)
    const entityDefinition = entityDefinitions.find(
      (e) => e.id === dynamicEntity?.entityDefinitionId,
    )
    const field = fieldDefinitions.find((f) => f.id === fieldId)

    if (
      !data ||
      !dynamicEntity ||
      !entityDefinition ||
      !field ||
      !entityDefinition.fieldDefinitionIds.includes(fieldId)
    ) {
      return
    }

    const item: ItemRow = {
      id: newId(),
      data,
      fieldId,
      lineId: field.lineId,
    }

    setDynamicEntities((current) =>
      current.map((d) =>
        d.id === dynamicEntityId ? { ...d, items: [...d.items, item] } : d,
      ),
    )

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
                Definições de campo e entidades dinâmicas
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Cadastre linhas (agrupamento), field definitions, uma entity
                definition com os campos escolhidos, instancie dynamic entities e
                preencha items alinhados ao modelo de domínio.
              </p>
            </div>
            <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              {lines.length} linha{lines.length === 1 ? "" : "s"} ·{" "}
              {fieldDefinitions.length} campo
              {fieldDefinitions.length === 1 ? "" : "s"} ·{" "}
              {entityDefinitions.length} def. de entidade ·{" "}
              {dynamicEntities.length} instância
              {dynamicEntities.length === 1 ? "" : "s"}
            </div>
          </div>
        </header>

        <section className="">
          <Card className="flex w-full flex-row shadow-sm">
            <div className="w-full">
              <form onSubmit={handleLineSubmit}>
                <CardHeader className="gap-2 px-6">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    1 · Agrupamento (lineId)
                  </p>
                  <CardTitle className="text-xl">Criar linha</CardTitle>
                  <CardDescription>
                    Nome do agrupamento usado como referência em{" "}
                    <code className="text-xs">FieldDefinition.lineId</code> e{" "}
                    <code className="text-xs">Item.lineId</code>.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-5 px-6">
                  <label className="grid gap-2 text-sm font-medium">
                    Nome da linha
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
                      Criar linha
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
              <h3 className="text-sm font-semibold">Linhas criadas</h3>
              <div className="mt-4 flex flex-col gap-3">
                {lines.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhuma linha ainda.
                  </div>
                ) : (
                  lines.map((line) => {
                    const count = fieldDefinitions.filter(
                      (f) => f.lineId === line.id,
                    ).length

                    return (
                      <Card key={line.id} size="sm">
                        <CardContent>
                          <h4 className="font-medium">{line.name}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {count} field definition{count === 1 ? "" : "s"}
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
            <form onSubmit={handleFieldDefinitionSubmit}>
              <CardHeader className="gap-2 px-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  2 · Field definition
                </p>
                <CardTitle className="text-xl">Criar field definition</CardTitle>
                <CardDescription>
                  Nome, tipo, preenchido por e linha ({`lineId`}).
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-5 px-6">
                <label className="grid gap-2 text-sm font-medium">
                  Linha
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
                            ? "Crie uma linha primeiro"
                            : "Selecione uma linha"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {lines.map((line) => (
                        <SelectItem key={line.id} value={line.id}>
                          {line.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <label className="grid gap-2 text-sm font-medium">
                  Nome do campo
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
                    Criar field definition
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
              <h3 className="text-sm font-semibold">Field definitions</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Campos cadastrados nesta sessão.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {fieldDefinitions.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhum field definition ainda.
                  </div>
                ) : (
                  fieldDefinitions.map((field) => (
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
                            {lines.find((line) => line.id === field.lineId)
                              ?.name ?? "—"}
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
            <form onSubmit={handleEntityDefinitionSubmit}>
              <CardHeader className="gap-2 px-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  3 · Entity definition
                </p>
                <CardTitle className="text-xl">Criar entity definition</CardTitle>
                <CardDescription>
                  Nome do tipo de cotação e conjunto de{" "}
                  <code className="text-xs">fieldDefinitionIds</code>.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-5 px-6">
                <label className="grid gap-2 text-sm font-medium">
                  Nome da entidade (ex.: cotação de peça)
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Ex: Cotação de peça"
                    disabled={fieldDefinitions.length === 0}
                    className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </label>

                <fieldset
                  className="grid gap-2 text-sm font-medium"
                  disabled={fieldDefinitions.length === 0}
                >
                  <legend className="mb-2">Field definitions incluídos</legend>
                  {fieldDefinitions.length === 0 ? (
                    <p className="text-sm font-normal text-muted-foreground">
                      Crie field definitions antes.
                    </p>
                  ) : (
                    <ul className="grid max-h-48 gap-2 overflow-y-auto rounded-lg border border-border p-3">
                      {fieldDefinitions.map((f) => (
                        <li key={f.id} className="flex items-center gap-2">
                          <input
                            id={`fd-${f.id}`}
                            type="checkbox"
                            name="fieldDefinitionIds"
                            value={f.id}
                            className="size-4 rounded border-input"
                          />
                          <label
                            htmlFor={`fd-${f.id}`}
                            className="font-normal leading-tight"
                          >
                            {f.name}{" "}
                            <span className="text-muted-foreground">
                              ({fieldTypeLabels[f.type]})
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </fieldset>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    className="sm:w-fit"
                    disabled={fieldDefinitions.length === 0}
                  >
                    Criar entity definition
                  </Button>
                  <Button
                    type="reset"
                    size="lg"
                    variant="outline"
                    className="sm:w-fit"
                    disabled={fieldDefinitions.length === 0}
                  >
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </form>

            <CardContent className="border-t border-border px-6 pt-6">
              <h3 className="text-sm font-semibold">Entity definitions</h3>
              <div className="mt-4 flex flex-col gap-3">
                {entityDefinitions.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhuma entity definition ainda.
                  </div>
                ) : (
                  entityDefinitions.map((entity) => (
                    <Card key={entity.id} size="sm">
                      <CardContent>
                        <h4 className="font-medium">{entity.name}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {entity.fieldDefinitionIds.length} campo
                          {entity.fieldDefinitionIds.length === 1 ? "" : "s"}
                        </p>
                        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                          {entity.fieldDefinitionIds.map((fid) => {
                            const f = fieldDefinitions.find((x) => x.id === fid)
                            return <li key={fid}>{f?.name ?? fid}</li>
                          })}
                        </ul>
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
            <form onSubmit={handleDynamicEntitySubmit}>
              <CardHeader className="gap-2 px-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  4 · Dynamic entity
                </p>
                <CardTitle className="text-xl">Nova instância</CardTitle>
                <CardDescription>
                  Cria uma instância com{" "}
                  <code className="text-xs">entityDefinitionId</code> e lista de{" "}
                  <code className="text-xs">items</code> (preencha no passo 5).
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-5 px-6">
                <label className="grid gap-2 text-sm font-medium">
                  Entity definition
                  <Select
                    name="entityDefinitionId"
                    required
                    defaultValue=""
                    disabled={entityDefinitions.length === 0}
                  >
                    <SelectTrigger className="h-10 w-full bg-background">
                      <SelectValue
                        placeholder={
                          entityDefinitions.length === 0
                            ? "Crie uma entity definition primeiro"
                            : "Selecione o modelo"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {entityDefinitions.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    className="sm:w-fit"
                    disabled={entityDefinitions.length === 0}
                  >
                    Criar dynamic entity
                  </Button>
                  <Button
                    type="reset"
                    size="lg"
                    variant="outline"
                    className="sm:w-fit"
                    disabled={entityDefinitions.length === 0}
                  >
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </form>

            <CardContent className="border-t border-border px-6 pt-6">
              <h3 className="text-sm font-semibold">Instâncias</h3>
              <div className="mt-4 flex flex-col gap-3">
                {dynamicEntities.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhuma instância ainda.
                  </div>
                ) : (
                  dynamicEntities.map((d) => {
                    const model = entityDefinitions.find(
                      (e) => e.id === d.entityDefinitionId,
                    )
                    return (
                      <Card key={d.id} size="sm">
                        <CardContent>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-medium">
                              {model?.name ?? "Modelo removido"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              id: {d.id.slice(0, 8)}…
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {d.items.length} item
                            {d.items.length === 1 ? "" : "s"}
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
            <form onSubmit={handleItemSubmit}>
              <CardHeader className="gap-2 px-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  5 · Items
                </p>
                <CardTitle className="text-xl">Adicionar item</CardTitle>
                <CardDescription>
                  Item com <code className="text-xs">fieldId</code> e{" "}
                  <code className="text-xs">lineId</code> derivado do field
                  definition; só campos da entity definition da instância.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-5 px-6">
                <DynamicEntityItemFields
                  dynamicEntities={dynamicEntities}
                  entityDefinitions={entityDefinitions}
                  fieldDefinitions={fieldDefinitions}
                />

                <label className="grid gap-2 text-sm font-medium">
                  Valor (data)
                  <input
                    name="data"
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    disabled={dynamicEntities.length === 0}
                    className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    className="sm:w-fit"
                    disabled={dynamicEntities.length === 0}
                  >
                    Adicionar item
                  </Button>
                  <Button
                    type="reset"
                    size="lg"
                    variant="outline"
                    className="sm:w-fit"
                    disabled={dynamicEntities.length === 0}
                  >
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </form>

            <CardContent className="border-t border-border px-6 pt-6">
              <h3 className="text-sm font-semibold">Items por instância</h3>
              <div className="mt-4 flex flex-col gap-4">
                {dynamicEntities.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-background/60 p-6 text-center text-sm text-muted-foreground">
                    Nenhum item ainda.
                  </div>
                ) : (
                  dynamicEntities.map((d) => {
                    const model = entityDefinitions.find(
                      (e) => e.id === d.entityDefinitionId,
                    )
                    return (
                      <div key={d.id}>
                        <h4 className="text-sm font-semibold">
                          {model?.name ?? "Modelo"} · {d.items.length} item
                          {d.items.length === 1 ? "" : "s"}
                        </h4>
                        <div className="mt-2 flex flex-col gap-2">
                          {d.items.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              Sem items nesta instância.
                            </p>
                          ) : (
                            d.items.map((item) => {
                              const field = fieldDefinitions.find(
                                (f) => f.id === item.fieldId,
                              )
                              const line = lines.find(
                                (l) => l.id === item.lineId,
                              )
                              return (
                                <Card key={item.id} size="sm">
                                  <CardContent>
                                    <div className="flex items-start justify-between gap-4">
                                      <div>
                                        <p className="font-medium">
                                          {item.data}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                          {field?.name ?? "Campo removido"}
                                        </p>
                                      </div>
                                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                        {line?.name ?? "Linha"}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })
                          )}
                        </div>
                      </div>
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

function DynamicEntityItemFields({
  dynamicEntities,
  entityDefinitions,
  fieldDefinitions,
}: {
  dynamicEntities: DynamicEntityRow[]
  entityDefinitions: EntityDefinitionRow[]
  fieldDefinitions: FieldDefinitionRow[]
}) {
  const [dynamicEntityId, setDynamicEntityId] = useState("")
  const [fieldId, setFieldId] = useState("")

  const safeDynamicEntityId =
    dynamicEntityId &&
    dynamicEntities.some((d) => d.id === dynamicEntityId)
      ? dynamicEntityId
      : ""

  const entityDefinition = (() => {
    const d = dynamicEntities.find((x) => x.id === safeDynamicEntityId)
    if (!d) {
      return undefined
    }
    return entityDefinitions.find((e) => e.id === d.entityDefinitionId)
  })()

  const allowedFields = entityDefinition
    ? fieldDefinitions.filter((f) =>
        entityDefinition.fieldDefinitionIds.includes(f.id),
      )
    : []

  const safeFieldId =
    fieldId && allowedFields.some((f) => f.id === fieldId) ? fieldId : ""

  return (
    <>
      <input type="hidden" name="dynamicEntityId" value={safeDynamicEntityId} />
      <input type="hidden" name="fieldId" value={safeFieldId} />

      <label className="grid gap-2 text-sm font-medium">
        Dynamic entity
        <Select
          required
          value={safeDynamicEntityId || undefined}
          onValueChange={(id) => {
            setDynamicEntityId(id)
            setFieldId("")
          }}
          disabled={dynamicEntities.length === 0}
        >
          <SelectTrigger className="h-10 w-full bg-background">
            <SelectValue
              placeholder={
                dynamicEntities.length === 0
                  ? "Crie uma instância primeiro"
                  : "Selecione a instância"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {dynamicEntities.map((d, index) => {
              const model = entityDefinitions.find(
                (e) => e.id === d.entityDefinitionId,
              )
              return (
                <SelectItem key={d.id} value={d.id}>
                  {model?.name ?? "Modelo"} · #{index + 1}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Field definition
        <Select
          key={safeDynamicEntityId}
          required
          value={safeFieldId || undefined}
          onValueChange={setFieldId}
          disabled={allowedFields.length === 0}
        >
          <SelectTrigger className="h-10 w-full bg-background">
            <SelectValue
              placeholder={
                allowedFields.length === 0
                  ? safeDynamicEntityId
                    ? "Nenhum campo neste modelo"
                    : "Escolha a instância acima"
                  : "Selecione um campo"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {allowedFields.map((field) => (
              <SelectItem key={field.id} value={field.id}>
                {field.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
    </>
  )
}
