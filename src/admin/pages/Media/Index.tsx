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
    Select,
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { deleteMedia, getAllMedia, updateMediaStatus } from "@/utils/API";

const { Option } = Select;

interface Media {
    _id: string;
    name: string;
    media: 'video' | 'Media';
    type: 'vedicMantra' | 'song';
    file: string;
    isPaid: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const MediaTable = () => {
    const [datasource, setDatasource] = useState<Media[]>([]);
    const [filteredData, setFilteredData] = useState<Media[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const [mediaFilter, setMediaFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const navigate = useNavigate();

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const response = await getAllMedia();
            if (response && response.data.status) {
                setDatasource(response.data.data);
                setFilteredData(response.data.data);
            }
        } catch (error) {
            message.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    // Apply filters whenever filters change
    useEffect(() => {
        let filtered = datasource;

        // Search filter
        if (searchText) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Media type filter
        if (mediaFilter !== "all") {
            filtered = filtered.filter(item => item.media === mediaFilter);
        }

        // Media content type filter
        if (typeFilter !== "all") {
            filtered = filtered.filter(item => item.type === typeFilter);
        }

        // Status filter
        if (statusFilter !== "all") {
            const statusValue = statusFilter === "active";
            filtered = filtered.filter(item => item.isActive === statusValue);
        }

        setFilteredData(filtered);
    }, [datasource, searchText, mediaFilter, typeFilter, statusFilter]);

    const handleEditRedirect = (record: Media) => {
        navigate(`/admin/media/${record._id}/edit`);
    };

    // const handleViewDetails = (record: Media) => {
    //     navigate(`/admin/media/${record._id}`);
    // };

    const showDeleteConfirmation = (id: string) => {
        setDeleteId(id);
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteMedia(deleteId);
                message.success("Media deleted successfully");
                fetchMedia();
            } catch (error) {
                message.error("Failed to delete media");
            } finally {
                setDeleteId(null);
            }
        }
    };

    const handleStatusChange = async (record: Media, field: 'isActive' | 'isPaid') => {
        try {
            await updateMediaStatus(record._id, {
                [field]: !record[field]
            });
            message.success(`Media ${field === 'isActive' ? 'status' : 'payment status'} updated`);
            fetchMedia();
        } catch (error) {
            message.error("Failed to update media status");
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const getMediaTypeColor = (type: string) => {
        switch (type) {
            case 'video': return 'blue';
            case 'Media': return 'green';
            default: return 'default';
        }
    };

    const getMediaContentColor = (type: string) => {
        switch (type) {
            case 'vedicMantra': return 'purple';
            case 'song': return 'orange';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Name
                </div>
            ),
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <div className="font-medium">{text || "-"}</div>
            ),
            sorter: (a: Media, b: Media) => a.name.localeCompare(b.name),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Media Type
                </div>
            ),
            dataIndex: "media",
            key: "media",
            render: (text: string) => (
                <Tag color={getMediaTypeColor(text)} className="capitalize">
                    {text || "-"}
                </Tag>
            ),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    Content Type
                </div>
            ),
            dataIndex: "type",
            key: "type",
            render: (text: string) => (
                <Tag color={getMediaContentColor(text)} className="capitalize">
                    {text ? text.replace(/([A-Z])/g, ' $1').trim() : "-"}
                </Tag>
            ),
        },
        {
            title: (
                <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
                    File
                </div>
            ),
            dataIndex: "file",
            key: "file",
            render: (text: string) => (
                <div className="max-w-[150px] truncate" title={text}>
                    {text || "-"}
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
            render: (record: Media) => (
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
                        <span className="text-xs">Paid:</span>
                        <Switch
                            size="small"
                            checked={record.isPaid}
                            onChange={() => handleStatusChange(record, 'isPaid')}
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
            render: (_text: any, record: Media) => (
                <div className="flex flex-row items-center space-x-2">
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => handleViewDetails(record)}
                        className="p-0"
                    >
                        View
                    </Button> */}
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
                {/* Manage Media */}
                <Col
                    xs={24}
                    sm={10}
                    md={10}
                    xl={14}
                    xxl={14}
                    className="flex justify-start font-bold"
                >
                    <h2 className="text-2xl">Manage Media</h2>
                </Col>

                <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
                    <Row gutter={16} className="justify-end xs:m-2">
                        {/* search */}
                        <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
                            <Input
                                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                                size="large"
                                className="w-full"
                                placeholder="Search by name..."
                                allowClear
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </Col>

                        {/* add media btn */}
                        <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
                            <Link to={"/admin/media/add"}>
                                <button className="flex items-center justify-center py-3 btn-brand w-full">
                                    <RiAddBoxFill style={{ fontSize: "15px" }} />
                                    <div className="ml-1">Add Media</div>
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Filters Row */}
            <Row className="m-2 mt-4" gutter={16}>
                <Col xs={24} sm={8} md={6} xl={6} xxl={6}>
                    <Select
                        className="w-full"
                        size="large"
                        placeholder="Filter by Media Type"
                        value={mediaFilter}
                        onChange={setMediaFilter}
                        // allowClear
                    >
                        <Option value="all">All Media Types</Option>
                        <Option value="video">Video</Option>
                        <Option value="audio">Audio</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={8} md={6} xl={6} xxl={6}>
                    <Select
                        className="w-full"
                        size="large"
                        placeholder="Filter by Content Type"
                        value={typeFilter}
                        onChange={setTypeFilter}
                        // allowClear
                    >
                        <Option value="all">All Content Types</Option>
                        <Option value="vedicMantra">Vedic Mantra</Option>
                        <Option value="song">Song</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={8} md={6} xl={6} xxl={6}>
                    <Select
                        className="w-full"
                        size="large"
                        placeholder="Filter by Status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        // allowClear
                    >
                        <Option value="all">All Status</Option>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Col>
            </Row>

            <Row>
                <Card className="container !mt-5">
                    <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                        <Spin spinning={loading}>
                            <Table
                                scroll={{ x: 800 }}
                                columns={columns}
                                dataSource={filteredData}
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
                    <p>Are you sure you want to delete this Media?</p>
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

export default MediaTable;