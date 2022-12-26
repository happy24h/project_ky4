import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const AddAccount = ({ setLoadApi, loadApi }) => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    // const onFormLayoutChange = ({ disabled }) => {
    //     setComponentDisabled(disabled);
    // };
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                // onValuesChange={onFormLayoutChange}
                // disabled={componentDisabled}
            >
                <Form.Item label="Radio">
                    <Radio.Group>
                        <Radio value="MALE"> Nam </Radio>
                        <Radio value="FEMALE"> Nữ </Radio>
                        <Radio value="OTHER"> Khác </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <AddAccount />;
