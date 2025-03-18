import {Link} from 'react-router-dom'

import './index.css'

import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdEmail} from 'react-icons/md'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="item-Link">
      <li className="list-container">
        <div className="container11">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="container13">
            <h2 className="title-heading">{title}</h2>
            <div className="container12">
              <FaStar className="star" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="container14">
          <div className="container15">
            <IoLocationSharp className="location" />
            <p className="para-location">{location}</p>
            <MdEmail className="bag" />
            <p className="para-employmentType">{employmentType}</p>
          </div>
          <p className="para-package">{packagePerAnnum}</p>
        </div>
        <hr color="#64748b" />
        <div className="container16">
          <h1 className="para-heading">Description</h1>
          <p className="para-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
