import React, { useEffect, useState } from "react";
import './Customer.scss';
import { useNavigate } from "react-router-dom";

import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Row,
    Table,
    Tooltip,
    Spinner,
} from "react-bootstrap";
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';

//Api
import { useGetAllCustomersQuery } from "../../../../services/slices/customer/customerApi";


const Customer = () => {

    // local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [Customers, setCustomers] = useState([]);

    //Api
    const {
        data: customersData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetAllCustomersQuery();

    useEffect(() => {
        if (!isFetching) {
            setCustomers(customersData)
        }
    }, [isFetching]);

    return (
        <React.Fragment>
            <Container fluid className="customer-container">
                <Card body className="customer-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh sách khách hàng</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>Tìm kiếm theo tên:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name="search"
                                />
                                <Button>
                                    Tìm kiếm
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label>Thứ tự:</Form.Label>
                            <Form.Control
                                as="select"
                                name="sort"
                            // value={sort}
                            // onChange={handleSort}
                            >
                                <option value="asc">Mới đến cũ</option>
                                <option value="desc">Cũ đến mới</option>
                            </Form.Control>
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
                                Tải lại dữ liệu{" "}
                                <RefreshIcon />
                            </Button>
                        </Col>
                    </Row>

                    {/* Danh sách đơn */}
                    <Row className="mt-2">
                        <Col className="table-container">
                            {isFetching ? (<div className="loading">
                                <Spinner animation="border" />
                                <div className="loading-text">Đang tải dữ liệu...</div>
                            </div>) : (
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Customers
                                            .slice(10 * (active - 1), 10 * active)
                                            .map((customer, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{customer.customerName}</td>
                                                        <td>{customer.customerPhone}</td>
                                                        <td>
                                                            <div className="action-button-container">
                                                                <OverlayTrigger
                                                                    placement="bottom"
                                                                    delay={{ show: 200, hide: 100 }}
                                                                    overlay={
                                                                        <Tooltip
                                                                            className="customer-edit-button"
                                                                            id="edit-button-tooltip"
                                                                        >
                                                                            Xem chi tiết
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    {/* navigate to staff detail */}
                                                                    <Button
                                                                        onClick={() => {
                                                                            navigate('/manager/customer-detail/' + customer.customerPhone);
                                                                        }}
                                                                    >
                                                                        <BorderColorIcon />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>)
                            }
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            {/* <CustomPagination
                                count={Math.ceil(customers.length / 10)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            /> */}
                        </Col>
                    </Row>
                </Card>
            </Container>
        </React.Fragment>
    )

}

export default Customer;