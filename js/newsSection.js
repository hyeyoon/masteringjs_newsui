import { newslist } from '../data/newslist.js'

export default class newsSection {
  constructor() {
    this.activeNewsCompanyIndex = 0;
    this.newsCompanyList = newslist;
  }

  init({template}) {
    const [fnNewsListTemplate, fnNewsCompanyList] = template;
    this.newsTemplate = fnNewsListTemplate;
    this.renderNewsList();
    this.renderNewsCompanyList(fnNewsCompanyList);
    this.renderEventToButton();
    this.addActiveClass();
  }
  renderNewsList() {
    const newsContent = document.querySelector('.content');
    newsContent.innerHTML = this.newsTemplate(this.newsCompanyList[this.activeNewsCompanyIndex]);
  }
  renderNewsCompanyList(fnNewsCompanyList) {
    const newsNavigation = document.querySelector('.newsNavigation');
    const newsCompanyEl = this.newsCompanyList.map((news, index) => {
      return fnNewsCompanyList.call(this, news);
    }).join("");
    newsNavigation.innerHTML = newsCompanyEl;
    newsNavigation.addEventListener('click', this.delegateEventToChild.bind(this));
  }
  delegateEventToChild(evt) {
    if (evt.target.tagName === 'A') {
      const companyName = evt.target.textContent;
      const index = this.newsCompanyList.findIndex((company) => {
        return company.company === companyName;
      })
      this.selectCompany(index);
    }
  }
  selectCompany(index) {
    this.removeActiveClass();
    this.activeNewsCompanyIndex = index;
    this.addActiveClass();
    this.renderNewsList();
  }
  addActiveClass() {
    const newsNavigation = document.querySelector('.newsNavigation');
    const activeCompany = newsNavigation.children[this.activeNewsCompanyIndex];
    activeCompany.classList.add("active");
  }
  removeActiveClass() {
    const activeCompany = document.querySelector('.active');
    activeCompany.classList.remove("active");
  }
  renderEventToButton() {
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    leftBtn.addEventListener('click', () => this.goToBefore.call(this));
    rightBtn.addEventListener('click', () => this.goToAfter.call(this));
  }
  goToBefore() {
    this.removeActiveClass();
    if (this.activeNewsCompanyIndex > 0) {
      this.activeNewsCompanyIndex -= 1;
    } else {
      this.activeNewsCompanyIndex = this.newsCompanyList.length - 1;
    }
    this.addActiveClass();
    this.renderNewsList();
  }
  goToAfter() {
    this.removeActiveClass();
    if (this.activeNewsCompanyIndex < this.newsCompanyList.length) {
      this.activeNewsCompanyIndex += 1;
    } else {
      this.activeNewsCompanyIndex = 0;
    }
    this.addActiveClass();
    this.renderNewsList();
  }
}
