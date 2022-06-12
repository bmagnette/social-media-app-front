import './MosaicPictures.scss';
import * as React from 'react';
// @ts-ignore
import DefautImg from '../../asset/images/default-image.jpg';
import Spinner from '../spinner/Spinner';

export const MosaicPictures = (props) => {
    return <div className={'mosaiq-wrapper'}>
        {props.images.map(image => {
            return <img className={image?.selected && 'selected'}
                        onClick={() => props.selectImage(image.id)}
                        src={image.links.download} alt={image.alt_description} width={140}
                        height={140}/>;
        })}
        {props.isLoading ? <Spinner/> : props.images.length === 0 && (<>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
            <img src={DefautImg} alt={'test'} width={140} height={140}/>
        </>)}

    </div>;
};
