import React, { useState, useEffect } from "react";
import {
    Table,
    Card,
    Row,
    Col,
    Tag,
    Button,
    Modal,
    message,
    Space,
    Image,
    Dropdown,
} from "antd";
import type { MenuProps } from "antd";
import {
    // FaEye,
    FaEdit,
    FaTrash,
    FaEllipsisV,
    FaPlus,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllShaktiSanyansis, deleteShaktiSanyansi, toggleShaktiSanyansiStatus } from "@/utils/API";
import dayjs from "dayjs";

interface ShaktiSanyansi {
    _id: string;
    name: string;
    subTitle?: string;
    quote?: string;
    description: string;
    image: string;
    teaching: string[];
    practice: Array<{
        title: string;
        description: string[];
    }>;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const ShaktiSanyansiIndex: React.FC = () => {
    const [sanyansis, setSanyansis] = useState<ShaktiSanyansi[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [statusLoading, setStatusLoading] = useState<string | null>(null);

    const fetchSanyansis = async () => {
        setLoading(true);
        try {
            const response = await getAllShaktiSanyansis();
            if (response.data.status) {
                setSanyansis(response.data.data);
            } else {
                message.error(response.data.message || "Failed to fetch Shakti Sanyansis");
            }
        } catch (error: any) {
            console.error("Error fetching Shakti Sanyansis:", error);
            message.error("Failed to load Shakti Sanyansis");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSanyansis();
    }, []);

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this Shakti Sanyansi?",
            content: "This action cannot be undone. All associated data will be deleted.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: async () => {
                setDeleteLoading(id);
                try {
                    const response = await deleteShaktiSanyansi(id);
                    if (response.data.status) {
                        message.success("Shakti Sanyansi deleted successfully");
                        fetchSanyansis();
                    } else {
                        message.error(response.data.message || "Failed to delete Shakti Sanyansi");
                    }
                } catch (error: any) {
                    console.error("Error deleting Shakti Sanyansi:", error);
                    message.error("Failed to delete Shakti Sanyansi");
                } finally {
                    setDeleteLoading(null);
                }
            },
        });
    };

    const handleToggleStatus = async (id: string) => {
        setStatusLoading(id);
        try {
            const response = await toggleShaktiSanyansiStatus(id);
            if (response.data.status) {
                message.success(response.data.message);
                fetchSanyansis();
            } else {
                message.error(response.data.message || "Failed to update status");
            }
        } catch (error: any) {
            console.error("Error toggling status:", error);
            message.error("Failed to update status");
        } finally {
            setStatusLoading(null);
        }
    };

    const getDropdownItems = (record: ShaktiSanyansi): MenuProps['items'] => [
        // {
        //     key: 'view',
        //     label: (
        //         <Link to={`/admin/shakti-sanyansi/${record._id}/view`}>
        //             View Details
        //         </Link>
        //     ),
        //     icon: <FaEye />,
        // },
        {
            key: 'edit',
            label: (
                <Link to={`/admin/shakti-sanyansi/${record._id}/edit`}>
                    Edit
                </Link>
            ),
            icon: <FaEdit />,
        },
        {
            key: 'status',
            label: record.isActive ? 'Deactivate' : 'Activate',
            icon: record.isActive ? <FaToggleOff /> : <FaToggleOn />,
            onClick: () => handleToggleStatus(record._id),
            disabled: statusLoading === record._id,
        },
        {
            type: 'divider',
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <FaTrash />,
            danger: true,
            onClick: () => handleDelete(record._id),
            disabled: deleteLoading === record._id,
        },
    ];

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: 80,
            render: (image: string) => (
                <Image
                    src={`${import.meta.env.VITE_APP_Image_URL}/shakti-sanyansi/${image}`}
                    alt="Shakti Sanyansi"
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                    fallback="/placeholder-image.jpg"
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: ShaktiSanyansi) => (
                <div>
                    <div className="font-semibold">{name}</div>
                    {record.subTitle && (
                        <div className="text-sm text-gray-500">{record.subTitle}</div>
                    )}
                </div>
            ),
        },
        {
            title: "Teachings",
            dataIndex: "teaching",
            key: "teaching",
            render: (teaching: string[]) => (
                <div className="max-w-xs">
                    {teaching && teaching.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {teaching.slice(0, 2).map((item, index) => (
                                <Tag key={index} color="blue" className="mb-1">
                                    {item.length > 20 ? `${item.substring(0, 20)}...` : item}
                                </Tag>
                            ))}
                            {teaching.length > 2 && (
                                <Tag>+{teaching.length - 2} more</Tag>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-400">No teachings</span>
                    )}
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            width: 100,
            render: (isActive: boolean) => (
                <Tag color={isActive ? "green" : "red"}>
                    {isActive ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Created",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            render: (date: string) => dayjs(date).format("DD/MM/YY"),
        },
        {
            title: "Actions",
            key: "actions",
            width: 100,
            align: "center" as const,
            render: (_: any, record: ShaktiSanyansi) => (
                <Space size="small">
                    <Dropdown
                        menu={{ items: getDropdownItems(record) }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button
                            type="text"
                            icon={<FaEllipsisV />}
                            loading={deleteLoading === record._id || statusLoading === record._id}
                        />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Row className="mb-4" justify="space-between" align="middle">
                <Col>
                    <h2 className="text-2xl font-bold">Shakti Sanyansi</h2>
                    <p className="text-gray-500">Manage Shakti Sanyansi teachings and practices</p>
                </Col>
                <Col>
                    <Link to="/admin/shakti-sanyansi/add">
                        <Button type="primary" icon={<FaPlus />}>
                            Add New
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Card>
                <Table
                    columns={columns}
                    dataSource={sanyansis}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{ x: 1000 }}
                />
            </Card>
        </div>
    );
};

export default ShaktiSanyansiIndex;