import { http } from "@/utils/http";

// type Result = {
//   success: boolean;
//   data?: Array<any>;
// };

type ResultTable = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

/** 获取系统监控-在线用户-列表数据 */
export const getOnlineLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/online-user", { data });
};
