import axios from 'axios';
import { toast } from 'react-toastify';
import { cloudImageFailed, cloudImageStart, cloudImageSuccess } from '~/redux/cloudImage/cloudSlice';

export const uploadImage = async (fileImage,dispatch) => {
    dispatch(cloudImageStart());
    try {
        const res = await axios.post('http://localhost:8078/api/v1/cloud/uploads', fileImage,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } );
        dispatch(cloudImageSuccess(res.data));
        toast.success("Gửi ảnh thành công");
    } catch (err) {
        dispatch(cloudImageFailed(err.response.data.message));
        toast.error(err.response.data.message);
    }
}