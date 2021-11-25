import API from 'src/api';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAll = createAsyncThunk('exams/get', async () => {
  const response = await API({
    url: `/exams`,
    method: 'GET'
  });
  const data = {
    exams: response?.data || [],
    success: false
  };
  return data;
});

export const getDetail = createAsyncThunk('exams/get-details', async (id) => {
  const response = await API({
    url: `/exams/${id}`,
    method: 'GET'
  });
  const data = {
    exam: response?.data?.data || {},
    success: false
  };
  return data;
});

export const create = createAsyncThunk(
  'exams/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/exams',
        method: 'post',
        data: values
      });
      const isSuccess = res.code === 201;
      if (isSuccess) {
        swal
          .fire({
            title: 'Thêm thành công',
            text: 'Thêm thành công, bạn có muốn chuyển về trang danh sách?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              thunk.dispatch(push(RoutesString.Exams));
            }
          });
      } else {
        swal.fire({
          title: 'Thêm thất bại',
          text: res.message,
          icon: 'error'
        });
      }
      return {
        success: isSuccess
      };
    } catch (e) {
      return console.error(e.message);
    }
  }
);


// =========================================