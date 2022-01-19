import React from 'react';
import './image-uploader.scss';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefaultPicture from '../../asset/images/default-image.jpg';
export const ImageUploader = () => {
    const itemData = [
        {
            img: DefaultPicture,
            title: 'Default image',
        },
    ];

    return (
        <div className={'image-uploader-wrapper'}>
            <ImageList sx={{width: '100%'}} cols={5} rowHeight={165}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};
