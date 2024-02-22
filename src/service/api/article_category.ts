import { request } from "@/service/request";

export const getStatistics = () => request.get<Array<ArticleCategoryStatistics>>("/article/category/getStatistics")