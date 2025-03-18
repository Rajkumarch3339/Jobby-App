import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdEmail} from 'react-icons/md'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobData: {},
  }

  componentDidMount() {
    this.renderJobDetailsApi()
  }

  renderJobDetailsApi = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.inprogress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const sampleLifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }
      const sampleSkills = fetchedData.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const sampleJobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
        lifeAtCompany: sampleLifeAtCompany,
        skills: sampleSkills,
      }
      const sampleSimilarJobs = fetchedData.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      const updatedData = {
        jobDetails: sampleJobDetails,
        similarJobs: sampleSimilarJobs,
      }
      console.log(updatedData)

      this.setState({
        jobDetailsApiStatus: apiStatusConstants.success,
        jobData: updatedData,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItem = () => {
    const {jobData} = this.state
    const {jobDetails} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="containerx1">
        <div className="containerx2">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-company-logo-img"
          />
          <div className="containerx3">
            <h2 className="job-title-heading">{title}</h2>
            <div className="containerx4">
              <FaStar className="starx" />
              <p className="job-rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="containerx5">
          <div className="containerx6">
            <IoLocationSharp className="locationx" />
            <p className="job-para-location">{location}</p>
            <MdEmail className="bagx" />
            <p className="job-para-employmentType">{employmentType}</p>
          </div>
          <p className="job-para-package">{packagePerAnnum}</p>
        </div>
        <hr color="#64748b" />
        <div className="containerx7">
          <div className="containerx9">
            <h1 className="job-para-heading">Description</h1>
            <div className="containerx8">
              <a
                href={companyWebsiteUrl}
                className="anker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
              <FaExternalLinkAlt />
            </div>
          </div>
          <p className="job-para-desc">{jobDescription}</p>
        </div>
        <div className="containerx10">
          <h1 className="headingx1">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachItem => (
              <div className="skill-item" key={eachItem.name}>
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  className="item-image"
                />
                <p className="item-para">{eachItem.name}</p>
              </div>
            ))}
          </ul>
        </div>
        <div className="containerx11">
          <h1 className="headingx1">Life at Company</h1>
          <div className="containerx12">
            <p className="job-para-desc1">{description}</p>
            <img src={imageUrl} alt="life at company" className="company-img" />
          </div>
        </div>
      </div>
    )
  }

  renderSimilarItem = () => {
    const {jobData} = this.state
    const {similarJobs} = jobData

    return (
      <div className="similar-render">
        <h1 className="headingx2">Similar Jobs</h1>
        <ul className="similar-items-list">
          {similarJobs.map(each => (
            <div className="similar-item" key={each.id}>
              <div className="container11">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo-img"
                />
                <div className="container13">
                  <h2 className="title-heading">{each.title}</h2>
                  <div className="container12">
                    <FaStar className="star" />
                    <p className="rating-para">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="container16">
                <h1 className="para-heading">Description</h1>
                <p className="para-descy1">{each.jobDescription}</p>
              </div>
              <div className="container15">
                <IoLocationSharp className="location" />
                <p className="para-locationy1">{each.location}</p>
                <MdEmail className="bag" />
                <p className="para-employmentTypey1">{each.employmentType}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => (
    <>
      <div className="center-container">
        {this.renderJobItem()}
        {this.renderSimilarItem()}
      </div>
    </>
  )

  renderFailureView = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="headings2">Oops! Something Went Wrong</h1>
      <p className="paras2">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="buttons1"
        onClick={this.onClickRetryButton2}
      >
        Retry
      </button>
    </div>
  )

  onClickRetryButton2 = () => {
    this.renderJobDetailsApi()
  }

  renderJobDetailsStages = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobDetails-page-container">
          {this.renderJobDetailsStages()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
