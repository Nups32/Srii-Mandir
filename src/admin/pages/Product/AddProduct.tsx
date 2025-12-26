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
    Select,
    Upload,
    Button,
} from "antd";
import type { UploadFile } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";
import { createProduct } from "@/utils/API";
import ReactQuill from "react-quill";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const { Dragger } = Upload;

interface UploadFileType extends UploadFile {
    url?: string;
}

const AddProductForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Form states
    const [name, setName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState<string>("puja");
    const [isActive, setIsActive] = useState<boolean>(true);
    const [fileList, setFileList] = useState<UploadFileType[]>([]);
    // const [uploading, setUploading] = useState<boolean>(false);

    // // Handle image upload
    // const handleImageUpload = async (file: File) => {
    //     // In a real app, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    //     // For demo, we'll simulate upload and use a mock URL
    //     return new Promise<string>((resolve) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             // Simulate upload delay
    //             setTimeout(() => {
    //                 resolve(reader.result as string);
    //             }, 1000);
    //         };
    //     });
    // };

    const handleSubmit = async () => {
        // Validate required fields
        if (!name.trim()) {
            message.error("Please enter product name");
            return;
        }

        if (price <= 0) {
            message.error("Please enter a valid price");
            return;
        }

        if (!category) {
            message.error("Please select a category");
            return;
        }

        // Validate images
        if (fileList.length === 0) {
            message.error("Please upload at least one product image");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();

            // Add text fields
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price.toString());
            formData.append("category", category);
            formData.append("isActive", isActive.toString());

            // Add image files
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append("images", file.originFileObj);
                }
            });

            const res = await createProduct(formData);
            if (res.data.status) {
                message.success("Product created successfully");
                navigate("/admin/product");
            } else {
                message.error(res.data.message || "Server Error");
            }
        } catch (error: any) {
            console.error("Error creating product:", error);
            message.error(error.response?.data?.message || "Failed to create product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getCategoryOptions = () => {
        return [
            { value: "puja", label: "Puja Items" },
            { value: "yantra", label: "Yantra" },
            { value: "rudraksha", label: "Rudraksha" },
            { value: "idol", label: "Idol" },
            { value: "book", label: "Books" },
            { value: "spiritual-kit", label: "Spiritual Kits" },
            { value: "dhan-basra-potli", label: "Dhan Basra Potli" },
        ];
    };

    const handleClearImages = () => {
        setFileList([]);
    };

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Add New Product</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to={"/admin/product"}>
                        <button className="flex justify-center py-2! w-full btn-brand">
                            <FaArrowLeft className="mr-2" />
                            <div className="mx-2!">Back</div>
                        </button>
                    </Link>
                </Col>
            </Row>

            <Form form={form} className="bg-white border-0!" onFinish={handleSubmit}>
                <Card className="p-1!">
                    <Row
                        className="bg-white rounded-md"
                        style={{ marginLeft: 0, marginRight: 0 }}
                    >
                        {/* Product Information */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">
                                Product Information
                            </h3>
                        </Col>

                        {/* Product Name */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Product Name <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            { required: true, message: "Please enter product name" },
                                            { min: 3, message: "Name must be at least 3 characters" },
                                            { max: 100, message: "Name must not exceed 100 characters" },
                                        ]}
                                        initialValue={name}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={name}
                                            placeholder="Enter product name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Enter a descriptive name for your product
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Category */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Category <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="category"
                                        rules={[
                                            { required: true, message: "Please select a category" },
                                        ]}
                                        initialValue={category}
                                    >
                                        <Select
                                            size="large"
                                            className="rounded border"
                                            placeholder="Select category"
                                            value={category}
                                            onChange={setCategory}
                                        >
                                            {getCategoryOptions().map((option) => (
                                                <Option key={option.value} value={option.value}>
                                                    {option.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Select the appropriate category for your product
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* About */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">About</label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="About"
                                        rules={[
                                            { max: 1000, message: "About must not exceed 1000 characters" },
                                        ]}
                                        initialValue={about}
                                    >
                                        {/* <ReactQuill
                                                                    theme="snow"
                                                                    value={description}
                                                                    style={{ height: "200px" }}
                                                                    onChange={setDescription}
                                                                    placeholder="Detailed description about the puja"
                                                                /> */}
                                        <TextArea
                                            rows={6}
                                            className="rounded border"
                                            value={about}
                                            placeholder="About product"
                                            onChange={(e) => setAbout(e.target.value)}
                                            maxLength={1000}
                                            showCount
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Price */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        Price (₹) <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="price"
                                        rules={[
                                            { required: true, message: "Please enter product price" },
                                            {
                                                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                message: "Please enter a valid price",
                                            },
                                            {
                                                validator: (_, value) =>
                                                    value > 0
                                                        ? Promise.resolve()
                                                        : Promise.reject(new Error("Price must be greater than 0")),
                                            },
                                        ]}
                                        initialValue={price}
                                    >
                                        <Input
                                            type="number"
                                            size="large"
                                            className="rounded border"
                                            value={price}
                                            placeholder="Enter price in INR"
                                            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                                            min={0}
                                            step={0.01}
                                        />
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Enter the selling price in Indian Rupees
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Description */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">Description</label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="description"
                                        rules={[
                                            { max: 1000, message: "Description must not exceed 1000 characters" },
                                        ]}
                                        initialValue={description}
                                    >
                                        <ReactQuill
                                            theme="snow"
                                            value={description}
                                            style={{ height: "200px" }}
                                            onChange={setDescription}

                                            placeholder="Describe your product features, benefits, and specifications..."
                                        />
                                        {/* <TextArea
                                            rows={6}
                                            className="rounded border"
                                            value={description}
                                            placeholder="Describe your product features, benefits, and specifications..."
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={1000}
                                            showCount
                                        /> */}
                                    </Form.Item>
                                    {/* <div className="text-xs text-gray-500 mt-1">
                                        Provide detailed information about your product
                                    </div> */}
                                </Col>
                            </Row>
                        </Col>

                        {/* Product Images */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4 mt-5">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">Product Images</label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="images"
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => {
                                            if (Array.isArray(e)) {
                                                return e;
                                            }
                                            return e && e.fileList;
                                        }}
                                    >
                                        <div className="space-y-4">
                                            <Dragger
                                                name="images"
                                                multiple={true}
                                                accept="image/*"
                                                fileList={fileList}
                                                beforeUpload={(_file) => {
                                                    // Prevent automatic upload
                                                    return false;
                                                }}
                                                onChange={(info) => {
                                                    setFileList(info.fileList);
                                                }}
                                                onRemove={(file) => {
                                                    const index = fileList.findIndex(f => f.uid === file.uid);
                                                    const newFileList = fileList.slice();
                                                    newFileList.splice(index, 1);
                                                    setFileList(newFileList);
                                                }}
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">
                                                    Click or drag images to this area to upload
                                                </p>
                                                <p className="ant-upload-hint">
                                                    Support for single or bulk upload. Maximum 5MB per image.
                                                    Recommended: JPG, PNG, WebP format
                                                </p>
                                            </Dragger>

                                            {fileList.length > 0 && (
                                                <div className="flex justify-end">
                                                    <Button
                                                        type="link"
                                                        danger
                                                        icon={<FaTrash />}
                                                        onClick={handleClearImages}
                                                    >
                                                        Clear All Images
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Upload clear, high-quality images of your product. First image will be used as thumbnail.
                                        Maximum 10 images per product.
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
                                        <span>Product Active</span>
                                        <Switch checked={isActive} onChange={setIsActive} />
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {isActive
                                            ? "This product will be visible to customers"
                                            : "This product will be hidden from customers"}
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Submit Button */}
                        <Col span={24} className="buttons mt-6">
                            <button
                                disabled={loading}
                                className={`bg-blue-500 hover:bg-blue-700 text-white! font-bold py-2 px-4 rounded ${loading && 'bg-gray-800!'}`}
                                type="submit"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spin size="small" />
                                        <span className="ml-2!">
                                            {loading ? "Uploading Images..." : "Creating Product..."}
                                        </span>
                                    </div>
                                ) : (
                                    "Create Product"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default AddProductForm;