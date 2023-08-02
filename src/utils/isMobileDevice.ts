function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipod', 'blackberry', 'windows phone'];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

export default isMobileDevice