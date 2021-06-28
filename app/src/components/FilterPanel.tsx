import React, { useEffect, useMemo } from 'react'
import { FilterCategory } from './'
import {
  Portal,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Stack,
  Accordion,
  Input,
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'

import { FaFilter } from 'react-icons/fa'
import { Button } from 'components/common/Button'

const filterCategoryProperties = [
  {
    title: 'Clients',
    children: [
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'terminationDate', type: 'date', label: 'Termination Date' },
    ],
  },
  {
    title: 'Projects',
    children: [
      { field: 'clientNames', type: 'checkbox', label: 'Client Name' },
      { field: 'confidence', type: 'number', label: 'Confidence' },
      { field: 'priorities', type: 'checkbox', label: 'Priority' },
      { field: 'projectTypes', type: 'checkbox', label: 'Project Type' },
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'endDate', type: 'date', label: 'End Date' },
    ],
  },
  {
    title: 'Resources',
    children: [
      { field: 'title', type: 'checkbox', label: 'Title' },
      { field: 'departmentName', type: 'checkbox', label: 'Department Name' },
      { field: 'project', type: 'checkbox', label: 'Project' },
      { field: 'clients', type: 'checkbox', label: 'Client' },
      { field: 'skills', type: 'checkbox', label: 'Skill' },
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'endDate', type: 'date', label: 'Termination Date' },
    ],
  },
]

type FilterPanelProps = {
  page?: string | null | undefined
  filterItems?: { [key: string]: any } | undefined
  onFilter: (queryData: { [key: string]: any }, filterClicked: boolean) => void
  setSearchText?: (s: string) => void
  searchText?: string
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  page,
  onFilter,
  filterItems,
  setSearchText,
}) => {
  const buttonRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filterCategories = useMemo(() => {
    if (page) {
      return filterCategoryProperties.filter((item) => item.title === page)
    }
    return filterCategoryProperties
  }, [page])

  const searchTextChangeHandler = (value: string) => {
    setSearchText && setSearchText(value)
  }

  const debouncedSearchTextHandler = useMemo(
    () => debounce(searchTextChangeHandler, 500),
    [setSearchText],
  )

  useEffect(() => {
    return () => {
      debouncedSearchTextHandler.cancel()
    }
  }, [])

  return (
    <>
      <Button
        rightIcon={<FaFilter />}
        colorScheme="primary"
        onClick={onOpen}
        ref={buttonRef}
        data-testid="FilterPanelButton"
      >
        Filter
      </Button>
      <Portal>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={buttonRef}
        >
          <DrawerOverlay data-testid="FilterPanelOverlay" />
          <DrawerContent data-testid="FilterPanelDrawer">
            <DrawerCloseButton />
            <DrawerHeader>
              <Stack spacing="4" direction="row" alignItems="center">
                <FaFilter />
                <span>Filters</span>
              </Stack>
            </DrawerHeader>

            <DrawerBody>
              <Input
                type="text"
                placeholder="Search..."
                onChange={(e) =>
                  debouncedSearchTextHandler(e.currentTarget.value)
                }
              />

              {filterCategories.length > 0 && (
                <Accordion allowToggle allowMultiple marginTop="4">
                  {filterCategories.map((property) => (
                    <FilterCategory
                      title={property.title}
                      fields={property.children}
                      filterItems={filterItems}
                      onChange={onFilter}
                      key={property.title}
                    />
                  ))}
                </Accordion>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  )
}
