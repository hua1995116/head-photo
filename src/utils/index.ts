import { TextStyle, ImgStyle } from "@src/types/style.type";
import { TextConfig } from "@src/types/config.type";

export function removePx(str: string | undefined): number | undefined {
    return Number(str && str.replace('px', ''))
}

export function addPx(num: number | undefined) {
    return num + 'px';
}

export function textToConfig(initText: TextStyle) {
    const { marginLeft, marginRight, marginTop, marginBottom, fontFamily, fontWeight, fontSize, content, color, switchText } = initText
    return {
        weight: fontWeight,
        size: removePx(fontSize),
        family: fontFamily,
        left: removePx(marginLeft),
        top: removePx(marginTop),
        right: removePx(marginRight),
        bottom: removePx(marginBottom),
        switchText
    }
}

export function configToText(value: TextConfig) {
    const {
        switchText,
        content,
        weight,
        size,
        family,
        left,
        top,
        right,
        bottom,
        color,
    } = value
    return {
        fontWeight: weight,
        fontSize: addPx(size),
        fontFamily: family,
        marginLeft: addPx(left),
        marginBottom: addPx(bottom),
        marginRight: addPx(right),
        marginTop: addPx(top),
        content,
        color,
        switchText
    }
}

