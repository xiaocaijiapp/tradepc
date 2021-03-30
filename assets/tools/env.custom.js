export default {
  dev: {
    PROXY_URL: 'http://test2.qmwm777.com',
    app_id: 2021000116675350,
    back_url: 'http://pc.qmwm777.com/personal',
    ali_url: 'https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm',
    BASE_URL: '' // 开启proxy时 可为空
  },
  test: {
    PROXY_URL: 'http://test2.qmwm777.com',
    app_id: 2021000116675350,
    ali_url: 'https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm',
    back_url: 'http://pc.qmwm777.com/personal',
    BASE_URL: ''
  },
  pro: {
    PROXY_URL: 'https://api.starday.jp',
    app_id: 2017122201061661,
    ali_url: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm',
    back_url: 'http://test.qmwm777.com:10000/aLiPayAuth/auth',
    BASE_URL: ''
  }
}
