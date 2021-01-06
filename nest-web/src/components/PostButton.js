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
                <Modal title="create-new-post"
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