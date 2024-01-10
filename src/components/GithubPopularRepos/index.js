import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const filterConstants = {
  all: 'ALL',
  javascript: 'JAVASCRIPT',
  ruby: 'RUBY',
  java: 'JAVA',
  css: 'CSS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    filterOption: filterConstants.all,
    itemsList: [],
    isLoading: true,
    isFailure: false,
  }

  componentDidMount() {
    this.getRepos()
  }

  onClickFilterItem = filterId => {
    this.setState({filterOption: filterId}, this.getRepos)
  }

  getRepos = async () => {
    this.setState({isLoading: true})
    const {filterOption} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${filterOption}`

    const response = await fetch(githubReposApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data.popular_repos)
      const updatedList = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({itemsList: updatedList, isLoading: false})
    } else {
      this.setState({isFailure: true})
    }
  }

  getFailureView = () => (
    <div>
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  getUiRepos = () => {
    const {itemsList, isFailure} = this.state

    const result = isFailure
      ? this.getFailureView()
      : itemsList.map(eachCard => (
          <RepositoryItem key={eachCard.id} cardDetails={eachCard} />
        ))
    return result
  }

  render() {
    const {filterOption, isLoading} = this.state

    return (
      <div className="main-bg">
        <h1 className="main-heading">Popular</h1>
        <ul className="filter-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              itemDetails={eachItem}
              onClickFilterItem={this.onClickFilterItem}
              activeOption={filterOption}
            />
          ))}
        </ul>
        <ul className="repos-container">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            this.getUiRepos()
          )}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
