import React, { useState } from "react";
import {
    Col,
    Row,
    Form,
    Input,
    message,
    Card,
    Spin,
    Switch,
    InputNumber,
    Upload,
    Button,
} from "antd";
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import {  InboxOutlined } from "@ant-design/icons";
import { createPurohit } from "@/utils/API";

const { Dragger } = Upload;

interface UploadFileType extends UploadFile {
    url?: string;
}

const AddPurohitForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Form states
    const [name, setName] = useState<string>("");
    const [experience, setExperience] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [orderIndex, setOrderIndex] = useState<number>(1);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [fileList, setFileList] = useState<UploadFileType[]>([]);
    // const [uploading, setUploading] = useState<boolean>(false);

    const handleSubmit = async () => {
        // Validate required fields
        if (!name.trim()) {
            message.error("Please enter purohit name");
            return;
        }

        if (!experience.trim()) {
            message.error("Please enter experience details");
            return;
        }

        if (!location.trim()) {
            message.error("Please enter location");
            return;
        }

        if (orderIndex <= 0) {
            message.error("Please enter a valid order index (minimum 1)");
            return;
        }

        // Validate image
        if (fileList.length === 0) {
            message.error("Please upload a purohit image");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();

            // Add text fields
            formData.append("name", name);
            formData.append("experience", experience);
            formData.append("location", location);
            formData.append("orderIndex", orderIndex.toString());
            formData.append("isActive", isActive.toString());

            // Add image file
            if (fileList[0]?.originFileObj) {
                formData.append("image", fileList[0].originFileObj);
            }

            const res = await createPurohit(formData);
            if (res.data.status) {
                message.success("Purohit created successfully");
                navigate("/admin/purohit");
            } else {
                message.error(res.data.message || "Server Error");
            }
        } catch (error: any) {
            console.error("Error creating purohit:", error);
            message.error(error.response?.data?.message || "Failed to create purohit. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Upload props
    const uploadProps = {
        name: "image",
        accept: "image/*",
        listType: "picture-card" as const,
        maxCount: 1,
        fileList,
        beforeUpload: (file: RcFile) => {
            // Validate file type
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                message.error("You can only upload image files!");
                return Upload.LIST_IGNORE;
            }

            // Validate file size (max 5MB)
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error("Image must be smaller than 5MB!");
                return Upload.LIST_IGNORE;
            }

            // Create proper UploadFile object
            const newFileItem: UploadFileType = {
                uid: `${Date.now()}-${file.name}`,
                name: file.name,
                status: "done" as const,
                originFileObj: file,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
            };

            setFileList([newFileItem]);
            return false; // Prevent automatic upload
        },
        onRemove: () => {
            setFileList([]);
        },
    };

    const handleClearImage = () => {
        setFileList([]);
    };

    // const getNextOrderIndex = async () => {
    //     // In a real app, you would fetch the highest orderIndex from API
    //     // For now, we'll set it based on current form state
    //     return orderIndex;
    // };

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Add New Purohit</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to={"/admin/purohit"}>
                        <button className="flex justify-center py-2! w-full btn-brand">
                            <FaArrowLeft className="mr-2" />
                            <div className="mx-2!">Back</div>
                        </button>
                    </Link>
                </Col>
            </Row>

            <Form form={form} className="bg-white border-0!" onFinish={handleSubmit}>
                <Card className="p-1!">
                    <Row className="bg-white rounded-md" style={{ marginLeft: 0, marginRight: 0 }}>

                        {/* Purohit Information */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">
                                Purohit Information
                            </h3>
                        </Col>

                        {/* Name */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Name <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            { required: true, message: "Please enter purohit name" },
                                            { min: 2, message: "Name must be at least 2 characters" },
                                            { max: 100, message: "Name must not exceed 100 characters" },
                                        ]}
                                        initialValue={name}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={name}
                                            placeholder="Enter purohit name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Enter the full name of the purohit
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Experience */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Experience <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="experience"
                                        rules={[
                                            { required: true, message: "Please enter experience details" },
                                            { min: 5, message: "Experience details must be at least 5 characters" },
                                            { max: 500, message: "Experience must not exceed 500 characters" },
                                        ]}
                                        initialValue={experience}
                                    >
                                        <Input.TextArea
                                            rows={4}
                                            className="rounded border"
                                            value={experience}
                                            placeholder="e.g., 15 years of experience in Vedic rituals, specializes in marriage ceremonies"
                                            onChange={(e) => setExperience(e.target.value)}
                                            maxLength={500}
                                            showCount
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Describe the purohit's experience, specialization, and expertise
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Location */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Location <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="location"
                                        rules={[
                                            { required: true, message: "Please enter location" },
                                            { min: 2, message: "Location must be at least 2 characters" },
                                            { max: 100, message: "Location must not exceed 100 characters" },
                                        ]}
                                        initialValue={location}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={location}
                                            placeholder="e.g., Varanasi, Uttar Pradesh"
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Enter the city and state where the purohit is based
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Order Index */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Display Order <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="orderIndex"
                                        rules={[
                                            { required: true, message: "Please enter display order" },
                                            { type: 'number', min: 1, message: 'Order must be at least 1' },
                                        ]}
                                        initialValue={orderIndex}
                                    >
                                        <InputNumber
                                            size="large"
                                            className="rounded border w-full"
                                            value={orderIndex}
                                            min={1}
                                            onChange={(value) => setOrderIndex(value || 1)}
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Determines the display position. Lower numbers appear first.
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Purohit Image */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Purohit Image <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="image"
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => {
                                            if (Array.isArray(e)) {
                                                return e;
                                            }
                                            return e && e.fileList;
                                        }}
                                    >
                                        <div className="space-y-4">
                                            {fileList.length === 0 ? (
                                                <Dragger {...uploadProps}>
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">
                                                        Click or drag image to upload
                                                    </p>
                                                    <p className="ant-upload-hint">
                                                        Recommended: Square image, maximum 5MB
                                                    </p>
                                                </Dragger>
                                            ) : (
                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={URL.createObjectURL(fileList[0].originFileObj as any)}
                                                            alt="Preview"
                                                            className="w-32 h-32 object-cover rounded-lg"
                                                        />
                                                        <div>
                                                            <div className="font-medium">{fileList[0].name}</div>
                                                            <div className="text-sm text-gray-500">
                                                                {(fileList[0].originFileObj as any)?.size
                                                                    ? `${Math.round((fileList[0].originFileObj as any).size / 1024)} KB`
                                                                    : "Size unknown"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <Button
                                                            type="link"
                                                            danger
                                                            icon={<FaTrash />}
                                                            onClick={handleClearImage}
                                                        >
                                                            Remove Image
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Upload a clear, professional photo of the purohit. Recommended size: 500x500 pixels.
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Settings Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Settings</h3>
                        </Col>

                        {/* Active Status */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">Status</label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <div className="flex items-center justify-between">
                                        <span>Purohit Active</span>
                                        <Switch checked={isActive} onChange={setIsActive} />
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {isActive
                                            ? "This purohit will be visible to visitors"
                                            : "This purohit will be hidden from visitors"}
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Submit Button */}
                        <Col span={24} className="buttons mt-6">
                            <button
                                disabled={loading}
                                className={`btn-brand !py-2 !px-3 cursor-pointer ${(loading) && "!bg-gray-800"
                                    }`}
                                type="submit"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spin size="small" />
                                        <span className="!ml-2">
                                            {loading ? "Uploading Image..." : "Creating Purohit..."}
                                        </span>
                                    </div>
                                ) : (
                                    "Create Purohit"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default AddPurohitForm;