import React, { useState, useEffect } from "react";
import {
    Col,
    Row,
    Form,
    Input,
    message,
    Card,
    Spin,
    Upload,
    Button,
    Switch,
    Select,
    Radio,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { getMediaById, updateMedia } from "@/utils/API";
import { BsUpload, BsLink45Deg } from "react-icons/bs";

const { Option } = Select;

interface MediaData {
    _id: string;
    name: string;
    media: 'video' | 'audio';
    type: 'vedicMantra' | 'song' | 'katha';
    file: string;
    url: string;
    isPaid: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const EditMediaForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Form states
    const [name, setName] = useState<string>("");
    const [mediaType, setMediaType] = useState<string>("video");
    const [contentType, setContentType] = useState<string>("vedicMantra");
    const [url, setUrl] = useState<string>("");
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [existingFile, setExistingFile] = useState<string>("");

    // File upload (for audio)
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Fetch existing media data
    useEffect(() => {
        const fetchMediaData = async () => {
            if (!id) return;

            setFetching(true);
            try {
                const response = await getMediaById(id);
                if (response.data.status) {
                    const data: MediaData = response.data.data;

                    setName(data.name || "");
                    setMediaType(data.media || "video");
                    setContentType(data.type || "vedicMantra");
                    setUrl(data.url || "");
                    setIsPaid(data.isPaid || false);
                    setIsActive(data.isActive !== undefined ? data.isActive : true);
                    setExistingFile(data.file || "");

                    // Format existing file for upload component (only for audio)
                    if (data.media === 'audio' && data.file) {
                        const formattedFile = [{
                            uid: 'existing-file',
                            name: data.file.split('/').pop() || 'audio-file',
                            status: 'done' as const,
                            url: data.file,
                            response: data.file,
                        }];
                        setFileList(formattedFile);
                    }
                }

            } catch (error) {
                console.error("Error fetching media:", error);
                message.error("Failed to load media data");
                navigate("/admin/media");
            } finally {
                setFetching(false);
            }
        };

        fetchMediaData();
    }, [id, navigate]);

    const handleSubmit = async () => {
        if (!id) return;

        // Validation based on media type
        if (mediaType === 'video' && !url.trim()) {
            message.error("Please enter video URL");
            return;
        }

        if (mediaType === 'audio' && !existingFile && fileList.length === 0) {
            message.error("Please upload an audio file or keep the existing one");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("media", mediaType);
            formData.append("type", contentType);
            formData.append("isPaid", isPaid.toString());
            formData.append("isActive", isActive.toString());

            if (mediaType === 'video') {
                formData.append("url", url);
            } else if (mediaType === 'audio') {
                // If new file uploaded, append it
                if (fileList[0]?.originFileObj) {
                    formData.append("file", fileList[0].originFileObj as RcFile);
                }

                // If keeping existing file, send its path
                if (existingFile && fileList.length === 0) {
                    formData.append("existingFile", existingFile);
                }
            }

            await updateMedia(id, formData);
            message.success("Media updated successfully");
            navigate("/admin/media");
        } catch (error) {
            console.error("Error updating media:", error);
            message.error("Failed to update media. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setFileList(fileList.slice(-1)); // Only allow one file
    };

    // File type validation for audio
    const beforeUpload = (file: RcFile) => {
        if (mediaType === 'audio') {
            const isAudioFile = file.type.startsWith('audio/');
            if (!isAudioFile) {
                message.error('You can only upload audio files!');
                return Upload.LIST_IGNORE;
            }
        }

        return false; // Prevent auto upload
    };

    // Handle media type change
    const handleMediaTypeChange = (value: string) => {
        setMediaType(value);
        // Clear the other field when switching media types
        if (value === 'video') {
            setFileList([]);
            setExistingFile("");
        } else if (value === 'audio') {
            setUrl("");
        }
    };

    // Content type options
    const contentTypeOptions = [
        { value: 'vedicMantra', label: 'Vedic Mantra' },
        { value: 'song', label: 'Song' },
        { value: 'katha', label: 'Katha' },
    ];

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
                <span className="ml-4">Loading media data...</span>
            </div>
        );
    }

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Edit Media</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to={"/admin/media"}>
                        <button className="flex justify-center !py-2 w-full btn-brand">
                            <FaArrowLeft className="mr-2" />
                            <div className="!mx-2">Back</div>
                        </button>
                    </Link>
                </Col>
            </Row>

            <Form form={form} className="bg-white !border-0" onFinish={handleSubmit}>
                <Card className="!p-1">
                    <Row className="bg-white rounded-md" style={{ marginLeft: 0, marginRight: 0 }}>

                        {/* Basic Information Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Basic Information</h3>
                        </Col>

                        {/* Name */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Name <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: "Please enter media name" }]}
                                        initialValue={name}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={name}
                                            placeholder="Media Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Media Type */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Media Type <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="media"
                                        rules={[{ required: true, message: "Please select media type" }]}
                                        initialValue={mediaType}
                                    >
                                        <Radio.Group
                                            value={mediaType}
                                            onChange={(e) => handleMediaTypeChange(e.target.value)}
                                            className="w-full"
                                        >
                                            <Radio value="video" className="!mb-2 block">
                                                <div className="flex items-center">
                                                    <BsLink45Deg className="mr-2" />
                                                    <span>Video (URL)</span>
                                                </div>
                                            </Radio>
                                            <Radio value="audio" className="!mb-2 block">
                                                <div className="flex items-center">
                                                    <BsUpload className="mr-2" />
                                                    <span>Audio (Upload)</span>
                                                </div>
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Content Type */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Content Type <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="type"
                                        rules={[{ required: true, message: "Please select content type" }]}
                                        initialValue={contentType}
                                    >
                                        <Select
                                            size="large"
                                            className="rounded border"
                                            value={contentType}
                                            onChange={setContentType}
                                            placeholder="Select content type"
                                        >
                                            {contentTypeOptions.map(option => (
                                                <Option key={option.value} value={option.value}>
                                                    {option.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Conditional Fields based on Media Type */}
                        {mediaType === 'video' ? (
                            /* Video URL Field */
                            <Col xs={24} sm={24} md={24}>
                                <Row className="bg-white mb-4">
                                    <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                        <label className="font-bold">
                                            Video URL <span className="text-danger">*</span>
                                        </label>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            name="url"
                                            rules={[{
                                                required: true,
                                                message: "Please enter video URL"
                                            }]}
                                            initialValue={url}
                                        >
                                            <Input
                                                size="large"
                                                className="rounded border"
                                                value={url}
                                                placeholder="https://example.com/video.mp4 or YouTube/embed URL"
                                                onChange={(e) => setUrl(e.target.value)}
                                                prefix={<BsLink45Deg style={{ color: '#a6a6a6' }} />}
                                            />
                                        </Form.Item>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Enter direct video URL or embed URL (YouTube, Vimeo, etc.)
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ) : (
                            /* Audio Upload Field */
                            <Col xs={24} sm={24} md={24}>
                                <Row className="bg-white mb-4">
                                    <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                        <label className="font-bold">
                                            Audio File <span className="text-danger">*</span>
                                        </label>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Form.Item
                                            name="file"
                                            rules={[{
                                                required: !existingFile,
                                                message: "Please upload an audio file or keep the existing one"
                                            }]}
                                        >
                                            <Upload
                                                name="file"
                                                listType="picture-card"
                                                fileList={fileList}
                                                beforeUpload={beforeUpload}
                                                onChange={handleFileUpload}
                                                onRemove={() => {
                                                    setFileList([]);
                                                    setExistingFile("");
                                                }}
                                                maxCount={1}
                                                accept="audio/*"
                                            >
                                                {fileList.length < 1 && (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <BsUpload style={{ fontSize: "24px", marginBottom: "8px" }} />
                                                        <div className="text-sm">Upload Audio</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Supports: MP3, WAV, M4A, OGG
                                                        </div>
                                                    </div>
                                                )}
                                            </Upload>

                                            {existingFile && fileList.length === 0 && (
                                                <div className="mt-4">
                                                    <p className="text-sm text-gray-600 mb-2">Current Audio File:</p>
                                                    <div className="p-3 bg-gray-50 rounded border">
                                                        <div className="flex items-center justify-between">
                                                            <span className="truncate max-w-[200px]">
                                                                {existingFile.split('/').pop()}
                                                            </span>
                                                            <Button
                                                                type="link"
                                                                danger
                                                                size="small"
                                                                onClick={() => setExistingFile("")}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <div className="mt-2">
                                                            <audio
                                                                controls
                                                                className="w-full"
                                                            >
                                                                <source src={existingFile} type="audio/mpeg" />
                                                                Your browser does not support the audio element.
                                                            </audio>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        )}

                        {/* Status Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Settings</h3>
                        </Col>

                        {/* Payment Status */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Payment Status
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <div className="flex items-center justify-between">
                                        <span>Paid Content</span>
                                        <Switch checked={isPaid} onChange={setIsPaid} />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {isPaid
                                            ? "This media will require payment to access"
                                            : "This media will be freely accessible"}
                                    </p>
                                </Col>
                            </Row>
                        </Col>

                        {/* Active Status */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Active Status
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <div className="flex items-center justify-between">
                                        <span>Active</span>
                                        <Switch checked={isActive} onChange={setIsActive} />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {isActive
                                            ? "This media will be visible to users"
                                            : "This media will be hidden from users"}
                                    </p>
                                </Col>
                            </Row>
                        </Col>

                        {/* Submit Button */}
                        <Col span={24} className="buttons mt-6">
                            <button
                                disabled={loading}
                                className={`btn-brand !py-2 !px-3 cursor-pointer ${loading && '!bg-gray-800'}`}
                                type="submit"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spin size="small" />
                                        <span className="!ml-2">Updating Media...</span>
                                    </div>
                                ) : (
                                    "Update Media"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default EditMediaForm;