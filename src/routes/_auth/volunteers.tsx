import { createFileRoute } from '@tanstack/react-router'
import { useVolunteersQuery } from '../../service/volunteer/use-volunteers-query'
import LayoutContainer from '../../components/molecules/layout-container'
import {
  useCreateVolunteerMutation,
  useDeleteVolunteerMutation,
} from '../../service/volunteer/use-volunteers-mutation'
import { useTagsQuery } from '../../service/tag/use-tag-query'
import { useState } from 'react'
import { Button, Modal, TextInput, Label } from 'flowbite-react'
import { Trash2Icon, UserIcon } from 'lucide-react'
import SearchSelect, {
  FilterItem,
} from '../../components/molecules/search-select'

export const Route = createFileRoute('/_auth/volunteers')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: volunteers } = useVolunteersQuery()
  const { data: tags } = useTagsQuery()
  const { mutateAsync: createVolunteer, isPending: isCreating } =
    useCreateVolunteerMutation()
  const { mutateAsync: deleteVolunteer } = useDeleteVolunteerMutation()

  const [selectedTags, setSelectedTags] = useState<FilterItem[]>([])
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [name, setName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateVolunteer = async () => {
    if (!name.trim()) return

    await createVolunteer({
      id: '',
      name,
      tags: selectedTags,
      availability: selectedDates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    setName('')
    setSelectedTags([])
    setSelectedDates([])
    setIsModalOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este voluntário?')) return
    await deleteVolunteer(id)
  }

  return (
    <LayoutContainer
      title="Voluntários"
      description="Gerencie seus voluntários."
      buttonChildren={
        <Button onClick={() => setIsModalOpen(true)} disabled={isCreating}>
          {isCreating ? 'Cadastrando...' : 'Cadastrar voluntário'}
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-muted-foreground">
          {volunteers?.length
            ? `Você tem ${volunteers.length} voluntário${
                volunteers.length > 1 ? 's' : ''
              } cadastrados.`
            : 'Nenhum voluntário cadastrado.'}
        </p>

        {volunteers?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="relative rounded-2xl border border-gray-200 shadow-sm p-5 bg-white space-y-4"
              >
                {/* Botão de deletar */}
                <button
                  onClick={() => handleDelete(volunteer.id)}
                  className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                  title="Remover voluntário"
                >
                  <Trash2Icon className="h-5 w-5" />
                </button>

                {/* Nome e funções */}
                <div className="flex items-center gap-3">
                  <UserIcon className="text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {volunteer.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {volunteer.tags.length
                        ? 'Voluntário em:'
                        : 'Sem funções atribuídas'}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {volunteer.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {volunteer.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum voluntário cadastrado ainda.
            <br />
            Clique em <span className="font-medium">
              Cadastrar voluntário
            </span>{' '}
            para adicionar um novo.
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Cadastrar Voluntário</Modal.Header>
        <Modal.Body className="overflow-visible">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value="Nome do voluntário" />
              <TextInput
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João"
                required
              />
            </div>

            <div>
              <Label htmlFor="tags" value="Funções (tags)" />
              <SearchSelect
                filters={tags || []}
                selectedSearchedFilters={selectedTags}
                setSelectedSearchedFilters={setSelectedTags}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreateVolunteer} disabled={isCreating}>
            {isCreating ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </LayoutContainer>
  )
}
