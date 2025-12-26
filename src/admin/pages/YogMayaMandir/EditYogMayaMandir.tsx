import React, { useState, useEffect } from "react";
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
  Button,
  Space,
  Divider,
  Collapse,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getYogMayaMandirById, updateYogMayaMandir } from "@/utils/API";

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

interface UnderstandingYog {
  title: string;
  description: string;
}

interface MeditationPractice {
  type: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  duration: string;
  step: string[];
  benefit: string;
}

interface Wisdom {
  title: string;
  wisdom: string;
  understanding: string;
}

interface YogMayaMandirData {
  _id: string;
  understandingYog: UnderstandingYog[];
  meditationPractices: MeditationPractice[];
  wisdoms: Wisdom[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const EditYogMayaMandirForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Form states
  const [understandingYog, setUnderstandingYog] = useState<UnderstandingYog[]>([]);
  const [meditationPractices, setMeditationPractices] = useState<MeditationPractice[]>([]);
  const [wisdoms, setWisdoms] = useState<Wisdom[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activePanels, setActivePanels] = useState<string[]>(['1', '2', '3']);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setFetching(true);
      try {
        const response = await getYogMayaMandirById(id);
        if (response.data.status) {
          const data: YogMayaMandirData = response.data.data;

          setUnderstandingYog(data.understandingYog || []);
          setMeditationPractices(data.meditationPractices || []);
          setWisdoms(data.wisdoms || []);
          setIsActive(data.isActive !== undefined ? data.isActive : true);
        } else {
          message.error("Failed to load content");
          navigate("/admin/yog-maya-mandir");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        message.error("Failed to load content data");
        navigate("/admin/yog-maya-mandir");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!id) return;

    // Validate required fields
    if (understandingYog.length === 0) {
      message.error("Please add at least one Yog understanding section");
      return;
    }

    if (meditationPractices.length === 0) {
      message.error("Please add at least one Meditation practice");
      return;
    }

    if (wisdoms.length === 0) {
      message.error("Please add at least one Wisdom teaching");
      return;
    }

    // Validate each section
    for (let i = 0; i < understandingYog.length; i++) {
      if (!understandingYog[i].title?.trim() || !understandingYog[i].description?.trim()) {
        message.error(`Please fill all fields in Yog Understanding section ${i + 1}`);
        return;
      }
    }

    for (let i = 0; i < meditationPractices.length; i++) {
      const practice = meditationPractices[i];
      if (!practice.title?.trim() || !practice.duration?.trim() || 
          practice.step.length === 0 || !practice.benefit?.trim()) {
        message.error(`Please fill all fields in Meditation Practice ${i + 1}`);
        return;
      }
    }

    for (let i = 0; i < wisdoms.length; i++) {
      if (!wisdoms[i].title?.trim() || !wisdoms[i].wisdom?.trim()) {
        message.error(`Please fill all fields in Wisdom ${i + 1}`);
        return;
      }
    }

    setLoading(true);
    try {
      const formData = {
        understandingYog: understandingYog.map(yog => ({
          title: yog.title.trim(),
          description: yog.description.trim()
        })),
        meditationPractices: meditationPractices.map(practice => ({
          type: practice.type,
          title: practice.title.trim(),
          duration: practice.duration.trim(),
          step: practice.step.filter(step => step.trim()).map(step => step.trim()),
          benefit: practice.benefit.trim()
        })),
        wisdoms: wisdoms.map(wisdom => ({
          title: wisdom.title.trim(),
          wisdom: wisdom.wisdom.trim(),
          understanding: wisdom.understanding?.trim() || ""
        })),
        isActive
      };

      const res = await updateYogMayaMandir(id, formData);
      if (res.data.status) {
        message.success("Yog Maya Mandir content updated successfully");
        navigate("/admin/yog-maya-mandir");
      } else {
        message.error(res.data.message || "Server Error");
      }
    } catch (error: any) {
      console.error("Error updating content:", error);
      message.error(error.response?.data?.message || "Failed to update content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Understanding Yog handlers
  const addUnderstandingYog = () => {
    setUnderstandingYog([...understandingYog, { title: "", description: "" }]);
  };

  const removeUnderstandingYog = (index: number) => {
    if (understandingYog.length > 1) {
      const newList = [...understandingYog];
      newList.splice(index, 1);
      setUnderstandingYog(newList);
    }
  };

  const updateUnderstandingYog = (index: number, field: keyof UnderstandingYog, value: string) => {
    const newList = [...understandingYog];
    newList[index] = { ...newList[index], [field]: value };
    setUnderstandingYog(newList);
  };

  // Meditation Practice handlers
  const addMeditationPractice = () => {
    setMeditationPractices([
      ...meditationPractices, 
      { type: 'beginner', title: "", duration: "", step: [""], benefit: "" }
    ]);
  };

  const removeMeditationPractice = (index: number) => {
    if (meditationPractices.length > 1) {
      const newList = [...meditationPractices];
      newList.splice(index, 1);
      setMeditationPractices(newList);
    }
  };

  const updateMeditationPractice = (index: number, field: keyof MeditationPractice, value: any) => {
    const newList = [...meditationPractices];
    newList[index] = { ...newList[index], [field]: value };
    setMeditationPractices(newList);
  };

  const addStepToPractice = (practiceIndex: number) => {
    const newList = [...meditationPractices];
    newList[practiceIndex].step.push("");
    setMeditationPractices(newList);
  };

  const removeStepFromPractice = (practiceIndex: number, stepIndex: number) => {
    const newList = [...meditationPractices];
    if (newList[practiceIndex].step.length > 1) {
      newList[practiceIndex].step.splice(stepIndex, 1);
      setMeditationPractices(newList);
    }
  };

  const updateStepInPractice = (practiceIndex: number, stepIndex: number, value: string) => {
    const newList = [...meditationPractices];
    newList[practiceIndex].step[stepIndex] = value;
    setMeditationPractices(newList);
  };

  // Wisdom handlers
  const addWisdom = () => {
    setWisdoms([...wisdoms, { title: "", wisdom: "", understanding: "" }]);
  };

  const removeWisdom = (index: number) => {
    if (wisdoms.length > 1) {
      const newList = [...wisdoms];
      newList.splice(index, 1);
      setWisdoms(newList);
    }
  };

  const updateWisdom = (index: number, field: keyof Wisdom, value: string) => {
    const newList = [...wisdoms];
    newList[index] = { ...newList[index], [field]: value };
    setWisdoms(newList);
  };

  const handlePanelChange = (keys: string | string[]) => {
    setActivePanels(Array.isArray(keys) ? keys : [keys]);
  };

  const moveItemUp = (list: any[], setList: Function, index: number) => {
    if (index > 0) {
      const newList = [...list];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      setList(newList);
    }
  };

  const moveItemDown = (list: any[], setList: Function, index: number) => {
    if (index < list.length - 1) {
      const newList = [...list];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setList(newList);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
        <span className="ml-4">Loading content data...</span>
      </div>
    );
  }

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col xs={17} sm={17} md={20} xl={20} xxl={20}>
          <h2 className="text-2xl font-bold">Edit Yog Maya Mandir Content</h2>
        </Col>
        <Col xs={7} sm={7} md={4} xl={4} xxl={4} className="flex justify-end">
          <Link to={"/admin/yog-maya-mandir"}>
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
            
            {/* Main Collapse for Sections */}
            <Col span={24}>
              <Collapse 
                activeKey={activePanels}
                onChange={handlePanelChange}
                accordion={false}
                className="mb-4"
              >
                {/* Understanding Yog Section */}
                <Panel 
                  header={
                    <div className="text-lg font-bold">
                      Understanding Yog Sections ({understandingYog.length})
                    </div>
                  } 
                  key="1"
                >
                  <div className="space-y-4">
                    {understandingYog.map((yog, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-lg">Yog Section {index + 1}</h4>
                          <Space>
                            <Button
                              type="text"
                              icon={<FaArrowUp />}
                              onClick={() => moveItemUp(understandingYog, setUnderstandingYog, index)}
                              disabled={index === 0}
                              size="small"
                            />
                            <Button
                              type="text"
                              icon={<FaArrowDown />}
                              onClick={() => moveItemDown(understandingYog, setUnderstandingYog, index)}
                              disabled={index === understandingYog.length - 1}
                              size="small"
                            />
                            <Button
                              type="text"
                              danger
                              icon={<FaTrash />}
                              onClick={() => removeUnderstandingYog(index)}
                              disabled={understandingYog.length === 1}
                              size="small"
                            />
                          </Space>
                        </div>
                        
                        <Row gutter={16}>
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <Input
                                value={yog.title}
                                onChange={(e) => updateUnderstandingYog(index, 'title', e.target.value)}
                                placeholder="Enter yog section title"
                                size="large"
                              />
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Description <span className="text-red-500">*</span>
                              </label>
                              <TextArea
                                rows={4}
                                value={yog.description}
                                onChange={(e) => updateUnderstandingYog(index, 'description', e.target.value)}
                                placeholder="Enter detailed description"
                                showCount
                                maxLength={2000}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    
                    <Button
                      type="dashed"
                      onClick={addUnderstandingYog}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Another Yog Section
                    </Button>
                  </div>
                </Panel>

                {/* Meditation Practices Section */}
                <Panel 
                  header={
                    <div className="text-lg font-bold">
                      Meditation Practices ({meditationPractices.length})
                    </div>
                  } 
                  key="2"
                >
                  <div className="space-y-4">
                    {meditationPractices.map((practice, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-lg">Meditation Practice {index + 1}</h4>
                          <Space>
                            <Button
                              type="text"
                              icon={<FaArrowUp />}
                              onClick={() => moveItemUp(meditationPractices, setMeditationPractices, index)}
                              disabled={index === 0}
                              size="small"
                            />
                            <Button
                              type="text"
                              icon={<FaArrowDown />}
                              onClick={() => moveItemDown(meditationPractices, setMeditationPractices, index)}
                              disabled={index === meditationPractices.length - 1}
                              size="small"
                            />
                            <Button
                              type="text"
                              danger
                              icon={<FaTrash />}
                              onClick={() => removeMeditationPractice(index)}
                              disabled={meditationPractices.length === 1}
                              size="small"
                            />
                          </Space>
                        </div>
                        
                        <Row gutter={16}>
                          <Col span={24} md={12}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <Input
                                value={practice.title}
                                onChange={(e) => updateMeditationPractice(index, 'title', e.target.value)}
                                placeholder="Enter meditation practice title"
                                size="large"
                              />
                            </div>
                          </Col>
                          <Col span={24} md={6}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Type <span className="text-red-500">*</span>
                              </label>
                              <Select
                                value={practice.type}
                                onChange={(value) => updateMeditationPractice(index, 'type', value)}
                                className="w-full"
                                size="large"
                              >
                                <Option value="beginner">Beginner</Option>
                                <Option value="intermediate">Intermediate</Option>
                                <Option value="advanced">Advanced</Option>
                              </Select>
                            </div>
                          </Col>
                          <Col span={24} md={6}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Duration <span className="text-red-500">*</span>
                              </label>
                              <Input
                                value={practice.duration}
                                onChange={(e) => updateMeditationPractice(index, 'duration', e.target.value)}
                                placeholder="e.g., 15 minutes"
                                size="large"
                              />
                            </div>
                          </Col>
                          
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Steps <span className="text-red-500">*</span>
                              </label>
                              {practice.step.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-center mb-2">
                                  <div className="mr-2 font-medium">{stepIndex + 1}.</div>
                                  <Input
                                    value={step}
                                    onChange={(e) => updateStepInPractice(index, stepIndex, e.target.value)}
                                    placeholder={`Step ${stepIndex + 1}`}
                                    className="flex-1"
                                  />
                                  <Button
                                    type="text"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => removeStepFromPractice(index, stepIndex)}
                                    disabled={practice.step.length === 1}
                                    className="ml-2"
                                  />
                                </div>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => addStepToPractice(index)}
                                block
                                icon={<PlusOutlined />}
                                className="mt-2"
                              >
                                Add Step
                              </Button>
                            </div>
                          </Col>
                          
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Benefits <span className="text-red-500">*</span>
                              </label>
                              <TextArea
                                rows={4}
                                value={practice.benefit}
                                onChange={(e) => updateMeditationPractice(index, 'benefit', e.target.value)}
                                placeholder="Describe the benefits of this practice"
                                showCount
                                maxLength={1000}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    
                    <Button
                      type="dashed"
                      onClick={addMeditationPractice}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Another Meditation Practice
                    </Button>
                  </div>
                </Panel>

                {/* Wisdoms Section */}
                <Panel 
                  header={
                    <div className="text-lg font-bold">
                      Wisdom Teachings ({wisdoms.length})
                    </div>
                  } 
                  key="3"
                >
                  <div className="space-y-4">
                    {wisdoms.map((wisdom, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-lg">Wisdom {index + 1}</h4>
                          <Space>
                            <Button
                              type="text"
                              icon={<FaArrowUp />}
                              onClick={() => moveItemUp(wisdoms, setWisdoms, index)}
                              disabled={index === 0}
                              size="small"
                            />
                            <Button
                              type="text"
                              icon={<FaArrowDown />}
                              onClick={() => moveItemDown(wisdoms, setWisdoms, index)}
                              disabled={index === wisdoms.length - 1}
                              size="small"
                            />
                            <Button
                              type="text"
                              danger
                              icon={<FaTrash />}
                              onClick={() => removeWisdom(index)}
                              disabled={wisdoms.length === 1}
                              size="small"
                            />
                          </Space>
                        </div>
                        
                        <Row gutter={16}>
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                              </label>
                              <Input
                                value={wisdom.title}
                                onChange={(e) => updateWisdom(index, 'title', e.target.value)}
                                placeholder="Enter wisdom title"
                                size="large"
                              />
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Wisdom <span className="text-red-500">*</span>
                              </label>
                              <TextArea
                                rows={3}
                                value={wisdom.wisdom}
                                onChange={(e) => updateWisdom(index, 'wisdom', e.target.value)}
                                placeholder="Enter the wisdom quote or teaching"
                                showCount
                                maxLength={500}
                              />
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="mb-3">
                              <label className="block font-medium mb-1">
                                Understanding
                              </label>
                              <TextArea
                                rows={3}
                                value={wisdom.understanding}
                                onChange={(e) => updateWisdom(index, 'understanding', e.target.value)}
                                placeholder="Explain the wisdom or provide context"
                                showCount
                                maxLength={1000}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    
                    <Button
                      type="dashed"
                      onClick={addWisdom}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Another Wisdom
                    </Button>
                  </div>
                </Panel>
              </Collapse>
            </Col>

            {/* Settings Section */}
            <Col span={24} className="mt-6">
              {/* <Divider orientation="left"> */}
              <Divider>
                <h3 className="text-lg font-bold">Settings</h3>
              </Divider>
              
              <Row className="bg-white mb-4">
                <Col
                  xs={24}
                  sm={24}
                  md={4}
                  className="flex justify-start mr-4 bg-white"
                >
                  <label className="font-bold">Status</label>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="flex items-center justify-between">
                    <span>Content Active</span>
                    <Switch checked={isActive} onChange={setIsActive} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {isActive
                      ? "This content will be visible to visitors"
                      : "This content will be hidden from visitors"}
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Summary */}
            <Col span={24} className="mt-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <h4 className="font-bold text-lg mb-2">Content Summary</h4>
                <Row gutter={16}>
                  <Col span={8}>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{understandingYog.length}</div>
                      <div className="text-gray-600">Yog Sections</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{meditationPractices.length}</div>
                      <div className="text-gray-600">Meditation Practices</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{wisdoms.length}</div>
                      <div className="text-gray-600">Wisdom Teachings</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Submit Button */}
            <Col span={24} className="buttons mt-6">
              <button
                disabled={loading}
                className={`btn-brand !py-2 !px-3 cursor-pointer ${loading && "!bg-gray-800"}`}
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Spin size="small" />
                    <span className="!ml-2">Updating Content...</span>
                  </div>
                ) : (
                  "Update Yog Maya Mandir Content"
                )}
              </button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default EditYogMayaMandirForm;