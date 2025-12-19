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
  DatePicker,
  // TimePicker,
  Space,
  type DatePickerProps,
} from "antd";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { storePooja } from "@/utils/API";
import { BsUpload } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";


// import moment from "moment";

// const { RangePicker } = TimePicker;

interface BenefitItem {
  title: string;
  description: string;
  _id?: string;
}

const AddPujaForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  // const navigate = useNavigate();

  // Basic Information
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  // const [location, setLocation] = useState<string>("");
  
  // About Section
  const [aboutTitle, setAboutTitle] = useState<string>("");
  const [aboutDescription, setAboutDescription] = useState<string>("");
  
  // Benefits Text (Array)
  const [benefitTexts, setBenefitTexts] = useState<BenefitItem[]>([{ title: "", description: "" }]);
  
  // Arrays
  const [deities, setDeities] = useState<string[]>([""]);
  const [tithis, setTithis] = useState<string[]>([""]);
  const [doshas, setDoshas] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  
  // Temple Details
  const [templeName, setTempleName] = useState<string>("");
  const [templeDescription, setTempleDescription] = useState<string>("");
  
  // Images & Files
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [templeImageList, setTempleImageList] = useState<UploadFile[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  
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
      formData.append("to", to);
      formData.append("place", place);
      formData.append("date", date);
      formData.append("time", time);
      // formData.append("location", location);
      
      // About
      formData.append("about[title]", aboutTitle);
      formData.append("about[description]", aboutDescription);
      
      // Benefit Texts (as JSON string)
      formData.append("benefitText", JSON.stringify(benefitTexts));
      
      // Arrays
      deities.forEach((deity, index) => {
        formData.append(`deity[${index}]`, deity);
      });
      
      tithis.forEach((tithi, index) => {
        formData.append(`tithis[${index}]`, tithi);
      });
      
      doshas.forEach((dosha, index) => {
        formData.append(`dosha[${index}]`, dosha);
      });
      
      benefits.forEach((benefit, index) => {
        formData.append(`benefits[${index}]`, benefit);
      });
      
      // Temple Details
      formData.append("templeDetails[name]", templeName);
      formData.append("templeDetails[description]", templeDescription);
      if (templeImageList[0]?.originFileObj) {
        formData.append("templeImage", templeImageList[0].originFileObj as RcFile);
      }
      
      // Images
      imageList.forEach((file) => {
        if (file.originFileObj) {
          formData.append(`images`, file.originFileObj as RcFile);
        }
      });
      
      // Video
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      }
      
      // Status
      formData.append("isUpcoming", isUpcoming.toString());
      formData.append("isActive", isActive.toString());
      console.log("formData", formData);

      await storePooja(formData);
      message.success("Puja added successfully");
    //   navigate("/admin/puja");
    } catch (error) {
      console.error("Error adding puja:", error);
      message.error("Failed to add puja. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Array Field Handlers
  const handleAddDeity = () => {
    setDeities([...deities, ""]);
  };

  const handleRemoveDeity = (index: number) => {
    if (deities.length > 1) {
      const newDeities = deities.filter((_, i) => i !== index);
      setDeities(newDeities);
    }
  };

  const handleDeityChange = (index: number, value: string) => {
    const newDeities = [...deities];
    newDeities[index] = value;
    setDeities(newDeities);
  };

  const handleAddTithi = () => {
    setTithis([...tithis, ""]);
  };

  const handleRemoveTithi = (index: number) => {
    if (tithis.length > 1) {
      const newTithis = tithis.filter((_, i) => i !== index);
      setTithis(newTithis);
    }
  };

  const handleTithiChange = (index: number, value: string) => {
    const newTithis = [...tithis];
    newTithis[index] = value;
    setTithis(newTithis);
  };

  const handleAddDosha = () => {
    setDoshas([...doshas, ""]);
  };

  const handleRemoveDosha = (index: number) => {
    if (doshas.length > 1) {
      const newDoshas = doshas.filter((_, i) => i !== index);
      setDoshas(newDoshas);
    }
  };

  const handleDoshaChange = (index: number, value: string) => {
    const newDoshas = [...doshas];
    newDoshas[index] = value;
    setDoshas(newDoshas);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const handleRemoveBenefit = (index: number) => {
    if (benefits.length > 1) {
      const newBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(newBenefits);
    }
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  // Benefit Text Handlers
  const handleAddBenefitText = () => {
    setBenefitTexts([...benefitTexts, { title: "", description: "" }]);
  };

  const handleRemoveBenefitText = (index: number) => {
    if (benefitTexts.length > 1) {
      const newBenefitTexts = benefitTexts.filter((_, i) => i !== index);
      setBenefitTexts(newBenefitTexts);
    }
  };

  const handleBenefitTextChange = (index: number, field: 'title' | 'description', value: string) => {
    const newBenefitTexts = [...benefitTexts];
    newBenefitTexts[index][field] = value;
    setBenefitTexts(newBenefitTexts);
  };

  // Image Handlers
  const handleImagesUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
    setImageList(fileList);
  };

  const handleTempleImageUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
    setTempleImageList(fileList.slice(-1)); // Only one temple image
  };

//   // Date Handlers
// //   const handleDateChange = (date: moment.Moment | null, dateString: string | string[]) => {
//     const handleDateChange = (date: any,dateString: string | null) => {
//         if (dateString) {
//             setDate(dateString);
//         } else {
//             setDate(""); // or null, depending on your state
//         }
//     };


//   const handleTimeChange = (time: moment.Moment | null, timeString: string | string[]) => {
    const handleTimeChange: DatePickerProps["onChange"] = ( _, dateTimeString: any) => {
    setTime(dateTimeString || "");
    };

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Add Puja</h2>
        </Col>
        <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
          <Link to={"/admin/puja"}>
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
                    rules={[{ required: true, message: "Please enter puja title" }]}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={title}
                      placeholder="Puja Title"
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
                    Puja Name <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter puja name" }]}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={name}
                      placeholder="Puja Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Offered To */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Offered To <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="to"
                    rules={[{ required: true, message: "Please enter deity name" }]}
                  >
                    <Input
                      size="large"
                      className="rounded border"
                      value={to}
                      placeholder="e.g., Lord Ganesha"
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Place */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Place
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="place">
                    <Input
                      size="large"
                      className="rounded border"
                      value={place}
                      placeholder="e.g., Main Temple Hall"
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Date */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Date
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="date">
                    <Input
                      size="large"
                      className="rounded border"
                      value={date}
                      placeholder="e.g., Mumbai, Maharashtra"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Date and Time */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    {/* Date & Time */}
                    Time
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {/* <DatePicker
                      size="large"
                      style={{ width: '100%' }}
                      onChange={handleDateChange}
                      placeholder="Select date"
                    /> */}
                    {/* <TimePicker
                      size="large"
                      style={{ width: '100%' }}
                      onChange={handleTimeChange}
                      placeholder="Select time"
                      format="HH:mm"
                    /> */}
                    <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={handleTimeChange}
                        placeholder="Select date & time"
                    />
                  </Space>
                </Col>
              </Row>
            </Col>

            {/* Location */}
            {/* <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Location
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="location">
                    <Input
                      size="large"
                      className="rounded border"
                      value={location}
                      placeholder="e.g., Mumbai, Maharashtra"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col> */}

            {/* About Section */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">About the Puja</h3>
            </Col>

            {/* About Title */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    About Title
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="aboutTitle">
                    <Input
                      size="large"
                      className="rounded border"
                      value={aboutTitle}
                      placeholder="About title"
                      onChange={(e) => setAboutTitle(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* About Description */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    About Description
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="aboutDescription">
                    {/* <TextArea
                      rows={4}
                      className="rounded border"
                      value={aboutDescription}
                      placeholder="Detailed description about the puja"
                      onChange={(e) => setAboutDescription(e.target.value)}
                    /> */}
                    <ReactQuill
                        theme="snow"
                        value={aboutDescription}
                        style={{ height: "200px" }}
                        onChange={setAboutDescription}
                        
                        placeholder="Detailed description about the puja"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Deities Array */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4 mt-5">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Deities
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  {deities.map((deity, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        size="large"
                        className="rounded border grow mr-2"
                        value={deity}
                        placeholder={`Deity ${index + 1}`}
                        onChange={(e) => handleDeityChange(index, e.target.value)}
                      />
                      {deities.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<FaTimes />}
                          onClick={() => handleRemoveDeity(index)}
                          className="flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={handleAddDeity}
                    icon={<FaPlus />}
                    className="w-full mt-2"
                  >
                    Add Deity
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Tithis Array */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Tithis
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  {tithis.map((tithi, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        size="large"
                        className="rounded border grow mr-2"
                        value={tithi}
                        placeholder={`Tithi ${index + 1}`}
                        onChange={(e) => handleTithiChange(index, e.target.value)}
                      />
                      {tithis.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<FaTimes />}
                          onClick={() => handleRemoveTithi(index)}
                          className="flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={handleAddTithi}
                    icon={<FaPlus />}
                    className="w-full mt-2"
                  >
                    Add Tithi
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Doshas Array */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Doshas
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  {doshas.map((dosha, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        size="large"
                        className="rounded border grow mr-2"
                        value={dosha}
                        placeholder={`Dosha ${index + 1}`}
                        onChange={(e) => handleDoshaChange(index, e.target.value)}
                      />
                      {doshas.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<FaTimes />}
                          onClick={() => handleRemoveDosha(index)}
                          className="flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={handleAddDosha}
                    icon={<FaPlus />}
                    className="w-full mt-2"
                  >
                    Add Dosha
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Benefits Array */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Benefits
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        size="large"
                        className="rounded border grow mr-2"
                        value={benefit}
                        placeholder={`Benefit ${index + 1}`}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                      />
                      {benefits.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<FaTimes />}
                          onClick={() => handleRemoveBenefit(index)}
                          className="flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={handleAddBenefit}
                    icon={<FaPlus />}
                    className="w-full mt-2"
                  >
                    Add Benefit
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Benefit Text Array */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Benefit Details
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  {benefitTexts.map((benefitText, index) => (
                    <Card key={index} className="mb-4" size="small">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Benefit {index + 1}</span>
                        {benefitTexts.length > 1 && (
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<FaTimes />}
                            onClick={() => handleRemoveBenefitText(index)}
                          />
                        )}
                      </div>
                      <Input
                        size="large"
                        className="mb-2"
                        placeholder="Title"
                        value={benefitText.title}
                        onChange={(e) => handleBenefitTextChange(index, 'title', e.target.value)}
                      />
                      <TextArea
                        rows={3}
                        placeholder="Description"
                        value={benefitText.description}
                        onChange={(e) => handleBenefitTextChange(index, 'description', e.target.value)}
                      />
                      {/* <ReactQuill
                        theme="snow"
                        value={benefitText.description}
                        placeholder="Description"
                        onChange={(value) =>
                            handleBenefitTextChange(index, "description", value)
                        }
                    /> */}

                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    onClick={handleAddBenefitText}
                    icon={<FaPlus />}
                    className="w-full mt-2"
                  >
                    Add Benefit Detail
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Temple Details */}
            <Col span={24}>
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Temple Details</h3>
            </Col>

            {/* Temple Name */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Temple Name
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="templeName">
                    <Input
                      size="large"
                      className="rounded border"
                      value={templeName}
                      placeholder="Temple name"
                      onChange={(e) => setTempleName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Temple Description */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Temple Description
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="templeDescription">
                    {/* <TextArea
                      rows={3}
                      className="rounded border"
                      value={templeDescription}
                      placeholder="Temple description"
                      onChange={(e) => setTempleDescription(e.target.value)}
                    /> */}
                    <ReactQuill
                        theme="snow"
                        value={templeDescription}
                        placeholder="Temple description"
                        style={{ height: "100px" }}
                        onChange={setTempleDescription}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Temple Image */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4 mt-5">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Temple Image
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Upload
                    name="templeImage"
                    listType="picture-card"
                    fileList={templeImageList}
                    beforeUpload={() => false}
                    onChange={handleTempleImageUpload}
                    maxCount={1}
                    accept=".png,.jpg,.jpeg"
                  >
                    {templeImageList.length < 1 && (
                      <div>
                        <BsUpload style={{ fontSize: "20px" }} />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Col>
              </Row>
            </Col>

            {/* Puja Images */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Puja Images
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
                    {imageList.length < 5 && (
                      <div>
                        <BsUpload style={{ fontSize: "20px" }} />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Col>
              </Row>
            </Col>

            {/* Video URL */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Video URL
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="videoUrl">
                    <Input
                      size="large"
                      className="rounded border"
                      value={videoUrl}
                      placeholder="YouTube or video URL"
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </Form.Item>
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
            <Col span={24} className="buttons mt-6">
              <button
                disabled={loading}
                className={`btn-brand !py-2 !px-3 cursor-pointer ${loading && '!bg-gray-800'}`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spin size="small" />
                    <span className="!ml-2">Adding Puja...</span>
                  </div>
                ) : (
                  "Add Puja"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AddPujaForm;