import { createFileRoute } from '@tanstack/react-router'
import { useTagsQuery } from '../../service/tag/use-tag-query'
import {
  useCreateTagMutation,
  useDeleteTagMutation,
} from '../../service/tag/use-tag-mutation'
import LayoutContainer from '../../components/molecules/layout-container'
import { Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/_auth/tags')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useTagsQuery()
  const { mutateAsync: createTag, isPending: isCreating } =
    useCreateTagMutation()
  const { mutateAsync: deleteTag, isPending: isDeleting } =
    useDeleteTagMutation()

  const handleCreateTag = async () => {
    const name = prompt('Digite o nome da função:')
    if (!name?.trim()) return
    await createTag({ name })
  }

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta função?')) return
    await deleteTag(id)
  }

  return (
    <LayoutContainer
      title="Funções"
      description="Gerencie suas funções."
      buttonChildren={
        <Button onClick={handleCreateTag} disabled={isCreating}>
          {isCreating ? 'Cadastrando...' : 'Cadastrar função'}
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {data?.length
            ? `Atualmente você tem ${data.length} função${
                data.length > 1 ? 's' : ''
              } cadastrada${data.length > 1 ? 's' : ''}.`
            : 'Nenhuma função cadastrada.'}
        </p>

        {data?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {data.map((tag) => (
              <div
                key={tag.id}
                className="p-4 rounded-xl border bg-white shadow-sm flex items-center justify-between"
              >
                <span className="text-base font-medium text-foreground">
                  {tag.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteTag(tag.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma função cadastrada ainda.
            <br />
            Clique em <span className="font-medium">Cadastrar função</span> para
            adicionar uma nova.
          </div>
        )}
      </div>
    </LayoutContainer>
  )
}
