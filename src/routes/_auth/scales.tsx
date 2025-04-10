import { createFileRoute } from '@tanstack/react-router'
import LayoutContainer from '../../components/molecules/layout-container'
import { useSchedulesQuery } from '../../service/scale/use-schedule-query'
import { useDeleteScheduleMutation } from '../../service/scale/use-schedule-mutation'

export const Route = createFileRoute('/_auth/scales')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useSchedulesQuery()

  const { mutateAsync: deleteScale } = useDeleteScheduleMutation()

  const handleDeleteScale = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta escala?')) return
    await deleteScale(id)
  }

  return (
    <LayoutContainer title="Escalas" description="Gerencie suas escalas.">
      <div className="flex flex-wrap items-center gap-4">
        {data?.map((item) => (
          <div
            key={item._id}
            className="w-full max-w-[400px] rounded-lg border border-border bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm text-muted-foreground">
                Criada em:{' '}
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(item.createdAt)
                )}
              </div>
              <button
                onClick={() => handleDeleteScale(item._id)}
                className="text-xs text-red-500 hover:underline"
              >
                Excluir
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {item.schedule.map((entry) => (
                <div
                  key={entry.date}
                  className="border-l-2 border-primary pl-4"
                >
                  <h3 className="text-sm font-semibold text-primary mb-1">
                    {entry.date}
                  </h3>
                  <ul className="space-y-1">
                    {Object.entries(entry.schedule).map(([tag, volunteer]) => (
                      <li key={tag} className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {tag}
                        </span>{' '}
                        — {volunteer}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LayoutContainer>
  )
}
