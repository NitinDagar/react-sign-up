export function classNames(classes) {
    let ret = ""
    Object.keys(classes).forEach((cal) => {
        if (classes[cal]) {
            ret = ret + cal + " ";
        }
    })

    return ret;
}

export function isEmpty(str) {
    if (!str) {
        return true
    }
    return !(str.length > 0)
}

export function isEmail(str) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
}

export function countCapitals(value) {
    var str = value;
    return str.replace(/[^A-Z]/g, "").length;
}

export function containNumbers(value) {
    return /\d/.test(value);
}
