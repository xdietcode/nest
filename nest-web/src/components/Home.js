import React, {useState, useEffect} from 'react';
import SearchBar from "./SearchBar";
import {Tabs, message, Row, Col, Button} from 'antd';
import {BASE_URL, SEARCH_KEY, TOKEN_KEY} from "../constants";
import axios from 'axios';
import PhotoGallery from "./PhotoGallery";
import PostButton from "./PostButton";


function Home(props) {

    const {TabPane} = Tabs;
    const [activeTab, setActiveTab] = useState('image');

    const [post, setPost] = useState([]);
    // Set SearchOption (input and keyword/user)
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    })
    // DidMount()
    useEffect(() => {
        const { type, keyword } = searchOption;
        fetchPost(searchOption);
        console.log("In effect", searchOption);
    }, [searchOption]); // DidUpdate()

    const fetchPost = (option) => {
        const { type, keyword } = option;
        let url = "";

        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setPost(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });
    };

    const renderPost = type => {
        // case1: post is empty -> no data
        // case2: type === image -> show image
        // case3: type === video -> show video

        if (!post || post.length === 0) {
            return <div>no data</div>
        }
        if (type === 'image') {
            const imageArr = post
                .filter((item) => item.type === "image")
                .map((image) => {
                    return {
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });

            return <PhotoGallery images={imageArr} />;
        } else if (type === 'video') {
            console.log(post.filter( item => item.type === 'video'))
            return (
                <Row>
                    {
                        post.filter( item => item.type === 'video' )
                            .map( item => (
                                    <Col span={8} key={item.url}>
                                        <video src={item.url}
                                                control={true}
                                                className="video-block" />
                                                <p> { item.user }: { item.message }</p>
                                    </Col>

                                )
                            )
                    }
                </Row>
            );
        }
    }

    const handleSearch = (value) => {
        console.log('home', value);
        const { type, keyword } = value;
        setSearchOption( {type: type, keyword: keyword});
    }

    // change tab according to upload file type image|video
    const showPost = (type) => {
        console.log("type -> ", type);
        setActiveTab(type);

        setTimeout(() => {
            setSearchOption({ type: SEARCH_KEY.all, keyword: "" });
        }, 3000);
    };

    const operations = <PostButton onShowPost={showPost}> Upload </PostButton>
    return (
        <div className="home">
            <SearchBar handleSearch={handleSearch}/>
            <div className="display">
                <Tabs tabBarExtraContent={operations}
                    defaultActiveKey="image"
                      activeKey={activeTab}
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