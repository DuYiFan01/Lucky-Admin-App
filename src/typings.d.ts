// 全局要用的类型放到这里

declare global {
  type R<T> = {
    code: number
    message: string
    data: T
  }

  // uni.uploadFile文件上传参数
  type IUniUploadFileOptions = {
    file?: File
    files?: UniApp.UploadFileOptionFiles[]
    filePath?: string
    name?: string
    formData?: any
  }

  /**
   * 用户信息
   */
  type IUserInfoVo = {
    id: number
    username: string
    name: string
    sex: string
    email: string
    phone: string
    avatar: string
    createTime: string
    roles: string[]
    permissions: string[]
  }

  /**
   * 登录返回的信息
   */
  type IUserLogin = {
    id: number
    username: string
    token: string
  }

  /**
   * 获取验证码
   */
  type ICaptcha = {
    captchaEnabled: boolean
    uuid: string
    image: string
  }
  /**
   * 上传成功的信息
   */
  type IUploadSuccessInfo = {
    fileId: number
    originalName: string
    fileName: string
    storagePath: string
    fileHash: string
    fileType: string
    fileBusinessType: string
    fileSize: number
  }
  /**
   * 更新用户信息
   */
  type IUpdateInfo = {
    id: number
    name: string
    sex: string
  }
  /**
   * 更新用户信息
   */
  type IUpdatePassword = {
    id: number
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }
}

export {} // 防止模块污染
