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
  Badge,
  Select,
  Image,
  Tooltip,
  Popconfirm,
} from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts, updateProductStatus } from "@/utils/API";

const { Option } = Select;

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ProductTable = () => {
  const [datasource, setDatasource] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      if (response.data.status) {
        setDatasource(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and filters
  const getFilteredProducts = () => {
    let filtered = datasource;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      const statusValue = statusFilter === "active";
      filtered = filtered.filter((item) => item.isActive === statusValue);
    }

    return filtered;
  };

  const handleEditRedirect = (record: Product) => {
    navigate(`/admin/product/${record._id}/edit`);
  };

  const handleViewDetails = (record: Product) => {
    setSelectedProduct(record);
    setViewModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteProduct(deleteId);
        message.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        message.error("Failed to delete product");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: Product) => {
    try {
      await updateProductStatus(record._id, {
        isActive: !record.isActive,
      });
      message.success(
        `Product ${record.isActive ? "deactivated" : "activated"} successfully`
      );
      fetchProducts();
    } catch (error) {
      message.error("Failed to update product status");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "puja":
        return "blue";
      case "yantra":
        return "purple";
      case "rudraksha":
        return "green";
      case "idol":
        return "orange";
      case "book":
        return "cyan";
      case "spiritual-kit":
        return "magenta";
      case "dhan-basra-potli":
        return "red";
      default:
        return "default";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Product
        </div>
      ),
      key: "product",
      render: (record: Product) => (
        <div className="flex items-center space-x-3">
          {record.images && record.images.length > 0 ? (
            <Image
              width={50}
              height={50}
              src={`${import.meta.env.VITE_APP_Image_URL}/product/${record.images[0]}`}
              alt={record.name}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500 truncate max-w-[200px]">
              {record.description || "No description"}
            </div>
          </div>
        </div>
      ),
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Category
        </div>
      ),
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <Tag color={getCategoryColor(category)} className="capitalize">
          {getCategoryLabel(category)}
        </Tag>
      ),
      sorter: (a: Product, b: Product) => a.category.localeCompare(b.category),
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
        <div className="font-bold text-lg">₹{price?.toLocaleString("en-IN")}</div>
      ),
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Status
        </div>
      ),
      key: "status",
      render: (record: Product) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge
              status={record.isActive ? "success" : "error"}
              text={record.isActive ? "Active" : "Inactive"}
            />
            <Popconfirm
              title={`Are you sure you want to ${
                record.isActive ? "deactivate" : "activate"
              } this product?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="link">
                {record.isActive ? "Deactivate" : "Activate"}
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Added On
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
      sorter: (a: Product, b: Product) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: Product) => (
        <div className="flex flex-row items-center space-x-3">
          <Tooltip title="View Details">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
              className="p-0"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <AiFillEdit
              className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={() => handleEditRedirect(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <AiFillDelete
              className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => setDeleteId(record._id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const filteredProducts = getFilteredProducts();

  // Calculate statistics
  const totalProducts = filteredProducts.length;
  const activeProducts = filteredProducts.filter(
    (item) => item.isActive
  ).length;
  const averagePrice =
    totalProducts > 0
      ? filteredProducts.reduce((sum, item) => sum + item.price, 0) /
        totalProducts
      : 0;

  const categoryCounts = filteredProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Products */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Products</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className="">
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by name or description..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add product btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className="">
              <Link to={"/admin/product/add"}>
                <button className="flex items-center justify-center py-3 btn-brand w-full">
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add Product</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">
              Filter by Category
            </div>
            <Select
              className="w-full"
              placeholder="All Categories"
              value={categoryFilter}
              onChange={setCategoryFilter}
              allowClear
            >
              <Option value="all">All Categories</Option>
              <Option value="puja">Puja Items</Option>
              <Option value="yantra">Yantra</Option>
              <Option value="rudraksha">Rudraksha</Option>
              <Option value="idol">Idol</Option>
              <Option value="book">Books</Option>
              <Option value="spiritual-kit">Spiritual Kits</Option>
              <Option value="dhan-basra-potli">Dhan Basra Potli</Option>
            </Select>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">
              Filter by Status
            </div>
            <div className="flex flex-wrap gap-1">
              <Tag
                color={statusFilter === "all" ? "blue" : "default"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Tag>
              <Tag
                color={statusFilter === "active" ? "green" : "default"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("active")}
              >
                Active
              </Tag>
              <Tag
                color={statusFilter === "inactive" ? "orange" : "default"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("inactive")}
              >
                Inactive
              </Tag>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Total Products</div>
              <div className="text-lg font-bold">{totalProducts}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Active Products</div>
              <div className="text-lg font-bold text-green-600">
                {activeProducts}
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Average Price</div>
              <div className="text-lg font-bold">
                ₹{averagePrice.toFixed(2)}
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Categories</div>
              <div className="text-lg font-bold">
                {Object.keys(categoryCounts).length}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Category Distribution */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-xs font-medium text-gray-500 mb-2">
              Category Distribution
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div
                  key={category}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded"
                >
                  <Tag color={getCategoryColor(category)} className="capitalize">
                    {getCategoryLabel(category)}
                  </Tag>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Card className="container mt-5!">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 1000 }}
                columns={columns}
                dataSource={filteredProducts}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} products`,
                }}
              />
            </Spin>
          </Col>
        </Card>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        footer={null}
        centered
      >
        <div style={{ textAlign: "start", marginBottom: "1rem" }}>
          <p>Are you sure you want to delete this product?</p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone. All product data including images will
            be permanently deleted.
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
          <Button onClick={handleDelete} type="primary" className="rounded" danger>
            Delete
          </Button>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal
        title="Product Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
        centered
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Product Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Tag color={getCategoryColor(selectedProduct.category)} className="capitalize">
                    {getCategoryLabel(selectedProduct.category)}
                  </Tag>
                  <Badge
                    status={selectedProduct.isActive ? "success" : "error"}
                    text={selectedProduct.isActive ? "Active" : "Inactive"}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ₹{selectedProduct.price?.toLocaleString("en-IN")}
                </div>
                <div className="text-sm text-gray-500">
                  Price
                </div>
              </div>
            </div>

            {/* Product Images */}
            {selectedProduct.images && selectedProduct.images.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-3">Product Images</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.images.map((image, index) => (
                    <Image
                      key={index}
                      width={100}
                      height={100}
                      src={image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className="rounded-md object-cover"
                      fallback="https://via.placeholder.com/100"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Product Description */}
            <div>
              <h4 className="text-lg font-bold mb-3">Description</h4>
              <div className="bg-gray-50 p-4 rounded">
                {selectedProduct.description || "No description available"}
              </div>
            </div>

            {/* Product Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Category</div>
                <div className="font-medium">
                  {getCategoryLabel(selectedProduct.category)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="font-medium">
                  <Badge
                    status={selectedProduct.isActive ? "success" : "error"}
                    text={selectedProduct.isActive ? "Active" : "Inactive"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Created On</div>
                <div className="font-medium">
                  {formatDate(selectedProduct.createdAt)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Last Updated</div>
                <div className="font-medium">
                  {formatDate(selectedProduct.updatedAt)}
                </div>
              </div>
            </div>

            {/* Raw Data (Optional) */}
            <div className="border-t pt-4 mt-4">
              <details>
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                  View Raw Data
                </summary>
                <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(selectedProduct, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;