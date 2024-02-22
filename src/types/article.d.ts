declare type ArticleCategory = {
	id: number;
	name: string;
	delTag: number;
	createTime: dayjs.Dayjs;
	updateTime: dayjs.Dayjs;
};

declare type ArticleCategoryStatistics = {
	id: number;
	name: string;
	delTag: number;
	createTime: dayjs.Dayjs;
	updateTime: dayjs.Dayjs;
	count:number
};

declare type ArticleItem = {
	id: number,
	title: string,
	category: ArticleCategory,
	contentType: 'richtext' | 'markdown';
	content: string,
	image: string,
	introduction: string,
	tags: Array<string>,
	isOriginal: number,
	sourcesOfNonOriginalArticles: string,
	likeCount: number,
	viewCount: number,
	createTime: dayjs.Dayjs,
	updateTime: dayjs.Dayjs,
	delTag: number,
    //各需求中添加的第三方字段
    nian:string,
    category_name:string
};

declare type SynthesizeStatistics = {
    article_count:number,
    category_count:number,
    tags_count:number
}
