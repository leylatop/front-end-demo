function formatPrice(price, type) {
    // 转化成字符串
    price += ""
    // 带逗号的价格=>不带逗号的价格   
    if (type == 1) {
        return price.replace(/,/g, '');
    }
    // 不带逗号的价格=>带逗号的价格
    else if (type == 2) {
        return price.replace(/\B(?=(?:\d{3})+$)/g, ',');
    }
    return false
}