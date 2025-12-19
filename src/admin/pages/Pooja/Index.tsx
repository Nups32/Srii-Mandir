import {
    Card,
    Row,
    Table,
    Col,
    Input,
    message,
    Spin,
    Modal,
    Button,
    Tag,
    Switch,
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { getPooja } from "@/utils/API";
// import { format } from "date-fns";

interface Puja {
    _id: string;
    title: string;
    name: string;
    date: string;
    time: string;
    location: string;
    isUpcoming: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    slug: string;
    deity: string[];
    benefits: string[];
    templeDetails?: {
        name: string;
        image: string;
        description: string;
    };
}

export const PoojaTable = () => {
    const [datasource, setDatasource] = useState<Puja[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const fetchPujas = async () => {
        setLoading(true);
        try {
            const response = await getPooja();
            if (response?.data?.status) {
                setDatasource(response.data.data || response);
            }
        } catch (error) {
            message.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPujas();
    }, []);

    const handleEditRedirect = (record: Puja) => {
        navigate(`/admin/pooja/${record._id}/edit`);
    };

    const handleViewDetails = (record: Puja) => {
        navigate(`/admin/pooja/${record._id}`);
    };

    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                // await deletePuja(deleteId);
                message.success("Puja deleted successfully");
                fetchPujas();
            } catch (error) {
                message.error("Failed to delete puja");
            } finally {
                setDeleteId(null);
            }
        }
    };

    const handleStatusChange = async (_record: Puja, field: 'isActive' | 'isUpcoming') => {
        try {
            //   await updatePujaStatus(record._id, {
            //     [field]: !record[field]
            //   });
            message.success(`Puja ${field === 'isActive' ? 'status' : 'upcoming status'} updated`);
            fetchPujas();
        } catch (error) {
            message.error("Failed to update puja status");
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.trim() === "") {
            fetchPujas();
        } else {
            const filtered = datasource.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.location.toLowerCase().includes(value.toLowerCase())
            );
            setDatasource(filtered);
        }
    };

    //   const formatDate = (dateString: string) => {
    //     try {
    //       return format(new Date(dateString), "dd/MM/yyyy");
    //     } catch {
    //       return dateString;
    //     }
    //   };

    const columns = [
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Puja Name
                </div>
            ),
            dataIndex: "name",
            key: "name",
            render: (text: string, record: Puja) => (
                <div>
                    <div className="font-medium">{text}</div>
                    <div className="text-xs text-gray-500">{record.title}</div>
                </div>
            ),
            sorter: (a: Puja, b: Puja) => a.name.localeCompare(b.name),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Date & Time
                </div>
            ),
            key: "datetime",
            render: (record: Puja) => (
                <div>
                    {/* <div>{formatDate(record.date)}</div> */}
                    <div>{record.date}</div>
                    <div className="text-xs text-gray-500">{record.time}</div>
                </div>
            ),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Location
                </div>
            ),
            dataIndex: "location",
            key: "location",
            render: (text: string) => (
                <div className="max-w-[150px] truncate" title={text}>
                    {text || "-"}
                </div>
            ),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Deities
                </div>
            ),
            dataIndex: "deity",
            key: "deity",
            render: (deities: string[]) => (
                <div className="max-w-[150px]">
                    {deities && deities.length > 0 ? (
                        deities.slice(0, 2).map((deity, index) => (
                            <Tag key={index} color="blue" className="mb-1">
                                {deity}
                            </Tag>
                        ))
                    ) : (
                        "-"
                    )}
                    {deities && deities.length > 2 && (
                        <Tag>+{deities.length - 2}</Tag>
                    )}
                </div>
            ),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Status
                </div>
            ),
            key: "status",
            render: (record: Puja) => (
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs">Active:</span>
                        <Switch
                            size="small"
                            checked={record.isActive}
                            onChange={() => handleStatusChange(record, 'isActive')}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs">Upcoming:</span>
                        <Switch
                            size="small"
                            checked={record.isUpcoming}
                            onChange={() => handleStatusChange(record, 'isUpcoming')}
                        />
                    </div>
                </div>
            ),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Actions
                </div>
            ),
            key: "action",
            render: (_text: any, record: Puja) => (
                <div className="flex flex-row items-center space-x-2">
                    <Button
                        type="link"
                        size="small"
                        onClick={() => handleViewDetails(record)}
                        className="p-0"
                    >
                        View
                    </Button>
                    <FaEdit
                        className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleEditRedirect(record)}
                        title="Edit"
                    />
                    <AiFillDelete
                        className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => showDeleteConfirmation(record._id)}
                        title="Delete"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <Row className="m-2">
                {/* Manage Pujas */}
                <Col
                    xs={24}
                    sm={10}
                    md={10}
                    xl={14}
                    xxl={14}
                    className="flex justify-start font-bold"
                >
                    <h2 className="text-2xl">Manage Pujas</h2>
                </Col>

                <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
                    <Row gutter={16} className="justify-end xs:m-2">
                        {/* search */}
                        <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
                            <Input
                                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                                size="large"
                                className="w-full"
                                placeholder="Search by name, title or location..."
                                allowClear
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </Col>

                        {/* add puja btn */}
                        <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
                            <Link to={"/admin/pooja/add"}>
                                <button className="flex items-center justify-center py-3 btn-brand w-full">
                                    <RiAddBoxFill style={{ fontSize: "15px" }} />
                                    <div className="ml-1">Add Pooja</div>
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Card className="container mt-5!">
                    <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                        <Spin spinning={loading}>
                            <Table
                                scroll={{ x: 1000 }}
                                columns={columns}
                                dataSource={datasource}
                                rowKey="_id"
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "20", "50", "100"],
                                    showTotal: (total, range) =>
                                        `${range[0]}-${range[1]} of ${total} items`,
                                }}
                            />
                        </Spin>
                    </Col>
                </Card>
            </Row>

            <Modal
                title="Confirm Deletion"
                open={!!deleteId}
                onCancel={() => setDeleteId(null)}
                footer={null}
                centered
            >
                <div style={{ textAlign: "start", marginBottom: "1rem" }}>
                    <p>Are you sure you want to delete this Puja?</p>
                    <p className="text-gray-500 text-sm mt-2">
                        This action cannot be undone.
                    </p>
                </div>
                <div style={{ textAlign: "end" }}>
                    <Button
                        onClick={() => setDeleteId(null)}
                        className="rounded mr-3"
                        style={{
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        type="primary"
                        className="rounded"
                        danger
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default PoojaTable;