import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import Loader from 'react-loader-spinner';
import { CheckSquare, Settings, Trash2, AlertCircle } from 'react-feather';
import { useHistory } from 'react-router';
import RoutesString from 'src/routes/routesString';
import { useDispatch } from 'react-redux';

const TableCustom = ({
  data = [],
  isLoading,
  listMonHoc=[],
  handleSelectMonHoc,
  handleDeleteMonHoc,
  ...rest
}) => {
  const [selectedfurnitureIds, setSelectedfurnitureIds] = useState([]);
  const [limit, setLimit] = useState(9999);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const { push } = useHistory();

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          {isLoading ? (
            <div className="cover">
              <Loader type="Puff" color="#000" />
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Môn học</TableCell>
                  <TableCell>Số tín chỉ</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>
                    <Settings size="20" />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                  {data &&
                    Array.isArray(data) &&
                    data.slice(0, limit).map((element) => (
                    <TableRow
                      hover
                        selected={!!listMonHoc.find(e => e == element.monHocId)}
                    >
                      <TableCell >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                              {element?.tenMonHoc}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                          {element?.tinChi}
                      </TableCell>
                        <TableCell>{element?.trangThai}</TableCell>

                        <TableCell>
                          {!!listMonHoc.find(e => e == element.monHocId) ? "" : <Button
                            sx={{ mx: 1 }}
                            color="info"
                            variant="contained"
                            onClick={() => handleSelectMonHoc(element.monHocId, element?.tinChi)}
                          >
                            <CheckSquare size="20" />
                          </Button>}

                          <Button
                            sx={{ mx: 1 }}
                            color="error"
                            variant="contained"
                            onClick={() => handleDeleteMonHoc(element.monHocId, element?.tinChi)}
                          >
                            <Trash2 size="20" />
                          </Button>
                        </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TableCustom.propTypes = {
  booking: PropTypes.array.isRequired
};

export default TableCustom;
