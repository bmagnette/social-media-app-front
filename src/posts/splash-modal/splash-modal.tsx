import {Button, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {MosaicPictures} from '../../shared/MosaicPictures/MosaicPictures';
import {InputField} from '../../shared/Input/input';
import {CheckOutlined} from '@mui/icons-material';
import './splash-modal.scss';
import {queryUnSplash} from '../../services/unsplash';
import {useNavigate} from 'react-router';

export const SplashModal = (props) => {

    const [splashImages, setSplashImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [queryText, setQueryText] = useState('');
    useEffect(() => {
    }, []);

    const handleSubmit = () => {
        const selectedImages = splashImages.filter(image => {
            if(image.selected === true){
                return image;
            }
        });
        const newUrl = selectedImages.map(image => image.links.download);
        const test = [...props.imageURLs, ...newUrl];
        props.setImageURLs(test);
        props.handleCancel();
    };

    const selectImage = (_id) => {
        const newImages = splashImages.map(image => {
            if (image.id === _id) {
                if ('selected' in image) {
                    image['selected'] = !image['selected'];
                } else {
                    image['selected'] = true;
                }
            }
            return image;
        });
        setSplashImages(newImages);
    };

    const validateQuery = () => {
        setIsLoading(true);
        queryUnSplash(navigate, queryText).then(r => {
            setSplashImages(r);
            setIsLoading(false);
        });
    };

    return (
        <Modal
            visible={props.visible}
            onOk={handleSubmit}
            onCancel={props.handleCancel}
            footer={
                <>
                    <Button key="back" onClick={props.handleCancel}>
                        Return
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmit}>
                        Validate
                    </Button>
                </>
            }>
            <h2>Splash pictures</h2>
            <div className={'flex-between'}>
                <InputField placeholder={'Query the photo you want !'} value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}/>
                <div className={'validate-query'} onClick={validateQuery}>
                    <CheckOutlined/>
                </div>
            </div>
            <MosaicPictures images={splashImages} selectImage={selectImage} isLoading={isLoading}/>
        </Modal>
    );
};
