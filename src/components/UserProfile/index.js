import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusContent.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = [await response.json()]
    if (response.ok) {
      const updatedData = data.map(detail => ({
        name: detail.profile_details.name,
        profileImageUrl: detail.profile_details.profile_image_url,
        shortBio: detail.profile_details.short_bio,
      }))
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContent.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails[0]

    return (
      <div className="profile-bg-card">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-detail">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <>
      <button className="Retry-btn" type="button" onClick={this.getProfile}>
        Retry
      </button>
    </>
  )

  renderLoaderView = () => (
    <div className="profile-loader-card" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
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
    return <div className="profile-container">{this.renderProfile()}</div>
  }
}

export default UserProfile
