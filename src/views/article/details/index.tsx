import React, { useEffect,useState } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import TopImage from '@/components/TopImage';
import {
	BoxStyled,
	DetailContainer,
	AlertStyled,
	CopyrightStyled,
} from '@/styled/view/article/details';
import { diffDays, dateTimeFormat } from '@/utils/dateUtil';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { CopyOutlined } from '@ant-design/icons';
import { Tooltip, message, Divider, Image,Spin } from 'antd';
import ReactDOM from 'react-dom/client';
import copy from 'copy-to-clipboard';
import {getById} from "@/service/api/article";

const ArticleDetails: React.FC = () => {
	const location = useLocation();
	const state = location.state;
    const { id } = useParams();

	const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
	const [imagesList, setImageList] = useState<string[]>([]);
	const [currentClickImg,setCurrentClickImg] = useState<number>(0);
    const [content, setContent] = useState<string>("");

	useEffect(() => {
		let ignore = false;

		function initRichText(NeiRong:string) {
			if (!ignore) {
				hljs.addPlugin({
					'after:highlightElement': ({ el, result, text }) => {
						if (el.hasAttribute('language')) return;
						el.setAttribute('language', result.language as string);
						const dom = document.createElement('div');
						dom.classList.add('copy-code');
						ReactDOM.createRoot(dom).render(
							<Tooltip placement="bottom" title="复制代码">
								<CopyOutlined />
							</Tooltip>
						);
						dom.addEventListener('click', () => {
							copy(text);
							message.success('代码复制成功！');
						});
						el.parentNode?.insertBefore(dom, el);
					},
				});
				hljs.highlightAll();

				//处理内容中的image
				const imgList: string[] = [];
                // @ts-ignore
                NeiRong.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (dom: string, url: string) => {
					imgList.push(url);
				});

				setImageList(imgList);

				document.getElementById('detailContainer')?.querySelectorAll('img').forEach(img => {
					img.addEventListener('click', e => {
						e.preventDefault();
						setCurrentClickImg(imgList.findIndex(item => item === (e.target as HTMLImageElement).getAttribute("src")));
						setImagePreviewVisible(true);
					});
				})
			}
		}

		function initMarkDown(NeiRong:string){
			if (!ignore) {

			}
		}

        async function getArticleContent(){
            const res = await getById(id as string);

            if(!ignore){
                setContent(res.content);
                setTimeout(()=>{
					switch(res.contentType){
						case "richtext":
							initRichText(res.content)
							break;
						case "markdown":
							initMarkDown(res.content)
							break;
					}

				},10);
            }
        }

        getArticleContent();

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div>
            {/* category prop value 说明：首页列表接口数据带有state.category = {}，tags列表接口为state.category_name */}
			<TopImage
				url={state.image}
				title={state.title}
				createTime={state.createTime}
				updateTime={state.updateTime}
				tags={state.tags}
				category={state.category === undefined ? state.category_name : state.category.name}
			/>
			<BoxStyled>
				{diffDays(state.updateTime, dateTimeFormat(new Date())) > 90 && (
					<AlertStyled
						message={`文章上次编辑时间距今 ${diffDays(
							state.updateTime,
							dateTimeFormat(new Date())
						)} 天，部分内容可能已经过时！`}
						type="warning"
						showIcon
						closable
					/>
				)}
				{/* 内容区域 */}
                <Spin
                    tip="稍后，顶峰相见"
                    spinning={content === ""}
                    wrapperClassName="w-full min-h-30vh"
                    className="w-full"
                >
                    <DetailContainer
                        id="detailContainer"
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></DetailContainer>
                </Spin>

				<Divider>End</Divider>
				<CopyrightStyled>
					<div> 版权归属：{import.meta.env.VITE_GLOB_MASTER}</div>
					<div> 文章链接：{window.location.href}</div>
					<div>
						{' '}
						版权声明：本文采用
						<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
							《署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA
							4.0)国际许可协议》
						</a>
						授权,转载请注明文章出处。
					</div>
				</CopyrightStyled>
			</BoxStyled>

			{/* image 预览 */}
			<div style={{ display: 'none' }}>
				<Image.PreviewGroup preview={{ visible:imagePreviewVisible, onVisibleChange: vis => setImagePreviewVisible(vis),current:currentClickImg }}>
					{imagesList.map((img,index) => <Image key={index} src={img} />)}
				</Image.PreviewGroup>
			</div>
		</div>
	);
};

export default ArticleDetails;
