import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {TiShoppingBag} from 'react-icons/ti'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similarJobData

  return (
    <li className="similar-job-item">
      <div className="job-item-header-card">
        <img
          className="job-item-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="rating-card">
            <IoIosStar className="rating-logo" size="20" />
            <p className="job-rating-text">{rating}</p>
          </div>
        </div>
      </div>
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
      <h1 className="job-description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
    </li>
  )
}

export default SimilarJobCard
