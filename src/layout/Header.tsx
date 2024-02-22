import React, {useState, useContext, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {HeaderStyled} from '@/styled/layout/layout';
import {MenuContainer, PhoneMenuContainer, BloggerStyled, MenuListStyled} from '@/styled/layout/header';
import {SearchOutlined,MenuFoldOutlined} from '@ant-design/icons';
import {IconFontCtx} from '@/App';
import {Modal, Input, Divider, List, Drawer, Avatar} from 'antd';
import {getAll, getSynthesizeStatistics} from "@/service/api/article";
import {dateTimeFormat} from "@/utils/dateUtil";

const {Search} = Input;

const Header: React.FC = () => {
    const IconFont = useContext(IconFontCtx);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [menuList, setMenuList] = useState([
        {path: '/', title: '首页', icon: 'ng-shouye1'},
        {path: '/category', title: '分类', icon: 'ng-fenlei1'},
        {path: '/tags', title: '标签', icon: 'ng-biaoqian'},
        {path: '/timeline', title: '归档', icon: 'ng-guidang'},
        {path: '/about', title: '关于', icon: 'ng-guanyu'},
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<Array<ArticleItem>>([]);

    const onSearch = async (value: string) => {
        //去除字符串内空格
        value = value.replace(/\s*/g, "");
        if(value === "") return;

        setSearchLoading(true)
        setSearchText(value)

        const params = {
            sortby: 'createTime',
            order: 'desc',
            limit: 10000,
            offset: 0,
        };
        let res: responsePageTypes<Array<ArticleItem>> = await getAll({query: `title:${value}`, ...params});
        setSearchResult(res.items !== null ? res.items : [])
        setSearchLoading(false)
    };

    function searchResultClick(article: ArticleItem){
        setIsModalOpen(false);
        navigate('/article/details/' + article.id, { state: article });
    }

    //手机像素下的菜单抽屉
    const [openDrawer, setOpenDrawer] = useState(false);
    const [synthesize, setSynthesize] = useState<SynthesizeStatistics>({
        article_count:0,
        category_count:0,
        tags_count:0
    });
    useEffect(() => {
        let ignore = false;

        async function init() {
            const synthesizeRes:Array<SynthesizeStatistics> = await getSynthesizeStatistics();
            if (!ignore) {
                setSynthesize(synthesizeRes[0]);
            }
        }
        //手机下才执行
        document.body.clientWidth <= 768 && init();

        return () => {
            ignore = true;
        };
    }, []);

    function phoneStatisticsClick(route:string){
        setOpenDrawer(false)
        navigate(route);
    }

    return (
        <HeaderStyled id="layoutHeader">
            <MenuContainer>
				<span className="logo cursor-pointer" onClick={() => navigate('/')}>
					逆光
				</span>

                <div className="menu">
                    {menuList.map(menu => (
                        <div key={menu.path}
                             className={pathname === menu.path ? 'menu-item active' : 'menu-item'}
                             onClick={() => navigate(menu.path)}
                        >
                            <IconFont type={menu.icon}/>
                            &nbsp;{menu.title}
                        </div>
                    ))}
                    <a className='menu-item' href="//nav.mhbdng.cn" target="_blank">
                        <IconFont type='ng-daohang'/> &nbsp;书签导航
                    </a>
                </div>

                <div className="other">
                    <SearchOutlined onClick={() => setIsModalOpen(true)}/>
                </div>
            </MenuContainer>

            {/* 手机像素下的菜单 */}
            <PhoneMenuContainer>
                <span className="logo cursor-pointer" onClick={() => navigate('/')}>
					逆光
				</span>

                <div className="other">
                    <SearchOutlined onClick={() => setIsModalOpen(true)}/>
                    <MenuFoldOutlined onClick={() => setOpenDrawer(true)} />
                </div>

                <Drawer placement="right" width="70vw" closable={false}  bodyStyle={{padding:0}}
                        onClose={()=>setOpenDrawer(false)} open={openDrawer}>
                    <BloggerStyled>
                        <Avatar src="/static/img/photo.jpg" />
                        <h2>{import.meta.env.VITE_GLOB_MASTER}</h2>
                        <p>{import.meta.env.VITE_GLOB_MASTER_DESC}</p>

                        <div className="statistics">
                            <div className="statistics-item" onClick={()=>phoneStatisticsClick("/")}>
                                <span>{synthesize.article_count}</span>
                                <span>文章</span>
                            </div>
                            <div className="statistics-item" onClick={()=>phoneStatisticsClick("/category")}>
                                <span>{synthesize.category_count}</span>
                                <span>分类</span>
                            </div>
                            <div className="statistics-item" onClick={()=>phoneStatisticsClick("/tags")}>
                                <span>{synthesize.tags_count}</span>
                                <span>标签</span>
                            </div>
                        </div>
                    </BloggerStyled>

                    <MenuListStyled className="menu">
                        {menuList.map(menu => (
                            <div key={menu.path}
                                 className={pathname === menu.path ? 'menu-item active' : 'menu-item'}
                                 onClick={() => navigate(menu.path)}
                            >
                                <IconFont type={menu.icon}/>
                                &nbsp;&nbsp;{menu.title}
                            </div>
                        ))}
                        <a className='menu-item' href="//nav.mhbdng.cn" target="_blank">
                            <IconFont type='ng-daohang'/> &nbsp;书签导航
                        </a>
                    </MenuListStyled>
                </Drawer>
            </PhoneMenuContainer>

            <Modal title="搜索" footer={null} open={isModalOpen} onCancel={() => setIsModalOpen(false)}  style={{ top: 20 }} width={666}>
                <Search placeholder="请输入标题关键字~" onSearch={onSearch} loading={searchLoading}/>
                <Divider orientation="left" plain dashed style={{"borderColor": "red"}}>
                    {searchText !== "" && `搜索内容：${searchText}`}
                </Divider>

                <List itemLayout="horizontal" style={{maxHeight:"60vh",overflowY:"auto"}}
                    dataSource={searchResult}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <div className="flex justify-between cursor-pointer">
                                        <span onClick={() => searchResultClick(item)}>{item.title}</span>
                                        <span className="min-w-170px ml-4"> {dateTimeFormat(item.createTime)}</span>
                                    </div>
                                }
                                description={item.introduction}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </HeaderStyled>
    );
};

export default Header;
