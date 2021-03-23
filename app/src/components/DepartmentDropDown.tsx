import React from 'react'
import 'react-dropdown/style.css'

import { gql, useQuery } from '@apollo/client'

import { Department } from 'interfaces'
import styled from '@emotion/styled'

const DepartmentSelect = styled.select`
  width: 50%;
  padding: 5px 10px;
  margin: 8px 0;
`

export const GET_ALL_DEPARTMENTS = gql`
  {
    departments {
      id
      name
    }
  }
`
export const GET_DEPARTMENT_FROM_ID = gql`
  query GetDepartment($id: String!) {
    department(id: $id) {
      id
      name
    }
  }
`

type DepartmentDropDownProps = {
  department: Department | null
  setDepartment: any
}

export const DepartmentDropDown = ({
  department,
  setDepartment,
}: DepartmentDropDownProps) => {
  const { data, loading, error } = useQuery(GET_ALL_DEPARTMENTS, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { departments } = data

  if (department === null) {
    setDepartment(departments[0])
  }

  const onChange = (departmentName: string) => {
    const department = departments.find((department: Department) => {
      return department.name === departmentName
    })
    setDepartment(department)
  }

  return (
    <DepartmentSelect
      aria-label="department-select"
      defaultValue={departments[0].value}
      onChange={(e) => onChange(e.target.value)}
    >
      {departments.map((item: Department) => (
        <>
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        </>
      ))}
    </DepartmentSelect>
  )
}

export default DepartmentDropDown
