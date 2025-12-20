import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { storeChadhava } from "@/utils/API";
import { BsUpload } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

interface DetailItem {
  question: string;
  answer: string;
}

interface OfferingItem {
  name: string;
  description: string;
  image: string;
  price: number;
  isSpecialCombo: boolean;
  isPrasadForHome: boolean;
  fileList: UploadFile[];
}

const AddChadhavaForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
      fileList: []
    }
  ]);

  // Images
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  // Status
  const [isUpcoming, setIsUpcoming] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleSubmit = async () => {
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
        // Image will be handled separately in backend
      }));
      formData.append("offering", JSON.stringify(offeringsData));

      // Add offering images
      offerings.forEach((offering, index) => {
        if (offering.fileList[0]?.originFileObj) {
          formData.append(`offeringImages[${index}]`, offering.fileList[0].originFileObj as RcFile);
        }
      });

      // Add chadhava images
      imageList.forEach((file) => {
        if (file.originFileObj) {
          formData.append(`images`, file.originFileObj as RcFile);
        }
      });

      // Status
      formData.append("isUpcoming", isUpcoming.toString());
      formData.append("isActive", isActive.toString());

      const res = await storeChadhava(formData);
      if (res.data.status) {
        message.success("Chadhava added successfully");
        navigate("/admin/chadhava");
      }else{
        message.error("server error");
      }
    } catch (error) {
      console.error("Error adding chadhava:", error);
      message.error("Failed to add chadhava. Please try again.");
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
        fileList: []
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
    } else {
      newOfferings[index][field] = value;
    }
    setOfferings(newOfferings);
  };

  const handleOfferingImageUpload = (index: number, { fileList }: UploadChangeParam<UploadFile>) => {
    const newOfferings = [...offerings];
    newOfferings[index].fileList = fileList.slice(-1);
    setOfferings(newOfferings);
  };

  // Image Handlers
  const handleImagesUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
    setImageList(fileList);
  };

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Add Chadhava</h2>
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
                  <Form.Item name="time">
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
                  <Form.Item name="btnText">
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
                          fileList={offering.fileList}
                          beforeUpload={() => false}
                          onChange={(info) => handleOfferingImageUpload(index, info)}
                          maxCount={1}
                          accept=".png,.jpg,.jpeg"
                        >
                          {offering.fileList.length < 1 && (
                            <div>
                              <BsUpload style={{ fontSize: "16px" }} />
                              <div style={{ marginTop: 4, fontSize: "12px" }}>Upload Image</div>
                            </div>
                          )}
                        </Upload>
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
                    accept=".png,.jpg,.jpeg"
                  >
                    {imageList.length < 10 && (
                      <div>
                        <BsUpload style={{ fontSize: "20px" }} />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
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
                    <span className="ml-2!">Adding Chadhava...</span>
                  </div>
                ) : (
                  "Add Chadhava"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AddChadhavaForm;