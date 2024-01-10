// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, onClickFilterItem, activeOption} = props
  const {language, id} = itemDetails
  const btnClass =
    activeOption === id ? 'filter-btn filter-btn-active' : 'filter-btn'
  const onClickButton = () => {
    onClickFilterItem(id)
  }

  return (
    <li className="each-filter">
      <button type="button" className={btnClass} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
