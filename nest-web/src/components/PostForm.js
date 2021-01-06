import React, { forwardRef }from 'react';
import { Form, Upload, Input } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};



export const PostForm = forwardRef( (props, formRef) => {
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    return (
        <Form name="validate_other"
              ref={formRef}
              {...formItemLayout}>
            <Form.Item
                name="description"
                label="Message"
                rules={[
                    {
                        required: true,
                        message: "Please input your E-mail!"
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Dragger">
                <Form.Item
                    name="uploadPost"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "Please select an image/video!"
                        }
                    ]}
                >
                    <Upload.Dragger name="files" beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </Form>
    );
})

