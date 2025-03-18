import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypes: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.renderProfileApi()
    this.renderJobsApi()
  }

  renderProfileApi = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inprogress})

    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.profile_details
      const updatedData = {
        name: fetchedData.name,
        profileImageUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-pic" />
        <h1 className="headings1">{name}</h1>
        <p className="paras1">{shortBio}</p>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.renderProfileApi()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="buttons1"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderProfileStages = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderJobsApi = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inprogress})
    const {searchInput, employmentTypes, salaryRange} = this.state
    const typol = employmentTypes.join(',')

    const token = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${typol}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderJobStages = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderJobLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  onClickRetryButton1 = () => {
    this.renderJobsApi()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.componentDidMount()
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-img"
      />
      <h1 className="headings2">No jobs Found</h1>
      <p className="paras2">We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobsList, searchInput} = this.state
    const nojobs = jobsList.length > 0

    return (
      <div className="container5">
        <div className="search-container">
          <input
            type="search"
            className="inputx"
            placeholder="Search"
            onChange={this.onChangeInput}
            value={searchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {nojobs ? (
          <ul className="jobs-list-container">
            {jobsList.map(item => (
              <JobCard key={item.id} jobDetails={item} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </div>
    )
  }

  renderJobFailureView = () => (
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
        onClick={this.onClickRetryButton1}
      >
        Retry
      </button>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderEmploymentFilter = () => (
    <div className="employmentType-filter">
      <h2 className="headings23">Type of Employment</h2>
      <div className="container51">
        {employmentTypesList.map(eachItem => (
          <div className="list-item" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor={eachItem.employmentTypeId} className="label">
              {eachItem.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  onChangeCheckbox = event => {
    const {employmentTypes} = this.state
    const sampleValues = employmentTypes
    const type = event.target.value
    const check = sampleValues.includes(type)
    if (check) {
      const xyz = sampleValues.filter(each => each !== type)
      this.setState({employmentTypes: xyz}, this.renderJobsApi)
    } else {
      this.setState(
        {employmentTypes: [...sampleValues, type]},
        this.renderJobsApi,
      )
    }
  }

  renderSalaryFilter = () => (
    <div className="salaryType-filter">
      <h2 className="headings23">Salary Range</h2>
      <div className="container51">
        {salaryRangesList.map(eachItem => (
          <div className="list-item" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              name="salary"
              onChange={this.onChangeRadio}
            />
            <label htmlFor={eachItem.salaryRangeId} className="label">
              {eachItem.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  onChangeRadio = event => {
    this.setState({salaryRange: event.target.value}, this.renderJobsApi)
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="job-left-container">
            {this.renderProfileStages()}
            <hr className="line" color="#64748b" />
            {this.renderEmploymentFilter()}
            <hr className="line" color="#64748b" />
            {this.renderSalaryFilter()}
          </div>
          <div className="job-right-container">{this.renderJobStages()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
