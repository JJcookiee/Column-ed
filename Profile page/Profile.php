<?php include 'databasePHP.php';?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Column-ed</title>
    <link rel="icon" type="image/x-icon" href="/Column-ed/Profile page/Column-ed.png"/>
    <link rel="stylesheet" href="/Column-ed/Profile page/Profile.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />
  </head>
  <body>
    <header class="header">
      <a href="#home" class="logo">Column-ed</a>
      <form>
        <div class="searchbar">
          <span class="search-icon material-symbols-outlined">search</span>
          <input class="search-input" type="search" placeholder="Search for media...                     ">
        </div>
      </form>
      </div>
      <div class="header-right">
        <a href="#home">Home</a>
        <a class="active" href="#profile">Profile</a>
        <a href="#notifications">Notifications</a>
        <a href="#watchlist">Watchlist</a>
      </div>
    </header>

    <section class="profile-header">
      <div class="avatar">
        <img src="/Column-ed/Profile page/scorsese.png" alt="Avatar" />
      </div>
      <div class="profile-info">
        <h1>FilmLover123</h1>
        <p class="username">@ILoveFilms</p>
        <p class="bio">Barry Lyndon is boring.</p>
      </div>
    </section>

    <section class="stats">
      <div class="stat">
        <span class="num"><?php echo $total_films;?></span>
        <a href="#films" class="label">Films</a>
      </div>
      <div class="stat">
        <span class="num"><?php echo $total_reviews;?></span>
        <a href="#reviews" class="label">Reviews</a>
      </div>
      <div class="stat">
        <span class="num">12</span>
        <a href="#lists" class="label">Lists</a>
      </div>
    </section>

    <section class="poster-section">
      <div class="rectangle-row">
        <a href="#item1" class="rectangle"></a>
        <a href="#item2" class="rectangle"></a>
        <a href="#item3" class="rectangle"></a>
        <a href="#item4" class="rectangle"></a>
        <a href="#item5" class="rectangle"></a>
        <a href="#item6" class="rectangle"></a>
        <a href="#item7" class="rectangle"></a>
        <a href="#item8" class="rectangle"></a>
      </div>
      <div class="vertical-separator"></div>
      <div class="info-section">
  <h2>Featured stuff?</h2>

  <div class="follow-container">
    <div class="followers">
      <span class="num">401</span>
      <a href="#followers" class="label">Followers</a>
    </div>

    <div class="followers">
      <span class="num">401</span>
      <a href="#following" class="label">Following</a>
    </div>
  </div>
</div>

    </section>
  </body>
</html>