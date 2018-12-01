import "../../css/app.css";
import "../../css/responsive.css";
import Banner from "./Banner";
import Navigation from "./Navigation";
import Search from "./Search";
import TopHeadlines from "./TopHeadlines";
import GreetingService from 'services/GreetingService';

export const hideBanner = Banner.hide;

export const setBannerBackground = Banner.setBackground;

export const renderTopHeadlines = TopHeadlines.render;

export const CategoryList = Navigation.categoryList;

export default {
  Banner,
  Navigation,
  Search,
  TopHeadlines,
  GreetingService
};
