import ContentScrollTracker from '../src/index';

const st = new ContentScrollTracker('#tracker', 'width', {
    0: "red",
    10: "green",
    20: "blue",
    30: "rgb(255, 0, 0)",
    40: "rgb(0, 255, 0)",
    50: "rgb(0, 0, 255)",
    60: "rgb(0, 0, 255, 0.5)",
    70: "rgb(0, 0, 255, 0)",
    80: "#ff0000",
    90: "#00ff00",
    100: "#0000ff",
}, '#tracker--section', '.tracker--heading', (item, event) => {
    item.style.left = '-150px';
    item.style.opacity = 0;
    setTimeout(() => {
        event(() => {
            item.style.left = '15px';
            item.style.opacity = 1;
        });
    }, 150);
});