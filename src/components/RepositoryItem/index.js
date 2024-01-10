// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {cardDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = cardDetails
  return (
    <div className="card-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="card-heading">{name}</h1>
      <div className="desc-container">
        <img
          className="icon-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="desc-para">{`${starsCount} stars`}</p>
      </div>

      <div className="desc-container">
        <img
          className="icon-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="desc-para">{`${forksCount} stars`}</p>
      </div>

      <div className="desc-container">
        <img
          className="icon-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="desc-para">{`${issuesCount} stars`}</p>
      </div>
    </div>
  )
}

export default RepositoryItem
