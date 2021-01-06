import React, {Component} from 'react';
import { Modal, Button, message } from 'antd';
import { PostForm } from "./PostForm";
import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from "../constants";

class PostButton extends Component {
    state = {
        visible: false,
    }

    showModal = () => {
        console.log("show modal");
        this.setState({
            visible: true,
            confirmLoading: false,
        })
    }

    handleOk = () => {
        this.setState({visible: false})
        // get form data
        console.log("Post Form", this.postForm);
        this.postForm.validateFields()
            .then( form => {
                const { description, uploadPost } = form;
                const { type, originFileObj } = uploadPost[0];
                const postType = type.match(/^(image|video)/g)[0];
                if (postType) {
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj);

                    const opt = {
                        method: "POST",
                        url: `${BASE_URL}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                        },
                        data: formData
                    };

                    axios(opt)
                        .then((res) => {
                            if (res.status === 200) {
                                message.success("The image/video is uploaded!");
                                this.postForm.resetFields();
                                this.handleCancel();
                                this.props.onShowPost(postType);
                                this.setState({ confirmLoading: false });
                            }
                        })
                        .catch((err) => {
                            console.log("Upload image/video failed: ", err.message);
                            message.error("Failed to upload image/video!");
                            this.setState({ confirmLoading: false });
                        });
                }
            })
            .catch( e => {
                console.log("uploading err -> ", e)
            })


    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    render() {
        const { visible, confirmLoading } = this.state;
        console.log(this.postForm);
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal title="Create New Post"
                       visible={visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <PostForm ref={(refInstance) => (this.postForm = refInstance)} />

                </Modal>
            </div>
        );
    }
}

export default PostButton;