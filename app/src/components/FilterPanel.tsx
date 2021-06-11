import React, { FormEvent, useMemo } from 'react'
import { FilterCategory, SearchBar } from './'
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
  AccordionItem,
  Input,
} from '@chakra-ui/react'
import { FaFilter } from 'react-icons/fa'
import { Button } from './Button'

const filterCategoryProperties = [
  {
    title: 'Clients',
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
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'endDate', type: 'date', label: 'Termination Date' },
    ],
  },
]

type FilterPanelProps = {
  page?: string | null | undefined
  filterItems?: { [key: string]: any } | undefined
  onFilter: (queryData: { [key: string]: any }) => void
  setSearchText?: (s: string) => void
}

export const FilterPanel = (props: FilterPanelProps) => {
  const buttonRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { page, onFilter, filterItems } = props

  const filterCategories = useMemo(() => {
    if (page) {
      return filterCategoryProperties.filter((item) => item.title === page)
    }
    return filterCategoryProperties
  }, [page])

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
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  props.setSearchText &&
                  props.setSearchText(e.currentTarget.value)
                }
              />

              {filterCategories.length > 0 && (
                <Accordion allowToggle allowMultiple marginTop="4">
                  {filterCategories.map((property) => (
                    <AccordionItem>
                      <FilterCategory
                        title={property.title}
                        fields={property.children}
                        filterItems={filterItems}
                        onChange={onFilter}
                        key={property.title}
                      />
                    </AccordionItem>
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
