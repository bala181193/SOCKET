import axios from 'axios';
import config from '../config/config'
const url = config.url;

export const mulipleCheckbox = async (data) => {

    try {
        const reqData = await axios({
            'method': 'post',
            'url': `${url}/user/multipleCheckBox`,

            data: data
        })

        return {
            status: "success",
            message: reqData.data.message
        }
    } catch (err) {
        return {
            errors: err.response.data
        }
    }
}


export const getMultiboxData = async (data) => {
    try {
        const reqData = await axios({
            'method': 'get',
            'url': `${url}/user/getMultipleCheckBox`,
        })

        return {
            status: "success",
            result: reqData.data.result
        }
    } catch (err) {
        return {
            errors: err.response.data
        }
    }


}