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
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import format from 'date-fns/format'

import { Button } from './common/Button'
import { DatePicker } from './common/forms/Datepicker'
import { useFormik } from 'formik'

type filterCategoryProps = {
  title: string
  fields: Array<{ [key: string]: any }> | undefined
  filterItems: { [key: string]: any } | undefined
  onChange?: (
    queryData: { [key: string]: string },
    filterClicked: boolean,
  ) => void
  key?: string | number | undefined
}

export const FilterCategory: React.FC<filterCategoryProps> = ({
  title,
  fields,
  onChange,
  filterItems,
}) => {
  const { setFieldValue, handleSubmit, values } = useFormik<
    Record<string, any>
  >({
    initialValues: {},
    onSubmit: (values) => {
      const submitValues = { ...values }
      Object.keys(submitValues).forEach((key) => {
        const value = submitValues[key]
        if (typeof value !== 'undefined' && value !== null) {
          if (value.constructor.name === 'Object') {
            if (
              (value['beforeAfter'] && !value['date']) ||
              (value['date'] && !value['beforeAfter'])
            ) {
              delete submitValues[key]
            }
          } else if (
            (typeof value === 'string' || Array.isArray(value)) &&
            value.length < 1
          ) {
            delete submitValues[key]
          }
        } else {
          delete submitValues[key]
        }
      })

      onChange && onChange(submitValues, true)
    },
  })

  const [clients, setClients] = useState<Array<string>>([])
  const [projects, setProjects] = useState<Array<string>>([])
  const [departments, setDepartments] = useState<Array<string>>([])
  const [titles, setTitles] = useState<Array<string>>([])
  const [skills, setSkills] = useState<Array<string>>([])

  const [clientNames, setClientNames] = useState<Array<string>>([])
  const [projectConfidence, setProjectConfidence] = useState<Array<string>>([])
  const [projectPriorities, setProjectPriorities] = useState<Array<string>>([])
  const [projectTypes, setProjectTypes] = useState<Array<string>>([])

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
                items.map((name: string) => (
                  <Checkbox
                    key={name}
                    id={`${item.type}-${item.field}-${name}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let newFieldValue = values[item.field]
                        ? [...values[item.field]]
                        : []
                      if (e.target.checked) {
                        newFieldValue.push(name)
                      } else {
                        newFieldValue = newFieldValue.filter(
                          (item: any) => item !== name,
                        )
                      }
                      setFieldValue(item.field, newFieldValue)
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
      <FormControl id={item.field} key={item.label}>
        <FormLabel>{item.label}</FormLabel>
        {item.type === 'date' && (
          <Box marginBottom="4">
            <Text fontSize="sm" marginBottom="2">
              Filter before or after the date
            </Text>
            <RadioGroup
              onChange={(value) =>
                setFieldValue(`${item.field}.beforeAfter`, value)
              }
              value={
                values[item.field] && values[item.field]['beforeAfter']
                  ? values[item.field]['beforeAfter']
                  : ''
              }
              colorScheme="primary"
            >
              <Stack spacing="2">
                <Radio value="before">Before</Radio>
                <Radio value="after">After</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        )}
        {item.type === 'date' ? (
          <DatePicker
            id={item.field}
            selected={
              values[item.field] && values[item.field]['jsDate']
                ? values[item.field]['jsDate']
                : null
            }
            onChange={(date: Date) => {
              setFieldValue(`${item.field}.date`, format(date, 'yyyy-MM-dd'))
              setFieldValue(`${item.field}.jsDate`, date)
            }}
          ></DatePicker>
        ) : (
          <Input
            type={item.type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue(item.field, e.target.value)
            }
          />
        )}
      </FormControl>
    )
  }
  return (
    <AccordionItem>
      <form onSubmit={handleSubmit}>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4} data-testid="FilterCategoryContent">
          <Stack spacing="4">
            {fields ? (
              fields.map(
                (item: { field: string; type: string; label: string }) =>
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
            type="submit"
            marginTop="10"
            marginLeft="auto"
            marginRight="auto"
          >
            Filter
          </Button>
        </AccordionPanel>
      </form>
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
