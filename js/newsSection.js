import { newslist } from '../data/newslist.js'

export default class newsSection {
  constructor() {
    this.activeNewsCompanyIndex = 0;
    this.newsCompanyList = newslist;
  }

  init(fnNewsListTemplate, fnNewsCompanyList) {
    this.setNewsCompanyList(fnNewsCompanyList);
  }
  setNewsCompanyList(fnNewsCompanyList) {
    const newsNavigation = document.querySelector('.newsNavigation');
    this.newsCompanyList.forEach((news, index) => {
      const newsCompany = document.createElement('li');
      newsCompany.innerHTML = fnNewsCompanyList.bind(this)(news);
      newsNavigation.appendChild(newsCompany);
    })
  }
}
