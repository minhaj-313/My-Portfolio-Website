import "./GalleryModal.scss"
import React, {useEffect, useState} from 'react'
import {Modal, ModalWindowTransparent} from "/src/components/modals/Modal.jsx"
import {useLayout} from "/src/providers/LayoutProvider.jsx"
import ImageView from "/src/components/generic/ImageView.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useScheduler} from "/src/helpers/scheduler.js"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { Zoom, Navigation, Pagination } from 'swiper/modules'

const RATIO_CLASSES = {
    "16:9": "swiper-slide-landscape",
    "9:16": "swiper-slide-portrait",
}

function GalleryModal() {
    const {displayingGallery, setDisplayingGallery, showActivitySpinner, hideActivitySpinner, innerWidth, innerHeight} = useLayout()
    const utils = useUtils()
    const scheduler = useScheduler()

    const [images, setImages] = useState(null)
    const [aspectRatio, setAspectRatio] = useState(null)
    const tag = 'gallery'

    useEffect(() => {
        if(!displayingGallery)
            return

        showActivitySpinner(tag)
        scheduler.clearAllWithTag(tag)
        scheduler.schedule(() => {
            setImages(displayingGallery.screenshots.images || [])
            setAspectRatio(displayingGallery.screenshots.aspectRatio)

            if(!RATIO_CLASSES[displayingGallery.screenshots.aspectRatio]) {
                throw new Error("Aspect ratio " + aspectRatio + " not supported by the gallery viewer component. The supported ratios are 16:9 and 9:16.")
            }
        }, 100, tag)

        scheduler.schedule(() => {
            _checkLoadCompletion()
        }, 200, tag)

    }, [displayingGallery])

    const _checkLoadCompletion = () => {
        scheduler.clearAllWithTag(tag)
        scheduler.interval(() => {
            const ready = utils.didLoadAllImages('.swiper-image')
            if(ready) {
                scheduler.clearAllWithTag(tag)
                hideActivitySpinner(tag)
            }
        }, 300, tag)
    }

    const _getSlidesPerView = () => {
        let slidesPerView = 1

        if(displayingGallery.screenshots.aspectRatio === '9:16' && innerWidth/innerHeight > 1) {
            const offset = innerWidth/innerHeight - 1
            slidesPerView = 1 + Math.round(offset * 2.5)
        }

        return Math.min(4, slidesPerView)
    }

    const _close = () => {
        setImages(null)
        setAspectRatio(null)
        setDisplayingGallery(null)
    }

    return (
        <Modal  id={`gallery-modal`}
                visible={Boolean(displayingGallery)}>

            {images && aspectRatio && (
                <ModalWindowTransparent transparent={true} onClose={_close}>
                    <Swiper
                        style={{
                            '--swiper-navigation-color': utils.getRootSCSSVariable('theme-highlight'),
                        }}
                        navigation={true}
                        zoom={true}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={_getSlidesPerView()}
                        spaceBetween={20}

                        modules={[Zoom, Navigation, Pagination]}
                        className="gallery-swiper">

                        {images.map((imgUrl, key) => (
                            <SwiperSlide key={key} className={RATIO_CLASSES[aspectRatio]}>
                                <div className={`swiper-zoom-container`}>
                                    <img className={`swiper-image`} alt={`img-` + key} src={utils.resolvePath(imgUrl)}/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ModalWindowTransparent>
            )}
        </Modal>
    )
}

export default GalleryModal