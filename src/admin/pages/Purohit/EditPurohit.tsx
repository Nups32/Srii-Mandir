import React, { useState, useEffect } from "react";
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
    Image,
} from "antd";
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";
import { getPurohitById, updatePurohit } from "@/utils/API";

const { Dragger } = Upload;

interface UploadFileType extends UploadFile {
    url?: string;
}


interface PurohitData {
    _id: string;
    name: string;
    experience: string;
    location: string;
    image: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const EditPurohitForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Form states
    const [name, setName] = useState<string>("");
    const [experience, setExperience] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [orderIndex, setOrderIndex] = useState<number>(1);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [existingImage, setExistingImage] = useState<string>("");
    const [newFile, setNewFile] = useState<UploadFileType | null>(null);
    // const [uploading, setUploading] = useState<boolean>(false);

    // Fetch existing purohit data
    useEffect(() => {
        const fetchPurohitData = async () => {
            if (!id) return;

            setFetching(true);
            try {
                const response = await getPurohitById(id);
                if (response.data.status) {
                    const data: PurohitData = response.data.data;

                    setName(data.name || "");
                    setExperience(data.experience || "");
                    setLocation(data.location || "");
                    setOrderIndex(data.orderIndex || 1);
                    setIsActive(data.isActive !== undefined ? data.isActive : true);
                    setExistingImage(data.image || "");
                } else {
                    message.error("Failed to load purohit data");
                    navigate("/admin/purohit");
                }
            } catch (error) {
                console.error("Error fetching purohit:", error);
                message.error("Failed to load purohit data");
                navigate("/admin/purohit");
            } finally {
                setFetching(false);
            }
        };

        fetchPurohitData();
    }, [id, navigate]);

    const handleSubmit = async () => {
        if (!id) return;

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

        setLoading(true);
        try {
            const formData = new FormData();

            // Add text fields
            formData.append("name", name);
            formData.append("experience", experience);
            formData.append("location", location);
            formData.append("orderIndex", orderIndex.toString());
            formData.append("isActive", isActive.toString());

            // Add new image file if provided
            if (newFile?.originFileObj) {
                formData.append("image", newFile.originFileObj);
            }

            // Add removeImage flag if existing image should be removed
            if (existingImage && newFile) {
                formData.append("removeExistingImage", "true");
            }

            const res = await updatePurohit(id, formData);
            if (res.data.status) {
                message.success("Purohit updated successfully");
                navigate("/admin/purohit");
            } else {
                message.error(res.data.message || "Server Error");
            }
        } catch (error: any) {
            console.error("Error updating purohit:", error);
            message.error(
                error.response?.data?.message ||
                "Failed to update purohit. Please try again."
            );
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
        newFile,
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

            setNewFile(newFileItem);
            return false; // Prevent automatic upload
        },
        onRemove: () => {
            setNewFile(null);
        },
    };

    const handleClearNewImage = () => {
        setNewFile(null);
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
                <span className="ml-4">Loading purohit data...</span>
            </div>
        );
    }

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Edit Purohit</h2>
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
                                </Col>
                            </Row>
                        </Col>

                        {/* Current Image */}
                        {existingImage && !newFile && (
                            <Col xs={24} sm={24} md={24}>
                                <Row className="bg-white mb-4">
                                    <Col
                                        xs={24}
                                        sm={24}
                                        md={4}
                                        className="flex justify-start mr-4 bg-white"
                                    >
                                        <label className="font-bold">Current Image</label>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={`${import.meta.env.VITE_APP_Image_URL}/purohit/${existingImage}`}
                                                    alt="Current purohit"
                                                    className="rounded-lg object-cover"
                                                    fallback="https://via.placeholder.com/100"
                                                />
                                                <div>
                                                    <div className="font-medium">Current Image</div>
                                                    <div className="text-sm text-gray-500">
                                                        Uploaded previously
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        )}

                        {/* Upload New Image */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col
                                    xs={24}
                                    sm={24}
                                    md={4}
                                    className="flex justify-start mr-4 bg-white"
                                >
                                    <label className="font-bold">
                                        {existingImage && !newFile ? "Change Image" : "Upload Image"}
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="newImage"
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => {
                                            if (Array.isArray(e)) {
                                                return e;
                                            }
                                            return e && e.fileList;
                                        }}
                                    >
                                        <div className="space-y-4">
                                            {newFile ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={URL.createObjectURL(newFile.originFileObj as any)}
                                                            alt="New preview"
                                                            className="w-32 h-32 object-cover rounded-lg"
                                                        />
                                                        <div>
                                                            <div className="font-medium">{newFile.name}</div>
                                                            <div className="text-sm text-gray-500">
                                                                {(newFile.originFileObj as any)?.size
                                                                    ? `${Math.round((newFile.originFileObj as any).size / 1024)} KB`
                                                                    : "Size unknown"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <Button
                                                            type="link"
                                                            danger
                                                            icon={<FaTrash />}
                                                            onClick={handleClearNewImage}
                                                        >
                                                            Remove New Image
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Dragger {...uploadProps}>
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">
                                                        Click or drag image to upload
                                                    </p>
                                                    <p className="ant-upload-hint">
                                                        {existingImage
                                                            ? "Upload a new image to replace the current one"
                                                            : "Upload a purohit image"}
                                                    </p>
                                                </Dragger>
                                            )}
                                        </div>
                                    </Form.Item>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {existingImage && !newFile
                                            ? "Upload a new image to replace the current one. Leave empty to keep current image."
                                            : "Recommended: Square image, maximum 5MB"}
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
                                            {loading ? "Uploading..." : "Updating Purohit..."}
                                        </span>
                                    </div>
                                ) : (
                                    "Update Purohit"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default EditPurohitForm;