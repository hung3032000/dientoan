import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import API from 'src/api';
import RoutesString from 'src/routes/routesString';
import Swal from 'sweetalert2';

export const login = createAsyncThunk('auth/post', async (values, thunk) => {
  try {
    localStorage.clear();
    const response = await API({
      url: '/login',
      method: 'POST',
      data: values
    });
    console.log(response)
    if(response.code != 200){
      throw new Error(response.message)
    }
    localStorage.setItem("token", response.token)
    const data = {
      user: response,
      success: false,
      isLoggedIn: true
    };
    Swal.fire({
      title: 'Message',
      text: 'Đăng nhập thành công',
      icon: 'success'
    }).then((result) => {
      if (result.value) {
        thunk.dispatch(push(RoutesString.DashboardLayout));
      }
    });
    return data;
  } catch (error) {
    Swal.fire({
      title: 'Message',
      text: error.message || 'Sai thông tin, vui lòng nhập lại',
      icon: 'error'
    });
    return {
      error: error
    };
  }
});

export const signUp = createAsyncThunk('auth/post-sign-up', async (values, thunk) => {
  try {
    localStorage.clear();
    const response = await API({
      url: '/sign-up',
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
      if (result.value) {
        thunk.dispatch(push(RoutesString.LOGIN));
      }
    });
    return {};
  } catch (error) {
    Swal.fire({
      title: 'Message',
      text: error.message || 'Sai thông tin, vui lòng nhập lại',
      icon: 'error'
    });
    return {
      error: error
    };
  }
});