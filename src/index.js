export default class ScrollTracker {
    constructor(selector,
                scrollColors = {},
                trackHeadingsItemSelector = '',
                trackHeadingsSelector = '',
                headingChangeEvent = null,
                hideOnScrolledToTop = true,
    ) {
        this.item = document.querySelector(selector);
        this.headingItem = trackHeadingsItemSelector !== '' ? document.querySelector(trackHeadingsItemSelector) : null;
        this.trackHeadings = trackHeadingsSelector;
        this.currentHeader = null;
        this.scrollColors = scrollColors;
        this.headingChangeEvent = headingChangeEvent;
        this.hideOnTop = hideOnScrolledToTop;
        this.hideOnTopHidden = false;
        if (this.item === null) {
            console.warn(`ScrollTracker not found by #${id}!`);
            return;
        }
        this.body = document.body,
        this.html = document.documentElement;
        this.windowSize = {
            height: window.innerHeight,
            width: window.innerWidth,
        };
        window.onscroll = this.windowScroll.bind(this);
        window.onresize = this.windowResize.bind(this);
    }

    windowScroll() {
        const bodyHeight = Math.max(this.body.scrollHeight, this.body.offsetHeight, this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight) - this.windowSize.height;
        let scrolled = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        const prc = Math.floor((scrolled * 100) / bodyHeight);
        this.item.style.width = `${prc}%`;
        Object.keys(this.scrollColors).forEach(percent => {
            if (percent.toString() === prc.toString()) {
                this.item.style.backgroundColor = this.scrollColors[percent];
                return;
            }
        });

        if (this.headingItem) {
            const headings = document.querySelectorAll(this.trackHeadings) || null;
            if (headings !== null && headings.length > 0) {
                if (this.hideOnTop
                    && !this.hideOnTopHidden
                    && headings[0].getBoundingClientRect().top >= this.windowSize.height / 1.5) {
                    this.currentHeader = null;
                    this.headingChangeEvent(this.headingItem, () => {
                        this.headingItem.innerHTML = '';
                        this.hideOnTopHidden = true;
                        setTimeout(() => {
                            this.hideOnTopHidden = false;
                        }, 150);
                    });
                    return;
                }

                for (let i = 0; i < headings.length; i++) {
                    if (headings[i].getBoundingClientRect().top <= this.windowSize.height / 6
                        && headings[i].getBoundingClientRect().top > 0
                        && (this.currentHeader === null || i !== this.currentHeader)) {
                        this.currentHeader = i;
                        this.headingChangeEvent(this.headingItem, (postChange = null) => {
                            this.headingItem.innerHTML = headings[i].innerHTML;
                            if (postChange !== null) postChange();
                        });
                    }
                }
            }
        }
    }

    windowResize(e) {
        this.windowSize = {
            height: e.srcElement.innerHeight,
            width: e.srcElement.innerWidth,
        };
        this.windowScroll();        
    }
}