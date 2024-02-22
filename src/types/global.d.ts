interface Window {
     $bus:any
}

declare type CardProps = {
	width?: string;
	scale?: boolean;
	title?: string;
	children?: React.ReactNode;
};

declare type Article = {
	title: string;
	createTime: string;
};

//axios返回格式
interface axiosTypes<T> {
	data: T;
	status: number;
	statusText: string;
}

//后台响应数据格式
//###该接口用于规定后台返回的数据格式，意为必须携带code、type以及result、message
//###而result的数据格式 由外部提供。如此即可根据不同需求，定制不同的数据格式
interface responseTypes<T> {
	code: number;
	type: string;
	result: T;
	message: string;
}

//分页数据格式
declare type responsePageTypes<T> = {
	current: number;
	items: T;
	pageSize: number;
	pages: number;
	total: number;
};
