<script type='text/javascript'>
    import BScroll from 'better-scroll'

    let partList = []

    let getPartList = function () {
        return partList
    }

    let setPartList = function (list) {
        partList = list
    }

    let getPart = function (id) {
        let obj = partList.find((item) => {
            return item.id === id
        })
        return obj
    }

    let _initStoreScroll = function (that) {
        try {
            that.$nextTick(() => {
                let part = getPart('imgX-scroll')
                if (part) {
                    let imgXLength = part.list.length
                    that.imgXScrollStyle = {
                        'width': (240 * imgXLength) + 'px'
                    }
                    that.aBScroll = new BScroll(that.$refs.imgXScroll[0], {
                        startX: 0,
                        scrollX: true,
                        click: true
                    })
                }
                part = getPart('imgY-scroll')
                if (part) {
                    let imgYLength = part.list.length
                    that.imgYScrollStyle = {
                        'width': (140 * imgYLength) + 'px'
                    }
                    that.aBScroll = new BScroll(that.$refs.imgYScroll[0], {
                        startX: 0,
                        scrollX: true,
                        click: true
                    })
                }
                part = getPart('goodsY-scroll')
                if (part) {
                    let goodsYLength = part.list.length
                    that.goodsYScrollStyle = {
                        'width': (220 * goodsYLength) + 'px'
                    }
                    that.aBScroll = new BScroll(that.$refs.goodsYScroll[0], {
                        startX: 0,
                        scrollX: true,
                        click: true
                    })
                }
                part = getPart('goodsX-scroll')
                if (part) {
                    let goodsXLength = part.list.length
                    that.goodsXScrollStyle = {
                        'width': (280 * goodsXLength) + 'px'
                    }
                    that.aBScroll = new BScroll(that.$refs.goodsXScroll[0], {
                        startX: 0,
                        scrollX: true,
                        click: true
                    })
                }
            })
        } catch (e) {
            console.info('错误信息：', e)
        }
    }

    export default {
        getPartList,
        setPartList,
        _initStoreScroll
    }
</script>
