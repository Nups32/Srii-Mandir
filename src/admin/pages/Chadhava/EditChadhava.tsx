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
    InputNumber,
    Space,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { getChadhavaById, updateChadhava } from "@/utils/API";
import { BsUpload } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

interface DetailItem {
    question: string;
    answer: string;
    _id?: string;
}

interface OfferingItem {
    name: string;
    description: string;
    image: string;
    price: number;
    isSpecialCombo: boolean;
    isPrasadForHome: boolean;
    _id?: string;
    fileList: UploadFile[];
    existingImage?: string;
}

interface ChadhavaData {
    _id: string;
    title: string;
    name: string;
    about: string;
    details: DetailItem[];
    offering: OfferingItem[];
    time: string;
    btnText: string;
    images: string[];
    slug: string;
    isUpcoming: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const EditChadhavaForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Basic Information
    const [title, setTitle] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [btnText, setBtnText] = useState<string>("");

    // Details Array
    const [details, setDetails] = useState<DetailItem[]>([{ question: "", answer: "" }]);

    // Offering Array
    const [offerings, setOfferings] = useState<OfferingItem[]>([
        {
            name: "",
            description: "",
            image: "",
            price: 0,
            isSpecialCombo: false,
            isPrasadForHome: false,
            fileList: [],
            existingImage: ""
        }
    ]);

    // Images
    const [imageList, setImageList] = useState<UploadFile[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);

    // Status
    const [isUpcoming, setIsUpcoming] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(true);

    // Fetch existing chadhava data
    useEffect(() => {
        const fetchChadhavaData = async () => {
            if (!id) return;

            setFetching(true);
            try {
                const response = await getChadhavaById(id);
                if (response.data.status) {
                    const data: ChadhavaData = response.data.data;

                    // Set basic information
                    setTitle(data.title || "");
                    setName(data.name || "");
                    setAbout(data.about || "");
                    setTime(data.time || "");
                    setBtnText(data.btnText || "");

                    // Set details
                    setDetails(data.details?.length > 0 ? data.details : [{ question: "", answer: "" }]);

                    // Set offerings with existing images
                    const offeringsWithFiles = data.offering?.map(offering => ({
                        ...offering,
                        fileList: [],
                        existingImage: offering.image || ""
                    })) || [{
                        name: "",
                        description: "",
                        image: "",
                        price: 0,
                        isSpecialCombo: false,
                        isPrasadForHome: false,
                        fileList: [],
                        existingImage: ""
                    }];
                    setOfferings(offeringsWithFiles);

                    // Set images
                    setExistingImages(data.images || []);

                    // Set status
                    setIsUpcoming(data.isUpcoming || false);
                    setIsActive(data.isActive !== undefined ? data.isActive : true);

                    // Format existing images for upload component
                    const formattedImageList = (data.images || []).map((img, index) => ({
                        uid: `existing-${index}`,
                        name: `image-${index}.jpg`,
                        status: 'done' as const,
                        url: `${import.meta.env.VITE_APP_Image_URL}/chadhava/${img}`,
                        response: `${import.meta.env.VITE_APP_Image_URL}/chadhava/${img}`,
                        imageName: img,
                    }));
                    setImageList(formattedImageList);
                }

            } catch (error) {
                console.error("Error fetching chadhava:", error);
                message.error("Failed to load chadhava data");
                navigate("/admin/chadhava");
            } finally {
                setFetching(false);
            }
        };

        fetchChadhavaData();
    }, [id, navigate]);

    const handleSubmit = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const formData = new FormData();

            // Basic Info
            formData.append("title", title);
            formData.append("name", name);
            formData.append("about", about);
            formData.append("time", time);
            formData.append("btnText", btnText);

            // Details (as JSON string)
            formData.append("details", JSON.stringify(details));

            // Prepare offerings data
            const offeringsData = offerings.map(offering => ({
                name: offering.name,
                description: offering.description,
                price: offering.price,
                isSpecialCombo: offering.isSpecialCombo,
                isPrasadForHome: offering.isPrasadForHome,
                existingImage: offering.existingImage || "",
            }));
            formData.append("offering", JSON.stringify(offeringsData));

