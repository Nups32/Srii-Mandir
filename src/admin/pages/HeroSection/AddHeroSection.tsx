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
  Radio,
  InputNumber,
  Upload,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { storeHeroSection } from "@/utils/API";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { BsUpload } from "react-icons/bs";

const { Option } = Select;
const { TextArea } = Input;

const AddHeroSectionForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [btnText, setBtnText] = useState<string>("");
  const [btnRedirect, setBtnRedirect] = useState<string>("/puja");
  const [btnRedirectType, setBtnRedirectType] = useState<string>("pooja");
  const [type, setType] = useState<string>("home");
  const [orderIndex, setOrderIndex] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async () => {
    // Validate required fields
    if (!title.trim()) {
      message.error("Please enter a title");
      return;
    }

    if (!description.trim()) {
      message.error("Please enter a description");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      
      formData.append("title", title);
      formData.append("description", description);
      formData.append("btnText", btnText);
      formData.append("btnRedirect", btnRedirect);
      formData.append("type", type);
      formData.append("image", fileList[0].originFileObj as RcFile);
      formData.append("orderIndex", orderIndex.toString());
      formData.append("isActive", isActive.toString());

      await storeHeroSection(formData);
      message.success("Hero section added successfully");
      navigate("/admin/hero-section");
    } catch (error) {
      console.error("Error adding hero section:", error);
      message.error("Failed to add hero section. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle redirect type change
  const handleRedirectTypeChange = (value: string) => {
    setBtnRedirectType(value);
    if (value === "pooja") {
      setBtnRedirect("/puja");
    } else if (value === "chadhava") {
      setBtnRedirect("/chadhava");
    }
  };

   const handleImage = ({ fileList }: UploadChangeParam<UploadFile>) => {
    // setFileList(fileList);
    setFileList(fileList.slice(-1));
  };

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Add Hero Section</h2>
        </Col>
        <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
          <Link to={"/admin/hero-section"}>
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
            
            {/* Content Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Content</h3>
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
                      placeholder="Hero section title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Description */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Description <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: "Please enter description" }]}
                  >
                    <TextArea
                      rows={4}
                      className="rounded border"
                      value={description}
                      placeholder="Hero section description"
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={500}
                      showCount
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Image */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Image <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="images"
>
                    <Upload
                      // multiple
                      name="image"
                      listType="picture-card"
                      fileList={fileList}
                      beforeUpload={() => false}
                      onChange={handleImage}
                      maxCount={1} // Adjust the maximum number of images you want to allow
                      accept=".png, .jpg, .jpeg"
                    >
                        {fileList.length < 1 &&
                            <div>
                                <BsUpload style={{ fontSize: "20px" }} />
                            </div>
                        }
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Button Settings Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Button Settings</h3>
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
                      placeholder="e.g., Explore Now, Learn More, Book Now"
                      onChange={(e) => setBtnText(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Button Redirect Type */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Redirect To
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="btnRedirectType"
                    initialValue="pooja"
                  >
                    <Select
                      size="large"
                      className="rounded border"
                      value={btnRedirectType}
                      onChange={handleRedirectTypeChange}
                      placeholder="Select redirect type"
                    >
                      <Option value="pooja">Pooja</Option>
                      <Option value="chadhava">Chadhava</Option>
                    </Select>
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Selected URL: <span className="font-mono">{btnRedirect}</span>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Display Selected URL (read-only) */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Redirect URL
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="btnRedirect">
                    <Input
                      size="large"
                      className="rounded border bg-gray-50"
                      value={btnRedirect}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Settings Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Settings</h3>
            </Col>

            {/* Type */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Type <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="type"
                    rules={[{ required: true, message: "Please select type" }]}
                    initialValue="home"
                  >
                    <Radio.Group
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full"
                    >
                      <Radio value="home" className="!mb-2 block">Home Page</Radio>
                      <Radio value="about" className="!mb-2 block">About Page</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Order Index */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Order Index
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="orderIndex" initialValue={1}>
                    <InputNumber
                      size="large"
                      className="w-full rounded border"
                      value={orderIndex}
                      placeholder="Order number"
                      onChange={(value) => setOrderIndex(value || 1)}
                      min={1}
                      max={100}
                    />
                  </Form.Item>
                  <div className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first. Use this to control the display order.
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Active Status */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Status
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="flex items-center justify-between">
                    <span>Active</span>
                    <Switch checked={isActive} onChange={setIsActive} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isActive 
                      ? "This hero section will be displayed" 
                      : "This hero section will be hidden"}
                  </div>
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
                    <span className="!ml-2">Adding Hero Section...</span>
                  </div>
                ) : (
                  "Add Hero Section"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AddHeroSectionForm;