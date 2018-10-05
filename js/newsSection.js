import { newslist } from '../data/newslist.js'

export default class newsSection {
  constructor() {
    this.activeNewsCompanyIndex = 0;
    this.newsCompanyList = newslist;
  }

  init(fnNewsListTemplate, fnNewsCompanyList) {
    this.newsTemplate = fnNewsListTemplate;
    this.setNewsList();
    this.setNewsCompanyList(fnNewsCompanyList);
    this.setEventToButton();
    this.addActiveClass();
  }
  setNewsList() {
    const newsContent = document.querySelector('.content');
    newsContent.innerHTML = this.newsTemplate(this.newsCompanyList[this.activeNewsCompanyIndex]);
  }
  setNewsCompanyList(fnNewsCompanyList) {
    const newsNavigation = document.querySelector('.newsNavigation');
    this.newsCompanyList.forEach((news, index) => {
      const newsCompany = document.createElement('li');
      newsCompany.innerHTML = fnNewsCompanyList.bind(this)(news);
      newsNavigation.appendChild(newsCompany);
    })
    newsNavigation.addEventListener('click', (evt) => this.delegateEventToChild(evt));
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
    this.setNewsList();
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
  setEventToButton() {
    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    leftBtn.addEventListener('click', () => this.goToBefore.bind(this)());
    rightBtn.addEventListener('click', () => this.goToAfter.bind(this)());
  }
  goToBefore() {
    this.removeActiveClass();
    if (this.activeNewsCompanyIndex > 0) {
      this.activeNewsCompanyIndex -= 1;
    } else {
      this.activeNewsCompanyIndex = this.newsCompanyList.length - 1;
    }
    this.addActiveClass();
    this.setNewsList();
  }
  goToAfter() {
    this.removeActiveClass();
    if (this.activeNewsCompanyIndex < this.newsCompanyList.length) {
      this.activeNewsCompanyIndex += 1;
    } else {
      this.activeNewsCompanyIndex = 0;
    }
    this.addActiveClass();
    this.setNewsList();
  }
}
