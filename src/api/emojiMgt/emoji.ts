import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: Array<any>;
};

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

/** 获取Emoji管理-Emoji列表 */
export const getEmojiList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/emoji", { data });
};

/** 新增Emoji管理-Emoji */
export const addEmoji = (data?: object) => {
  return http.request<Result>("post", "/api/emoji/create", { data });
};

/** 修改Emoji管理-Emoji管理-Emoji详情 */
export const updateEmoji = (data?: object) => {
  return http.request<Result>("post", "/api/emoji/update", { data });
};

/** 删除文章管理-文章管理-文章 */
export const deleteEmoji = (id: number) => {
  return http.request<Result>("get", `/api/emoji/delete/${id}`);
};
