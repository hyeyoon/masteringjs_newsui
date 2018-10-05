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
    this.setActiveClass();
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
      newsCompany.addEventListener('click', () => this.selectCompany(index), false);
      newsNavigation.appendChild(newsCompany);
    })
  }
  selectCompany(index) {
    this.removeClass();
    this.activeNewsCompanyIndex = index;
    this.setActiveClass();
    this.setNewsList();
  }
}
