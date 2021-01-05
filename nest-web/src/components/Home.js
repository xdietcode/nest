import React, {useState, useEffect} from 'react';
import SearchBar from "./SearchBar";
import {Tabs, message} from 'antd';
import {BASE_URL, SEARCH_KEY, TOKEN_KEY} from "../constants";
import axios from 'axios';


function Home(props) {

    const {TabPane} = Tabs;
    const [activeTab, setActiveTab] = useState('image');

    const [post, setPost] = useState([]);
    // Set SearchOption (input and keyword/user)
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    })

    // useEffect( () => {
    //     fetchPosts(searchOption)
    // }, [searchOption]);


    const fetchPost = option => {
       const { type, keyword } = option;
       let url = '';

       if (type === SEARCH_KEY.all) {
           url = `${BASE_URL}/search`
       } else if (type === SEARCH_KEY.keyword) {
           url = `${BASE_URL}/search?keywords=${keyword}`
       } else {
           url = `${BASE_URL}/search?user=${keyword}`
       }

       const opt = {
           method: "GET",
           url: url,
           headers: {
               // validate aurhotization from server
               Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
           }
       }

       axios(opt)
           .then( res => {
               if (res.stats === 200) {
                   console.log(res.data)
                   setPost(res.data) // update post status when received data
               }
           })
           .catch( err => {
               console.log("Error", err)
               message.error("Error occurred")
           })
    }

    const renderPost = type => {
        // case1: post is empty -> no data
        // case2: type === image -> show image
        // case3: type === video -> show video

        if (!post || post.length === 0) {
            return <div>no data</div>
        }
        if (type === 'image') {
            return 'image';
        } else if (type === 'video') {
            return 'video';
        }
    }

    return (
        <div>
            <SearchBar/>
            <div className="display">
                <Tabs defaultActiveKey="image"
                      onChange={key => setActiveTab(key)}>

                    <TabPane tab="Image" key="image">
                        { renderPost("image")}
                    </TabPane>
                    <TabPane tab="Video" key="video">
                        { renderPost("video") }
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Home;