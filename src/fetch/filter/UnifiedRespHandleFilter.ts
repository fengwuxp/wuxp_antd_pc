import ApiAbstractFilter from "typescript_api_sdk/src/api/filter/ApiAbstractFilter"
import {ApiResp} from "typescript_api_sdk/src/api/model/ApiResp";
import antdMessage from "antd/lib/message";
import {FetchOption} from "typescript_api_sdk/src/api/option/FetchOption";


let count = 0;

/**
 * 统一响应处理过滤器
 */
export class UnifiedRespHandleFilter extends ApiAbstractFilter<FetchOption, ApiResp<any>> {


    postHandle(resp: ApiResp<any>, options?: FetchOption): boolean {
        const {message, success} = resp;
        if (success) {
            count--;
            return true;
        }
        if (count > 0 || options.useProgressBar === false) {
            count--;
            return false;
        }
        //请求失败
        count++;
        antdMessage.error(message ? message : "操作失败", 2, () => {
            count--;
        });
        return false;
    }
}
