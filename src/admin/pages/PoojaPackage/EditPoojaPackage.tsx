import React, { useState, useEffect } from "react";
import {
    Col,
    Row,
    Form,
    Input,
    message,
    Card,
    Spin,
    Button,
    InputNumber,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa";
import { getPoojaPackageById, updatePoojaPackage } from "@/utils/API";
import TextArea from "antd/es/input/TextArea";

interface PujaPackageData {
    _id: string;
    title: string;
    person: string;
    price: number;
    services: string[];
    createdAt: string;
    updatedAt: string;
}

const EditPoojaPackageForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Form states
    const [title, setTitle] = useState<string>("");
    const [person, setPerson] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [services, setServices] = useState<string[]>([""]);

    // Fetch existing package data
    useEffect(() => {
        const fetchPackageData = async () => {
            if (!id) return;

            setFetching(true);
            try {
                const response = await getPoojaPackageById(id);
                if (response.data.status) {
                    const data: PujaPackageData = response.data.data;

                    setTitle(data.title || "");
                    setPerson(data.person || "");
                    setPrice(data.price || 0);
                    setServices(data.services?.length > 0 ? data.services : [""]);
                }

            } catch (error) {
                console.error("Error fetching package:", error);
                message.error("Failed to load package data");
                navigate("/admin/pooja-package");
            } finally {
                setFetching(false);
            }
        };

        fetchPackageData();
    }, [id, navigate]);

    const handleSubmit = async () => {
        if (!id) return;

        // Filter out empty services
        const filteredServices = services.filter(service => service.trim() !== "");

        if (filteredServices.length === 0) {
            message.error("Please add at least one service");
            return;
        }

        if (price <= 0) {
            message.error("Please enter a valid price");
            return;
        }

        setLoading(true);
        try {
            // const formData = new FormData();

            // formData.append("title", title);
            // formData.append("person", person);
            // formData.append("price", price.toString());
            // formData.append("services", JSON.stringify(filteredServices));
            const formData = {
                title,
                person,
                price,
                services: JSON.stringify(filteredServices),
            }

            const res = await updatePoojaPackage(id, formData);
            if (res.data.status) {
                message.success("Pooja package updated successfully");
                navigate("/admin/pooja-package");
            } else {
                message.error('server error');
            }
        } catch (error) {
            console.error("Error updating pooja package:", error);
            message.error("Failed to update pooja package. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Services Handlers
    const handleAddService = () => {
        setServices([...services, ""]);
    };

    const handleRemoveService = (index: number) => {
        if (services.length > 1) {
            const newServices = services.filter((_, i) => i !== index);
            setServices(newServices);
        }
    };

    const handleServiceChange = (index: number, value: string) => {
        const newServices = [...services];
        newServices[index] = value;
        setServices(newServices);
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
                <span className="ml-4">Loading package data...</span>
            </div>
        );
    }

    return (
        <div className="">
            <Row className="m-2" align="middle">
                <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
                    <h2 className="text-2xl font-bold">Edit Pooja Package</h2>
                </Col>
                <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
                    <Link to={"/admin/pooja-package"}>
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
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Package Information</h3>
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
                                        rules={[{ required: true, message: "Please enter package title" }]}
                                        initialValue={title}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={title}
                                            placeholder="e.g., Standard Package, Premium Package, etc."
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Person */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Person <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="person"
                                        rules={[{ required: true, message: "Please enter person type" }]}
                                        initialValue={person}
                                    >
                                        <Input
                                            size="large"
                                            className="rounded border"
                                            value={person}
                                            placeholder="e.g., Single Person, Couple, Family (up to 4), etc."
                                            onChange={(e) => setPerson(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Price */}
                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Price (₹) <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name="price"
                                        rules={[{ required: true, message: "Please enter package price" }]}
                                        initialValue={price}
                                    >
                                        <InputNumber
                                            size="large"
                                            className="w-full rounded border"
                                            value={price}
                                            placeholder="Enter price"
                                            onChange={(value) => setPrice(value || 0)}
                                            prefix="₹"
                                            min={0}
                                            step={100}
                                            formatter={(value) =>
                                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                            parser={(value) =>
                                                value ? parseInt(value.replace(/₹\s?|(,*)/g, '')) : 0
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>

                        {/* Services Section */}
                        <Col span={24}>
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Services</h3>
                        </Col>

                        <Col xs={24} sm={24} md={24}>
                            <Row className="bg-white mb-4">
                                <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                    <label className="font-bold">
                                        Services <span className="text-danger">*</span>
                                    </label>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    {services.map((service, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            {/* <Input
                                                size="large"
                                                className="rounded border grow mr-2"
                                                value={service}
                                                placeholder={`Service ${index + 1}`}
                                                onChange={(e) => handleServiceChange(index, e.target.value)}
                                            /> */}
                                            <TextArea
                                                rows={4}
                                                className="rounded border"
                                                value={service}
                                                placeholder={`Service ${index + 1}`}
                                                onChange={(e) => handleServiceChange(index, e.target.value)}
                                            />
                                            {services.length > 1 && (
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<FaTimes />}
                                                    onClick={() => handleRemoveService(index)}
                                                    className="shrink-0"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={handleAddService}
                                        icon={<FaPlus />}
                                        className="w-full mt-2"
                                    >
                                        Add Service
                                    </Button>
                                    <div className="text-xs text-gray-500 mt-2">
                                        Add all services included in this package. Empty services will be ignored.
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {/* Preview Section */}
                        {/* {title || person || price > 0 || services.some(s => s.trim()) ? (
                            <Col span={24}>
                                <h3 className="text-lg font-bold mb-4 border-b pb-2">Preview</h3>
                            </Col>
                        ) : null}

                        {title || person || price > 0 || services.some(s => s.trim()) ? (
                            <Col xs={24} sm={24} md={24}>
                                <Row className="bg-white mb-4">
                                    <Col xs={24} sm={24} md={4} className="flex justify-start mr-4 bg-white">
                                        <label className="font-bold">
                                            Package Preview
                                        </label>
                                    </Col>
                                    <Col xs={24} sm={24} md={12}>
                                        <Card className="border border-blue-200 bg-blue-50">
                                            <div className="space-y-3">
                                                {title && (
                                                    <div>
                                                        <span className="font-bold">Title: </span>
                                                        <span>{title}</span>
                                                    </div>
                                                )}
                                                {person && (
                                                    <div>
                                                        <span className="font-bold">Person: </span>
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                            {person}
                                                        </span>
                                                    </div>
                                                )}
                                                {price > 0 && (
                                                    <div>
                                                        <span className="font-bold">Price: </span>
                                                        <span className="text-green-600 font-bold">
                                                            ₹{price.toLocaleString('en-IN')}
                                                        </span>
                                                    </div>
                                                )}
                                                {services.filter(s => s.trim()).length > 0 && (
                                                    <div>
                                                        <span className="font-bold">Services: </span>
                                                        <ul className="mt-1 space-y-1">
                                                            {services.filter(s => s.trim()).map((service, index) => (
                                                                <li key={index} className="flex items-start">
                                                                    <span className="text-blue-500 mr-2">•</span>
                                                                    <span>{service}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        ) : null} */}

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
                                        <span className="ml-2!">Updating Package...</span>
                                    </div>
                                ) : (
                                    "Update Package"
                                )}
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    );
};

export default EditPoojaPackageForm;