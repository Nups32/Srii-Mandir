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
  DatePicker,
  Space,
  type DatePickerProps,
  InputNumber,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { getPoojaById, updatePooja } from "@/utils/API";
import { BsUpload } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import dayjs from "dayjs";

interface BenefitItem {
  title: string;
  description: string;
  _id?: string;
}

interface OfferingItem {
  name: string;
  description: string;
  image: string;
  price: number;
  _id?: string;
  fileList: UploadFile[];
  existingImage?: string;
}

interface PoojaData {
  _id: string;
  title: string;
  name: string;
  to: string;
  place: string;
  date: string;
  time: string;
  location: string;
  about: {
    title: string;
    description: string;
  };
  benefitText: BenefitItem[];
  deity: string[];
  tithis: string[];
  dosha: string[];
  benefits: string[];
  offering: OfferingItem[];
  templeDetails: {
    image: string;
    name: string;
    description: string;
  };
  images: string[];
  videoUrl: string;
  isUpcoming: boolean;
  isActive: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const EditPujaForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Basic Information
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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

  // Offering Array
  const [offerings, setOfferings] = useState<OfferingItem[]>([
    {
      name: "",
      description: "",
      image: "",
      price: 0,
      fileList: [],
      existingImage: ""
    }
  ]);

  // Temple Details
  const [templeName, setTempleName] = useState<string>("");
  const [templeDescription, setTempleDescription] = useState<string>("");
  const [existingTempleImage, setExistingTempleImage] = useState<string>("");

