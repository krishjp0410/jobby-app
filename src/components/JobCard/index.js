import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {TiShoppingBag} from 'react-icons/ti'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-item">
      <Link className="job-item-link" to={`/jobs/${id}`}>
        <div className="job-item-header-card">
          <img
            className="job-item-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <hr className="horizontal-line" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
