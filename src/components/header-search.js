import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Search } from './search';

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='search-header'>
        <div>
          <div>上一頁</div>
          <div>下一頁</div>
          <input placeholder='搜尋藝人或歌曲' />
        </div>
        <div>使用者</div>
      </div>
    )
  }
}

export default HeaderSearch
