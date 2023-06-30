function getDayNameByIndex(index) {
    let dayName = 'شنبه'
    switch (index) {
        case 0:
            dayName = "شنبه"
            break;
        case 1:
            dayName = "یکشنبه"
            break;
        case 2:
            dayName = "دو شنبه"
            break;
        case 3:
            dayName = "سه شنبه"
            break;
        case 4:
            dayName = "چهار شنبه"
            break;
        case 5:
            dayName = "پنج شنبه"
            break;
        case 6:
            dayName = "جمعه"
            break;
    }
    return dayName
}

export default getDayNameByIndex