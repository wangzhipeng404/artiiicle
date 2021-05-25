// eslint-disable-next-line no-undef
Component({
  properties: {
    option: { type: Object },
  },
  data: {
    formats: {},
    readOnly: false,
    placeholder: '输入文字...',
    // editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
  },
  ready () {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS,
    })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success () {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          },
        })
      }, duration)
    })
  },
  methods: {
    readOnlyChange () {
      this.setData({
        readOnly: !this.data.readOnly,
      })
    },
    updatePosition (keyboardHeight) {
      const toolbarHeight = 100
      const { windowHeight, platform } = wx.getSystemInfoSync()
      // let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
      this.setData({
        // editorHeight,
        keyboardHeight,
      })
    },
    calNavigationBarAndStatusBar () {
      const systemInfo = wx.getSystemInfoSync()
      const { statusBarHeight, platform } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady () {
      const that = this
      // 组件使用createSelectorQuery加上in(this)
      wx
        .createSelectorQuery()
        .in(that)
        .select('#editor')
        .context(function (res) {
          that.editorCtx = res.context
          that.triggerEvent('ready', { instance: that })
        })
        .exec()
    },
    undo () {
      this.editorCtx.undo()
    },
    redo () {
      this.editorCtx.redo()
    },
    blur () {
      this.editorCtx.blur()
    },
    format (e) {
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      if (name === 'backgroundColor' && value === '#ff0000') {
        // 设置字体颜色为白色
        this.editorCtx.format('color', '#ffffff')
      }
      if (name === 'backgroundColor' && value === '#ffffff') {
        this.editorCtx.format('color', '#000000')
      }
      if (name === 'color') {
        // 清楚字体样式
        this.editorCtx.removeFormat()
      }
      this.editorCtx.format(name, value)
    },
    onStatusChange (e) {
      const formats = e.detail
      this.setData({
        formats,
      })
    },
    insertDivider () {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        },
      })
    },
    clear () {
      this.editorCtx.clear({
        success: function (res) {
          console.log('clear success')
        },
      })
    },
    removeFormat () {
      this.editorCtx.removeFormat()
    },
    insertDate () {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate,
      })
    },
    insertImage () {
      this.triggerEvent('insertImage') // 触发父组件方法
    },
    insertSrc (src) {
      // 接受图片返回地址
      const that = this
      that.editorCtx.insertImage({
        src,
        data: {
          id: 'abcd',
          role: 'god',
        },
        width: '100%',
        success: function () {
          console.log('insert image success')
        },
      })
    },
    getContent (e) {
      // 获得文本内容
      this.triggerEvent('Content', { content: e.detail })
    },
    setContent (content) {
      this.editorCtx.setContents({ html: content })
    },
  },
})