            // Add new offering images
            // offerings.forEach((offering, index) => {
            //     if (offering.fileList[0]?.originFileObj) {
            //         formData.append(`offeringImages[${index}]`, offering.fileList[0].originFileObj as RcFile);
            //     }
            // });
            offerings.forEach(offering => {
                if (offering.fileList[0]?.originFileObj) {
                    // formData.append(`offeringImages[${index}]`, offering.fileList[0].originFileObj as RcFile);
                    formData.append("offeringImages", offering.fileList[0].originFileObj);
                }
            });


            // Add existing images (those not removed)
            const currentExistingImages = existingImages.filter(img => !removedImages.includes(img));
            if (currentExistingImages.length > 0) {
                formData.append("existingImages", JSON.stringify(currentExistingImages));
            }

            // Add removed images
            if (removedImages.length > 0) {
                formData.append("removeImages", JSON.stringify(removedImages));
            }

            // Add new chadhava images
            imageList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append(`images`, file.originFileObj as RcFile);
                }
            });

            // Status
            formData.append("isUpcoming", isUpcoming.toString());
            formData.append("isActive", isActive.toString());

            const res = await updateChadhava(id, formData);
            if (res.data.status) {
                message.success("Chadhava updated successfully");
                navigate("/admin/chadhava");
            }else{
                message.error("server error")
            }
        } catch (error) {
            console.error("Error updating chadhava:", error);
            message.error("Failed to update chadhava. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Details Handlers
    const handleAddDetail = () => {
        setDetails([...details, { question: "", answer: "" }]);
    };

    const handleRemoveDetail = (index: number) => {
        if (details.length > 1) {
            const newDetails = details.filter((_, i) => i !== index);
            setDetails(newDetails);
        }
    };

    const handleDetailChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setDetails(newDetails);
    };

    // Offering Handlers
    const handleAddOffering = () => {
        setOfferings([
            ...offerings,
            {
                name: "",
                description: "",
                image: "",
                price: 0,
                isSpecialCombo: false,
                isPrasadForHome: false,
                fileList: [],
                existingImage: ""
            }
        ]);
    };

    const handleRemoveOffering = (index: number) => {
        if (offerings.length > 1) {
            const newOfferings = offerings.filter((_, i) => i !== index);
            setOfferings(newOfferings);
        }
    };

    const handleOfferingChange = (index: number, field: keyof OfferingItem, value: any) => {
        const newOfferings = [...offerings];
        if (field === 'price') {
            newOfferings[index][field] = parseFloat(value) || 0;
        } else if (field === 'isSpecialCombo' || field === 'isPrasadForHome') {
            newOfferings[index][field] = value;
        } else if (field === 'fileList') {
            newOfferings[index][field] = value;
        } else if (field === 'existingImage') {
            newOfferings[index][field] = value;
        } else {
            newOfferings[index][field] = value;
        }
        setOfferings(newOfferings);
    };

    const handleOfferingImageUpload = (index: number, { fileList }: UploadChangeParam<UploadFile>) => {
        const newOfferings = [...offerings];
        newOfferings[index].fileList = fileList.slice(-1);
        newOfferings[index].existingImage = ""; // Clear existing image when uploading new one
        setOfferings(newOfferings);
    };

    // Image Handlers
    const handleImagesUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setImageList(fileList);
    };

    const handleRemoveImage = (file: UploadFile | any) => {
        if (file.response && existingImages.includes(file.response)) {
            // Add to removed images list
            setRemovedImages(prev => [...prev, file.response as string]);
            // Remove from existing images
            setExistingImages(prev => prev.filter(img => img !== file.response));
        }
        // Remove from image list
        const newFileList = imageList.filter(item => item.uid !== file.uid);
        setImageList(newFileList);

        setRemovedImages(prev => [...prev, file.imageName]);
        // setExistingImages(prev => prev.filter((_, i) => i !== index));
        setExistingImages(prev => prev.filter(img => img !== file.imageName));
        // setImageList(prev => prev.filter(file => file.response !== file.imageName));
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
                <span className="ml-4">Loading chadhava data...</span>
            </div>
        );
    }

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Edit Chadhava</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to={"/admin/chadhava"}>
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

                        {/* Basic Information Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Basic Information</h3>
                        </Col>

                        {/* Title */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Title <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="title"
                                        rules={[{ required: true, message: "Please enter title" }]}
                                        initialValue={title}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={title}
                                            placeholder="Chadhava Title"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
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
                                        rules={[{ required: true, message: "Please enter chadhava name" }]}
                                        initialValue={name}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={name}
                                            placeholder="Chadhava Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* About */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        About <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="about"
                                        rules={[{ required: true, message: "Please enter about description" }]}
                                        initialValue={about}
                                    >
                                        <ReactQuill
                                            theme="snow"
                                            value={about}
                                            style={{ height: "200px" }}
                                            onChange={setAbout}
                                            placeholder="Detailed description about the chadhava"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Time */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Time
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="time" initialValue={time}>
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={time}
                                            placeholder="e.g., 06:00 AM - 09:00 AM"
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Button Text */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Button Text
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="btnText" initialValue={btnText}>
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={btnText}
                                            placeholder="e.g., Book Now, Register, etc."
                                            onChange={(e) => setBtnText(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Details Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Q&A Details</h3>
                        </Col>

                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Details
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    {details.map((detail, index) => (
                                        <Card key={index} className="mb-4" size="small">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">Detail {index + 1}</span>
                                                {details.length > 1 && (
                                                    <Button
                                                        type="text"
                                                        danger
                                                        size="small"
                                                        icon={<FaTimes />}
                                                        onClick={() => handleRemoveDetail(index)}
                                                    />
                                                )}
                                            </div>
                                            <Input
                                                size="large"
                                                className="mb-2"
                                                placeholder="Question"
                                                value={detail.question}
                                                onChange={(e) => handleDetailChange(index, 'question', e.target.value)}
                                            />
                                            <TextArea
                                                rows={3}
                                                placeholder="Answer"
                                                value={detail.answer}
                                                onChange={(e) => handleDetailChange(index, 'answer', e.target.value)}
                                            />
                                        </Card>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={handleAddDetail}
                                        icon={<FaPlus />}
                                        className="w-full mt-2"
                                    >
                                        Add Detail
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                        {/* Offerings Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Offerings</h3>
                        </Col>

                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Offerings
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    {offerings.map((offering, index) => (
                                        <Card key={index} className="mb-6" size="small">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">Offering {index + 1}</span>
                                                {offerings.length > 1 && (
                                                    <Button
                                                        type="text"
                                                        danger
                                                        size="small"
                                                        icon={<FaTimes />}
                                                        onClick={() => handleRemoveOffering(index)}
                                                    />
                                                )}
                                            </div>

                                            <Input
                                                size="large"
                                                className="mb-2"
                                                placeholder="Offering Name"
                                                value={offering.name}
                                                onChange={(e) => handleOfferingChange(index, 'name', e.target.value)}
                                            />

                                            <TextArea
                                                rows={2}
                                                className="mb-2"
                                                placeholder="Description"
                                                value={offering.description}
                                                onChange={(e) => handleOfferingChange(index, 'description', e.target.value)}
                                            />

                                            <InputNumber
                                                className="w-full mb-2"
                                                placeholder="Price"
                                                value={offering.price}
                                                onChange={(value) => handleOfferingChange(index, 'price', value)}
                                                prefix="₹"
                                                min={0}
                                                step={100}
                                            />

                                            <div className="mb-2">
                                                <Upload
                                                    name="offeringImage"
                                                    listType="picture-card"
                                                    // fileList={offering.fileList}
                                                    fileList={[{
                                                        uid: 'temple-image',
                                                        name: 'temple-image.jpg',
                                                        status: 'done' as const,
                                                        // url: data.templeDetails.image,
                                                        // response: data.templeDetails.image,
                                                        url: `${import.meta.env.VITE_APP_Image_URL}/chadhava/${offering.image}`,
                                                        response: `${import.meta.env.VITE_APP_Image_URL}/chadhava/${offering.image}`,
                                                    }]}
                                                    beforeUpload={() => false}
                                                    onChange={(info) => handleOfferingImageUpload(index, info)}
                                                    onRemove={() => {
                                                        const newOfferings = [...offerings];
                                                        newOfferings[index].fileList = [];
                                                        setOfferings(newOfferings);
                                                    }}
                                                    maxCount={1}
                                                    accept=".png,.jpg,.jpeg"
                                                >
                                                    {offering.fileList.length < 1 && !offering.existingImage && (
                                                        <div>
                                                            <BsUpload style={{ fontSize: "16px" }} />
                                                            <div style={{ marginTop: 4, fontSize: "12px" }}>Upload Image</div>
                                                        </div>
                                                    )}
                                                </Upload>

                                                {/* {offering.existingImage && offering.fileList.length === 0 && (
                                                    <div className="mt-2">
                                                        <div className="text-xs text-gray-600 mb-1">Current Image:</div>
                                                        <div className="relative group">
                                                            <img
                                                                src={offering.existingImage}
                                                                alt={`Offering ${index + 1}`}
                                                                className="w-20 h-20 object-cover rounded"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                                onClick={() => {
                                                                    const newOfferings = [...offerings];
                                                                    newOfferings[index].existingImage = "";
                                                                    setOfferings(newOfferings);
                                                                }}
                                                            >
                                                                <FaTimes className="text-xs" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )} */}
                                            </div>

                                            <Space className="w-full mb-2">
                                                <div className="flex items-center">
                                                    <Switch
                                                        size="small"
                                                        checked={offering.isSpecialCombo}
                                                        onChange={(checked) => handleOfferingChange(index, 'isSpecialCombo', checked)}
                                                    />
                                                    <span className="ml-2 text-xs">Special Combo</span>
                                                </div>

                                                <div className="flex items-center">
                                                    <Switch
                                                        size="small"
                                                        checked={offering.isPrasadForHome}
                                                        onChange={(checked) => handleOfferingChange(index, 'isPrasadForHome', checked)}
                                                    />
                                                    <span className="ml-2 text-xs">Prasad for Home</span>
                                                </div>
                                            </Space>
                                        </Card>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={handleAddOffering}
                                        icon={<FaPlus />}
                                        className="w-full mt-2"
                                    >
                                        Add Offering
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                        {/* Images Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Images</h3>
                        </Col>

                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Chadhava Images
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Upload
                                        multiple
                                        name="images"
                                        listType="picture-card"
                                        fileList={imageList}
                                        beforeUpload={() => false}
                                        onChange={handleImagesUpload}
                                        onRemove={handleRemoveImage}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {imageList.length < 10 && (
                                            <div>
                                                <BsUpload style={{ fontSize: "20px" }} />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        )}
                                    </Upload>

                                    {/* {existingImages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Current images (click X to remove):</p>
                      <div className="flex flex-wrap gap-2">
                        {existingImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Chadhava ${index + 1}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              onClick={() => {
                                setRemovedImages(prev => [...prev, image]);
                                setExistingImages(prev => prev.filter((_, i) => i !== index));
                                setImageList(prev => prev.filter(file => file.response !== image));
                              }}
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                                </Col>
                            </Row>
                        </Col>

                        {/* Status Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Status</h3>
                        </Col>

                        {/* Status Switches */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Status
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <div className="flex items-center justify-between">
                                            <span>Active</span>
                                            <Switch checked={isActive} onChange={setIsActive} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Upcoming</span>
                                            <Switch checked={isUpcoming} onChange={setIsUpcoming} />
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>

                        {/* Submit Button */}
                        <Col span={24} className="my-6">
                            <button
                                disabled={loading}
                                className={`bg-blue-500 hover:bg-blue-700 text-white! font-bold py-2 px-4 rounded ${loading && 'bg-gray-800!'}`}
                                type="submit"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spin size="small" />
                                        <span className="ml-2!">Updating Chadhava...</span>
                                    </div>
                                ) : (
                                    "Update Chadhava"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default EditChadhavaForm;