  // Images & Files
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [templeImageList, setTempleImageList] = useState<UploadFile[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  // Status
  const [isUpcoming, setIsUpcoming] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Fetch existing puja data
  useEffect(() => {
    const fetchPoojaData = async () => {
      if (!id) return;

      setFetching(true);
      try {
        const response = await getPoojaById(id);
        if (response.data.status) {

          const data: PoojaData = response.data.data;

          // Set basic information
          setTitle(data.title || "");
          setName(data.name || "");
          setTo(data.to || "");
          setPlace(data.place || "");
          setDate(data.date || "");
          setTime(data.time || "");
          setLocation(data.location || "");

          // Set about section
          setAboutTitle(data.about?.title || "");
          setAboutDescription(data.about?.description || "");

          // Set arrays
          setDeities(data.deity?.length > 0 ? data.deity : [""]);
          setTithis(data.tithis?.length > 0 ? data.tithis : [""]);
          setDoshas(data.dosha?.length > 0 ? data.dosha : [""]);
          setBenefits(data.benefits?.length > 0 ? data.benefits : [""]);

          // Set benefit texts
          setBenefitTexts(data.benefitText?.length > 0 ? data.benefitText : [{ title: "", description: "" }]);

          // Set offerings with existing images
          const offeringsWithFiles = data.offering?.map(offering => ({
            ...offering,
            ...(offering.image && {
              fileList: [{
                uid: offering.image,
                name: offering.image,
                status: 'done' as const,
                // url: data.templeDetails.image,
                // response: data.templeDetails.image,
                url: `${import.meta.env.VITE_APP_Image_URL}/pooja/${offering.image}`,
                response: `${import.meta.env.VITE_APP_Image_URL}/pooja/${offering.image}`,
              }]
            } || { fileList: [] }),
            existingImage: offering.image || ""
          })) || [{
            name: "",
            description: "",
            image: "",
            price: 0,
            fileList: [],
            existingImage: ""
          }];
          setOfferings(offeringsWithFiles);

          // Set temple details
          setTempleName(data.templeDetails?.name || "");
          setTempleDescription(data.templeDetails?.description || "");
          setExistingTempleImage(data.templeDetails?.image || "");

          // Set images
          setExistingImages(data.images || []);

          // Set video URL
          setVideoUrl(data.videoUrl || "");

          // Set status
          setIsUpcoming(data.isUpcoming || false);
          setIsActive(data.isActive !== undefined ? data.isActive : true);
          // Format existing images for upload component
          const formattedImageList = (data.images || []).map((img, index) => ({
            uid: `existing-${index}`,
            name: `image-${index}.jpg`,
            status: 'done' as const,
            //   url: img,
            url: `${import.meta.env.VITE_APP_Image_URL}/pooja/${img}`,
            response: `${import.meta.env.VITE_APP_Image_URL}/pooja/${img}`,
            imageName: img,
          }));
          setImageList(formattedImageList);

          // Format temple image for upload component
          if (data.templeDetails?.image) {
            const templeImage = [{
              uid: 'temple-image',
              name: 'temple-image.jpg',
              status: 'done' as const,
              // url: data.templeDetails.image,
              // response: data.templeDetails.image,
              url: `${import.meta.env.VITE_APP_Image_URL}/pooja/${data.templeDetails.image}`,
              response: `${import.meta.env.VITE_APP_Image_URL}/pooja/${data.templeDetails.image}`,
            }];
            setTempleImageList(templeImage);
          }
        }

      } catch (error) {
        console.error("Error fetching puja:", error);
        message.error("Failed to load puja data");
        navigate("/admin/pooja");
      } finally {
        setFetching(false);
      }
    };

    fetchPoojaData();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!id) return;

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
      formData.append("location", location);

      // About
      const aboutData = { title: aboutTitle, description: aboutDescription };
      formData.append("about", JSON.stringify(aboutData));

      // Benefit Texts (as JSON string)
      formData.append("benefitText", JSON.stringify(benefitTexts));

      // Arrays - filter out empty strings
      const filteredDeities = deities.filter(deity => deity.trim());
      formData.append("deity", JSON.stringify(filteredDeities));

      const filteredTithis = tithis.filter(tithi => tithi.trim());
      formData.append("tithis", JSON.stringify(filteredTithis));

      const filteredDoshas = doshas.filter(dosha => dosha.trim());
      formData.append("dosha", JSON.stringify(filteredDoshas));

      const filteredBenefits = benefits.filter(benefit => benefit.trim());
      formData.append("benefits", JSON.stringify(filteredBenefits));

      // Prepare offerings data
      const offeringsData = offerings.map(offering => ({
        name: offering.name,
        description: offering.description,
        price: offering.price,
        existingImage: offering.existingImage || "",
      }));
      formData.append("offering", JSON.stringify(offeringsData));
      // offerings.forEach(offering => {
      //   if (offering.fileList[0]?.originFileObj) {
      //     // formData.append(`offeringImages[${index}]`, offering.fileList[0].originFileObj as RcFile);
      //     formData.append("offeringImages", offering.fileList[0].originFileObj);
      //   }
      // });

      offerings.forEach((offering, index) => {
        if (offering.fileList[0]?.originFileObj) {
          formData.append("offeringImages", offering.fileList[0].originFileObj as RcFile);
          formData.append("offeringImageIndexes", index.toString());
        }
      });

      // Temple Details
      const templeDetailsData = {
        name: templeName,
        description: templeDescription,
        image: existingTempleImage // Keep existing image unless updated
      };
      formData.append("templeDetails", JSON.stringify(templeDetailsData));

      // Add removed images
      if (removedImages.length > 0) {
        formData.append("removeImages", JSON.stringify(removedImages));
      }

      // Add existing images (those not removed)
      const currentExistingImages = existingImages.filter(img => !removedImages.includes(img));
      if (currentExistingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(currentExistingImages));
      }

      // Only append new temple image if uploaded
      if (templeImageList[0]?.originFileObj) {
        formData.append("templeImage", templeImageList[0].originFileObj as RcFile);
      }

      // Handle new images upload
      imageList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj as RcFile);
        }
      });

      // Video
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      } else {
        formData.append("videoUrl", "");
      }

      // Status
      formData.append("isUpcoming", isUpcoming.toString());
      formData.append("isActive", isActive.toString());

      // console.log("Updating puja with ID:", id);
      const res = await updatePooja(id, formData);
      if (res.data.status) {
        message.success("Puja updated successfully");
        // navigate("/admin/pooja");
      } else {
        message.error("server error")
      }
    } catch (error) {
      console.error("Error updating puja:", error);
      message.error("Failed to update puja. Please try again.");
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

  const handleRemoveImage = (file: UploadFile | any) => {
    if (file.response && existingImages.includes(file.response)) {
      // Add to removed images list
      setRemovedImages(prev => [...prev, file.response as string]);
      // Remove from existing images
      setExistingImages(prev => prev.filter(img => img !== file.imageName));
    }
    // Remove from image list
    const newFileList = imageList.filter(item => item.uid !== file.uid);
    setImageList(newFileList);

    if (file.imageName) {
      setRemovedImages(prev => [...prev, file.imageName]);
    }

    setExistingImages(prev => prev.filter(img => img !== file.imageName));

    setImageList(prev => prev.filter(img => img.response !== file.imageName));
  };

  const handleTempleImageUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
    setTempleImageList(fileList.slice(-1));
  };

  // Date and Time Handlers
  const handleDateChange = (dateString: string) => {
    setDate(dateString);
  };

  const handleTimeChange: DatePickerProps["onChange"] = (_, dateTimeString: any) => {
    if (dateTimeString) {
      const [datePart, timePart] = dateTimeString.split(' ');
      setDate(datePart);
      setTime(timePart);
    }
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
      // } else if (field === 'isSpecialCombo' || field === 'isPrasadForHome') {
      //   newOfferings[index][field] = value;
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

  // Format combined date and time
  const getDateTimeValue = () => {
    if (date && time) {
      return dayjs(`${date} ${time}`);
    }
    return null;
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
        <span className="ml-4">Loading puja data...</span>
      </div>
    );
  }

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Edit Puja</h2>
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
                    initialValue={title}
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
                    initialValue={name}
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
                    initialValue={to}
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
                  <Form.Item name="place" initialValue={place}>
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
                  <Form.Item name="date" initialValue={date}>
                    <Input
                      size="large"
                      className="rounded border"
                      value={date}
                      placeholder="YYYY-MM-DD"
                      onChange={(e) => handleDateChange(e.target.value)}
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
                    Time
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={handleTimeChange}
                      placeholder="Select date & time"
                      value={getDateTimeValue()}
                    />
                  </Space>
                </Col>
              </Row>
            </Col>

            {/* Location */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Location
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="location" initialValue={location}>
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
            </Col>

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
                  <Form.Item name="aboutTitle" initialValue={aboutTitle}>
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
                  <Form.Item name="aboutDescription" initialValue={aboutDescription}>
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
                          // fileList={[{
                          //   uid: 'pooja-offering-image',
                          //   name: 'pooja-offering-image.jpg',
                          //   status: 'done' as const,
                          //   // url: data.templeDetails.image,
                          //   // response: data.templeDetails.image,
                          //   url: `${import.meta.env.VITE_APP_Image_URL}/pooja/${offering.image}`,
                          //   response: `${import.meta.env.VITE_APP_Image_URL}/pooja/${offering.image}`,
                          // }]}
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

                      {/* <Space className="w-full mb-2">
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
                      </Space> */}
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
                  <Form.Item name="templeName" initialValue={templeName}>
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
                  <Form.Item name="templeDescription" initialValue={templeDescription}>
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
                    onRemove={() => {
                      setTempleImageList([]);
                      setExistingTempleImage(""); // Clear existing temple image
                    }}
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
                  {existingTempleImage && templeImageList.length === 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Current temple image:</p>
                      <img
                        src={existingTempleImage}
                        alt="Current temple"
                        className="mt-1 max-h-32 object-cover rounded"
                      />
                    </div>
                  )}
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
                              alt={`Puja ${index + 1}`}
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

            {/* Video URL */}
            <Col xs={24} sm={24} md={24}>
              <Row className="bg-white mb-4">
                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                  <label className="font-bold">
                    Video URL
                  </label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="videoUrl" initialValue={videoUrl}>
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
            <Col span={24} className="my-6">
              <button
                disabled={loading}
                className={`bg-blue-500 hover:bg-blue-700 text-white! font-bold py-2 px-4 rounded ${loading && 'bg-gray-800!'}`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spin size="small" />
                    <span className="!ml-2">Updating Puja...</span>
                  </div>
                ) : (
                  "Update Puja"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default EditPujaForm;