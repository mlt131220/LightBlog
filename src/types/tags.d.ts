declare type Tag = {
    id: number;
	name: string;
    article_id:number;
	delTag: number;
	createTime: dayjs.Dayjs;
	updateTime: dayjs.Dayjs;
}

declare type TagStatistics = {
    id: number;
	name: string;
    article_id:number;
	delTag: number;
	createTime: dayjs.Dayjs;
	updateTime: dayjs.Dayjs;
    count:number;
}