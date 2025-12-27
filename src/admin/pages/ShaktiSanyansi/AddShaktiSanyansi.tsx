import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Card,
    Row,
    Col,
    message,
    Upload,
    Switch,
    Space,
    Tag,
    Spin,
} from "antd";
import {
    FaPlus,
    FaMinus,
    FaArrowLeft,
    FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createShaktiSanyansi } from "@/utils/API";
import type { UploadFile } from 'antd/es/upload/interface';
import { BsUpload } from "react-icons/bs";
import type { UploadChangeParam } from "antd/lib/upload/interface";

const { TextArea } = Input;

interface PracticeItem {
    title: string;
    description: string[];
}

const AddShaktiSanyansi: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [teachingInput, setTeachingInput] = useState<string>("");
    const [teachingItems, setTeachingItems] = useState<string[]>([]);
    const [practiceItems, setPracticeItems] = useState<PracticeItem[]>([{ title: "", description: [""] }]);
    const navigate = useNavigate();

    // const beforeUpload = (file: RcFile) => {
    //     const isImage = file.type.startsWith('image/');
    //     if (!isImage) {
    //         message.error('You can only upload image files!');
    //         return Upload.LIST_IGNORE;
    //     }

    //     const isLt5M = file.size / 1024 / 1024 < 5;
    //     if (!isLt5M) {
    //         message.error('Image must be smaller than 5MB!');
    //         return Upload.LIST_IGNORE;
    //     }

    //     // Convert to UploadFile
    //     const uploadFile: UploadFile = {
    //         uid: file.uid,
    //         name: file.name,
    //         status: 'done',
    //         url: URL.createObjectURL(file),
    //         originFileObj: file,
    //     };

    //     setFileList([uploadFile]);
    //     return false; // Prevent auto upload
    // };

    // const handleRemove = () => {
    //     setFileList([]);
    // };
    const handleImage = ({ fileList }: UploadChangeParam<UploadFile>) => {
        // setFileList(fileList);
        setFileList(fileList.slice(-1));
    };

    const handleAddTeaching = () => {
        if (teachingInput.trim()) {
            setTeachingItems([...teachingItems, teachingInput.trim()]);
            setTeachingInput("");
        }
    };

    const handleRemoveTeaching = (index: number) => {
        const newItems = [...teachingItems];
        newItems.splice(index, 1);
        setTeachingItems(newItems);
    };

    const handleAddPractice = () => {
        setPracticeItems([...practiceItems, { title: "", description: [""] }]);
    };

    const handleRemovePractice = (index: number) => {
        if (practiceItems.length > 1) {
            const newItems = [...practiceItems];
            newItems.splice(index, 1);
            setPracticeItems(newItems);
        }
    };

    const handlePracticeTitleChange = (index: number, value: string) => {
        const newItems = [...practiceItems];
        newItems[index].title = value;
        setPracticeItems(newItems);
    };

    const handleAddPracticeDescription = (practiceIndex: number) => {
        const newItems = [...practiceItems];
        newItems[practiceIndex].description.push("");
        setPracticeItems(newItems);
    };

    const handleRemovePracticeDescription = (practiceIndex: number, descIndex: number) => {
        const newItems = [...practiceItems];
        if (newItems[practiceIndex].description.length > 1) {
            newItems[practiceIndex].description.splice(descIndex, 1);
            setPracticeItems(newItems);
        }
    };

    const handlePracticeDescriptionChange = (practiceIndex: number, descIndex: number, value: string) => {
        const newItems = [...practiceItems];
        newItems[practiceIndex].description[descIndex] = value;
        setPracticeItems(newItems);
    };

    const onFinish = async (values: any) => {
        // console.log("values", values);
        // if (!fileList[0]?.originFileObj) {
        //     message.error('Please upload an image');
        //     return;
        // }

        if (teachingItems.length === 0) {
            message.error('Please add at least one teaching');
            return;
        }

        // Validate practice items
        for (const practice of practiceItems) {
            if (!practice.title.trim()) {
                message.error('All practice items must have a title');
                return;
            }
            for (const desc of practice.description) {
                if (!desc.trim()) {
                    message.error('All practice descriptions must be filled');
                    return;
                }
            }
        }

        setLoading(true);
        console.log("values", values);
        const formData = new FormData();
        formData.append('name', values.name.trim());
        formData.append('subTitle', values.subTitle?.trim() || '');
        formData.append('quote', values.quote?.trim() || '');
        formData.append('description', values.description.trim());
        formData.append('teaching', JSON.stringify(teachingItems));
        formData.append('practice', JSON.stringify(practiceItems));
        formData.append('isActive', values.isActive || false);

        if (fileList[0]?.originFileObj) {
            formData.append('image', fileList[0].originFileObj);
        }

        try {
            const response = await createShaktiSanyansi(formData);
            if (response.data.status) {
                message.success('Shakti Sanyansi created successfully');
                navigate('/admin/shakti-sanyansi');
            } else {
                message.error(response.data.message || 'Failed to create Shakti Sanyansi');
            }
        } catch (error: any) {
            console.error('Error creating Shakti Sanyansi:', error);
            message.error(error.response?.data?.message || 'Failed to create Shakti Sanyansi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <Row className="mb-4" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Add Shakti Sanyansi</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to="/admin/shakti-sanyansi">
                        <Button icon={<FaArrowLeft />} className="flex items-center">
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Card className="mb-4">
                    <h3 className="text-lg font-bold mb-4">Basic Information</h3>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    { required: true, message: 'Please enter name' },
                                    { min: 3, message: 'Name must be at least 3 characters' },
                                ]}
                            >
                                <Input placeholder="Enter name" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Sub Title"
                                name="subTitle"
                            >
                                <Input placeholder="Enter sub title" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Quote"
                                name="quote"
                            >
                                <Input placeholder="Enter quote" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    { required: true, message: 'Please enter description' },
                                    { min: 50, message: 'Description must be at least 50 characters' },
                                ]}
                            >
                                <TextArea
                                    rows={6}
                                    placeholder="Enter detailed description..."
                                    maxLength={2000}
                                    showCount
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card className="mb-4">
                    <h3 className="text-lg font-bold mb-4">Image Upload</h3>
                    <Form.Item
                        label="Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e: UploadChangeParam<UploadFile>) =>
                            Array.isArray(e) ? e : e?.fileList
                        }
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!value || value.length === 0) {
                                        return Promise.reject(new Error('Please upload an image'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Upload
                            name="image"
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleImage}
                            maxCount={1}
                            accept=".png,.jpg,.jpeg"
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <BsUpload style={{ fontSize: "20px" }} />
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Card>

                <Card className="mb-4">
                    <h3 className="text-lg font-bold mb-4">Teachings</h3>
                    <div className="mb-4">
                        <Space.Compact style={{ width: '100%' }}>
                            <Input
                                value={teachingInput}
                                onChange={(e) => setTeachingInput(e.target.value)}
                                placeholder="Enter a teaching point"
                                size="large"
                                onPressEnter={handleAddTeaching}
                            />
                            <Button
                                type="primary"
                                onClick={handleAddTeaching}
                                size="large"
                                icon={<FaPlus />}
                            >
                                Add
                            </Button>
                        </Space.Compact>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {teachingItems.map((item, index) => (
                            <Tag
                                key={index}
                                closable
                                onClose={() => handleRemoveTeaching(index)}
                                className="py-1 px-3 text-base"
                                color="blue"
                            >
                                {item}
                            </Tag>
                        ))}
                    </div>

                    {teachingItems.length === 0 && (
                        <div className="text-center text-gray-400 py-4">
                            No teachings added yet. Add some teachings above.
                        </div>
                    )}
                </Card>

                <Card className="mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Practices</h3>
                        <Button
                            type="dashed"
                            onClick={handleAddPractice}
                            icon={<FaPlus />}
                        >
                            Add Practice
                        </Button>
                    </div>

                    {practiceItems.map((practice, practiceIndex) => (
                        <Card
                            key={practiceIndex}
                            className="mb-4 border border-gray-200"
                            title={
                                <div className="flex justify-between items-center">
                                    <span>Practice #{practiceIndex + 1}</span>
                                    {practiceItems.length > 1 && (
                                        <Button
                                            type="text"
                                            danger
                                            icon={<FaTimes />}
                                            onClick={() => handleRemovePractice(practiceIndex)}
                                        />
                                    )}
                                </div>
                            }
                        >
                            <Form.Item
                                label="Practice Title"
                                required
                            >
                                <Input
                                    value={practice.title}
                                    onChange={(e) => handlePracticeTitleChange(practiceIndex, e.target.value)}
                                    placeholder="Enter practice title"
                                    className="mb-4"
                                />
                            </Form.Item>

                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="font-medium">Descriptions</label>
                                    <Button
                                        type="dashed"
                                        size="small"
                                        onClick={() => handleAddPracticeDescription(practiceIndex)}
                                        icon={<FaPlus />}
                                    >
                                        Add Description
                                    </Button>
                                </div>

                                {practice.description.map((desc, descIndex) => (
                                    <div key={descIndex} className="flex items-center mb-2">
                                        <Input.TextArea
                                            value={desc}
                                            onChange={(e) => handlePracticeDescriptionChange(practiceIndex, descIndex, e.target.value)}
                                            placeholder={`Description ${descIndex + 1}`}
                                            rows={2}
                                            className="flex-1 mr-2"
                                        />
                                        {practice.description.length > 1 && (
                                            <Button
                                                type="text"
                                                danger
                                                icon={<FaMinus />}
                                                onClick={() => handleRemovePracticeDescription(practiceIndex, descIndex)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </Card>

                <Card className="mb-4">
                    <h3 className="text-lg font-bold mb-4">Settings</h3>
                    <Form.Item
                        label="Active Status"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <div className="text-sm text-gray-500">
                        When active, this Shakti Sanyansi will be visible on the frontend
                    </div>
                </Card>

                <div className="flex justify-start gap-4 m-10">
                    <Link to="/admin/shakti-sanyansi">
                        <Button>Cancel</Button>
                    </Link>
                    <Button
                        type="primary"
                        // onClick={onFinish}
                        htmlType="submit"
                        loading={loading}
                        size="large"
                    >
                        {loading ? <Spin size="small" /> : 'Create Shakti Sanyansi'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddShaktiSanyansi;