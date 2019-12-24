<script type='text/javascript'>
    import BScroll from 'better-scroll'

    const storeList = [
        // {
        //   'id': '',
        //   'name': '',
        //   'title': '',
        //   'describe': '',
        //   'list': [{
        //     'typeId': '',
        //     'goodsId': '',
        //     'name': '',
        //     'minPrice': 0.00,
        //     'maxPrice': 0.00,
        //     'goodsIcon': '',
        //     'icon': ''
        //   }]
        // },

        {
            'id': 'goods-search',
            'name': '搜索栏'
        }, {
            'id': 'img-carousel',
            'name': '轮播图',
            'list': [{
                'goodsId': '',
                'goodsIcon': '',
                'icon': '/static/images/carousel/carousel-1.png'
            }]
        }, {
            'id': 'notice-bar',
            'name': '通告栏',
            'describe': '编辑通知内容，发布最新消息'
        }, {
            'id': 'type-frame-three',
            'name': '分类栏（三排）',
            'list': [{
                'typeId': '0',
                'name': 'type',
                'icon': '/static/images/icon/shopping.png'
            }]
        }, {
            'id': 'type-frame-four',
            'name': '分类栏（四排）',
            'list': [{
                'typeId': '0',
                'name': 'type',
                'icon': '/static/images/icon/shopping.png'
            }]
        }, {
            'id': 'img-text-title',
            'name': '图文标题',
            'title': '拼团更实惠',
            'describe': '团购促销，多买多降',
            'list': [{
                'icon': '/static/images/icon/shopping.png'
            }]
        }, {
            'id': 'goods-two-row',
            'name': '推荐商品（双排）',
            'list': [{
                'goodsId': '0',
                'name': '商品名称',
                'minPrice': 166.66,
                'maxPrice': 188.88,
                'goodsIcon': '/static/images/goods/goods-1.png'
            }]
        }, {
            'id': 'divider-title',
            'name': '分隔符标题',
            'title': '拼团更实惠'
        }, {
            'id': 'img-title',
            'name': '图片标题',
            'list': [{
                'goodsId': '',
                'goodsIcon': '',
                'icon': '/static/images/carousel/carousel-1.png'
            }]
        }, {
            'id': 'goods-three-row',
            'name': '推荐商品（三排）',
            'list': [{
                'goodsId': '0',
                'name': '商品名称',
                'minPrice': 166.66,
                'maxPrice': 188.88,
                'goodsIcon': '/static/images/goods/goods-1.png'
            }]
        }, {
            'id': 'imgX-scroll',
            'name': '图片滑块（横）',
            'list': [{
                'goodsId': '',
                'goodsIcon': '',
                'icon': '/static/images/carousel/carousel-1.png'
            }]
        }, {
            'id': 'imgY-scroll',
            'name': '图片滑块（竖）',
            'list': [{
                'goodsId': '',
                'goodsIcon': '',
                'icon': '/static/images/carousel/carousel-1.png'
            }]
        }, {
            'id': 'goodsY-scroll',
            'name': '商品滑块（普通）',
            'list': [{
                'goodsId': '0',
                'name': '商品名称',
                'minPrice': 166.66,
                'maxPrice': 188.88,
                'goodsIcon': '/static/images/goods/goods-1.png'
            }]
        }, {
            'id': 'goodsX-scroll',
            'name': '商品滑块（折扣）',
            'list': [{
                'goodsId': '0',
                'name': '商品名称',
                'minPrice': 166.66,
                'maxPrice': 188.88,
                'goodsIcon': '/static/images/goods/goods-1.png'
            }]
        }
    ]

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

    let getStorePart = function (id) {
        let obj = storeList.find((item) => {
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
        getStorePart,
        _initStoreScroll
    }
</script>
