export interface CommonStyle {
    marginLeft?: string
    marginRight?: string
    marginTop?: string
    marginBottom?: string
}

export interface TextStyle extends CommonStyle {
    content?: string
    fontFamily?: string
    fontWeight?: number
    fontSize?: string
    color?: string
    switchText?: boolean
}

export interface ImgStyle extends CommonStyle {
    src?: string
}

export interface BackgroundStyle {
    background: string
}

export interface FontOption {
    label: string
    value: string
}
