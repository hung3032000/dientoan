import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import API from 'src/api';
import RoutesString from 'src/routes/routesString';
import Swal from 'sweetalert2';

export const getAllMonHoc = createAsyncThunk('monhoc/get', async ({}, thunk) => {
  try {
    const response = await API({
      url: '/mon-hoc',
      method: 'GET'
    });
    console.log(response)
    if(response.code != 200){
      throw new Error(response.message)
    }
    localStorage.setItem("token", response.token)
    const data = {
      monHoc: response.data || [],
      success: false,
      isLoggedIn: true
    };
    
    return data;
  } catch (error) {
    Swal.fire({
      title: 'Message',
      text: error.message,
      icon: 'error'
    });
    return {
      error: error
    };
  }
});

export const dangKyMonHoc = createAsyncThunk('dkhp/post', async (values, thunk) => {
  try {
    const response = await API({
      url: '/dkhp',
      method: 'POST',
      data: values
    });
    console.log(response.code)
    if (response.code != 200) {
      throw new Error(response.message)
    }
    Swal.fire({
      title: 'Message',
      text: 'Đăng ký thành công',
      icon: 'success'
    }).then((result) => {
      
    });
    return {};
  } catch (error) {
    Swal.fire({
      title: 'Message',
      text: 'Sai thông tin, vui lòng nhập lại',
      icon: 'error'
    });
    return {
      error: error
    };
  }
});

export const huyMonHoc = createAsyncThunk('dkhp/delete', async (values, thunk) => {
  try {
    const response = await API({
      url: '/dkhp',
      method: 'DELETE',
      data: values
    });
    console.log(response.code)
    if (response.code != 200) {
      throw new Error(response.message)
    }
    Swal.fire({
      title: 'Message',
      text: 'Hủy thành công',
      icon: 'success'
    }).then((result) => {

    });
    return {};
  } catch (error) {
    Swal.fire({
      title: 'Message',
      text: 'Sai thông tin, vui lòng nhập lại',
      icon: 'error'
    });
    return {
      error: error
    };
  }
});