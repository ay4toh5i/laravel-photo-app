import {AxiosInstance} from "axios";

interface MyWindow extends Window {
    axios: AxiosInstance
}
declare let window: MyWindow
export default window
