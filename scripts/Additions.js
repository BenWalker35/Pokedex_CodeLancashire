
export function isVisible(el) {
    const elRect = el.getBoundingClientRect();

    return (
        (elRect.bottom >= 0 && elRect.top <= window.innerHeight) &&
        (elRect.right >= 0 && elRect.left <= window.innerWidth)
    );
}


export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function addClass(el, classStr) {
    el.classList.add(classStr);
}
export function addClasses(el, ...classStrs) {
    for(const classStr of classStrs)
        addClass(el, classStr);
}

export function rmvClass(el, classStr) {
    el.classList.remove(classStr);
}

export function changeClass(el, oldClass, newClass) {
    rmvClass(el, oldClass);
    addClass(el, newClass);
}

export function setAttr(el, attrName, attrValue) {
    el.setAttribute(attrName, attrValue);
}

export function appendChildren(el, ...children) {
    for(const child of children) {
        el.appendChild(child);
    }
}