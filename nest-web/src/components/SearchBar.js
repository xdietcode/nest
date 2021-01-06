import React, {useState} from 'react';
import {Input, Radio} from 'antd';
import {SEARCH_KEY} from "../constants";

const {Search} = Input;

function SearchBar(props) {

    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState(null);



    // case 1: type === all -> inform Home to fetch data
    const changeSearchType = e => {
        console.log('radio checked', e.target.value);
        setSearchType(e.target.value);
        setError("");
        // if clicked on ALl, inform HOME to fetch data
        if (searchType === SEARCH_KEY.all) {
            props.handleSearch( { type: SEARCH_KEY.all, keyword: ""})
        }
    };

    // case2: keyword/user + input
    const handleClickSearch = value => {
        console.log(value);
        // error case
        if (value === "" && searchType !== SEARCH_KEY.all) {
            setError("Please input search keyword");
            return;
        }
        // do search
        // inform HOME to fetch data
        // -> pass search word + type => Home props.fn
        props.handleSearch({type: searchType, keyword: value})
    }

    return (
        <div className="search-bar">

            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                disabled={searchType === SEARCH_KEY.all}
                onSearch={handleClickSearch}
            />
            <p className="error-msg"> {error} </p>
            <Radio.Group onChange={changeSearchType} value={searchType}>
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>

        </div>
    );
}

export default SearchBar;