import React, {useState} from 'react';
import {TopImgStyled,ImgStyled,TitleStyled,TitleDetailStyled} from "./styled";
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/utils/dateUtil';
import {ClockCircleOutlined,HistoryOutlined,TagsOutlined,FolderOutlined} from '@ant-design/icons';

interface PropsType{
    url?:string,
    title?:string,
    createTime?: dayjs.Dayjs,
	updateTime?: dayjs.Dayjs,
    tags?: Array<string>,
    category?:string
}

const TopImage:React.FC<PropsType> = ({url,title,createTime,updateTime,tags,category}) => {
    return (
        <TopImgStyled>
            <ImgStyled src={url ? `/${url}` : '/static/img/bgDark.jpg'} alt={title ? title : "顶图"} />
            {title && <TitleStyled>{title}</TitleStyled>}
            <TitleDetailStyled>
                {createTime && <span><ClockCircleOutlined />&nbsp;&nbsp;{dateTimeFormat(createTime)}&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                {updateTime && <span><HistoryOutlined />&nbsp;&nbsp;{dateTimeFormat(updateTime)}&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                {tags && <span><TagsOutlined />&nbsp;&nbsp;{tags.join(" · ")}&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                {category && <span><FolderOutlined />&nbsp;&nbsp;{category}</span>}
            </TitleDetailStyled>
        </TopImgStyled>
    )
}

export default TopImage;
