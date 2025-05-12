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

/** 获取轮播图管理-轮播图列表 */
export const getCarouselList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/carousel", { data });
};

/** 获取轮播图管理-轮播图项列表 */
export const getCarouselItemList = (data?: object) => {
  return http.request<ResultTable>("post", "/api/carousel/item", { data });
};

/** 新增轮播图管理-轮播图 */
export const addCarousel = (data?: object) => {
  return http.request<Result>("post", "/api/carousel/create", { data });
};

/** 新增轮播图管理-轮播图项 */
export const addCarouselItem = (data?: object) => {
  return http.request<Result>("post", "/api/carousel/item/create", { data });
};

/** 修改轮播图管理-轮播图详情 */
export const updateCarousel = (data?: object) => {
  return http.request<Result>("post", "/api/carousel/update", { data });
};

/** 修改轮播图管理-轮播图项详情 */
export const updateCarouselItem = (data?: object) => {
  return http.request<Result>("post", "/api/carousel/item/update", { data });
};

/** 删除轮播图管理-轮播图*/
export const deleteCarousel = (id: number) => {
  return http.request<Result>("get", `/api/carousel/delete/${id}`);
};

/** 删除轮播图管理-轮播图项*/
export const deleteCarouselItem = (id: number) => {
  return http.request<Result>("get", `/api/carousel/item/delete/${id}`);
};
