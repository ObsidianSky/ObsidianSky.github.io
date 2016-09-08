window.app = {};
app.module = {};

app.init = function() {

  var currentPage;

  app.event = new Event();

  app.lotsList = new LotsList();

  app.userList = new UserList();

  app.login = new Login(app.userList, app.event);

  app.lotsList.init(app.data.lots);
  app.userList.init(app.data.users);

  var loginContainer = document.getElementById('login-container');
  var pageContainer = document.getElementById('page-container');
  var searchBarContainer = document.getElementById('search-bar-container');

  app.router = new Router();

  app.router.route('homePage', '/', homePageHandler)
    .route('lotPage', '/lot/:id/', lotPageHandler)
    .route('categoryPage', '/category/:name/', categoryPageHandler)
    .route('userPage', '/user/:id/', userPageHandler)
    .route('addLotPage', '/add-lot/', newLotPageHandler)
    .route('search', '/search/:searchQuery/', searchPageHandler)
    .route('contactPage', '/contact/', contactPageHandler)
    .setNotFound(notFoundHandler)
    .beforePageChange(function() {
      if (currentPage) {
        currentPage.destroy();
        currentPage = null;
      }
    })
    .afterPageChange(function() {
      var menu = document.getElementById('menu');
      var li = menu.querySelectorAll('li');
      var activeLink = menu.querySelector('a[href="' + location.hash + '"]');

      each(li, function(li) {
        if (!li.contains(activeLink)) {
          li.classList.remove('active');
          return;
        }

        li.classList.add('active');
      });
    });

  app.router.init();

  window.addEventListener('hashchange', function() {
    app.router.refresh();
  });

  app.module.loginBar.init({
    container: loginContainer
  });

  app.module.searchBar.init({
    container: searchBarContainer
  });

  app.event.on('login', function() {
    app.module.loginBar.destroy();
    app.module.userBar.init({
      container: loginContainer
    });
  })

  app.event.on('logout', function() {
    app.module.userBar.destroy();
    app.module.loginBar.init({
      container: loginContainer
    });
  })

  function homePageHandler() {
    currentPage = app.module.homePage;

    app.module.homePage.init({
      container: pageContainer
    });
  }

  function categoryPageHandler(categoryName) {
    var lots = app.lotsList.getCategory(categoryName);

    if (!lots) {
      app.router.notFound();
      return;
    }

    currentPage = app.module.categoryPage;

    app.module.categoryPage.init({
      lots: lots,
      container: pageContainer
    });
  }

  function lotPageHandler(id) {
    var lot = app.lotsList.getLot(id);

    if (!lot) {
      app.router.notFound();
      return;
    }

    currentPage = app.module.lotPage;

    app.module.lotPage.init({
      container: pageContainer,
      lot: lot
    });
  }

  function contactPageHandler() {
    currentPage = app.module.contactPage;

    app.module.contactPage.init({
      container: pageContainer
    });
  }

  function searchPageHandler(searchQuery) {
    currentPage = app.module.searchPage;

    app.module.searchPage.init({
      container: pageContainer,
      searchQuery: searchQuery
    });
  }

  function notFoundHandler() {
    pageContainer.innerHTML = Templates.pageNotFound();
  }

  function newLotPageHandler() {
    if (!app.login.isAutorized()) {
      app.router.notFound();
      return;
    }

    currentPage = app.module.newLotPage;

    app.module.newLotPage.init({
      container: pageContainer
    });
  }

  function userPageHandler(id) {
    var user = app.userList.getUser(id);

    if (!user) {
      app.router.notFound();
      return;
    }

    currentPage = app.module.userPage;

    app.module.userPage.init({
      container: pageContainer,
      user: user,
      loginUserProfile: app.login.isAutorized() && app.login.getUser().id == id
    });
  }
}


window.addEventListener('load', function() {
  var initialData = [{
    url: 'data/categories.json',
    name: 'categories'
  }, {
    url: 'data/users.json',
    name: 'users'
  }, {
    url: 'data/lots.json',
    name: 'lots'
  }];

  loadBundle(initialData, app.init);

});
