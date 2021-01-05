import React, { useState } from 'react';
import { Input, Radio } from 'antd';
import { SEARCH_KEY} from "../constants";

const { Search } = Input;

function SearchBar(props) {

    const handleSearch = value => {
        console.log(value);
        // error case
        if ( value === "" && searchType !== SEARCH_KEY.all) {
            setError("Please input search keyword");
            return;
        }
        setError("");
    }

    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState(null);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setSearchType(e.target.value);
        setError("");
    };

    return (
        <div className="search-bar">

            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                disabled={ searchType === SEARCH_KEY.all}
                onSearch={handleSearch}
            />
            <p className="error-msg"> {error} </p>
            <Radio.Group onChange={onChange} value={searchType}>
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>

        </div>
    );
}

export default SearchBar;