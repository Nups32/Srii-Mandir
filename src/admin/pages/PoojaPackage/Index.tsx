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
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { deletePoojaPackage, getPoojaPackages } from "@/utils/API";
// import { format } from "date-fns";

interface PujaPackage {
  _id: string;
  title: string;
  person: string;
  price: number;
  services: string[];
  createdAt: string;
  updatedAt: string;
}

export const PoojaPackageTable = () => {
  const [datasource, setDatasource] = useState<PujaPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchPujaPackages = async () => {
    setLoading(true);
    try {
      const response = await getPoojaPackages();
      if(response.data.status){
          setDatasource(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPujaPackages();
  }, []);

  const handleEditRedirect = (record: PujaPackage) => {
    navigate(`/admin/pooja-package/${record._id}/edit`);
  };

  const showDeleteConfirmation = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deletePoojaPackage(deleteId);
        message.success("Pooja package deleted successfully");
        fetchPujaPackages();
      } catch (error) {
        message.error("Failed to delete pooja package");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    
    if (value.trim() === "") {
      fetchPujaPackages();
    } else {
      const filtered = datasource.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.person.toLowerCase().includes(value.toLowerCase()) ||
        item.services.some(service => 
          service.toLowerCase().includes(value.toLowerCase())
        )
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

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Title
        </div>
      ),
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <div className="font-medium">{text || "-"}</div>
      ),
      sorter: (a: PujaPackage, b: PujaPackage) => a.title.localeCompare(b.title),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Person
        </div>
      ),
      dataIndex: "person",
      key: "person",
      render: (text: string) => (
        <Tag color="blue" className="capitalize">
          {text || "-"}
        </Tag>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Price
        </div>
      ),
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <div className="font-bold text-green-600">
          {formatPrice(price)}
        </div>
      ),
      sorter: (a: PujaPackage, b: PujaPackage) => a.price - b.price,
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Services
        </div>
      ),
      dataIndex: "services",
      key: "services",
      render: (services: string[]) => (
        <div className="max-w-[200px]">
          {services && services.length > 0 ? (
            <>
              {services.slice(0, 2).map((service, index) => (
                <div key={index} className="truncate text-xs mb-1">
                  • {service}
                </div>
              ))}
              {services.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{services.length - 2} more
                </div>
              )}
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Created
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
    //   render: (text: string) => formatDate(text),
      render: (text: string) => (text),
      sorter: (a: PujaPackage, b: PujaPackage) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: PujaPackage) => (
        <div className="flex flex-row items-center space-x-2">
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
        {/* Manage Pooja Packages */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Pooja Packages</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className=''>
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by title, person or services..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add package btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className=''>
              <Link to={"/admin/pooja-package/add"}>
                <button className="flex items-center justify-center py-3 btn-brand w-full">
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add Package</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Card className="container !mt-5">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 800 }}
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
          <p>Are you sure you want to delete this Pooja Package?</p>
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

export default PoojaPackageTable;