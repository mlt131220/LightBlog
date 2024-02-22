import {RouteObject} from "react-router-dom";
//路由组件
import _404 from "@/views/notFound/404";
import Home from "@/views/home/home";
import Category from "@/views/category/category";
import Tags from "@/views/tags/tags";
import Timeline from "@/views/timeline/timeline";
import About from "@/views/about/about";
import ArticleDetails from "@/views/article/details/index";


const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/category",
        element: <Category />,
    },
    {
        path: "/tags",
        element: <Tags />,
    },
    {
        path: "/timeline",
        element: <Timeline />,
    },
    {
        path: "/about",
        element: <About />,
    },
    { //文章详情
        path: "/article/details/:id",
        element: <ArticleDetails />,
    },
    {
        path: "*",
        element:<_404 />,
    },
];


export default routes;
