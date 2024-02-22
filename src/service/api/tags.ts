import { request } from "@/service/request";

export const getStatistics = () => request.get<Array<TagStatistics>>("/tags/getStatistics")

export const getListByName = (params:object) => request.get<responsePageTypes<Array<ArticleItem>>>("/tags/getListByName",params)