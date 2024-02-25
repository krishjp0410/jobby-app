import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {TiShoppingBag} from 'react-icons/ti'
import {GoLinkExternal} from 'react-icons/go'

import Header from '../Header'
import Skill from '../Skill'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusContent.initial,
    jobData: {},
    similarJobData: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    jobDescription: data.job_description,
    employmentType: data.employment_type,
    id: data.id,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    description: data.life_at_company.description,
    imageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobData = this.getFormattedData(data.job_details)
      const updatedSimilarData = data.similar_jobs.map(eachData =>
        this.getFormattedSimilarData(eachData),
      )
      this.setState({
        apiStatus: apiStatusContent.success,
        jobData: updatedJobData,
        similarJobData: updatedSimilarData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContent.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobData, similarJobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      description,
      imageUrl,
    } = jobData
    return (
      <>
        <div className="job-item">
          <div className="job-item-header-card">
            <img
              className="job-item-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-card">
                <IoIosStar className="rating-logo" size="20" />
                <p className="job-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="job-location-and-type-container">
              <div className="job-location-and-type-card">
                <MdLocationOn className="job-location-logo" size="20" />
                <p className="job-location-and-type-text">{location}</p>
              </div>
              <div className="job-location-and-type-card">
                <TiShoppingBag className="job-location-logo" size="20" />
                <p className="job-location-and-type-text">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="heading-and-link-card">
            <h1 className="job-description-heading">Description</h1>
            <div className="external-link-card">
              <a href={companyWebsiteUrl} className="external-web-link">
                Visit
              </a>
              <GoLinkExternal size="20" />
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="job-details-sub-title">Skills</h1>
          <ul className="skill-list-card">
            {skills.map(eachSkill => (
              <Skill key={eachSkill.name} skill={eachSkill} />
            ))}
          </ul>
          <h1 className="lite-at-company-heading">Life at Company</h1>
          <div className="job-detail-life-at-company-card">
            <p className="life-at-company-description">{description}</p>
            <img
              className="life-at-company-image"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <nav>
          <ul className="similar-job-list-card">
            {similarJobData.map(eachData => (
              <SimilarJobCard key={eachData.id} similarJobData={eachData} />
            ))}
          </ul>
        </nav>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="jobs-list-loader-card" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderJobsDetails = () => {
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
        <div className="job-item-details-bg-container">
          {this.renderJobsDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
