import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {IoIosSearch} from 'react-icons/io'

import Header from '../Header'
import UserProfile from '../UserProfile'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobLists: [],
    apiStatus: apiStatusContent.initial,
    employmentList: '',
    activeSalaryRanges: '1000000',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentList, activeSalaryRanges, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentList}&minimum_package=${activeSalaryRanges}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobLists: updatedData,
        apiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onClickSearchBtn = () => this.getJobsList()

  changeEmploymentTypes = event => {
    this.setState({employmentList: event.target.id}, this.getJobsList)
  }

  changeSalaryRanges = event => {
    this.setState({activeSalaryRanges: event.target.id}, this.getJobsList)
  }

  renderFailureView = () => (
    <>
      <img
        className="Error-job-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="Error-job-heading">Oops! Something Went Wrong</h1>
      <p className="Error-job-text">
        We cannot seem to find the page you are looking for
      </p>
      <button className="Retry-btn" type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </>
  )

  renderSuccessView = () => {
    const {jobLists} = this.state
    const isJobsAvailable = jobLists.length > 0

    return (
      <>
        {isJobsAvailable && (
          <ul className="job-list-item-container">
            {jobLists.map(eachJop => (
              <JobCard key={eachJop.id} jobDetails={eachJop} />
            ))}
          </ul>
        )}
        {!isJobsAvailable && (
          <div className="no-job-container">
            <img
              className="Error-job-image"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="Error-job-heading">No Jobs Found</h1>
            <p className="Error-job-text">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-card">
        <input
          className="search-input"
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
          placeholder="Search"
        />
        <button
          className="search-logo-btn"
          data-testid="searchButton"
          type="button"
          onClick={this.onClickSearchBtn}
        >
          <IoIosSearch className="search-logo" size="20" aria-label="close" />
        </button>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="jobs-list-loader-card" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderSuccessView()
      case apiStatusContent.failure:
        return this.renderFailureView()
      case apiStatusContent.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="job-side-bar-container">
            <UserProfile />
            <hr />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentTypes={this.changeEmploymentTypes}
              changeSalaryRanges={this.changeSalaryRanges}
            />
          </div>
          <div className="job-list-and-search-container">
            {this.renderSearchInput()}
            <div className="jobs-response-container">
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
