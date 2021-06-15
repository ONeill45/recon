import React, { useState, useEffect } from 'react'
import {
  AccordionPanel,
  AccordionButton,
  Box,
  AccordionIcon,
  Checkbox,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Accordion,
  AccordionItem,
  Text,
} from '@chakra-ui/react'
import format from 'date-fns/format'

import { Button } from './common/Button'
import { DatePicker } from './common/forms/Datepicker'
import { useRef } from 'react'

type filterCategoryProps = {
  title: string
  fields: Array<{ [key: string]: any }> | undefined
  filterItems: { [key: string]: any } | undefined
  onChange?: (
    queryData: { [key: string]: string },
    filterClicked: boolean,
  ) => void
}

export const FilterCategory: React.FC<filterCategoryProps> = ({
  title,
  fields,
  onChange,
  filterItems,
}) => {
  const [qData, setQData] = useState<{ [key: string]: any }>({})
  const [isInvalidDate, setIsInvalidDate] = useState<{
    startDate: boolean
    endDate: boolean
  }>({ startDate: false, endDate: false })
  const [dateFilters, setDateFilters] = useState<{
    startDate: { before: boolean; after: boolean }
    endDate: { before: boolean; after: boolean }
  }>({
    startDate: {
      before: false,
      after: false,
    },
    endDate: {
      before: false,
      after: false,
    },
  })

  const dateValueRefs = useRef()

  const handleOnChangeCheckBox = ({
    target,
    field,
    name,
  }: {
    [key: string]: any
  }) => {
    if (target && target.checked === true) {
      if (!qData[field]) {
        const qDataCopy = { ...qData }
        qDataCopy[field] = [name]
        setQData({ ...qDataCopy })
      } else {
        const qDataCopy = { ...qData }
        qDataCopy[field].push(name)
        setQData({ ...qDataCopy })
      }
    } else {
      const qDataCopy = { ...qData }
      const filteredCopy = qDataCopy[field].filter((item: any) => item !== name)
      if (filteredCopy.length > 0) {
        qDataCopy[field] = [...filteredCopy]
      } else {
        delete qDataCopy[field]
      }
      setQData({ ...qDataCopy })
    }
  }

  const handleOnChange = (value: string, field: string, date?: boolean) => {
    if (date) {
      const isInvalidDateCopy = { ...isInvalidDate }
      if (value) {
        if (field === 'startDate') {
          const qDataCopy = { startDate: {} }
          qDataCopy['startDate'] = {
            date: value,
            beforeAfter: beforeAfterStartDate,
          }
          setQData((prev: any) => ({
            ...prev,
            ...qDataCopy,
          }))
          isInvalidDateCopy.startDate = false
          setIsInvalidDate({ ...isInvalidDateCopy })
        } else {
          const qDataCopy = { endDate: {} }
          qDataCopy['endDate'] = {
            date: value,
            beforeAfter: beforeAfterEndDate,
          }
          setQData((prev: any) => ({
            ...prev,
            ...qDataCopy,
          }))
          isInvalidDateCopy.endDate = false
          setIsInvalidDate({ ...isInvalidDateCopy })
        }
      } else {
        const qDataCopy = { ...qData }
        delete qDataCopy[field]
        setQData({ ...qDataCopy })
        if (field === 'startDate') {
          isInvalidDateCopy.startDate = true
          setIsInvalidDate({ ...isInvalidDateCopy })
        } else {
          isInvalidDateCopy.endDate = true
          setIsInvalidDate({ ...isInvalidDateCopy })
        }
      }
    } else {
      const qDataCopy = { ...qData }
      qDataCopy[field] = [value]
      setQData({ ...qDataCopy })
    }
  }

  const [clients, setClients] = useState<Array<string>>([])
  const [projects, setProjects] = useState<Array<string>>([])
  const [departments, setDepartments] = useState<Array<string>>([])
  const [titles, setTitles] = useState<Array<string>>([])
  const [skills, setSkills] = useState<Array<string>>([])

  const [clientNames, setClientNames] = useState<Array<string>>([])
  const [projectConfidence, setProjectConfidence] = useState<Array<string>>([])
  const [projectPriorities, setProjectPriorities] = useState<Array<string>>([])
  const [projectTypes, setProjectTypes] = useState<Array<string>>([])
  const [beforeAfterStartDate, setBeforeAfterStartDate] = useState<string>('')
  const [beforeAfterEndDate, setBeforeAfterEndDate] = useState<string>('')

  useEffect(() => {
    if (filterItems && filterItems.clients) {
      setClients(filterItems.clients)
    }
    if (filterItems && filterItems.projects) {
      setProjects(filterItems.projects)
    }
    if (filterItems && filterItems.departments) {
      setDepartments(filterItems.departments)
    }
    if (filterItems && filterItems.titles) {
      setTitles(filterItems.titles)
    }
    if (filterItems && filterItems.skills) {
      setSkills(filterItems.skills)
    }

    if (filterItems && filterItems.clientNames) {
      setClientNames(filterItems.clientNames)
    }
    if (filterItems && filterItems.projectConfidence) {
      setProjectConfidence(filterItems.projectConfidence)
    }
    if (filterItems && filterItems.projectPriorities) {
      setProjectPriorities(filterItems.projectPriorities)
    }
    if (filterItems && filterItems.projectTypes) {
      setProjectTypes(filterItems.projectTypes)
    }
  }, [filterItems])

  const onFilter = () => {
    if (onChange) {
      onChange(qData, true)
    }
  }

  useEffect(() => {
    const qDataCopy = { ...qData }
    const qDataCopyStartDate = { ...qDataCopy['startDate'] }
    if (qDataCopyStartDate.date) {
      qDataCopy['startDate'] = {
        ...qDataCopyStartDate,
        beforeAfter: beforeAfterStartDate,
      }
      setQData({ ...qDataCopy })
    }
  }, [beforeAfterStartDate])

  useEffect(() => {
    const qDataCopy = { ...qData }
    const qDataCopyEndDate = { ...qDataCopy['endDate'] }
    if (qDataCopyEndDate.date) {
      qDataCopy['endDate'] = {
        ...qDataCopyEndDate,
        beforeAfter: beforeAfterEndDate,
      }
      setQData({ ...qDataCopy })
    }
  }, [beforeAfterEndDate])

  const beforeAfterChange = (
    checked: any,
    field: string,
    beforeAfter: string,
  ) => {
    if (field === 'startDate') {
      if (checked) {
        if (beforeAfter === 'before') {
          setBeforeAfterStartDate('before')
        } else {
          setBeforeAfterStartDate('after')
        }
      } else {
        setBeforeAfterStartDate('')
      }
    }
    if (field === 'endDate') {
      if (checked) {
        if (beforeAfter === 'before') {
          setBeforeAfterEndDate('before')
        } else {
          setBeforeAfterEndDate('after')
        }
      } else {
        setBeforeAfterEndDate('')
      }
    }
  }

  useEffect(() => {
    const dateFiltersCopy = { ...dateFilters }
    if (beforeAfterEndDate === 'before') {
      dateFiltersCopy.endDate.before = true
      dateFiltersCopy.endDate.after = false
    } else if (beforeAfterEndDate === 'after') {
      dateFiltersCopy.endDate.before = false
      dateFiltersCopy.endDate.after = true
    } else {
      dateFiltersCopy.endDate.before = false
      dateFiltersCopy.endDate.after = false
    }
    setDateFilters({
      ...dateFiltersCopy,
    })
  }, [beforeAfterEndDate])

  useEffect(() => {
    const dateFiltersCopy = { ...dateFilters }
    if (beforeAfterStartDate === 'before') {
      dateFiltersCopy.startDate.before = true
      dateFiltersCopy.startDate.after = false
    } else if (beforeAfterStartDate === 'after') {
      dateFiltersCopy.startDate.before = false
      dateFiltersCopy.startDate.after = true
    } else {
      dateFiltersCopy.startDate.before = false
      dateFiltersCopy.startDate.after = false
    }
    setDateFilters({
      ...dateFiltersCopy,
    })
  }, [beforeAfterStartDate])

  const selectRenderItems = (field: string): Array<string> | null => {
    if (field === 'project') return projects
    if (field === 'clients') return clients
    if (field === 'departmentName') return departments
    if (field === 'title') return titles
    if (field === 'skills') return skills

    if (field === 'clientNames') return clientNames
    if (field === 'confidence') return projectConfidence
    if (field === 'priorities') return projectPriorities
    if (field === 'projectTypes') return projectTypes
    return null
  }

  const renderFilterItem = (item: {
    field: string
    type: string
    label: string
  }) => {
    if (item.type === 'checkbox' && selectRenderItems(item.field)) {
      const items = selectRenderItems(item.field)

      if (items && items.length) {
        return (
          <Box key={item.label}>
            <FormLabel>{item.label}</FormLabel>
            <Stack spacing="2">
              {items &&
                items.map((name: string, i: number) => (
                  <Checkbox
                    key={i}
                    id={`${item.type}-${item.field}-${name}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleOnChangeCheckBox({
                        target: {
                          name: e.target?.name,
                          checked: e.target?.checked,
                        },
                        field: item.field,
                        name,
                      })
                    }}
                  >
                    {name}
                  </Checkbox>
                ))}
            </Stack>
          </Box>
        )
      }
      return null
    }
    return (
      <>
        <FormControl id={item.field}>
          <FormLabel>{item.label}</FormLabel>
          {item.type === 'date' && (
            <Box marginBottom="2">
              <Text fontSize="sm">
                Check box below to filter before or after the selected date
              </Text>
              <Stack spacing="2" marginTop="2">
                <Checkbox
                  id={`${item.field}-before`}
                  isChecked={
                    item.field === 'startDate'
                      ? dateFilters.startDate.before
                      : dateFilters.endDate.before
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    beforeAfterChange(e.target?.checked, item.field, 'before')
                  }
                >
                  before
                </Checkbox>
                <Checkbox
                  id={`${item.field}-after`}
                  isChecked={
                    item.field === 'startDate'
                      ? dateFilters.startDate.after
                      : dateFilters.endDate.after
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    beforeAfterChange(e.target?.checked, item.field, 'after')
                  }
                >
                  after
                </Checkbox>
              </Stack>
            </Box>
          )}
          {item.type === 'date' ? (
            <DatePicker
              id={item.field}
              onChange={(date: Date) =>
                handleOnChange(
                  format(date, 'yyyy-MM-dd'),
                  item.field,
                  item.type === 'date',
                )
              }
            ></DatePicker>
          ) : (
            <Input
              type={item.type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(
                  e.target?.value,
                  item.field,
                  item.type === 'date',
                )
              }
            />
          )}
        </FormControl>
      </>
    )
  }
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4} data-testid="FilterCategoryContent">
        <Stack spacing="4">
          {fields ? (
            fields.map((item: { field: string; type: string; label: string }) =>
              item.label ? renderFilterItem(item) : null,
            )
          ) : (
            <>
              <Stack spacing="4">
                <Checkbox>Relevant filter option 1</Checkbox>
                <Checkbox>Relevant filter option 2</Checkbox>
                <Checkbox>Relevant filter option 3</Checkbox>
                <Checkbox>Relevant filter option 4</Checkbox>
              </Stack>
            </>
          )}
        </Stack>
        <Button
          type="button"
          onClick={onFilter}
          marginTop="10"
          marginLeft="auto"
          marginRight="auto"
        >
          Filter
        </Button>
      </AccordionPanel>
    </AccordionItem>
  )
}

export const TestFilterCategory: React.FC = (props: any) => {
  return (
    <Accordion allowToggle allowMultiple marginTop="4">
      <FilterCategory {...props} />
    </Accordion>
  )
}
