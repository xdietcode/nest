import React, {Component} from 'react';
import { Modal, Button } from 'antd';
import { PostForm } from "./PostForm";

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
                console.log(form)
                // step1: get info about message/image/video

                // step2: check file type: image/video

                // step3: prepare image/video data and send to server
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