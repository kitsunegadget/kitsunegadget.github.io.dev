/**
 * 指定した値が範囲を超えないようにするclamp関数
 * @param {Number} x The set value 
 * @param {Number} min clamps minimum value 
 * @param {Number} max clamps maximum value
 */
function clamp(x, min, max) {
    return x < min ? min : (max < x ? max : x);
}

/** 
 * 主にカスタムディレクティブで利用できる関数です。
 * 
 * ex. <img v-imgLoad:[data.src] >
 * のようにimgタグにurlをディレクティブとしてセットします。
 * 
 * opacity による表示制御をしているので、
 * "transition: opacity" のスタイルを適用することで
 * トランジションアニメーションが利用できます。
 * 
 * @param {HTMLElement} el The img element.
 * @param {String} src The image url.
 * @param {Number} opacityLevel An image show opacity value when image load. 
*/
function imgLoader(el, src, opacityLevel) {
    el.style.opacity = "0";
    if (src !== "" && src !== undefined) {
        el.onload = () => {
            el.style.opacity = clamp(opacityLevel, 0, 1).toString();
        };
        el.src = src;
    }
}

module.exports = imgLoader;