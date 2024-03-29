import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

const toast = {
  
  error: (message, title = 'Error') => {
    return iZtoast.error({
      title: title,
      message: message,
      position: 'topCenter'
    });
  },

  success: (message, title = 'Success') => {
    return iZtoast.success({
      title: title,
      message: message,
      position: 'topCenter'
    });
  },

  comparison: (message) => {
    return iZtoast.success({
      message: message,
      position: 'bottomCenter'
    });
  }

};

export default toast;