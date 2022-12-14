import React, { useEffect, useState } from "react";
import './Services.scss';
//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table,
    Spinner,
    Modal
} from "react-bootstrap";

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router-dom";

//Api
import { usePostCreateServiceMutation, useGetAllServicesQuery } from "../../../../services/slices/serves/servesApi";

//pagination
import CustomPagination from "../../../customPagination/CustomPagination";

//Momentjs
import moment from "moment";

const Services = () => {

    // local state
    const [active, setActive] = useState(1);

    //pageination

    const handlePaginationClick = (number) => {
        refetch();

        setActive(number);
    };

    //Service Data
    const [services, setServices] = useState([]);

    const {
        data: serviceData = [],
        refetch,
        isFetching,
    } = useGetAllServicesQuery();

    useEffect(() => {
        if (!isFetching) {
            setServices(serviceData);
        }
    }, [isFetching]);

    //Create Serivce
    const [addNewService, setNewService] = useState({
        serviceName: "",
        serviceDescription: "",
        price: "",
        type: "",
        "categoryId": 0,
        createAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updateAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    const [newService] = usePostCreateServiceMutation();
    const [showCreateService, setShowCreateService] = useState(false);

    const handleCreate = async () => {
        try {
            await newService(addNewService)
                .unwrap()
        } catch (error) {
            console.log("Show error: ", error)
        }
    }

    const [validation, setValidation] = useState({
        serviceName: {
            message: "",
            isInvalid: false,
        },
        serviceDescription: {
            message: "",
            isInvalid: false,
        },
        description: {
            message: "",
            isInvalid: false,
        },
        time: {
            message: "",
            isInvalid: false,
        },
        slot: {
            message: "",
            isInvalid: false,
        },
        street: {
            message: "",
            isInvalid: false,
        },
    });

    const handleCreateServiceChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name == "serviceName") {
            if (value === "") {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "T??n d???ch v??? kh??ng ???????c ????? tr???ng",
                        isInvalid: true,
                    },
                });
                return;
            } else {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "",
                        isInvalid: false,
                    },
                });
                return;
            }
        }

        if (name == "serviceDescription") {
            if (value.length > 200) {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "S??? l?????ng t??? qu?? gi???i h???n",
                        isInvalid: true,
                    },
                });
                return;
            } else {
                setNewService({ ...addNewService, [name]: value });
                setValidation({
                    ...validation,
                    serviceName: {
                        message: "",
                        isInvalid: false,
                    },
                });
                return;
            }
        }
    }

    return (

        < React.Fragment >
            <Container fluid className="service-main-container">
                <Card body className="service-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh s??ch ????n</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>T??m ki???m theo t??n:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name="search"
                                />
                                <Button>
                                    T??m ki???m
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <Button onClick={() => {
                                setShowCreateService(true);
                            }} >
                                T???o d???ch v??? m???i
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <Button
                                // disabled={isFetching}
                                style={{ width: "100%" }}
                                variant="dark"
                                onClick={() => {
                                    refetch();
                                }}
                            >
                                T???i l???i d??? li???u{" "}
                                <RefreshIcon />
                            </Button>
                        </Col>
                    </Row>

                    {/* Danh s??ch ????n */}
                    <Row className="mt-2">
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">??ang t???i d??? li???u...</div>
                        </div>) : (
                            <Col className="table-container">
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>M?? d???ch v???</th>
                                            <th>T??n d???ch v???</th>
                                            <th>M?? t??? d???ch v???</th>
                                            <th>Gi?? c???</th>
                                            <th>Th???i gian t???o</th>
                                            <th>Th???i gian c???p nh???t</th>
                                            <th>Lo???i d???ch v???</th>
                                            <th>C???p nh???t</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services
                                            .slice(10 * (active - 1), 10 * active)
                                            .map((service, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{service.serviceId}</td>
                                                        <td>{service.serviceName}</td>
                                                        <td>{service.serviceDescription}</td>
                                                        <td>{service.price}</td>
                                                        <td>
                                                            {moment(service.createAt).format("MM/DD/YYYY")}
                                                        </td>
                                                        <td>
                                                            {moment(service.updateAt).format("MM/DD/YYYY")}
                                                        </td>
                                                        <td>{service.categoryName}</td>
                                                        <td>C???p nh???t</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        )}
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <CustomPagination
                                count={Math.ceil(services.length / 10)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>

            {/*?????i tr???ng th??i ????n */}
            < Modal
                show={showCreateService}
                onHide={() => {
                    setShowCreateService(false);
                }}
                centered
                dialogClassName="change-status-modal"
            >
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card.Title>T???o d???ch v??? m???i</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col>
                            <Form.Group controlId="formCreateBookingDescription">
                                <Form.Label>
                                    T??n d???ch v???
                                </Form.Label>
                                <Form.Control
                                    isInvalid={validation.description.isInvalid}
                                    as="textarea"
                                    rows={5}
                                    name="description"
                                    onChange={handleCreateServiceChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {validation.description.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCreateService(false);
                        }}
                    >
                        H???y
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowCreateService(false);
                            handleCreate()
                        }}
                    >
                        X??c nh???n
                    </Button>
                </Modal.Footer>
            </Modal >
        </React.Fragment >
    );
}

export default Services;