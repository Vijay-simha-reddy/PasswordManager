import {Component} from 'react'
import './index.css'
import {v4 as uuidV4} from 'uuid'
import WebsiteInfo from '../WebsiteInfo/index'

const colorsList = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

class PasswordManager extends Component {
  state = {
    website: '',
    name: '',
    password: '',
    passwordList: [],
    toggleCheck: false,
    search: '',
    filteredList: [],
    colors: colorsList,
    count: 0,
  }

  websiteInput = e => {
    this.setState({website: e.target.value})
  }

  nameInput = e => {
    this.setState({name: e.target.value})
  }

  passwordInput = e => {
    this.setState({password: e.target.value})
  }

  addPasswordData = () => {
    const {name, password, website, colors} = this.state
    if (name !== '' && password !== '' && website !== '') {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const newCollection = {
        website,
        name,
        password,
        id: uuidV4(),
        color,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newCollection],
        name: '',
        password: '',
        website: '',
        filteredList: [...prevState.passwordList, newCollection],
        count: prevState.passwordList.length + 1,
      }))
    }
  }

  toggledButton = e => {
    this.setState({toggleCheck: !e})
  }

  searchedButton = e => {
    const {passwordList} = this.state

    this.setState({search: e}, () => {
      const {search: updatedSearch} = this.state

      if (updatedSearch !== '') {
        const newFilter = passwordList.filter(i =>
          i.website.toLowerCase().includes(updatedSearch.toLowerCase()),
        )
        this.setState({filteredList: newFilter, count: newFilter.length})
      } else {
        this.setState({filteredList: passwordList, count: passwordList.length})
      }
    })
  }

  deletePassword = id => {
  const { passwordList } = this.state;
  const updatedList = passwordList.filter(item => item.id !== id);
  this.setState({
    filteredList: updatedList,
    count: updatedList.length,
    passwordList: updatedList,
  });
};

  render() {
    const {
      name,
      website,
      password,
      toggleCheck,
      filteredList,
      search,
      count,
    } = this.state

    console.log(filteredList)
    return (
      <div className="app-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="app-container-item">
          <img
            className="top-container-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />

          <div className="formInputs">
            <h1 className="main-heading">Add New Password</h1>
            <div className="inputBlock">
              <img
                className="inputImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                className='topicInputs'
                placeholder="Enter Website"
                onChange={this.websiteInput}
                value={website}
              />
            </div>
            <div className="inputBlock">
              <img
                className="inputImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input type="text"
                className='topicInputs'
                placeholder="Enter Username"
                onChange={this.nameInput}
                value={name}
              />
            </div>
            <div className="inputBlock">
              <img
                className="inputImage"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                className='topicInputs'
                placeholder="Enter Password"
                onChange={this.passwordInput}
                value={password}
              />
            </div>
            <div className="add-button">
              <button
                type="submit"
                className="adding-button"
                onClick={this.addPasswordData}
              >
                Add
              </button>
            </div>
          </div>
          <div className="form-image">
            <img
              className="managerImage"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <WebsiteInfo
          filteredList={filteredList}
          toggleCheck={toggleCheck}
          toggledButton={this.toggledButton}
          searchedButton={this.searchedButton}
          search={search}
          deletePassword={this.deletePassword}
          count={count}
        />
      </div>
    )
  }
}

export default PasswordManager
