import { request } from "@/service/request";

export const getById = (id:number | string) => request.get<ArticleItem>("/article/list/get/" + id)

export const getAll = (params?:object) => request.get<responsePageTypes<Array<ArticleItem>>>("/article/list/getAll",params)

// 查询推荐文章
export const getRecommend = (num?:number) => request.get<Array<ArticleItem>>("/article/list/getRecommend",{num})

//获取时间线数据
export const getTimeline = (params?:object) => request.get<responsePageTypes<Array<ArticleItem>>>("/article/list/getTimeline",params)

//获取文章总数、分类总数、标签总数
export const getSynthesizeStatistics = () => request.get<Array<SynthesizeStatistics>>("/article/list/getSynthesizeStatistics")
