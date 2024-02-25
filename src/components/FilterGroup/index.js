import './index.css'

const FilterGroup = props => {
  const renderSalaryRanges = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(range => {
      const {changeSalaryRanges} = props
      const changeSalary = event => changeSalaryRanges(event)

      return (
        <li className="filter-list-item" key={range.employmentTypeId}>
          <input
            id={range.salaryRangeId}
            type="radio"
            onChange={changeSalary}
          />
          <label className="filter-label-text" htmlFor={range.salaryRangeId}>
            {range.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangesList = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list-container">{renderSalaryRanges()}</ul>
    </>
  )

  const renderEmploymentTypes = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(type => {
      const {changeEmploymentTypes} = props
      const changeEmployment = event => {
        changeEmploymentTypes(event)
      }

      return (
        <li className="filter-list-item" key={type.employmentTypeId}>
          <input
            id={type.employmentTypeId}
            type="checkbox"
            onChange={changeEmployment}
          />
          <label className="filter-label-text" htmlFor={type.employmentTypeId}>
            {type.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypesList = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list-container">{renderEmploymentTypes()}</ul>
    </>
  )

  return (
    <div>
      <div>{renderEmploymentTypesList()}</div>
      <hr />
      <div> {renderSalaryRangesList()} </div>
    </div>
  )
}

export default FilterGroup
