import React, { useEffect, useState } from "react";
import './StaffDayOff.scss';
import { useNavigate } from "react-router-dom";
import moment from "moment";

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

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';

//Api
import { useGetStaffDayOffQuery } from "../../../../services/slices/staff/staffApi";

const StaffDayOff = () => {

    //local state
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [staffs, setStaffs] = useState([]);

    //Api
    const {
        data: staffsData = [],
        refetch: refetch,
        isFetching: isFetching,
    } = useGetStaffDayOffQuery();

    useEffect(() => {
        if (!isFetching) {
            setStaffs(staffsData)
        }
    }, [isFetching]);


    return (
        <React.Fragment>
            <Container fluid className="staff-container">
                <Card body className="staff-content-container">
                    <Row>
                        <Col>
                            <Card.Title>Danh sách nhân viên</Card.Title>
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
                                            <th>Tên nhân viên</th>
                                            <th>Số điện thoại</th>
                                            <th>Ngày nghỉ</th>
                                            <th>Lý Do</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs
                                            .slice(10 * (active - 1), 10 * active)
                                            .map((staff, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{staff.employeeName}</td>
                                                        <td>{staff.employeePhoneNumber}</td>
                                                        <td>{moment(staff.dayOff).format("MM/DD/YYYY")}</td>
                                                        <td>{staff.reason}</td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </Table>
                            )}
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

export default StaffDayOff