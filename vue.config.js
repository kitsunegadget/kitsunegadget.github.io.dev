const isLegacyBundle = !process.env.VUE_CLI_MODERN_BUILD;
//console.log(process.env);
module.exports = {
  productionSourceMap: false,
  chainWebpack: config => { 
    // distへコピーしないpublicファイルの設定（テスト用の画像など）。
    // 注：モダンモードでのビルド時、レガシーバンドルでoptionsが
    // 空となり以下がエラーになります。
    // しかしながらモダンモードはレガシーバンドルを生成した結果から
    // モダンバンドルを生成しているようなので、設定を反映させるため
    // レガシービルドでは以下を省くようにします。
    if (!isLegacyBundle) {
      console.log("through config.");
      config.plugin('copy').tap(([options]) => {
        options[0].ignore.push('product_imgs/**', 'gallery_imgs/**');
        return [options];
      });
    }
  }
}