import './index.css'

const WebsiteInfo = props => {
  const {
    filteredList,
    toggleCheck,
    toggledButton,
    search,
    searchedButton,
    deletePassword,
    count,
  } = props

  const showPassword = e => {
    toggledButton(e)
  }

  const searchButton = e => {
    searchedButton(e.target.value)
  }

  const deleteItem = e => {
    deletePassword(e)
  }
  return (
    <div className="app-container-item1">
      <div className="top-section">
        <div className="addCount">
          <h1 className="para">Your Passwords</h1>
          <p className="span">{count}</p>
        </div>
        <div className="inputBlockSearch">
          <img
            className="inputImage searchImage"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
          <input
            type="search"
            className="searchInput"
            placeholder="Search"
            value={search}
            onChange={searchButton}
          />
        </div>
      </div>
      <hr />
      <div className="bottom-section">
        <div className="checkedBox">
          <input
            type="checkbox"
            className="checkBox"
            id="checkId"
            value={toggleCheck}
            onChange={() => {
              showPassword(toggleCheck)
            }}
          />
          <label htmlFor="checkId" className="checkLabel">
            Show Passwords
          </label>
        </div>
        {filteredList.length > 0 ? (
          <ul className="userList">
            {filteredList.map(i => (
              <li className="user-data" key={i.id}>
                <div className={`profile ${i.color}`}>
                  <p className="profile-name">{i.website[0].toUpperCase()}</p>
                </div>
                <div className="profile-info">
                  <p className="website-name">{i.website}</p>
                  <p className="user-name">{i.name}</p>
                  {toggleCheck ? (
                    <p className="user-name">{i.password}</p>
                  ) : (
                    <img
                      className="passwordImage"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                    />
                  )}
                </div>
                <div className="dlt-button">
                  <button
                    type="button"
                    className="dlt-profile"
                    data-testid="delete"
                    onClick={() => {
                      deleteItem(i.id)
                    }}
                  >
                    <img
                      className="dltImage"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-container">
            <img
              className="emptyImage"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />

            <p className="info-empty">No Passwords</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WebsiteInfo
