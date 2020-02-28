let imgLoader = class ImageLoader {
    /**
     * 画像を遅延ローディングさせるためのクラス。
     * scriptの最初にこの class をインスタンス化。
     * ディレクティブ等で imageLoader.observe(el, src); で設定。
     * 
     * opacity による表示制御をしているので、
     * "transition: opacity" のスタイルを適用することで
     * トランジションアニメーションが利用できます。
     * @param {Number} threshold The IntersectionObserver threshold.
     */
    constructor(threshold=0.5) {
        let options = {
            threshold: clamp(threshold)
        }
        this.observer = new IntersectionObserver(this.callback, options);
    }
    // コールバック専用
    callback(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                if (img.dataset.src !== "" 
                    && img.dataset.src !== undefined 
                    && img.dataset.src !== "undefined") 
                {
                    img.onload = () => {
                        img.style.opacity = "1";
                    };
                    img.src = img.dataset.src;
                }
                this.unobserve(img);
                // console.log("lazy loaded.");
            }
            // console.log(entry.isIntersecting);
        });
    }
    /**
     * 遅延ロードさせたい HTMLImageElement を設定します。
     * @param {Element} el Set img element.
     * @param {String} src The image source url.
     */
    observe(el, src) {
        el.style.opacity = "0";
        el.dataset.src = src;
        this.observer.observe(el);
    }
    // 監視を解除
    unobserve(el) {
        this.observer.unobserve(el);
    }
}

/**
 * 指定した値が範囲を超えないようにするclamp関数
 * @param {Number} x The set value 
 * @param {Number} min clamps minimum value 
 * @param {Number} max clamps maximum value
 */
function clamp(x, min, max) { //eslint-disable-line
    return x < min ? min : (max < x ? max : x);
}

module.exports = imgLoader;
