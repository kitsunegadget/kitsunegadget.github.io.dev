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
export default class ImageLoader {
    observer: IntersectionObserver;
    
    constructor(threshold=0.5) {
        const options = {
            threshold: clamp(threshold, 0, 1)
        }
        this.observer = new IntersectionObserver(this.callback, options);
    }
    // コールバック専用
    callback(entries: any) {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src !== "" 
                    && img.dataset.src !== undefined 
                    && img.dataset.src !== "undefined") 
                {
                    img.onload = () => {
                        img.style.opacity = "1";
                    };
                    img.src = img.dataset.src;

                    // for video
                    img.onloadeddata = () => {
                        img.style.opacity = "1";
                    }
                }
                this.unobserve(img);
                // console.log("lazy loaded.");
            }
            // console.log(entry.isIntersecting);
        });
    }
    
    observe(el: HTMLElement, src: string) {
        el.style.opacity = "0";
        el.dataset.src = src;
        this.observer.observe(el);
    }
    // 監視を解除
    unobserve(el: HTMLElement) {
        this.observer.unobserve(el);
    }
}

/**
 * 指定した値が範囲を超えないようにするclamp関数
 * @param {Number} x The set value 
 * @param {Number} min clamps minimum value 
 * @param {Number} max clamps maximum value
 */
function clamp(x: number, min: number, max: number) { //eslint-disable-line
    return x < min ? min : (max < x ? max : x);
}
