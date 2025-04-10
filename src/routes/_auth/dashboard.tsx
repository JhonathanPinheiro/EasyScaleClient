import { createFileRoute } from '@tanstack/react-router'

import { useTagsQuery } from '../../service/tag/use-tag-query'
import { useVolunteersQuery } from '../../service/volunteer/use-volunteers-query'
import { useGenerateScheduleMutation } from '../../service/scale/use-schedule-mutation'
import { Button, Checkbox, Label } from 'flowbite-react'
import { useState } from 'react'
import { MultipleDatePicker } from '../../components/molecules/multiple-date-picker'
import { UserIcon } from 'lucide-react'

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: tags } = useTagsQuery()
  const { data: volunteers } = useVolunteersQuery()
  const { mutateAsync: generateSchedule, isPending } =
    useGenerateScheduleMutation()

  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [volunteerAvailability, setVolunteerAvailability] = useState<
    Record<string, string[]>
  >({})

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleToggleVolunteerDate = (volunteerId: string, date: string) => {
    setVolunteerAvailability((prev) => {
      const currentDates = prev[volunteerId] || []
      return {
        ...prev,
        [volunteerId]: currentDates.includes(date)
          ? currentDates.filter((d) => d !== date)
          : [...currentDates, date],
      }
    })
  }

  const handleMarkAllDates = (volunteerId: string) => {
    setVolunteerAvailability((prev) => ({
      ...prev,
      [volunteerId]: [...selectedDates],
    }))
  }

  const handleGenerate = async () => {
    if (!selectedDates.length || !selectedTags.length || !volunteers?.length) {
      alert('Preencha todos os dados necessários.')
      return
    }

    const formattedVolunteers = volunteers.map((v) => ({
      name: v.name,
      tags: v.tags.map((t) => t.name),
      availability: volunteerAvailability[v.id] || [],
    }))

    const payload = {
      serviceDates: selectedDates,
      tags: selectedTags,
      volunteers: formattedVolunteers,
    }

    await generateSchedule(payload)
    alert('Escala gerada com sucesso!')
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerador de Escalas</h1>
          <p className="text-gray-600">Siga o fluxo para gerar uma escala.</p>
        </div>
        <Button onClick={handleGenerate} disabled={isPending}>
          {isPending ? 'Gerando...' : 'Gerar Escala'}
        </Button>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          1. Selecione as datas dos cultos
        </h2>
        <MultipleDatePicker
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          2. Selecione as funções disponíveis
        </h2>
        <div className="flex flex-wrap gap-4">
          {tags?.map((t) => (
            <Label key={t.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedTags.includes(t.name)}
                onChange={() => handleToggleTag(t.name)}
              />
              {t.name}
            </Label>
          )) || <p className="text-gray-500">Nenhuma função cadastrada</p>}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">
          3. Voluntários e suas disponibilidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteers?.map((v) => (
            <div
              key={v.id}
              className="relative rounded-2xl border border-gray-200 shadow-sm p-5 bg-white space-y-4"
            >
              <div className="flex items-center gap-3">
                <UserIcon className="text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {v.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {v.tags.length
                      ? 'Voluntário em:'
                      : 'Sem funções atribuídas'}
                  </p>
                </div>
              </div>

              {v.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {v.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {selectedDates.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Disponibilidade:</p>
                    <button
                      onClick={() => handleMarkAllDates(v.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Marcar todas
                    </button>
                  </div>
                  <div className="space-y-1">
                    {selectedDates.map((date) => (
                      <Label key={date} className="flex items-center gap-2">
                        <Checkbox
                          checked={
                            volunteerAvailability[v.id]?.includes(date) || false
                          }
                          onChange={() => handleToggleVolunteerDate(v.id, date)}
                        />
                        {date}
                      </Label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )) || <p className="text-gray-500">Nenhum voluntário cadastrado</p>}
        </div>
      </section>
    </div>
  )
}
