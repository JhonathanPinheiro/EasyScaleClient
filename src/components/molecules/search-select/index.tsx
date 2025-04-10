import { useState } from 'react'
import { cn } from '../../../lib/utils'
import { highlightText } from '../../../utils/highlight-text'
import { Input } from '../../ui/input'

export type FilterItem = {
  id: string
  name: string
}
export interface SearchSelectProps {
  filters: FilterItem[]
  selectedSearchedFilters: FilterItem[]
  setSelectedSearchedFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>
}

export default function SearchSelect({
  filters,
  selectedSearchedFilters,
  setSelectedSearchedFilters,
}: SearchSelectProps) {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [filteredSearchedResults, setFilteredSearchedResults] = useState<
    FilterItem[]
  >([])
  const [isSearchedResultsDropdownOpen, setIsSearchedResultsDropdownOpen] =
    useState(false)

  function handleSelectFilters(
    selectFiltersFunction: SearchSelectProps['setSelectedSearchedFilters'],
    filter: FilterItem
  ) {
    selectFiltersFunction((prevFilters) =>
      prevFilters.some(({ id }) => id === filter.id)
        ? prevFilters.filter(({ id }) => id !== filter.id)
        : [...prevFilters, filter]
    )
  }

  function handleSelectSearchBarFilters(filter: FilterItem) {
    handleSelectFilters(setSelectedSearchedFilters, filter)

    setIsSearchedResultsDropdownOpen(false)
    setSearchedTerm('')
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    setSearchedTerm(term)

    setIsSearchedResultsDropdownOpen(true)

    if (term) {
      const results = filters.filter((filter) =>
        filter.name.toLowerCase().includes(term.toLowerCase())
      )

      setFilteredSearchedResults(results)
    } else {
      setFilteredSearchedResults([])
    }
  }

  return (
    <div
      className={cn(
        'relative flex h-auto min-h-[50px] w-full items-center gap-4 bg-transparent px-1',
        selectedSearchedFilters.length > 4 ? 'rounded-2xl' : 'rounded-[32px]'
      )}
    >
      <div className="flex w-full flex-wrap items-center gap-2 p-2">
        {selectedSearchedFilters.length > 0 &&
          selectedSearchedFilters.map((filter) => (
            <div
              key={filter.id}
              className="flex w-auto items-center gap-3 rounded-[32px] bg-gray-100 px-4 py-1 pb-2"
            >
              <p
                onClick={() => handleSelectSearchBarFilters(filter)}
                className="cursor-pointer stroke-gray-500"
              >
                X
              </p>
              <span className="whitespace-nowrap text-sm font-medium text-gray-500">
                {filter.name}
              </span>
            </div>
          ))}
        <Input
          onChange={handleSearchChange}
          className="w-full min-w-full max-w-max px-2 py-0  ring-0 placeholder:text-[13px] placeholder:font-semibold placeholder:leading-[120%] placeholder:text-gray-500"
          value={searchedTerm}
        />
      </div>
      {isSearchedResultsDropdownOpen &&
        searchedTerm &&
        filteredSearchedResults.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setIsSearchedResultsDropdownOpen(false)}
              className="fixed inset-0 z-40 bg-transparent"
            />

            <div className="absolute left-0 top-full z-50 mt-4 w-full rounded-2xl bg-white shadow-box-shadow max-h-60 overflow-y-auto">
              <ul className="flex flex-col items-start">
                {filteredSearchedResults.length === 0 && (
                  <li className="px-5 py-4 text-sm text-gray-500">
                    Nenhum resultado encontrado
                  </li>
                )}

                {filteredSearchedResults
                  .filter(
                    (filter) =>
                      !selectedSearchedFilters.some(
                        (selectedFilter) => selectedFilter.id === filter.id
                      )
                  )
                  .map((filter) => (
                    <li
                      key={filter.id}
                      onClick={() => handleSelectSearchBarFilters(filter)}
                      className="flex h-14 w-full cursor-pointer items-center justify-between gap-6 rounded-2xl px-5 py-4 transition-colors duration-300 hover:bg-gray-100"
                    >
                      <span className="text-sm font-medium text-black-base">
                        {highlightText(filter.name, searchedTerm)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
    </div>
  )
}
