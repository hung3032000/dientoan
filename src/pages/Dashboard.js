import { Box, Button, Container, Grid, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import CreateForm from 'src/components/pageComponent/ExamsCreateForm';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMonHoc } from 'src/store/actions/dkhpAction';
import Tables from 'src/components/common/Tables-History';
import swal from 'sweetalert2';
import API from 'src/api';
import { useHistory } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';
const Dashboard = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [listMonHoc, setListMonHoc] = useState([])
 

  useEffect(async () => {
    try {
      const response = await API({
        url: '/dkhp',
        method: 'GET'
      });
      console.log(response)
      if (response.code != 200) {
        throw new Error(response.message)
      }
      setListMonHoc(response.data || [])
    } catch (error) {
      swal.fire({
        title: 'Message',
        text: error.message,
        icon: 'error'
      });
      return {
        error: error
      };
    }
  }, [])

  const dkhp = () => {
    push(RoutesString.CreatePage)
  }
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardHeader
              title={'Lịch sử đăng ký'}
            />
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={dkhp}
                >
                  Đăng Ký Học Phần
                </Button>
            </Box>
          </Card>
          <Tables data={listMonHoc} />
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
